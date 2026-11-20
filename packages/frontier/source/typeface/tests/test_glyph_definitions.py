import math

import pytest

from scripts.design.glyph import GLYPHS, Frame, render
from scripts.design.glyphs import load
from scripts.design.metrics import MASTERS

load()

BASIC_LATIN = range(0x20, 0x7F)


def codepoints() -> set[int]:
    return {cp for spec in GLYPHS.values() for cp in spec.unicodes}


def test_basic_latin_is_fully_defined() -> None:
    missing = [chr(cp) for cp in BASIC_LATIN if cp not in codepoints()]

    assert missing == []


@pytest.mark.parametrize("name", sorted(n for n, s in GLYPHS.items() if s.draw))
def test_structure_is_identical_across_masters(name: str) -> None:
    shapes = [
        [[len(s.points) for s in c] for c in render(GLYPHS[name], m).contours]
        for m in MASTERS.values()
    ]

    assert shapes[0] == shapes[1] == shapes[2]


@pytest.mark.parametrize("name", sorted(n for n, s in GLYPHS.items() if s.draw))
def test_strokes_are_connected_and_tangent_continuous(name: str) -> None:
    drawing = GLYPHS[name].draw(Frame(MASTERS["regular"]))
    for stroke in drawing.strokes:
        for a, b in zip(stroke.segments, stroke.segments[1:], strict=False):
            assert a.points[-1] == pytest.approx(b.points[0], abs=0.01)
            if not (a.curve or b.curve):
                continue
            ta = math.atan2(a.points[-1][1] - a.points[-2][1], a.points[-1][0] - a.points[-2][0])
            tb = math.atan2(b.points[1][1] - b.points[0][1], b.points[1][0] - b.points[0][0])
            delta = abs((ta - tb + math.pi) % (2 * math.pi) - math.pi)
            assert delta < math.radians(4), f"{name}: kink of {math.degrees(delta):.1f} degrees"


@pytest.mark.parametrize("name", sorted(n for n, s in GLYPHS.items() if s.draw))
def test_advance_grows_with_weight(name: str) -> None:
    light, regular, bold = (render(GLYPHS[name], m).advance for m in MASTERS.values())

    assert regular > 0 or GLYPHS[name].combining
    assert light <= regular + 1 <= bold + 2 or GLYPHS[name].advance is not None
