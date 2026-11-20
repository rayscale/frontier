import math
from collections.abc import Callable

from scripts.design.glyph import GLYPHS, Drawing, Frame, GlyphSpec, at, ink, turn
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
    return ink(round_ring(w / 2, (f.ct_r + f.lo_r) / 2, w / 2 - f.h, (f.ct_r - f.lo_r) / 2))


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
    r = (w - 2 * f.h) / 2
    cx, cy = w / 2, f.ct_r - r
    end_angle = -38
    end = on_ellipse(cx, cy, r, r, end_angle)
    tangent = (math.sin(math.radians(end_angle)), -math.cos(math.radians(end_angle)))
    bottom_x = end[0] + tangent[0] * (end[1] - f.lo) / -tangent[1]
    stroke = at(cx, cy, r, r, 162).arc(cx, cy, r, r, 162, end_angle).line(bottom_x, f.lo)
    return ink(stroke, hbar(f.lo, 0, w))


def three(f: Frame) -> Drawing:
    ym = 0.545 * f.C
    r_lower = (ym - f.lo_r) / 2
    r_upper = (f.ct_r - ym) / 2
    w = 2 * r_lower + 2 * f.h
    cx_lower = w / 2
    cx_upper = cx_lower + (r_lower - r_upper) * 0.5
    tick = cx_lower - r_lower * 0.3
    upper = (
        at(cx_upper, ym + r_upper, r_upper, r_upper, 155)
        .arc(cx_upper, ym + r_upper, r_upper, r_upper, 155, -90)
        .line(tick, ym)
    )
    lower = Pen(tick, ym).line(cx_lower, ym).arc(cx_lower, ym - r_lower, r_lower, r_lower, 90, -150)
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
    r = (w - 2 * f.h) / 2
    cx, cy = w / 2, f.lo_r + r
    start = on_ellipse(cx, cy, r, r, 140)
    bowl = at(cx, cy, r, r, 140).arc(cx, cy, r, r, 140, -150)
    return ink(hbar(f.ct, start[0], w - f.h), vstem(start[0], f.C, start[1]).cut("perp", 140), bowl)


def six(f: Frame) -> Drawing:
    w = f.w(480)
    r = (w - 2 * f.h) / 2
    cx, cy = w / 2, f.lo_r + r
    angle = 155
    start = on_ellipse(cx, cy, r, r, angle)
    direction = (math.sin(math.radians(angle)), -math.cos(math.radians(angle)))
    top_x = start[0] + direction[0] * (f.C - start[1]) / direction[1]
    return ink(round_ring(cx, cy, r, r), diagonal(f, (start[0], start[1]), (top_x, f.C), ("perp", "h")))


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
    return turn(six(f), f.w(480) / 2, (f.ct_r + f.lo_r) / 2)


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
