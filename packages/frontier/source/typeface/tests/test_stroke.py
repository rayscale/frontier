import math

import pytest

from scripts.design.metrics import MASTERS
from scripts.design.stroke import HORIZONTAL, Pen, area, expand, outline_bounds


def vertical_line() -> Pen:
    return Pen(0, 0).line(0, 100)


def test_masters_stems_strictly_increase() -> None:
    stems = [MASTERS[name].stem for name in ("light", "regular", "bold")]

    assert stems == sorted(set(stems))
    assert MASTERS["regular"].wght == 400


def test_expand_line_gives_one_contour_as_wide_as_the_stem() -> None:
    contours = expand(vertical_line().stroke(), 100)

    x_min, _, x_max, _ = outline_bounds(contours)
    assert len(contours) == 1
    assert x_max - x_min == pytest.approx(100)


def test_expand_ends_flat_where_the_stroke_stops() -> None:
    contours = expand(vertical_line().stroke(), 100)

    _, y_min, _, y_max = outline_bounds(contours)
    assert (y_min, y_max) == (pytest.approx(0), pytest.approx(100))


def test_horizontal_strokes_are_thinner_than_vertical_ones() -> None:
    contours = expand(Pen(0, 0).line(200, 0).stroke(), 100)

    _, y_min, _, y_max = outline_bounds(contours)
    assert y_max - y_min == pytest.approx(100 * HORIZONTAL)


def test_horizontal_cut_makes_a_diagonal_end_flat() -> None:
    stroke = Pen(0, 0).line(100, 200).cut("perp", "h").stroke()

    (contour,) = expand(stroke, 100)

    top = [p for s in contour for p in s.points if p[1] > 150]
    assert len({round(p[1], 6) for p in top}) == 1
    assert max(p[1] for s in contour for p in s.points) == pytest.approx(200)


def test_corner_between_two_lines_is_mitred() -> None:
    corner = Pen(0, 100).line(0, 0).line(100, 0).stroke()

    (contour,) = expand(corner, 100)

    x_min, y_min, _, _ = outline_bounds([contour])
    assert (x_min, y_min) == (pytest.approx(-50), pytest.approx(-45))
    assert len(contour) == 6


def test_corner_next_to_a_curve_is_rejected() -> None:
    pen = Pen(0, 0).line(100, 0).arc(100, 100, 100, 100, 90, 180).line(0, 100)

    with pytest.raises(ValueError, match="corner"):
        expand(pen.stroke(), 50)


def test_expand_structure_does_not_depend_on_the_stem() -> None:
    pen = Pen(0, 0).line(100, 0).arc(100, 100, 100, 100, -90, 90)

    light = expand(pen.stroke(), 56)
    bold = expand(pen.stroke(), 128)

    assert [len(c) for c in light] == [len(c) for c in bold]


def test_closed_ring_gives_two_contours_with_opposite_winding() -> None:
    ring = Pen(0, 0).ellipse(0, 0, 100, 100).stroke()

    contours = expand(ring, 60)

    assert len(contours) == 2
    x_min, _, x_max, _ = outline_bounds(contours)
    assert x_max - x_min == pytest.approx(260)


def test_arc_chunks_are_tangent_continuous() -> None:
    pen = Pen(100, 0).arc(0, 0, 100, 100, 0, 270)

    segments = pen.stroke().segments
    assert len(segments) == 3
    for a, b in zip(segments, segments[1:], strict=False):
        assert a.points[-1] == pytest.approx(b.points[0])
        ta = math.atan2(a.points[-1][1] - a.points[-2][1], a.points[-1][0] - a.points[-2][0])
        tb = math.atan2(b.points[1][1] - b.points[0][1], b.points[1][0] - b.points[0][0])
        assert ta == pytest.approx(tb, abs=1e-6)


def test_every_outer_contour_winds_clockwise_so_overlaps_union() -> None:
    ring = Pen(0, 0).ellipse(0, 0, 100, 100).stroke()
    open_stroke = vertical_line().stroke()

    outer, inner = expand(ring, 60)
    (single,) = expand(open_stroke, 60)

    assert area(outer) < 0 < area(inner)
    assert area(single) < 0
