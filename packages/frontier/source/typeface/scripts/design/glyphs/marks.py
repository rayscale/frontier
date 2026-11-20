from scripts.design.glyph import GLYPHS, Drawing, Frame, GlyphSpec, ink, turn
from scripts.design.glyphs.shapes import hbar
from scripts.design.stroke import Pen

BASE_Y = 610.0
WEIGHT = 0.86
COMBINING = {
    "gravecomb": (0x300, "top"),
    "acutecomb": (0x301, "top"),
    "circumflexcomb": (0x302, "top"),
    "tildecomb": (0x303, "top"),
    "macroncomb": (0x304, "top"),
    "brevecomb": (0x306, "top"),
    "dotaccentcomb": (0x307, "top"),
    "dieresiscomb": (0x308, "top"),
    "ringcomb": (0x30A, "top"),
    "hungarumlautcomb": (0x30B, "top"),
    "caroncomb": (0x30C, "top"),
    "commaturnedabovecomb": (0x312, "top"),
    "commaaccentcomb": (0x326, "bottom"),
    "cedillacomb": (0x327, "bottom"),
    "ogonekcomb": (0x328, "ogonek"),
}
SPACING = {
    "grave": 0x60,
    "acute": 0xB4,
    "circumflex": 0x2C6,
    "tilde": 0x2DC,
    "macron": 0xAF,
    "breve": 0x2D8,
    "dotaccent": 0x2D9,
    "dieresis": 0xA8,
    "ring": 0x2DA,
    "hungarumlaut": 0x2DD,
    "caron": 0x2C7,
    "cedilla": 0xB8,
    "ogonek": 0x2DB,
}
HEIGHT = 140.0


def acute_at(f: Frame, x: float, lean: float = 1.0) -> Pen:
    return Pen(x - 40 * lean, BASE_Y).line(x + 46 * lean, BASE_Y + HEIGHT).weight(WEIGHT).cut("h", "h")


def grave(f: Frame) -> Drawing:
    return ink(Pen(46, BASE_Y).line(-40, BASE_Y + HEIGHT).weight(WEIGHT).cut("h", "h"))


def acute(f: Frame) -> Drawing:
    return ink(acute_at(f, 0))


def circumflex(f: Frame) -> Drawing:
    return ink(Pen(-88, BASE_Y).line(0, BASE_Y + 116).line(88, BASE_Y).weight(WEIGHT).cut("h", "h"))


def caron(f: Frame) -> Drawing:
    return ink(Pen(-88, BASE_Y + 116).line(0, BASE_Y).line(88, BASE_Y + 116).weight(WEIGHT).cut("h", "h"))


def tilde(f: Frame) -> Drawing:
    y = BASE_Y + 70
    return ink(
        Pen(0, 0)
        .through((-92, y - 28, 55), (-40, y + 30, 0), (40, y - 30, 0), (92, y + 28, 55), tension=1.0)
        .weight(WEIGHT)
    )


def macron(f: Frame) -> Drawing:
    return ink(hbar(BASE_Y + 40, -86, 86).weight(WEIGHT))


def breve(f: Frame) -> Drawing:
    y = BASE_Y + 100
    return ink(
        Pen(0, 0).through((-96, y, 290), (0, y - 62, 0), (96, y, 70), tension=1.0).weight(WEIGHT)
    )


def dot_radius(f: Frame) -> float:
    return f.h * 1.14


def dotaccent(f: Frame) -> Drawing:
    r = dot_radius(f)
    return ink((0, BASE_Y + 14 + r, r))


def dieresis(f: Frame) -> Drawing:
    r = dot_radius(f)
    y = BASE_Y + 14 + r
    return ink((-(r + 38), y, r), (r + 38, y, r))


def ring_mark(f: Frame) -> Drawing:
    from scripts.design.glyphs.shapes import round_ring

    r = 58
    return ink(round_ring(0, BASE_Y + 12 + r + 20, r, r).weight(0.62))


def hungarumlaut(f: Frame) -> Drawing:
    return ink(acute_at(f, -52, 0.95), acute_at(f, 52, 0.95))


def comma_shape(f: Frame, cx: float, cy: float, scale: float = 1.0) -> Drawing:
    r = dot_radius(f) * scale
    return ink(
        (cx, cy, r),
        Pen(cx + r * 0.55, cy - r * 0.2).line(cx - r * 0.35, cy - 110 * scale).weight(0.95).cut("h", "h"),
    )


def commaturnedabove(f: Frame) -> Drawing:
    return turn(comma_shape(f, 0, BASE_Y + 120), 0, BASE_Y + 120)


def commaaccent(f: Frame) -> Drawing:
    return comma_shape(f, 0, -50)


def cedilla(f: Frame) -> Drawing:
    return ink(Pen(0, -2).line(0, -56).arc(52, -56, 52, 50, 180, 330).weight(WEIGHT))


def ogonek(f: Frame) -> Drawing:
    return ink(Pen(0, -2).line(0, -56).arc(52, -56, 52, 50, 180, 330).weight(WEIGHT))


def caroncomma(f: Frame) -> Drawing:
    return ink(Pen(0, f.C).line(-14, f.C - 150).weight(0.9).cut("h", "h"))


DRAWINGS = {
    "gravecomb": grave,
    "acutecomb": acute,
    "circumflexcomb": circumflex,
    "tildecomb": tilde,
    "macroncomb": macron,
    "brevecomb": breve,
    "dotaccentcomb": dotaccent,
    "dieresiscomb": dieresis,
    "ringcomb": ring_mark,
    "hungarumlautcomb": hungarumlaut,
    "caroncomb": caron,
    "commaturnedabovecomb": commaturnedabove,
    "commaaccentcomb": commaaccent,
    "cedillacomb": cedilla,
    "ogonekcomb": ogonek,
}

for name, (codepoint, attach) in COMBINING.items():
    GLYPHS[name] = GlyphSpec(name, (codepoint,), DRAWINGS[name], mark=attach, combining=True)

for name, codepoint in SPACING.items():
    GLYPHS[name] = GlyphSpec(name, (codepoint,), DRAWINGS[f"{name}comb"], (60, 60))

GLYPHS["caroncomma"] = GlyphSpec("caroncomma", (), caroncomma, (20, 20))
GLYPHS["commaturnedabove"] = GlyphSpec("commaturnedabove", (0x2BB,), commaturnedabove, (60, 60))
