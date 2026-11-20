import math

from scripts.design.glyph import Frame
from scripts.design.stroke import Pen

TENSION = 1.08


def vstem(x: float, y0: float, y1: float) -> Pen:
    return Pen(x, y0).line(x, y1)


def hbar(y: float, x0: float, x1: float) -> Pen:
    return Pen(x0, y).line(x1, y)


def round_ring(cx: float, cy: float, rx: float, ry: float, tension: float = TENSION) -> Pen:
    return Pen(0, 0).loop(
        (cx + rx, cy, 90),
        (cx, cy + ry, 180),
        (cx - rx, cy, 270),
        (cx, cy - ry, 0),
        tension=tension,
    )


def flush(f: Frame, edge: float, y: float, other: tuple[float, float], right: bool) -> float:
    x = edge
    for _ in range(6):
        e = f.run(other[0] - x, other[1] - y)
        x = edge - e if right else edge + e
    return x


def diagonal(
    f: Frame, a: tuple[float, float], b: tuple[float, float], cuts: tuple[str | float, str | float] = ("h", "h")
) -> Pen:
    return Pen(*a).line(*b).cut(*cuts)


def on_ellipse(cx: float, cy: float, rx: float, ry: float, angle: float) -> tuple[float, float]:
    a = math.radians(angle)
    return cx + rx * math.cos(a), cy + ry * math.sin(a)


def heading(a: tuple[float, float], b: tuple[float, float]) -> float:
    return math.degrees(math.atan2(b[1] - a[1], b[0] - a[0]))
