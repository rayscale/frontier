from scripts.design.glyph import (
    GLYPHS,
    Drawing,
    Frame,
    GlyphSpec,
    flip_x,
    ink,
    scaled,
    turn,
)
from scripts.design.glyphs import lower, upper
from scripts.design.glyphs.punctuation import MATH_ADVANCE, MATH_AXIS, dot_r
from scripts.design.glyphs.shapes import diagonal, hbar, round_ring, vstem
from scripts.design.stroke import Pen


def register(name: str, draw, *codepoints: int, sb: tuple[float, float] = (50, 50)) -> None:
    GLYPHS[name] = GlyphSpec(name, tuple(codepoints), draw, sb)


def register_math(name: str, draw, *codepoints: int) -> None:
    GLYPHS[name] = GlyphSpec(name, tuple(codepoints), draw, advance=MATH_ADVANCE)


def spec_draw(name: str):
    return GLYPHS[name].draw


def exclamdown(f: Frame) -> Drawing:
    return turn(spec_draw("exclam")(f), dot_r(f), f.C / 2 - 20)


def questiondown(f: Frame) -> Drawing:
    return turn(spec_draw("question")(f), f.w(420) / 2, f.C / 2 - 20)


def cent(f: Frame) -> Drawing:
    w = f.w(470)
    return spec_draw("c")(f) + ink(vstem(w / 2, f.xt_r + 70, f.lo_r - 70))


def sterling(f: Frame) -> Drawing:
    w = f.w(480)
    xl = f.h + 30
    r = 150
    top = f.ct_r - r
    hook = Pen(w - f.h - 30, top).arc(xl + r, top, r - 10, r, 0, 180).line(xl + 10, 0)
    return ink(hook, hbar(f.lo, 0, w), hbar(0.46 * f.C, 0, xl + 180))


def yen(f: Frame) -> Drawing:
    w = f.w(600)
    return spec_draw("Y")(f) + ink(hbar(0.30 * f.C, w * 0.2, w * 0.8), hbar(0.16 * f.C, w * 0.2, w * 0.8))


def currency(f: Frame) -> Drawing:
    cx, cy, r = 250.0, 360.0, 135
    parts = [round_ring(cx, cy, r, r)]
    for dx, dy in ((-1, 1), (1, 1), (-1, -1), (1, -1)):
        parts.append(diagonal(f, (cx + dx * (r + 4), cy + dy * (r + 4)), (cx + dx * (r + 80), cy + dy * (r + 80)), ("perp", "perp")))
    return ink(*parts)


def euro(f: Frame) -> Drawing:
    w = f.w(560)
    arc = spec_draw("c")(f)
    return arc + ink(hbar(0.60 * f.C, 0, w * 0.6), hbar(0.40 * f.C, 0, w * 0.6))


def section(f: Frame) -> Drawing:
    w = f.w(440)
    upper_curve = lower.s_curve(f, w, f.ct_r, 0.40 * f.C)
    lower_curve = lower.s_curve(f, w, 0.60 * f.C, f.lo_r)
    return ink(upper_curve, lower_curve)


def copyright_sign(f: Frame) -> Drawing:
    return ink(round_ring(340, 360, 330 - f.h * 0.4, 330 - f.h * 0.4).weight(0.75)) + scaled(spec_draw("c")(f), 0.56, 120, 170)


def registered(f: Frame) -> Drawing:
    return ink(round_ring(340, 360, 330 - f.h * 0.4, 330 - f.h * 0.4).weight(0.75)) + scaled(upper.R(f), 0.50, 170, 165)


def degree(f: Frame) -> Drawing:
    return ink(round_ring(70, f.C - 80, 70, 70).weight(0.7))


def plusminus(f: Frame) -> Drawing:
    return spec_draw("plus")(f) + ink(hbar(MATH_AXIS - 190, 0, 400))


def micro(f: Frame) -> Drawing:
    return lower.u(f) + ink(vstem(f.h, f.X, -f.D))


def pilcrow(f: Frame) -> Drawing:
    w = f.w(500)
    return flip_x(spec_draw("P")(f), w / 2) + ink(vstem(w - f.h - 0.30 * w, f.C, 0))


def periodcentered(f: Frame) -> Drawing:
    r = dot_r(f)
    return ink((r, MATH_AXIS, r))


def chevron(f: Frame, pairs: int, left: bool, size: float = 130) -> Drawing:
    parts = []
    for i in range(pairs):
        x = f.h + i * 120
        tip, back = (x, x + 95) if left else (x + 95, x)
        parts.append(Pen(back, MATH_AXIS + size).line(tip, MATH_AXIS).line(back, MATH_AXIS - size).weight(0.8))
    return ink(*parts)


def multiply(f: Frame) -> Drawing:
    return ink(
        diagonal(f, (40, MATH_AXIS + 170), (400, MATH_AXIS - 170), ("perp", "perp")),
        diagonal(f, (40, MATH_AXIS - 170), (400, MATH_AXIS + 170), ("perp", "perp")),
    )


def divide(f: Frame) -> Drawing:
    r = dot_r(f) * 0.9
    return ink(hbar(MATH_AXIS, 0, 400), (200, MATH_AXIS + 120, r), (200, MATH_AXIS - 120, r))


def small_figure(f: Frame, name: str, x: float, y: float, k: float = 0.56) -> Drawing:
    return scaled(spec_draw(name)(f), k, x, y)


def superior(name: str):
    def draw(f: Frame) -> Drawing:
        return small_figure(f, name, 0, 0.44 * f.C)

    return draw


def fraction(top: str, bottom: str):
    def draw(f: Frame) -> Drawing:
        slash = diagonal(f, (350, f.C), (70, 0), ("h", "h"))
        return (
            small_figure(f, top, 0, 0.50 * f.C, 0.5).__add__(ink(slash.weight(0.85)))
            + small_figure(f, bottom, 340, -6, 0.5)
        )

    return draw


def ordinal(name: str):
    def draw(f: Frame) -> Drawing:
        return scaled(spec_draw(name)(f), 0.58, 0, 330) + ink(hbar(300, 0, 250).weight(0.7))

    return draw


def notsign(f: Frame) -> Drawing:
    return ink(Pen(0, MATH_AXIS + 30).line(400, MATH_AXIS + 30).line(400, MATH_AXIS - 90))


def brokenbar(f: Frame) -> Drawing:
    top, bottom = f.A - 8, -f.D + 20
    mid = (top + bottom) / 2
    return ink(vstem(f.h, top, mid + 90), vstem(f.h, mid - 90, bottom))


def bullet(f: Frame) -> Drawing:
    return ink((90, MATH_AXIS, f.h * 1.5))


def ellipsis(f: Frame) -> Drawing:
    r = dot_r(f)
    step = 2 * r + 70
    return ink((r, r, r), (r + step, r, r), (r + 2 * step, r, r))


def guilsingle(left: bool):
    def draw(f: Frame) -> Drawing:
        return chevron(f, 1, left)

    return draw


register("exclamdown", exclamdown, 0xA1, sb=(66, 66))
register("questiondown", questiondown, 0xBF, sb=(36, 36))
register("cent", cent, 0xA2, sb=(44, 34))
register("sterling", sterling, 0xA3, sb=(40, 40))
register("currency", currency, 0xA4, sb=(40, 40))
register("yen", yen, 0xA5, sb=(14, 14))
register("euro", euro, 0x20AC, sb=(34, 34))
register("section", section, 0xA7, sb=(40, 40))
register("copyright", copyright_sign, 0xA9, sb=(30, 30))
register("registered", registered, 0xAE, sb=(30, 30))
register("degree", degree, 0xB0, sb=(40, 40))
register_math("plusminus", plusminus, 0xB1)
register("mu", micro, 0xB5, sb=(70, 60))
register("paragraph", pilcrow, 0xB6, sb=(70, 40))
register("periodcentered", periodcentered, 0xB7, 0x2219, sb=(66, 66))
register("guillemotleft", lambda f: chevron(f, 2, True), 0xAB)
register("guillemotright", lambda f: chevron(f, 2, False), 0xBB)
register("guilsinglleft", guilsingle(True), 0x2039)
register("guilsinglright", guilsingle(False), 0x203A)
register_math("multiply", multiply, 0xD7)
register_math("divide", divide, 0xF7)
register("onesuperior", superior("one"), 0xB9, sb=(30, 30))
register("twosuperior", superior("two"), 0xB2, sb=(30, 30))
register("threesuperior", superior("three"), 0xB3, sb=(30, 30))
register("onequarter", fraction("one", "four"), 0xBC, sb=(20, 20))
register("onehalf", fraction("one", "two"), 0xBD, sb=(20, 20))
register("threequarters", fraction("three", "four"), 0xBE, sb=(20, 20))
register("ordfeminine", ordinal("a"), 0xAA, sb=(30, 30))
register("ordmasculine", ordinal("o"), 0xBA, sb=(30, 30))
register_math("logicalnot", notsign, 0xAC)
register("brokenbar", brokenbar, 0xA6, sb=(60, 60))
register("bullet", bullet, 0x2022, sb=(50, 50))
register("ellipsis", ellipsis, 0x2026, sb=(66, 66))
