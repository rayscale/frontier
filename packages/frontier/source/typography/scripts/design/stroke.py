import math
from dataclasses import dataclass

Point = tuple[float, float]
KAPPA = 0.5522847498307936
HORIZONTAL = 0.9
CORNER_TOLERANCE = math.radians(2)


@dataclass(frozen=True)
class Segment:
    points: tuple[Point, ...]

    @property
    def curve(self) -> bool:
        return len(self.points) == 4


@dataclass(frozen=True)
class Stroke:
    segments: tuple[Segment, ...]
    closed: bool = False
    scale: float = 1.0
    cuts: tuple[str | float, str | float] = ("perp", "perp")


Contour = list[Segment]


class Pen:
    def __init__(self, x: float, y: float) -> None:
        self.start: Point = (x, y)
        self.segments: list[Segment] = []
        self.scale = 1.0
        self.closed = False
        self.cuts: tuple[str | float, str | float] = ("perp", "perp")

    @property
    def current(self) -> Point:
        return self.segments[-1].points[-1] if self.segments else self.start

    def line(self, x: float, y: float) -> "Pen":
        self.segments.append(Segment((self.current, (x, y))))
        return self

    def arc(self, cx: float, cy: float, rx: float, ry: float, a0: float, a1: float) -> "Pen":
        chunks = max(1, math.ceil(abs(a1 - a0) / 90 - 1e-9))
        step = (a1 - a0) / chunks
        k = 4 / 3 * math.tan(math.radians(abs(step)) / 4) * (1 if step > 0 else -1)
        for index in range(chunks):
            s = math.radians(a0 + step * index)
            e = math.radians(a0 + step * (index + 1))
            p0 = (cx + rx * math.cos(s), cy + ry * math.sin(s))
            p3 = (cx + rx * math.cos(e), cy + ry * math.sin(e))
            c1 = (p0[0] - k * rx * math.sin(s), p0[1] + k * ry * math.cos(s))
            c2 = (p3[0] + k * rx * math.sin(e), p3[1] - k * ry * math.cos(e))
            self.segments.append(Segment((p0, c1, c2, p3)))
        return self

    def ellipse(self, cx: float, cy: float, rx: float, ry: float) -> "Pen":
        self.start = (cx, cy + ry)
        self.segments = []
        self.arc(cx, cy, rx, ry, 90, 450)
        self.closed = True
        return self

    def through(self, *knots: tuple[float, float, float], tension: float = 1.0) -> "Pen":
        for a, b in zip(knots, knots[1:], strict=False):
            self.hermite(a, b, tension)
        return self

    def hermite(self, a: tuple[float, float, float], b: tuple[float, float, float], tension: float = 1.0) -> None:
        p0, p3 = (a[0], a[1]), (b[0], b[1])
        t0 = (math.cos(math.radians(a[2])), math.sin(math.radians(a[2])))
        t3 = (math.cos(math.radians(b[2])), math.sin(math.radians(b[2])))
        chord = (p3[0] - p0[0], p3[1] - p0[1])
        length = math.hypot(*chord)
        h0 = tension * 0.5 * (KAPPA * abs(chord[0] * t0[0] + chord[1] * t0[1]) + 0.38 * length)
        h3 = tension * 0.5 * (KAPPA * abs(chord[0] * t3[0] + chord[1] * t3[1]) + 0.38 * length)
        c1 = (p0[0] + t0[0] * h0, p0[1] + t0[1] * h0)
        c2 = (p3[0] - t3[0] * h3, p3[1] - t3[1] * h3)
        self.segments.append(Segment((p0, c1, c2, p3)))

    def loop(self, *knots: tuple[float, float, float], tension: float = 1.0) -> "Pen":
        first = knots[0]
        self.start = (first[0], first[1])
        self.segments = []
        self.through(*knots, first, tension=tension)
        self.closed = True
        return self

    def weight(self, scale: float) -> "Pen":
        self.scale = scale
        return self

    def cut(self, start: str | float = "perp", end: str | float = "perp") -> "Pen":
        self.cuts = (start, end)
        return self

    def stroke(self) -> Stroke:
        return Stroke(tuple(self.segments), self.closed, self.scale, self.cuts)


def disc(cx: float, cy: float, r: float) -> Contour:
    pen = Pen(cx, cy + r).arc(cx, cy, r, r, 90, -270)
    return list(pen.segments)


def _unit(dx: float, dy: float) -> Point:
    length = math.hypot(dx, dy) or 1.0
    return dx / length, dy / length


def _tangents(segment: Segment) -> tuple[Point, Point]:
    p = segment.points
    if len(p) == 2:
        t = _unit(p[1][0] - p[0][0], p[1][1] - p[0][1])
        return t, t
    t0 = _unit(p[1][0] - p[0][0], p[1][1] - p[0][1])
    if p[1] == p[0]:
        t0 = _unit(p[2][0] - p[0][0], p[2][1] - p[0][1])
    t3 = _unit(p[3][0] - p[2][0], p[3][1] - p[2][1])
    if p[3] == p[2]:
        t3 = _unit(p[3][0] - p[1][0], p[3][1] - p[1][1])
    return t0, t3


def thickness(t: Point, stem: float, scale: float) -> float:
    return stem * scale * (HORIZONTAL + (1 - HORIZONTAL) * abs(t[1]))


def _offset(segment: Segment, d0: float, d3: float) -> Segment:
    t0, t3 = _tangents(segment)
    p = segment.points
    q0 = (p[0][0] - t0[1] * d0, p[0][1] + t0[0] * d0)
    q3 = (p[-1][0] - t3[1] * d3, p[-1][1] + t3[0] * d3)
    if len(p) == 2:
        return Segment((q0, q3))
    chord = math.hypot(p[3][0] - p[0][0], p[3][1] - p[0][1]) or 1.0
    ratio = math.hypot(q3[0] - q0[0], q3[1] - q0[1]) / chord
    l1 = math.hypot(p[1][0] - p[0][0], p[1][1] - p[0][1]) * ratio
    l2 = math.hypot(p[3][0] - p[2][0], p[3][1] - p[2][1]) * ratio
    c1 = (q0[0] + t0[0] * l1, q0[1] + t0[1] * l1)
    c2 = (q3[0] - t3[0] * l2, q3[1] - t3[1] * l2)
    return Segment((q0, c1, c2, q3))


def _reverse(segment: Segment) -> Segment:
    return Segment(tuple(reversed(segment.points)))


def _intersect(a: Point, ta: Point, b: Point, tb: Point) -> Point:
    cross = ta[0] * tb[1] - ta[1] * tb[0]
    if abs(cross) < 1e-9:
        return b
    s = ((b[0] - a[0]) * tb[1] - (b[1] - a[1]) * tb[0]) / cross
    return a[0] + ta[0] * s, a[1] + ta[1] * s


def _replace_end(segment: Segment, index: int, point: Point) -> Segment:
    points = list(segment.points)
    delta = (point[0] - points[index][0], point[1] - points[index][1])
    points[index] = point
    if len(points) == 4:
        handle = 1 if index == 0 else 2
        points[handle] = (points[handle][0] + delta[0], points[handle][1] + delta[1])
    return Segment(tuple(points))


def _angle(a: Point, b: Point) -> float:
    return abs(math.atan2(a[0] * b[1] - a[1] * b[0], a[0] * b[0] + a[1] * b[1]))


def _join(
    offsets: list[Segment], tangents: list[tuple[Point, Point]], widths: list[tuple[float, float]], side: float, wrap: bool
) -> None:
    count = len(offsets)
    for i in range(count if wrap else count - 1):
        j = (i + 1) % count
        if _angle(tangents[i][1], tangents[j][0]) < CORNER_TOLERANCE:
            continue
        if offsets[i].curve or offsets[j].curve:
            raise ValueError("A corner between segments needs two straight lines")
        x = _intersect(offsets[i].points[0], tangents[i][0], offsets[j].points[0], tangents[j][0])
        offsets[i] = _replace_end(offsets[i], -1, x)
        offsets[j] = _replace_end(offsets[j], 0, x)


def _sides(segments: tuple[Segment, ...], stem: float, scale: float, wrap: bool) -> tuple[list[Segment], list[Segment]]:
    tangents = [_tangents(s) for s in segments]
    widths = [(thickness(t0, stem, scale) / 2, thickness(t3, stem, scale) / 2) for t0, t3 in tangents]
    left = [_offset(s, d0, d3) for s, (d0, d3) in zip(segments, widths, strict=True)]
    right = [_offset(s, -d0, -d3) for s, (d0, d3) in zip(segments, widths, strict=True)]
    _join(left, tangents, widths, 1, wrap)
    _join(right, tangents, widths, -1, wrap)
    return left, right


def area(segments: tuple[Segment, ...] | list[Segment]) -> float:
    total = 0.0
    for segment in segments:
        pts = segment.points
        for a, b in zip(pts, pts[1:], strict=False):
            total += a[0] * b[1] - b[0] * a[1]
    return total / 2


def _cut_point(edge: Point, centre: Point, t: Point, cut: str | float) -> Point:
    if not isinstance(cut, str):
        d = (math.cos(math.radians(cut)), math.sin(math.radians(cut)))
        denominator = t[0] * d[1] - t[1] * d[0]
        if abs(denominator) < 0.15:
            return edge
        s = ((centre[0] - edge[0]) * d[1] - (centre[1] - edge[1]) * d[0]) / denominator
        return edge[0] + t[0] * s, edge[1] + t[1] * s
    if cut == "h" and abs(t[1]) > 0.15:
        s = (centre[1] - edge[1]) / t[1]
        return edge[0] + t[0] * s, edge[1] + t[1] * s
    if cut == "v" and abs(t[0]) > 0.15:
        s = (centre[0] - edge[0]) / t[0]
        return edge[0] + t[0] * s, edge[1] + t[1] * s
    return edge


def expand(stroke: Stroke, stem: float) -> list[Contour]:
    segments = stroke.segments
    if stroke.closed:
        path = tuple(_reverse(x) for x in reversed(segments)) if area(segments) > 0 else segments
        left, right = _sides(path, stem, stroke.scale, True)
        inner = [_reverse(x) for x in reversed(right)]
        return [left, inner]
    left, right = _sides(segments, stem, stroke.scale, False)
    first, last = segments[0], segments[-1]
    t_start = _tangents(first)[0]
    t_end = _tangents(last)[1]
    start, end = first.points[0], last.points[-1]
    left_start, left_end = left[0].points[0], left[-1].points[-1]
    right_start, right_end = right[0].points[0], right[-1].points[-1]
    cut_start, cut_end = stroke.cuts
    new_left_start = _cut_point(left_start, start, t_start, cut_start)
    new_right_start = _cut_point(right_start, start, t_start, cut_start)
    new_left_end = _cut_point(left_end, end, t_end, cut_end)
    new_right_end = _cut_point(right_end, end, t_end, cut_end)
    left[0] = _replace_end(left[0], 0, new_left_start)
    right[0] = _replace_end(right[0], 0, new_right_start)
    left[-1] = _replace_end(left[-1], -1, new_left_end)
    right[-1] = _replace_end(right[-1], -1, new_right_end)
    back = [_reverse(x) for x in reversed(right)]
    return [[*left, Segment((new_left_end, new_right_end)), *back, Segment((new_right_start, new_left_start))]]


def outline_bounds(contours: list[Contour]) -> tuple[float, float, float, float]:
    xs: list[float] = []
    ys: list[float] = []
    for contour in contours:
        for segment in contour:
            if segment.curve:
                a, b, c, d = segment.points
                for i in range(41):
                    t = i / 40
                    mt = 1 - t
                    xs.append(mt**3 * a[0] + 3 * mt * mt * t * b[0] + 3 * mt * t * t * c[0] + t**3 * d[0])
                    ys.append(mt**3 * a[1] + 3 * mt * mt * t * b[1] + 3 * mt * t * t * c[1] + t**3 * d[1])
            else:
                for p in segment.points:
                    xs.append(p[0])
                    ys.append(p[1])
    return min(xs), min(ys), max(xs), max(ys)
