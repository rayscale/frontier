import hashlib

import pytest
from fontTools.ttLib import TTFont

from scripts.compile import FONTS, WEB_NAME, main

COVERAGE = [*range(0x20, 0x7F), *range(0xA0, 0x180), 0x20AC, 0x2013, 0x2014, 0x2018, 0x2019, 0x201C, 0x201D, 0x2022, 0x2026, 0x2212]


@pytest.fixture(scope="module")
def woff2(monkeypatch_module: pytest.MonkeyPatch) -> TTFont:
    monkeypatch_module.setattr("sys.argv", ["compile"])
    main()
    return TTFont(FONTS / f"{WEB_NAME}.woff2")


@pytest.fixture(scope="module")
def monkeypatch_module() -> pytest.MonkeyPatch:
    with pytest.MonkeyPatch.context() as patch:
        yield patch


def test_variable_woff2_is_produced(woff2: TTFont) -> None:
    assert woff2.flavor == "woff2"
    assert "fvar" in woff2


def test_weight_axis_runs_300_to_700_with_regular_default(woff2: TTFont) -> None:
    (axis,) = woff2["fvar"].axes

    assert (axis.axisTag, axis.minValue, axis.defaultValue, axis.maxValue) == ("wght", 300, 400, 700)


def test_cmap_covers_every_declared_code_point(woff2: TTFont) -> None:
    cmap = woff2.getBestCmap()

    assert [hex(cp) for cp in COVERAGE if cp not in cmap] == []


def test_vertical_metrics_agree(woff2: TTFont) -> None:
    os2, hhea = woff2["OS/2"], woff2["hhea"]

    assert os2.sTypoAscender == hhea.ascent
    assert os2.sTypoDescender == hhea.descent
    assert os2.fsSelection & (1 << 7)


def test_stat_labels_every_named_weight(woff2: TTFont) -> None:
    values = {v.Value for v in woff2["STAT"].table.AxisValueArray.AxisValue}

    assert {300, 400, 500, 600, 700} <= values


def test_prep_enables_smart_dropout_control(woff2: TTFont) -> None:
    assert woff2["prep"].program.getBytecode().hex() == "b801ff85b0048d"


def test_build_is_deterministic() -> None:
    def digest() -> str:
        main()
        return hashlib.sha256((FONTS / f"{WEB_NAME}.woff2").read_bytes()).hexdigest()

    assert digest() == digest()
