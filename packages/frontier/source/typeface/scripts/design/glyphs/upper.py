from scripts.design.glyph import Drawing, Frame, at, glyph, ink
from scripts.design.glyphs.lower import s_curve, s_width, terminal_arc
from scripts.design.glyphs.shapes import (
    diagonal,
    flush,
    hbar,
    heading,
    round_ring,
    round_width,
    vstem,
)
from scripts.design.stroke import Pen


def cap_round(f: Frame) -> float:
    return round_width(f, f.ct_r, f.lo_r)


def cap_ring(f: Frame, w: float) -> Pen:
    return round_ring(w / 2, (f.ct_r + f.lo_r) / 2, w / 2 - f.h, (f.ct_r - f.lo_r) / 2)


def cap_bowl(f: Frame, right: float, top: float, bottom: float) -> Pen:
    ry = (top - bottom) / 2
    rx = min(ry, right - f.h - 30)
    xb = right - rx
    return Pen(f.h, top).line(xb, top).arc(xb, (top + bottom) / 2, rx, ry, 90, -90).line(f.h, bottom)


def stem(f: Frame, x: float | None = None) -> Pen:
    return vstem(f.h if x is None else x, f.C, 0)


@glyph("A", 0x41, zone="cap")
def A(f: Frame) -> Drawing:
    w = f.w(620)
    mid = w / 2
    left = flush(f, 0, 0, (mid, f.C), False)
    right = flush(f, w, 0, (mid, f.C), True)
    y = 0.28 * f.C
    t = y / f.C
    xl = left + (mid - left) * t
    xr = right + (mid - right) * t
    return ink(
        diagonal(f, (left, 0), (mid, f.C)),
        diagonal(f, (mid, f.C), (right, 0)),
        hbar(y, xl, xr),
    )


@glyph("B", 0x42, zone="cap")
def B(f: Frame) -> Drawing:
    w = f.w(500)
    ym = 0.53 * f.C
    return ink(stem(f), cap_bowl(f, w * 0.93 - f.h, f.ct, ym), cap_bowl(f, w - f.h, ym, f.lo))


@glyph("C", 0x43, zone="cap")
def C(f: Frame) -> Drawing:
    return ink(terminal_arc(f, cap_round(f), f.ct_r, f.lo_r, 45))


@glyph("D", 0x44, zone="cap")
def D(f: Frame) -> Drawing:
    ym, r = (f.ct + f.lo) / 2, (f.ct - f.lo) / 2
    xd = f.h + 0.18 * f.C
    return ink(stem(f), Pen(f.h, f.ct).line(xd, f.ct).arc(xd, ym, r, r, 90, -90).line(f.h, f.lo))


@glyph("E", 0x45, zone="cap")
def E(f: Frame) -> Drawing:
    w = f.w(440)
    ym = f.C / 2
    return ink(stem(f), hbar(f.ct, 0, w), hbar(ym, 0, w - 30), hbar(f.lo, 0, w))


@glyph("F", 0x46, zone="cap")
def F(f: Frame) -> Drawing:
    w = f.w(420)
    return ink(stem(f), hbar(f.ct, 0, w), hbar(f.C / 2, 0, w - 30))


@glyph("G", 0x47, zone="cap")
def G(f: Frame) -> Drawing:
    w = cap_round(f)
    cx, cy, r = w / 2, (f.ct_r + f.lo_r) / 2, (f.ct_r - f.lo_r) / 2
    arc = at(cx, cy, r, r, 45).arc(cx, cy, r, r, 45, 360)
    return ink(arc, hbar(cy, w * 0.55, w))


@glyph("H", 0x48, zone="cap")
def H(f: Frame) -> Drawing:
    w = f.w(560)
    return ink(stem(f), stem(f, w - f.h), hbar(f.C / 2, f.h, w - f.h))


@glyph("I", 0x49, zone="cap")
def I(f: Frame) -> Drawing:
    return ink(stem(f))


@glyph("J", 0x4A, sb=(24, 70))
def J(f: Frame) -> Drawing:
    w = f.w(380)
    r = 130
    cy = f.lo_r + r
    return ink(Pen(w - f.h, f.C).line(w - f.h, cy).arc(w - f.h - r, cy, r, r, 0, -150).cut("perp", "perp"))


def kdiag(f: Frame, w: float, top: float, y1: float) -> list[Pen]:
    x_top = flush(f, w, top, (f.h, y1), True)
    t0 = 0.5
    jx = f.h + t0 * (x_top - f.h)
    jy = y1 + t0 * (top - y1)
    x_foot = flush(f, w, 0, (jx, jy), True)
    return [
        diagonal(f, (x_top, top), (f.h, y1), ("h", "v")),
        diagonal(f, (jx, jy), (x_foot, 0), (heading((x_top, top), (f.h, y1)), "h")),
    ]


@glyph("K", 0x4B, zone="cap")
def K(f: Frame) -> Drawing:
    return ink(stem(f), *kdiag(f, f.w(540), f.C, 0.38 * f.C))


@glyph("L", 0x4C, zone="cap")
def L(f: Frame) -> Drawing:
    w = f.w(420)
    return ink(stem(f), hbar(f.lo, 0, w))


@glyph("M", 0x4D, zone="cap")
def M(f: Frame) -> Drawing:
    w = f.w(740)
    mid = w / 2
    left = flush(f, 0, f.C, (mid, 0), False)
    right = flush(f, w, f.C, (mid, 0), True)
    return ink(
        stem(f),
        stem(f, w - f.h),
        diagonal(f, (left, f.C), (mid, 0)),
        diagonal(f, (mid, 0), (right, f.C)),
    )


@glyph("N", 0x4E, zone="cap")
def N(f: Frame) -> Drawing:
    w = f.w(590)
    a = flush(f, 0, f.C, (w, 0), False)
    b = flush(f, w, 0, (0, f.C), True)
    return ink(stem(f), stem(f, w - f.h), diagonal(f, (a, f.C), (b, 0)))


@glyph("O", 0x4F, zone="cap")
def O(f: Frame) -> Drawing:
    return ink(cap_ring(f, cap_round(f)))


@glyph("P", 0x50, zone="cap")
def P(f: Frame) -> Drawing:
    w = f.w(500)
    return ink(stem(f), cap_bowl(f, w - f.h, f.ct, 0.40 * f.C))


@glyph("Q", 0x51, zone="cap")
def Q(f: Frame) -> Drawing:
    w = cap_round(f)
    return ink(cap_ring(f, w), diagonal(f, (w * 0.58, 0.26 * f.C), (w * 0.88, -30), ("perp", "h")))


@glyph("R", 0x52, zone="cap")
def R(f: Frame) -> Drawing:
    w = f.w(510)
    ym = 0.40 * f.C
    foot = flush(f, w, 0, (w * 0.5, ym), True)
    return ink(stem(f), cap_bowl(f, w - f.h, f.ct, ym), diagonal(f, (w * 0.46, ym), (foot, 0), ("h", "h")))


@glyph("S", 0x53, zone="cap")
def S(f: Frame) -> Drawing:
    return ink(s_curve(f, s_width(f, f.ct_r, f.lo_r), f.ct_r, f.lo_r))


@glyph("T", 0x54, zone="cap")
def T(f: Frame) -> Drawing:
    w = f.w(520)
    return ink(hbar(f.ct, 0, w), vstem(w / 2, f.ct, 0))


@glyph("U", 0x55, zone="cap")
def U(f: Frame) -> Drawing:
    w = f.w(580)
    rx = (w - 2 * f.h) / 2
    cy = f.lo_r + rx
    return ink(Pen(f.h, f.C).line(f.h, cy).arc(w / 2, cy, rx, rx, 180, 360).line(w - f.h, f.C))


@glyph("V", 0x56, zone="cap")
def V(f: Frame) -> Drawing:
    w = f.w(620)
    mid = w / 2
    left = flush(f, 0, f.C, (mid, 0), False)
    right = flush(f, w, f.C, (mid, 0), True)
    return ink(diagonal(f, (left, f.C), (mid, 0)), diagonal(f, (mid, 0), (right, f.C)))


@glyph("W", 0x57, zone="cap")
def W(f: Frame) -> Drawing:
    w = f.w(900)
    q1, q2, q3 = w * 0.25, w * 0.5, w * 0.75
    left = flush(f, 0, f.C, (q1, 0), False)
    right = flush(f, w, f.C, (q3, 0), True)
    return ink(
        diagonal(f, (left, f.C), (q1, 0)),
        diagonal(f, (q1, 0), (q2, f.C)),
        diagonal(f, (q2, f.C), (q3, 0)),
        diagonal(f, (q3, 0), (right, f.C)),
    )


@glyph("X", 0x58, zone="cap")
def X(f: Frame) -> Drawing:
    w = f.w(580)
    a = flush(f, 0, f.C, (w, 0), False)
    b = flush(f, w, 0, (0, f.C), True)
    c = flush(f, 0, 0, (w, f.C), False)
    d = flush(f, w, f.C, (0, 0), True)
    return ink(diagonal(f, (a, f.C), (b, 0)), diagonal(f, (c, 0), (d, f.C)))


@glyph("Y", 0x59, zone="cap")
def Y(f: Frame) -> Drawing:
    w = f.w(600)
    jy = 0.40 * f.C
    left = flush(f, 0, f.C, (w / 2, jy), False)
    right = flush(f, w, f.C, (w / 2, jy), True)
    return ink(
        diagonal(f, (left, f.C), (w / 2, jy), ("h", "v")),
        diagonal(f, (right, f.C), (w / 2, jy), ("h", "v")),
        vstem(w / 2, jy, 0),
    )


@glyph("Z", 0x5A, zone="cap")
def Z(f: Frame) -> Drawing:
    w = f.w(540)
    top = flush(f, w, f.C, (0, 0), True)
    bottom = flush(f, 0, 0, (w, f.C), False)
    return ink(hbar(f.ct, 0, w), diagonal(f, (top, f.C), (bottom, 0)), hbar(f.lo, 0, w))
