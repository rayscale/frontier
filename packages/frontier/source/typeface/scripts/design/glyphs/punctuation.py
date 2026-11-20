import math

from scripts.design.glyph import GLYPHS, Drawing, Frame, GlyphSpec, at, ink, shift, turn
from scripts.design.glyphs.lower import s_curve
from scripts.design.glyphs.shapes import diagonal, hbar, on_ellipse, round_ring, vstem
from scripts.design.stroke import Pen

MATH_AXIS = 280.0
MATH_ADVANCE = 540


def dot_r(f: Frame) -> float:
    return f.h * 1.16


def register(
    name: str,
    draw,
    *codepoints: int,
    sb: tuple[float, float] = (60, 60),
    advance: float | None = None,
) -> None:
    GLYPHS[name] = GlyphSpec(name, tuple(codepoints), draw, sb if advance is None else None, advance)


def comma_tail(f: Frame, cx: float, cy: float) -> Drawing:
    r = dot_r(f)
    return ink((cx, cy, r), Pen(cx + r * 0.55, cy - r * 0.2).line(cx - r * 0.35, cy - 125).weight(0.95).cut("h", "h"))


def period(f: Frame) -> Drawing:
    return ink((dot_r(f), dot_r(f), dot_r(f)))


def comma(f: Frame) -> Drawing:
    return comma_tail(f, dot_r(f), dot_r(f))


def colon(f: Frame) -> Drawing:
    r = dot_r(f)
    return ink((r, r, r), (r, f.X - r, r))


def semicolon(f: Frame) -> Drawing:
    r = dot_r(f)
    return ink((r, f.X - r, r)) + comma_tail(f, r, r)


def exclam(f: Frame) -> Drawing:
    r = dot_r(f)
    return ink(vstem(r, f.C, 250), (r, r, r))


def question(f: Frame) -> Drawing:
    w = f.w(420)
    r = dot_r(f)
    cx = w / 2
    rx = (w - 2 * f.h) / 2
    bottom = 0.50 * f.C
    ry = (f.ct_r - bottom) / 2
    cy = f.ct_r - ry
    end = on_ellipse(cx, cy, rx, ry, -38)
    stem_x = end[0] - 34
    mark = (
        at(cx, cy, rx, ry, 162)
        .arc(cx, cy, rx, ry, 162, -38)
        .through((end[0], end[1], 232), (stem_x, end[1] - 95, 270), tension=1.0)
        .line(stem_x, 255)
    )
    return ink(mark, (stem_x, r, r))


def quotesingle(f: Frame) -> Drawing:
    return ink(Pen(f.h, f.C).line(f.h, f.C - 220).weight(0.95))


def quotedbl(f: Frame) -> Drawing:
    return ink(
        Pen(f.h, f.C).line(f.h, f.C - 220).weight(0.95),
        Pen(f.h + 150, f.C).line(f.h + 150, f.C - 220).weight(0.95),
    )


def quote_comma(f: Frame, double: bool, down: bool) -> Drawing:
    r = dot_r(f)
    top = f.C - r - 4
    one = comma_tail(f, r, top)
    if down:
        one = turn(one, r, top - 40)
    return one + shift(one, 2 * r + 56, 0) if double else one


def lowquote(f: Frame, double: bool) -> Drawing:
    r = dot_r(f)
    one = comma_tail(f, r, r + 10)
    return one + shift(one, 2 * r + 56, 0) if double else one


def paren(f: Frame, left: bool) -> Drawing:
    top, bottom = f.A - 8, -f.D + 20
    mid = (top + bottom) / 2
    pen = Pen(0, 0).through((300, top, 244), (170, mid, 270), (300, bottom, 296), tension=1.0).cut("h", "h")
    drawing = ink(pen)
    return drawing if left else turn(drawing, 235, mid)


def bracket(f: Frame, left: bool) -> Drawing:
    top, bottom, w = f.A - 8, -f.D + 20, f.w(230)
    drawing = ink(Pen(w - f.h, top).line(f.h, top).line(f.h, bottom).line(w - f.h, bottom))
    return drawing if left else turn(drawing, w / 2, (top + bottom) / 2)


def brace(f: Frame, left: bool) -> Drawing:
    top, bottom = f.A - 8, -f.D + 20
    mid = (top + bottom) / 2
    x = 150
    upper = Pen(0, 0).through(
        (x + 90, top, 190),
        (x, top - 80, 270),
        (x, mid + 100, 270),
        (x - 80, mid, 180),
        tension=1.0,
    )
    lower = Pen(0, 0).through(
        (x - 80, mid, 0),
        (x, mid - 100, 270),
        (x, bottom + 80, 270),
        (x + 90, bottom, 350),
        tension=1.0,
    )
    drawing = ink(upper.weight(0.9), lower.weight(0.9))
    return drawing if left else turn(drawing, x, mid)


def slash(f: Frame) -> Drawing:
    return ink(diagonal(f, (330 - 30, f.A - 8), (30, -f.D + 20)))


def backslash(f: Frame) -> Drawing:
    return ink(diagonal(f, (30, f.A - 8), (330 - 30, -f.D + 20)))


def bar(f: Frame) -> Drawing:
    return ink(vstem(f.h, f.A - 8, -f.D + 20))


def dash(length: float):
    def draw(f: Frame) -> Drawing:
        return ink(hbar(0.46 * f.X, 0, length))

    return draw


def underscore(f: Frame) -> Drawing:
    return ink(hbar(-f.hh - 24, 0, 560))


def plus(f: Frame) -> Drawing:
    half = 200
    return ink(hbar(MATH_AXIS, 0, 2 * half), vstem(half, MATH_AXIS - half, MATH_AXIS + half))


def minus(f: Frame) -> Drawing:
    return ink(hbar(MATH_AXIS, 0, 400))


def equal(f: Frame) -> Drawing:
    return ink(hbar(MATH_AXIS + 70, 0, 400), hbar(MATH_AXIS - 70, 0, 400))


def less(f: Frame) -> Drawing:
    return ink(Pen(400 - f.h, MATH_AXIS + 150).line(f.h + 10, MATH_AXIS).line(400 - f.h, MATH_AXIS - 150))


def greater(f: Frame) -> Drawing:
    return turn(less(f), 200, MATH_AXIS)


def asterisk(f: Frame) -> Drawing:
    cx, cy, r = 150.0, f.C - 160, 150
    arms = []
    for angle in (90, 162, 234, 306, 18):
        dx, dy = r * math.cos(math.radians(angle)), r * math.sin(math.radians(angle))
        arms.append(Pen(cx, cy).line(cx + dx, cy + dy).weight(0.72))
    return ink(*arms)


def numbersign(f: Frame) -> Drawing:
    w = 560
    return ink(
        diagonal(f, (w * 0.42, f.C - 40), (w * 0.28, 40)),
        diagonal(f, (w * 0.74, f.C - 40), (w * 0.60, 40)),
        hbar(0.62 * f.C, 10, w - 10),
        hbar(0.34 * f.C, 0, w - 20),
    )


def dollar(f: Frame) -> Drawing:
    w = f.w(460)
    return ink(s_curve(f, w, f.ct - 50, f.lo + 50), vstem(w / 2, f.C + 20, -20))


def percent(f: Frame) -> Drawing:
    w = 780
    rx, ry = 100, 128
    return ink(
        round_ring(rx + 20, f.C - ry - 6, rx, ry),
        round_ring(w - rx - 20, ry + 6, rx, ry),
        diagonal(f, (w - 90, f.C), (90, 0)),
    )


def ampersand(f: Frame) -> Drawing:
    w = f.w(620)
    upper = round_ring(w * 0.37, f.C - 0.215 * f.C, 0.19 * w, 0.215 * f.C)
    lower = Pen(0, 0).through(
        (w * 0.40, 0.55 * f.C, 235),
        (f.h + 4, 0.28 * f.C, 270),
        (w * 0.40, f.lo_r, 0),
        (w * 0.72, 0.17 * f.C, 60),
        (w - f.h, 0.34 * f.C, 90),
        tension=1.0,
    )
    return ink(upper, lower, diagonal(f, (w * 0.38, 0.55 * f.C), (w - 20, 0), ("perp", "h")))


def at_sign(f: Frame) -> Drawing:
    cx, cy, rr, ri = 350.0, 280.0, 340.0, 128.0
    return ink(
        round_ring(cx, cy, ri, ri * 1.02).weight(0.82),
        vstem(cx + ri, cy + ri * 0.95, cy - ri * 1.1).weight(0.82),
        Pen(cx + rr * math.cos(math.radians(10)), cy + rr * math.sin(math.radians(10)))
        .arc(cx, cy, rr, rr * 0.98, 10, 318)
        .weight(0.8),
    )


def asciicircum(f: Frame) -> Drawing:
    return ink(Pen(f.h, f.C - 190).line(200, f.C - 20).line(400 - f.h, f.C - 190))


def asciitilde(f: Frame) -> Drawing:
    y = MATH_AXIS
    return ink(
        Pen(0, 0)
        .through((20, y - 34, 55), (150, y + 38, 0), (290, y - 38, 0), (420, y + 34, 55), tension=1.0)
        .weight(0.86)
    )


register("period", period, 0x2E, sb=(66, 66))
register("comma", comma, 0x2C, sb=(66, 66))
register("colon", colon, 0x3A, sb=(66, 66))
register("semicolon", semicolon, 0x3B, sb=(66, 66))
register("exclam", exclam, 0x21, sb=(66, 66))
register("question", question, 0x3F, sb=(36, 36))
register("quotesingle", quotesingle, 0x27, sb=(60, 60))
register("quotedbl", quotedbl, 0x22, sb=(60, 60))
register("quoteleft", lambda f: quote_comma(f, False, True), 0x2018)
register("quoteright", lambda f: quote_comma(f, False, False), 0x2019)
register("quotedblleft", lambda f: quote_comma(f, True, True), 0x201C)
register("quotedblright", lambda f: quote_comma(f, True, False), 0x201D)
register("quotesinglbase", lambda f: lowquote(f, False), 0x201A)
register("quotedblbase", lambda f: lowquote(f, True), 0x201E)
register("parenleft", lambda f: paren(f, True), 0x28, sb=(70, 50))
register("parenright", lambda f: paren(f, False), 0x29, sb=(50, 70))
register("bracketleft", lambda f: bracket(f, True), 0x5B, sb=(70, 50))
register("bracketright", lambda f: bracket(f, False), 0x5D, sb=(50, 70))
register("braceleft", lambda f: brace(f, True), 0x7B, sb=(70, 50))
register("braceright", lambda f: brace(f, False), 0x7D, sb=(50, 70))
register("slash", slash, 0x2F, sb=(10, 10))
register("backslash", backslash, 0x5C, sb=(10, 10))
register("bar", bar, 0x7C, sb=(60, 60))
register("underscore", underscore, 0x5F, sb=(0, 0))
register("plus", plus, 0x2B, advance=MATH_ADVANCE)
register("minus", minus, 0x2212, advance=MATH_ADVANCE)
register("equal", equal, 0x3D, advance=MATH_ADVANCE)
register("less", less, 0x3C, advance=MATH_ADVANCE)
register("greater", greater, 0x3E, advance=MATH_ADVANCE)
register("asterisk", asterisk, 0x2A, sb=(50, 50))
register("numbersign", numbersign, 0x23, sb=(40, 40))
register("dollar", dollar, 0x24, sb=(40, 40))
register("percent", percent, 0x25, sb=(40, 40))
register("ampersand", ampersand, 0x26, sb=(40, 40))
register("at", at_sign, 0x40, sb=(40, 40))
register("asciicircum", asciicircum, 0x5E, advance=480)
register("asciitilde", asciitilde, 0x7E, advance=MATH_ADVANCE)
register("hyphen", dash(290), 0x2D, 0xAD, sb=(60, 60))
register("endash", dash(500), 0x2013, sb=(40, 40))
register("emdash", dash(880), 0x2014, sb=(40, 40))
GLYPHS["space"] = GlyphSpec("space", (0x20, 0xA0), None, advance=250)

