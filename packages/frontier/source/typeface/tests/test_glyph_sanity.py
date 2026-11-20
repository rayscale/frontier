import math

import pytest

from scripts.build_sources import Resolver
from scripts.design.glyph import GLYPHS
from scripts.design.glyphs import load
from scripts.design.metrics import DESCENDER, MASTERS
from scripts.design.stroke import area, outline_bounds

load()

NAMES = sorted(name for name, spec in GLYPHS.items() if spec.draw is not None or spec.components)
CACHE = {key: Resolver(master) for key, master in MASTERS.items()}


def contours_of(name: str, key: str) -> list:
    resolver = CACHE[key]
    spec = GLYPHS[name]
    if spec.components:
        parts = resolver.get(name).parts
        contours = []
        for part, dx, dy in parts:
            for contour in contours_of(part, key):
                contours.append(
                    [type(s)(tuple((p[0] + dx, p[1] + dy) for p in s.points)) for s in contour]
                )
        return contours
    return resolver.get(name).contours


def ink_area(name: str, key: str) -> float:
    return -sum(area(c) for c in contours_of(name, key))


@pytest.mark.parametrize("name", NAMES)
def test_every_glyph_has_finite_coordinates_and_ink(name: str) -> None:
    for key in MASTERS:
        contours = contours_of(name, key)
        assert contours, f"{name} has no outline in {key}"
        assert all(math.isfinite(v) for c in contours for s in c for p in s.points for v in p)


@pytest.mark.parametrize("name", NAMES)
def test_glyphs_stay_inside_sensible_bounds(name: str) -> None:
    for key in MASTERS:
        x_min, y_min, x_max, y_max = outline_bounds(contours_of(name, key))
        advance = CACHE[key].get(name).advance
        assert -DESCENDER - 60 <= y_min, f"{name} {key} sinks to {y_min:.0f}"
        assert y_max <= 1060, f"{name} {key} rises to {y_max:.0f}"
        assert advance <= 1300, f"{name} {key} advance {advance:.0f}"
        if not GLYPHS[name].combining:
            assert advance > 0, f"{name} {key} has no advance"
            assert x_min > -60 and x_max < advance + 60, f"{name} {key} spills: {x_min:.0f}..{x_max:.0f} of {advance:.0f}"


@pytest.mark.parametrize("name", NAMES)
def test_outlines_are_not_inside_out_or_degenerate(name: str) -> None:
    for key in MASTERS:
        contours = contours_of(name, key)
        assert sum(area(c) for c in contours) < 0, f"{name} {key} is inside out"
        assert all(abs(area(c)) > 20 for c in contours), f"{name} {key} has a sliver contour"


@pytest.mark.parametrize("name", NAMES)
def test_ink_grows_with_weight(name: str) -> None:
    light, regular, bold = (ink_area(name, key) for key in ("light", "regular", "bold"))

    assert light < regular < bold, f"{name}: {light:.0f} {regular:.0f} {bold:.0f}"


LETTERS = [n for n in NAMES if len(n) <= 2 and n.isalpha() and not GLYPHS[n].components]


@pytest.mark.parametrize("name", LETTERS)
def test_letter_sidebearings_are_even_and_in_range(name: str) -> None:
    for key in MASTERS:
        x_min, _, x_max, _ = outline_bounds(contours_of(name, key))
        advance = CACHE[key].get(name).advance
        left, right = x_min, advance - x_max
        assert 8 <= left <= 170 and 8 <= right <= 170, f"{name} {key}: {left:.0f}/{right:.0f}"
