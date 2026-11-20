import math
from collections.abc import Callable
from dataclasses import dataclass, field

from scripts.design.metrics import (
    ASCENDER,
    CAP_HEIGHT,
    DESCENDER,
    OVERSHOOT,
    X_HEIGHT,
    Master,
)
from scripts.design.profile import open_space
from scripts.design.stroke import (
    HORIZONTAL,
    Contour,
    Pen,
    Segment,
    Stroke,
    disc,
    expand,
    outline_bounds,
)

Disc = tuple[float, float, float]
Mapper = Callable[[float, float], tuple[float, float]]


@dataclass(frozen=True)
class Drawing:
    strokes: tuple[Stroke, ...] = ()
    discs: tuple[Disc, ...] = ()

    def __add__(self, other: "Drawing") -> "Drawing":
        return Drawing(self.strokes + other.strokes, self.discs + other.discs)


def ink(*parts: Pen | Stroke | Disc | Drawing) -> Drawing:
    result = Drawing()
    for part in parts:
        if isinstance(part, Pen):
            result = result + Drawing((part.stroke(),))
        elif isinstance(part, Stroke):
            result = result + Drawing((part,))
        elif isinstance(part, Drawing):
            result = result + part
        else:
            result = result + Drawing((), (part,))
    return result


def line(x0: float, y0: float, x1: float, y1: float, scale: float = 1.0) -> Pen:
    return Pen(x0, y0).line(x1, y1).weight(scale)


def at(cx: float, cy: float, rx: float, ry: float, angle: float, scale: float = 1.0) -> Pen:
    a = math.radians(angle)
    return Pen(cx + rx * math.cos(a), cy + ry * math.sin(a)).weight(scale)


def point(cx: float, cy: float, rx: float, ry: float, angle: float) -> tuple[float, float]:
    a = math.radians(angle)
    return cx + rx * math.cos(a), cy + ry * math.sin(a)


def ring(cx: float, cy: float, rx: float, ry: float, scale: float = 1.0) -> Pen:
    return Pen(0, 0).ellipse(cx, cy, rx, ry).weight(scale)


def transform(drawing: Drawing, fn: Mapper) -> Drawing:
    strokes = tuple(
        Stroke(
            tuple(Segment(tuple(fn(*p) for p in s.points)) for s in stroke.segments),
            stroke.closed,
            stroke.scale,
            stroke.cuts,
        )
        for stroke in drawing.strokes
    )
    discs = tuple((*fn(d[0], d[1]), d[2]) for d in drawing.discs)
    return Drawing(strokes, discs)


def scaled(drawing: Drawing, k: float, ox: float = 0.0, oy: float = 0.0) -> Drawing:
    strokes = tuple(
        Stroke(
            tuple(Segment(tuple((ox + p[0] * k, oy + p[1] * k) for p in s.points)) for s in stroke.segments),
            stroke.closed,
            stroke.scale * k,
            stroke.cuts,
        )
        for stroke in drawing.strokes
    )
    discs = tuple((ox + d[0] * k, oy + d[1] * k, d[2] * k) for d in drawing.discs)
    return Drawing(strokes, discs)


def shift(drawing: Drawing, dx: float, dy: float) -> Drawing:
    return transform(drawing, lambda x, y: (x + dx, y + dy))


def flip_x(drawing: Drawing, axis: float) -> Drawing:
    return transform(drawing, lambda x, y: (2 * axis - x, y))


def flip_y(drawing: Drawing, axis: float) -> Drawing:
    return transform(drawing, lambda x, y: (x, 2 * axis - y))


def turn(drawing: Drawing, cx: float, cy: float) -> Drawing:
    return transform(drawing, lambda x, y: (2 * cx - x, 2 * cy - y))


@dataclass(frozen=True)
class Frame:
    master: Master

    @property
    def h(self) -> float:
        return self.master.h

    @property
    def stem(self) -> float:
        return self.master.stem

    @property
    def X(self) -> float:
        return X_HEIGHT

    @property
    def C(self) -> float:
        return CAP_HEIGHT

    @property
    def A(self) -> float:
        return ASCENDER

    @property
    def D(self) -> float:
        return DESCENDER

    @property
    def hh(self) -> float:
        return self.h * HORIZONTAL

    @property
    def lo(self) -> float:
        return self.hh

    @property
    def lo_r(self) -> float:
        return self.hh - OVERSHOOT

    @property
    def xt(self) -> float:
        return X_HEIGHT - self.hh

    @property
    def xt_r(self) -> float:
        return X_HEIGHT + OVERSHOOT - self.hh

    @property
    def ct(self) -> float:
        return CAP_HEIGHT - self.hh

    @property
    def ct_r(self) -> float:
        return CAP_HEIGHT + OVERSHOOT - self.hh

    @property
    def at(self) -> float:
        return ASCENDER - self.hh

    @property
    def dl(self) -> float:
        return -DESCENDER + self.hh

    def run(self, dx: float, dy: float) -> float:
        length = math.hypot(dx, dy) or 1.0
        t = (abs(dx) / length, abs(dy) / length)
        return self.master.stem * (HORIZONTAL + (1 - HORIZONTAL) * t[1]) / 2 / max(t[1], 0.2)

    def w(self, base: float) -> float:
        return self.master.ink(base)


@dataclass(frozen=True)
class GlyphSpec:
    name: str
    unicodes: tuple[int, ...]
    draw: Callable[[Frame], Drawing] | None = None
    sb: tuple[float, float] | None = None
    advance: float | None = None
    mark: str | None = None
    combining: bool = False
    zone: str | None = None
    components: tuple[tuple[str, str], ...] = ()
    place: str = "above"
    tags: tuple[str, ...] = ()


@dataclass
class Rendered:
    contours: list[Contour]
    advance: float
    anchors: dict[str, tuple[float, float]]
    bounds: tuple[float, float, float, float] = (0, 0, 0, 0)
    parts: list[tuple[str, float, float]] = field(default_factory=list)


GLYPHS: dict[str, GlyphSpec] = {}

MARK_GAP = 56
BELOW_GAP = -10


def composite(name: str, codepoint: int | None, base: str, mark: str, place: str = "above") -> None:
    GLYPHS[name] = GlyphSpec(
        name,
        (codepoint,) if codepoint is not None else (),
        components=((base, "base"), (mark, place)),
        place=place,
    )


def placement(base: "Rendered", mark: "Rendered", place: str) -> tuple[float, float]:
    if place == "above":
        (bx, by), (mx, my) = base.anchors["top"], mark.anchors["_top"]
        return bx - mx, by + MARK_GAP - my
    if place == "below":
        (bx, by), (mx, my) = base.anchors["bottom"], mark.anchors["_bottom"]
        return bx - mx, by - BELOW_GAP - my
    if place == "after":
        return base.advance, 0.0
    if place == "ogonek":
        (bx, by), (mx, my) = base.anchors["ogonek"], mark.anchors["_ogonek"]
        return bx - mx, by - my
    return base.bounds[2] + 14 - mark.bounds[0], base.bounds[3] - mark.bounds[3]


def glyph(
    name: str,
    *unicodes: int,
    sb: tuple[float, float] | None = None,
    advance: float | None = None,
    mark: str | None = None,
    combining: bool = False,
    zone: str | None = None,
) -> Callable[[Callable[[Frame], Drawing]], Callable[[Frame], Drawing]]:
    def register(fn: Callable[[Frame], Drawing]) -> Callable[[Frame], Drawing]:
        GLYPHS[name] = GlyphSpec(name, unicodes, fn, sb, advance, mark, combining, zone)
        return fn

    return register


def contours_of(drawing: Drawing, stem: float) -> list[Contour]:
    contours: list[Contour] = []
    for stroke in drawing.strokes:
        contours.extend(expand(stroke, stem))
    for cx, cy, r in drawing.discs:
        contours.append(disc(cx, cy, r))
    return contours


ZONES = {
    "x": (0.0, float(X_HEIGHT), 70.0, 64.0),
    "cap": (0.0, float(CAP_HEIGHT), 80.0, 84.0),
    "fig": (0.0, float(CAP_HEIGHT), 112.0, 84.0),
}
OPTICAL = 0.65


def spacing(zone: str | None, contours: list[Contour], master: Master) -> tuple[float, float]:
    if zone is None:
        return 60.0, 60.0
    low, high, base, depth = ZONES[zone]
    straight = base + 0.35 * (master.stem - 84)
    left, right = open_space(contours, low, high, depth)
    return max(20.0, straight - OPTICAL * left), max(20.0, straight - OPTICAL * right)


def render(spec: GlyphSpec, master: Master) -> Rendered:
    if spec.draw is None:
        return Rendered([], spec.advance or 0.0, {})
    contours = contours_of(spec.draw(Frame(master)), master.stem)
    if not contours:
        return Rendered([], spec.advance or 0.0, {})
    x_min, y_min, x_max, y_max = outline_bounds(contours)
    sb_left, sb_right = spec.sb or spacing(spec.zone, contours, master)
    if spec.combining:
        dx = -(x_min + x_max) / 2
        advance = 0.0
    elif spec.advance is not None:
        dx = (spec.advance - (x_max - x_min)) / 2 - x_min
        advance = spec.advance
    else:
        dx = sb_left - x_min
        advance = x_max - x_min + sb_left + sb_right
    moved = [[Segment(tuple((p[0] + dx, p[1]) for p in s.points)) for s in c] for c in contours]
    left, right = x_min + dx, x_max + dx
    centre = (left + right) / 2
    if spec.mark in ("top", "bottom"):
        anchors = {
            f"_{spec.mark}": (centre, y_min if spec.mark == "top" else y_max),
            spec.mark: (centre, y_max if spec.mark == "top" else y_min),
        }
    elif spec.mark == "ogonek":
        anchors = {"_ogonek": (left + master.h, y_max)}
    else:
        anchors = {
            "top": (centre, y_max),
            "bottom": (centre, y_min),
            "ogonek": (right - master.h * 2.6, y_min),
        }
    return Rendered(moved, advance, anchors, (left, y_min, right, y_max))
