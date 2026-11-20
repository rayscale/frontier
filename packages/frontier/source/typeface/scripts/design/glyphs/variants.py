from scripts.design.glyph import GLYPHS, Drawing, Frame, GlyphSpec, shift

CASE_SHIFT = 80
CASE_BASES = (
    "hyphen",
    "endash",
    "emdash",
    "periodcentered",
    "guillemotleft",
    "guillemotright",
    "guilsinglleft",
    "guilsinglright",
    "bullet",
    "plus",
    "minus",
    "equal",
    "less",
    "greater",
    "multiply",
    "divide",
    "plusminus",
)


def raised(base: str):
    def draw(f: Frame) -> Drawing:
        draw_base = GLYPHS[base].draw
        assert draw_base is not None
        return shift(draw_base(f), 0, CASE_SHIFT)

    return draw


for base in CASE_BASES:
    source = GLYPHS[base]
    GLYPHS[f"{base}.case"] = GlyphSpec(f"{base}.case", (), raised(base), source.sb, source.advance)
