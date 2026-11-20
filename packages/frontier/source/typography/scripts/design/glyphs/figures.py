from collections.abc import Callable

from scripts.design.glyph import GLYPHS, Drawing, Frame, GlyphSpec, ink, turn
from scripts.design.glyphs.shapes import (
    diagonal,
    flush,
    hbar,
    on_ellipse,
    round_ring,
    vstem,
)
from scripts.design.stroke import Pen

TABULAR_ADVANCE = 620


def zero(f: Frame) -> Drawing:
    w = f.w(500)
    return ink(round_ring(w / 2, (f.ct_r + f.lo_r) / 2, w / 2 - f.h, (f.ct_r - f.lo_r) / 2, 1.1))


def zero_slashed(f: Frame) -> Drawing:
    w = f.w(500)
    a = flush(f, w * 0.22, 0.16 * f.C, (w * 0.78, 0.84 * f.C), False)
    b = flush(f, w * 0.78, 0.84 * f.C, (w * 0.22, 0.16 * f.C), True)
    return zero(f) + ink(diagonal(f, (a, 0.16 * f.C), (b, 0.84 * f.C), ("perp", "perp")))


def one(f: Frame) -> Drawing:
    w = f.w(330)
    x = w - f.h - 36
    return ink(vstem(x, f.C, 0), diagonal(f, (x, f.C - 4), (x - 0.38 * w - 30, f.C - 0.22 * f.C), ("perp", "perp")))


def two(f: Frame) -> Drawing:
    w = f.w(480)
    right = w - f.h
    cx = w / 2
    top = Pen(0, 0).through(
        (f.h + 6, 0.77 * f.C, 62),
        (cx - 6, f.ct_r, 0),
        (right, 0.74 * f.C, 280),
        (0.64 * w, 0.50 * f.C, 235),
        (f.h + 14, f.lo + 14, 232),
        tension=1.0,
    )
    return ink(top, hbar(f.lo, 0, w))


def three(f: Frame) -> Drawing:
    w = f.w(480)
    right = w - f.h
    ym = 0.535 * f.C
    xm = 0.44 * w
    upper = Pen(0, 0).through(
        (f.h + 12, 0.80 * f.C, 55),
        (w * 0.47, f.ct_r, 0),
        (right - 14, 0.745 * f.C, 285),
        (xm, ym, 195),
        tension=1.0,
    )
    lower = Pen(0, 0).through(
        (xm, ym, 0),
        (right, 0.28 * f.C, 270),
        (w * 0.46, f.lo_r, 180),
        (f.h + 6, 0.21 * f.C, 112),
        tension=1.0,
    )
    return ink(upper, lower)


def four(f: Frame) -> Drawing:
    w = f.w(510)
    xs = 0.70 * w
    yb = 0.29 * f.C
    top = flush(f, xs - 6, f.C, (0, yb), True)
    left = 0 + f.run(top - 0, f.C - yb) * 0.0
    return ink(vstem(xs, f.C, 0), diagonal(f, (top, f.C), (left + 8, yb), ("h", "perp")), hbar(yb, 0, w))


def five(f: Frame) -> Drawing:
    w = f.w(480)
    cx, rx = w / 2, w / 2 - f.h
    ry = 0.335 * f.C
    cy = f.lo_r + ry
    a = on_ellipse(cx, cy, rx, ry, 148)
    xs = f.h + 10
    bowl = Pen(a[0], a[1]).through(
        (a[0], a[1], 58),
        (cx, cy + ry, 0),
        (cx + rx, cy, 270),
        (cx, cy - ry, 180),
        (f.h + 10, cy - 0.7 * ry, 120),
        tension=1.05,
    )
    return ink(hbar(f.ct, xs, w - 20), vstem(xs, f.C, a[1] + 4), bowl)


def six(f: Frame) -> Drawing:
    w = f.w(500)
    rx = (w - 2 * f.h) / 2
    ry = 0.345 * f.C
    cy = f.lo_r + ry
    arm = Pen(0, 0).through(
        (f.h, cy, 90),
        (f.h + 0.04 * w, 0.70 * f.C, 80),
        (w * 0.55, f.ct_r, 0),
        (w - f.h - 10, 0.86 * f.C, 330),
        tension=1.0,
    )
    return ink(round_ring(w / 2, cy, rx, ry), arm)


def seven(f: Frame) -> Drawing:
    w = f.w(470)
    top = flush(f, w, f.C, (w * 0.30, 0), True)
    bottom = flush(f, 0, 0, (top, f.C), False) + 0.30 * w
    return ink(hbar(f.ct, 0, w), diagonal(f, (top, f.C), (bottom, 0)))


def eight(f: Frame) -> Drawing:
    w = f.w(500)
    ym = 0.535 * f.C
    ru = (f.ct_r - ym) / 2
    rl = (ym - f.lo_r) / 2
    return ink(
        round_ring(w / 2, ym + ru, (w * 0.90 - 2 * f.h) / 2, ru),
        round_ring(w / 2, ym - rl, (w - 2 * f.h) / 2, rl),
    )


def nine(f: Frame) -> Drawing:
    return turn(six(f), f.w(500) / 2, (f.ct_r + f.lo_r) / 2)


DIGITS: list[tuple[str, int, Callable[[Frame], Drawing]]] = [
    ("zero", 0x30, zero),
    ("one", 0x31, one),
    ("two", 0x32, two),
    ("three", 0x33, three),
    ("four", 0x34, four),
    ("five", 0x35, five),
    ("six", 0x36, six),
    ("seven", 0x37, seven),
    ("eight", 0x38, eight),
    ("nine", 0x39, nine),
]

for name, codepoint, draw in DIGITS:
    GLYPHS[name] = GlyphSpec(name, (codepoint,), draw, zone="fig")
    GLYPHS[f"{name}.tf"] = GlyphSpec(f"{name}.tf", (), draw, advance=TABULAR_ADVANCE)

GLYPHS["zero.zero"] = GlyphSpec("zero.zero", (), zero_slashed, zone="fig")
GLYPHS["zero.tf.zero"] = GlyphSpec("zero.tf.zero", (), zero_slashed, advance=TABULAR_ADVANCE)
