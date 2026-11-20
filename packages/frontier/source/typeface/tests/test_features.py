import pytest
from fontTools.ttLib import TTFont

from scripts.build_sources import build_sources
from scripts.compile import BUILD, VARIABLE, compile_variable

REQUIRED = {"kern", "ccmp", "mark", "mkmk", "case", "tnum", "pnum", "zero", "ss01"}


@pytest.fixture(scope="module")
def font() -> TTFont:
    build_sources()
    compile_variable()
    return TTFont(BUILD / f"{VARIABLE}.ttf")


def substitutions(font: TTFont, tag: str) -> dict[str, str]:
    table = font["GSUB"].table
    wanted = {i for r in table.FeatureList.FeatureRecord if r.FeatureTag == tag for i in r.Feature.LookupListIndex}
    mapping: dict[str, str] = {}
    for index in wanted:
        for subtable in table.LookupList.Lookup[index].SubTable:
            subtable = getattr(subtable, "ExtSubTable", subtable)
            mapping.update(getattr(subtable, "mapping", {}))
    return mapping


def test_all_required_feature_tags_are_present(font: TTFont) -> None:
    tags = {r.FeatureTag for t in ("GSUB", "GPOS") for r in font[t].table.FeatureList.FeatureRecord}

    assert REQUIRED <= tags, REQUIRED - tags


def test_tabular_numerals_replace_proportional_ones(font: TTFont) -> None:
    mapping = substitutions(font, "tnum")

    assert mapping["one"] == "one.tf"
    assert all(f"{name}.tf" == mapping[name] for name in mapping)
    assert len(mapping) == 10


def test_tabular_figures_share_one_advance(font: TTFont) -> None:
    widths = {font["hmtx"][name][0] for name in substitutions(font, "tnum").values()}

    assert len(widths) == 1


def test_ss01_selects_the_single_storey_a(font: TTFont) -> None:
    assert substitutions(font, "ss01") == {"a": "a.ss01"}


def test_case_forms_exist_for_every_substitution(font: TTFont) -> None:
    mapping = substitutions(font, "case")

    assert mapping["hyphen"] == "hyphen.case"
    assert all(target in font.getGlyphOrder() for target in mapping.values())


def shape(text: str, features: dict[str, bool] | None = None) -> list[str]:
    import uharfbuzz as hb

    blob = hb.Blob.from_file_path(str(BUILD / f"{VARIABLE}.ttf"))
    face = hb.Face(blob)
    hb_font = hb.Font(face)
    buffer = hb.Buffer()
    buffer.add_str(text)
    buffer.guess_segment_properties()
    hb.shape(hb_font, buffer, features or {})
    return [hb_font.glyph_to_string(info.codepoint) for info in buffer.glyph_infos]


def test_i_loses_its_dot_under_an_accent(font: TTFont) -> None:
    assert shape("i\u030a") == ["dotlessi", "ringcomb"]
    assert shape("j\u0303") == ["jdotless", "tildecomb"]


def test_marks_are_positioned_over_their_base(font: TTFont) -> None:
    glyph_set = font.getGlyphSet()
    shaped = shape("e\u030a")
    import uharfbuzz as hb

    face = hb.Face(hb.Blob.from_file_path(str(BUILD / f"{VARIABLE}.ttf")))
    hb_font = hb.Font(face)
    buffer = hb.Buffer()
    buffer.add_str("e\u030a")
    buffer.guess_segment_properties()
    hb.shape(hb_font, buffer, {})

    assert shaped == ["e", "ringcomb"]
    assert buffer.glyph_positions[1].y_offset > 0 or buffer.glyph_positions[1].x_offset != 0
    assert glyph_set is not None
