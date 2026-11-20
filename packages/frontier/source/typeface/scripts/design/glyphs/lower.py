from scripts.design.glyph import Drawing, Frame, at, glyph, ink
from scripts.design.glyphs.shapes import (
    diagonal,
    flush,
    hbar,
    heading,
    on_ellipse,
    round_ring,
    vstem,
)
from scripts.design.stroke import Pen


def bowl(f: Frame, w: float) -> Pen:
    return round_ring(w / 2, (f.xt_r + f.lo_r) / 2, w / 2 - f.h, (f.xt_r - f.lo_r) / 2)


def arch(f: Frame, x0: float, x1: float) -> Pen:
    rx = (x1 - x0) / 2
    ry = rx * 0.94
    cy = f.xt_r - ry
    return Pen(x0, cy).arc((x0 + x1) / 2, cy, rx, ry, 180, 0).line(x1, 0)


@glyph("o", 0x6F, zone="x")
def o(f: Frame) -> Drawing:
    return ink(bowl(f, f.w(500)))


def terminal_arc(f: Frame, w: float, top: float, bottom: float, angle: float) -> Pen:
    cx, cy, rx, ry = w / 2, (top + bottom) / 2, w / 2 - f.h, (top - bottom) / 2
    a, b = on_ellipse(cx, cy, rx, ry, angle), on_ellipse(cx, cy, rx, ry, -angle)
    return Pen(0, 0).through(
        (a[0], a[1], 90 + angle),
        (cx, cy + ry, 180),
        (cx - rx, cy, 270),
        (cx, cy - ry, 0),
        (b[0], b[1], 90 - angle),
        tension=1.08,
    )


@glyph("c", 0x63, zone="x")
def c(f: Frame) -> Drawing:
    return ink(terminal_arc(f, f.w(470), f.xt_r, f.lo_r, 40))


@glyph("e", 0x65, zone="x")
def e(f: Frame) -> Drawing:
    w = f.w(500)
    cx, cy, rx, ry = w / 2, (f.xt_r + f.lo_r) / 2, w / 2 - f.h, (f.xt_r - f.lo_r) / 2
    end = on_ellipse(cx, cy, rx, ry, -42)
    stroke = Pen(cx + rx, cy).through(
        (cx + rx, cy, 90),
        (cx, cy + ry, 180),
        (cx - rx, cy, 270),
        (cx, cy - ry, 0),
        (end[0], end[1], 48),
        tension=1.08,
    )
    return ink(stroke, hbar(cy, f.h, w))


def double_storey_a(f: Frame, w: float) -> Drawing:
    right = w - f.h
    left = f.h + 0.04 * w
    cx = (left + right) / 2
    arch_stroke = Pen(left, 0.76 * f.X).through(
        (left, 0.76 * f.X, 62),
        (cx, f.xt_r, 0),
        (right, 0.62 * f.X, 270),
        tension=1.05,
    ).line(right, 0)
    top = 0.56 * f.X
    ry = (top - f.lo) / 2
    cyb = f.lo + ry
    rxb = (right - f.h) / 2
    cxb = (right + f.h) / 2
    bowl_stroke = Pen(right, top).line(cxb, top).arc(cxb, cyb, rxb, ry, 90, 270).line(right, f.lo)
    return ink(arch_stroke, bowl_stroke)


@glyph("a", 0x61, zone="x")
def a(f: Frame) -> Drawing:
    return double_storey_a(f, f.w(470))


@glyph("a.ss01", zone="x")
def a_single(f: Frame) -> Drawing:
    w = f.w(480)
    return ink(bowl(f, w), vstem(w - f.h, f.X, 0))


@glyph("b", 0x62, zone="x")
def b(f: Frame) -> Drawing:
    return ink(bowl(f, f.w(490)), vstem(f.h, f.A, 0))


@glyph("d", 0x64, zone="x")
def d(f: Frame) -> Drawing:
    w = f.w(490)
    return ink(bowl(f, w), vstem(w - f.h, f.A, 0))


@glyph("p", 0x70, zone="x")
def p(f: Frame) -> Drawing:
    return ink(bowl(f, f.w(490)), vstem(f.h, f.X, -f.D))


@glyph("q", 0x71, zone="x")
def q(f: Frame) -> Drawing:
    w = f.w(490)
    return ink(bowl(f, w), vstem(w - f.h, f.X, -f.D))


def descender_hook(f: Frame, x: float, top: float, reach: float) -> Pen:
    ry = 108
    cy = -f.D + f.hh + ry
    rx = reach / 2
    return Pen(x, top).line(x, cy).arc(x - rx, cy, rx, ry, 0, -150).cut("perp", "perp")


@glyph("g", 0x67, zone="x")
def g(f: Frame) -> Drawing:
    w = f.w(480)
    return ink(bowl(f, w), descender_hook(f, w - f.h, f.X, w * 0.78))


@glyph("n", 0x6E, zone="x")
def n(f: Frame) -> Drawing:
    w = f.w(440)
    return ink(vstem(f.h, f.X, 0), arch(f, f.h, w - f.h))


@glyph("h", 0x68, zone="x")
def h(f: Frame) -> Drawing:
    w = f.w(440)
    return ink(vstem(f.h, f.A, 0), arch(f, f.h, w - f.h))


@glyph("m", 0x6D, zone="x")
def m(f: Frame) -> Drawing:
    w = f.w(680)
    mid = w / 2
    return ink(vstem(f.h, f.X, 0), arch(f, f.h, mid), arch(f, mid, w - f.h))


@glyph("u", 0x75, zone="x")
def u(f: Frame) -> Drawing:
    w = f.w(440)
    rx = (w - 2 * f.h) / 2
    ry = rx * 0.94
    cy = f.lo_r + ry
    left = Pen(f.h, f.X).line(f.h, cy).arc(w / 2, cy, rx, ry, 180, 360)
    return ink(left, vstem(w - f.h, f.X, 0))


@glyph("r", 0x72, zone="x")
def r(f: Frame) -> Drawing:
    rx = f.w(165)
    ry = rx * 0.9
    cy = f.xt_r - ry
    return ink(vstem(f.h, f.X, 0), Pen(f.h, cy).arc(f.h + rx, cy, rx, ry, 180, 52))


def s_curve(f: Frame, w: float, top: float, bottom: float, lean: float = 0.0) -> Pen:
    cx = w / 2
    rx = (w - 2 * f.h) / 2
    ry = (top - bottom) / 4.309
    upper = (cx, top - ry)
    lower = (cx, bottom + ry)
    spine_start = on_ellipse(upper[0], upper[1], rx, ry, 240)
    spine_end = on_ellipse(lower[0], lower[1], rx, ry, 60)
    return (
        at(upper[0], upper[1], rx, ry, 26)
        .arc(upper[0], upper[1], rx, ry, 26, 240)
        .line(*spine_end)
        .arc(lower[0], lower[1], rx, ry, 60, -154)
    ) if spine_start else Pen(0, 0)


@glyph("s", 0x73, zone="x")
def s(f: Frame) -> Drawing:
    return ink(s_curve(f, f.w(420), f.xt_r, f.lo_r))


@glyph("t", 0x74, zone="x")
def t(f: Frame) -> Drawing:
    w = f.w(340)
    xs = 0.42 * w
    rf = 120
    stem = Pen(xs, 668).line(xs, f.lo_r + rf).arc(xs + rf, f.lo_r + rf, rf, rf, 180, 285).cut("perp", "v")
    return ink(stem, hbar(f.xt, 0, w))


def f_body(f: Frame, w: float, bar: bool) -> Drawing:
    xs = 0.34 * w
    rf = 118
    top = f.A + 10 - f.hh
    stem = Pen(xs, 0).line(xs, top - rf).arc(xs + rf, top - rf, rf, rf, 180, 55).cut("perp", "v")
    parts = [stem]
    if bar:
        parts.append(hbar(f.xt, 0, xs + 0.5 * w))
    return ink(*parts)


@glyph("f", 0x66, zone="x")
def f_(f: Frame) -> Drawing:
    return f_body(f, f.w(340), True)


@glyph("longs", 0x17F, zone="x")
def longs(f: Frame) -> Drawing:
    return f_body(f, f.w(340), False)


def dot_radius(f: Frame) -> float:
    return f.h * 1.14


def dot_y(f: Frame) -> float:
    return f.C + 4 - dot_radius(f)


@glyph("dotlessi", 0x131, zone="x")
def dotlessi(f: Frame) -> Drawing:
    return ink(vstem(f.h, f.X, 0))


@glyph("i", 0x69, zone="x")
def i(f: Frame) -> Drawing:
    return ink(vstem(f.h, f.X, 0), (f.h, dot_y(f), dot_radius(f)))


def j_hook(f: Frame, top: float) -> Pen:
    x = 220.0
    ry = 100
    cy = -f.D + f.hh + ry
    return Pen(x, top).line(x, cy).arc(x - 112, cy, 112, ry, 0, -150).cut("perp", "perp")


@glyph("jdotless", 0x237, sb=(10, 62))
def jdotless(f: Frame) -> Drawing:
    return ink(j_hook(f, f.X))


@glyph("j", 0x6A, sb=(10, 62))
def j(f: Frame) -> Drawing:
    return ink(j_hook(f, f.X), (220, dot_y(f), dot_radius(f)))


@glyph("l", 0x6C, zone="x")
def l(f: Frame) -> Drawing:
    return ink(vstem(f.h, f.A, 0))


def k_strokes(f: Frame, w: float, top: float) -> list[Pen]:
    y1 = 0.30 * f.X
    x_top = flush(f, w, top, (f.h, y1), True)
    t0 = 0.45
    jx = f.h + t0 * (x_top - f.h)
    jy = y1 + t0 * (top - y1)
    x_foot = flush(f, w, 0, (jx, jy), True)
    return [
        diagonal(f, (x_top, top), (f.h, y1), ("h", "v")),
        diagonal(f, (jx, jy), (x_foot, 0), (heading((x_top, top), (f.h, y1)), "h")),
    ]


@glyph("k", 0x6B, zone="x")
def k(f: Frame) -> Drawing:
    return ink(vstem(f.h, f.A, 0), *k_strokes(f, f.w(450), f.X))


@glyph("kgreenlandic", 0x138, zone="x")
def kgreenlandic(f: Frame) -> Drawing:
    return ink(vstem(f.h, f.X, 0), *k_strokes(f, f.w(450), f.X))


def vee(f: Frame, w: float, top: float, bottom: float = 0) -> list[Pen]:
    mid = w / 2
    left = flush(f, 0, top, (mid, bottom), False)
    right = flush(f, w, top, (mid, bottom), True)
    return [diagonal(f, (left, top), (mid, bottom)), diagonal(f, (mid, bottom), (right, top))]


@glyph("v", 0x76, zone="x")
def v(f: Frame) -> Drawing:
    return ink(*vee(f, f.w(480), f.X))


@glyph("w", 0x77, zone="x")
def w(f: Frame) -> Drawing:
    width = f.w(740)
    q1, q2, q3 = width * 0.25, width * 0.5, width * 0.75
    left = flush(f, 0, f.X, (q1, 0), False)
    right = flush(f, width, f.X, (q3, 0), True)
    return ink(
        diagonal(f, (left, f.X), (q1, 0)),
        diagonal(f, (q1, 0), (q2, f.X)),
        diagonal(f, (q2, f.X), (q3, 0)),
        diagonal(f, (q3, 0), (right, f.X)),
    )


def cross(f: Frame, width: float, top: float) -> list[Pen]:
    a = flush(f, 0, top, (width, 0), False)
    b = flush(f, width, 0, (0, top), True)
    c_ = flush(f, 0, 0, (width, top), False)
    d_ = flush(f, width, top, (0, 0), True)
    return [diagonal(f, (a, top), (b, 0)), diagonal(f, (c_, 0), (d_, top))]


@glyph("x", 0x78, zone="x")
def x(f: Frame) -> Drawing:
    return ink(*cross(f, f.w(470), f.X))


@glyph("y", 0x79, zone="x")
def y(f: Frame) -> Drawing:
    width = f.w(480)
    right = flush(f, width, f.X, (width * 0.5, 40), True)
    jx, jy = width * 0.47, 30
    scale = (-f.D - f.X) / (jy - f.X)
    tail = (right + (jx - right) * scale, -f.D)
    left = flush(f, 0, f.X, (jx, jy), False)
    return ink(
        diagonal(f, (left, f.X), (jx, jy), ("h", heading((right, f.X), tail))),
        diagonal(f, (right, f.X), tail),
    )


@glyph("z", 0x7A, zone="x")
def z(f: Frame) -> Drawing:
    width = f.w(430)
    top = flush(f, width, f.X, (0, 0), True)
    bottom = flush(f, 0, 0, (width, f.X), False)
    return ink(hbar(f.xt, 0, width), diagonal(f, (top, f.X), (bottom, 0)), hbar(f.lo, 0, width))


