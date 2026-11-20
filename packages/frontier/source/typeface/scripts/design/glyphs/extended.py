import unicodedata

from fontTools import agl

from scripts.design.glyph import GLYPHS, Drawing, Frame, composite, glyph, ink, shift
from scripts.design.glyphs import lower, upper
from scripts.design.glyphs.marks import COMBINING
from scripts.design.glyphs.shapes import diagonal, flush, hbar, vstem
from scripts.design.stroke import Pen


@glyph("germandbls", 0xDF, zone="x")
def germandbls(f: Frame) -> Drawing:
    top = f.A + 10 - f.hh
    waist = 0.56 * f.A
    r_upper = (top - waist) / 2
    r_lower = (waist - f.lo) / 2
    cx_upper = f.h + r_upper
    # The bottom terminal stays a stem's width clear of the stem so the letter reads as an open ß,
    # not a B; heavy weights push the lower bowl out to keep that opening.
    terminal = max(4 * f.h, 2 * f.h + 70)
    cx_lower = max(f.h + 2 * r_upper + 0.15 * r_lower - r_lower, terminal + 30)
    upper_bowl = (
        Pen(f.h, 0)
        .line(f.h, top - r_upper)
        .arc(cx_upper, top - r_upper, r_upper, r_upper, 180, -90)
        .line(f.h + 0.45 * r_upper, waist)
    )
    lower_bowl = (
        Pen(f.h + 0.45 * r_upper, waist)
        .line(cx_lower, waist)
        .arc(cx_lower, waist - r_lower, r_lower, r_lower, 90, -90)
        .line(terminal, f.lo)
    )
    return ink(upper_bowl, lower_bowl)


@glyph("eth", 0xF0, zone="x")
def eth(f: Frame) -> Drawing:
    w = f.w(490)
    right = w - f.h
    r = 92
    return ink(
        lower.bowl(f, w),
        Pen(right, 0).line(right, f.A - r - 8).arc(right - r, f.A - r - 8, r, r, 0, 108),
        hbar(f.A - 200, right - 160, right + 60),
    )


@glyph("Thorn", 0xDE, zone="cap")
def Thorn(f: Frame) -> Drawing:
    w = f.w(500)
    return ink(upper.stem(f), upper.cap_bowl(f, w - f.h, f.ct - 120, 0.16 * f.C + f.lo))


@glyph("thorn", 0xFE, zone="x")
def thorn(f: Frame) -> Drawing:
    return ink(lower.bowl(f, f.w(490)), vstem(f.h, f.A, -f.D))


@glyph("AE", 0xC6, zone="cap")
def AE(f: Frame) -> Drawing:
    w = f.w(960)
    xe = w * 0.46
    left = flush(f, 0, 0, (xe, f.C), False)
    y = 0.28 * f.C
    t = y / f.C
    xa = left + (xe - left) * t
    return ink(
        diagonal(f, (left, 0), (xe, f.C), ("h", "perp")),
        vstem(xe, f.C, 0),
        hbar(f.ct, xe, w),
        hbar(f.C / 2, xe, w - 40),
        hbar(f.lo, xe, w),
        hbar(y, xa, xe),
    )


@glyph("ae", 0xE6, zone="x")
def ae(f: Frame) -> Drawing:
    wa = f.w(470)
    return lower.double_storey_a(f, wa) + shift(lower.e(f), wa - 2 * f.h + 10, 0)


@glyph("OE", 0x152, zone="cap")
def OE(f: Frame) -> Drawing:
    wo = f.w(680)
    x = wo - f.h
    return ink(
        upper.cap_ring(f, wo),
        vstem(x, f.C, 0),
        hbar(f.ct, x, x + 360),
        hbar(f.C / 2, x, x + 320),
        hbar(f.lo, x, x + 360),
    )


@glyph("oe", 0x153, zone="x")
def oe(f: Frame) -> Drawing:
    wo = f.w(500)
    return lower.o(f) + shift(lower.e(f), wo - 2 * f.h + 10, 0)


@glyph("oslash", 0xF8, zone="x")
def oslash(f: Frame) -> Drawing:
    w = f.w(500)
    return lower.o(f) + ink(diagonal(f, (w * 0.80, f.X + 6), (w * 0.20, -6)))


@glyph("Oslash", 0xD8, zone="cap")
def Oslash(f: Frame) -> Drawing:
    w = f.w(680)
    return upper.O(f) + ink(diagonal(f, (w * 0.82, f.C + 8), (w * 0.18, -8)))


@glyph("Dcroat", 0x110, 0xD0, zone="cap")
def Dcroat(f: Frame) -> Drawing:
    return upper.D(f) + ink(hbar(f.C / 2, -40, f.h + 150))


@glyph("dcroat", 0x111, zone="x")
def dcroat(f: Frame) -> Drawing:
    w = f.w(490)
    right = w - f.h
    return lower.d(f) + ink(hbar(f.A - 150, right - 150, right + 90))


@glyph("Hbar", 0x126, zone="cap")
def Hbar(f: Frame) -> Drawing:
    w = f.w(560)
    return upper.H(f) + ink(hbar(f.C - 130, -40, w + 40))


@glyph("hbar", 0x127, zone="x")
def hbar_(f: Frame) -> Drawing:
    return lower.h(f) + ink(hbar(f.A - 150, -50, f.h + 150))


@glyph("Lslash", 0x141, zone="cap")
def Lslash(f: Frame) -> Drawing:
    return upper.L(f) + ink(diagonal(f, (f.h + 150, 0.64 * f.C), (-40, 0.36 * f.C), ("perp", "perp")))


@glyph("lslash", 0x142, zone="x")
def lslash(f: Frame) -> Drawing:
    return lower.l(f) + ink(diagonal(f, (f.h + 100, 0.60 * f.A), (-60, 0.34 * f.A), ("perp", "perp")))


@glyph("eng", 0x14B, zone="x")
def eng(f: Frame) -> Drawing:
    w = f.w(440)
    rx = (w - 2 * f.h) / 2
    ry = rx * 0.94
    cya = f.xt_r - ry
    arch = Pen(f.h, cya).arc(w / 2, cya, rx, ry, 180, 0)
    return ink(vstem(f.h, f.X, 0), arch, lower.descender_hook(f, w - f.h, cya, w * 0.8))


@glyph("Eng", 0x14A, zone="cap")
def Eng(f: Frame) -> Drawing:
    w = f.w(590)
    return upper.N(f) + ink(lower.descender_hook(f, w - f.h, 60, w * 0.6))


@glyph("Tbar", 0x166, zone="cap")
def Tbar(f: Frame) -> Drawing:
    w = f.w(520)
    return upper.T(f) + ink(hbar(f.C * 0.46, w / 2 - 110, w / 2 + 110))


@glyph("tbar", 0x167, zone="x")
def tbar(f: Frame) -> Drawing:
    w = f.w(340)
    return lower.t(f) + ink(hbar(0.36 * f.X, 0.42 * w - 100, 0.42 * w + 100))


def codepoint_names() -> dict[int, str]:
    return {cp: name for name, spec in GLYPHS.items() for cp in spec.unicodes}


def glyph_name(cp: int) -> str:
    return agl.UV2AGL.get(cp) or f"uni{cp:04X}"


def compose_unicode_range() -> None:
    names = codepoint_names()
    overrides = {
        0x10F: ("d", "caroncomma", "right"),
        0x165: ("t", "caroncomma", "right"),
        0x13E: ("l", "caroncomma", "right"),
        0x13D: ("L", "caroncomma", "right"),
        0x123: ("g", "commaturnedabovecomb", "above"),
        0x122: ("G", "cedillacomb", "below"),
        0x149: ("quoteright", "n", "after"),
        0x132: ("I", "J", "after"),
        0x133: ("i", "j", "after"),
        0x13F: ("L", "periodcentered", "after"),
        0x140: ("l", "periodcentered", "after"),
    }
    for cp in [*range(0xC0, 0x100), *range(0x100, 0x180)]:
        if cp in names:
            continue
        if cp in overrides:
            base, mark, place = overrides[cp]
            composite(glyph_name(cp), cp, base, mark, place)
            continue
        decomposition = unicodedata.decomposition(chr(cp))
        if not decomposition or decomposition.startswith("<"):
            continue
        parts = [int(p, 16) for p in decomposition.split()]
        if len(parts) != 2 or parts[0] not in names:
            continue
        mark_name = next((n for n, (c, _) in COMBINING.items() if c == parts[1]), None)
        if mark_name is None:
            continue
        base = names[parts[0]]
        place = {"top": "above", "bottom": "below", "ogonek": "ogonek"}[COMBINING[mark_name][1]]
        if place == "above" and base == "i":
            base = "dotlessi"
        if place == "above" and base == "j":
            base = "jdotless"
        composite(glyph_name(cp), cp, base, mark_name, place)


compose_unicode_range()
