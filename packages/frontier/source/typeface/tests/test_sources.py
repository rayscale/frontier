from pathlib import Path

import pytest
import ufoLib2
from fontTools.designspaceLib import DesignSpaceDocument

from scripts.build_sources import SOURCES, build_sources

NAMES = ("Light", "Regular", "Bold")


@pytest.fixture(scope="module")
def built() -> Path:
    build_sources()
    return SOURCES


def test_three_masters_and_a_designspace_exist(built: Path) -> None:
    assert all((built / f"FrontierSans-{name}.ufo").is_dir() for name in NAMES)
    assert (built / "FrontierSans.designspace").is_file()


def test_designspace_declares_the_weight_axis_with_regular_default(built: Path) -> None:
    doc = DesignSpaceDocument.fromfile(built / "FrontierSans.designspace")

    (axis,) = doc.axes
    assert (axis.tag, axis.minimum, axis.default, axis.maximum) == ("wght", 300, 400, 700)
    assert [s.styleName for s in doc.sources if s.location == {"Weight": axis.default}] == ["Regular"]


def test_contours_and_points_match_across_masters(built: Path) -> None:
    fonts = [ufoLib2.Font.open(built / f"FrontierSans-{n}.ufo") for n in NAMES]
    base = fonts[0]

    for name in base.keys():
        shapes = [[len(c.points) for c in f[name].contours] for f in fonts]
        components = [[c.baseGlyph for c in f[name].components] for f in fonts]
        assert shapes[0] == shapes[1] == shapes[2], name
        assert components[0] == components[1] == components[2], name


def test_font_info_names_the_family(built: Path) -> None:
    font = ufoLib2.Font.open(built / "FrontierSans-Regular.ufo")

    assert font.info.familyName == "Frontier Sans"
    assert font.info.unitsPerEm == 1000
    assert (font.info.versionMajor, font.info.versionMinor) == (0, 1)
