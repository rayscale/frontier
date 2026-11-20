from pathlib import Path

import pytest
import ufoLib2

from scripts.build_sources import SOURCES, build_sources

NAMES = ("Light", "Regular", "Bold")


@pytest.fixture(scope="module")
def fonts() -> list[ufoLib2.Font]:
    build_sources()
    return [ufoLib2.Font.open(Path(SOURCES) / f"FrontierSans-{n}.ufo") for n in NAMES]


def test_composites_share_the_kerning_group_of_their_base(fonts: list[ufoLib2.Font]) -> None:
    groups = fonts[1].groups

    assert "Aacute" in groups["public.kern1.A"]
    assert "Aacute" in groups["public.kern2.A"]


def test_open_pairs_are_tightened(fonts: list[ufoLib2.Font]) -> None:
    for font in fonts:
        assert font.kerning[("public.kern1.A", "public.kern2.V")] <= -20
        assert font.kerning[("public.kern1.T", "public.kern2.o")] <= -40


def test_straight_pairs_are_left_alone(fonts: list[ufoLib2.Font]) -> None:
    for font in fonts:
        assert ("public.kern1.H", "public.kern2.H") not in font.kerning


def test_every_master_declares_the_same_pairs(fonts: list[ufoLib2.Font]) -> None:
    pairs = [set(f.kerning.keys()) for f in fonts]

    assert pairs[0] == pairs[1] == pairs[2]
    assert len(pairs[1]) > 100
