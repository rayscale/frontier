import numpy as np
import ufoLib2

from scripts.design.glyph import GLYPHS, Rendered
from scripts.design.metrics import CAP_HEIGHT

LETTERS = [chr(c) for c in [*range(0x41, 0x5B), *range(0x61, 0x7B)]]
PUNCTUATION = {"period": "period", "comma": "comma", "quoteright": "quoteright", "quoteleft": "quoteleft"}
BAND = 20
DEPTH = 170
TARGET = 175
RELAX = 0.5
MINIMUM = 8
FLOOR = -160
LEFT, RIGHT = "public.kern2.", "public.kern1."


def base_of(name: str) -> str | None:
    spec = GLYPHS[name]
    if name in LETTERS:
        return name
    if name.endswith(".ss01") and name[:-5] in LETTERS:
        return name[:-5]
    if len(spec.components) == 2 and spec.place in ("above", "below", "ogonek"):
        base = spec.components[0][0]
        return base if base in LETTERS else None
    return None


def groups() -> dict[str, list[str]]:
    result: dict[str, list[str]] = {}
    for name in GLYPHS:
        base = base_of(name)
        if base is None:
            continue
        result.setdefault(f"{RIGHT}{base}", []).append(name)
        result.setdefault(f"{LEFT}{base}", []).append(name)
    return result


def sample(rendered: Rendered) -> np.ndarray:
    points: list[tuple[float, float]] = []
    for contour in rendered.contours:
        for segment in contour:
            p = segment.points
            steps = 24 if segment.curve else max(2, int(np.hypot(p[-1][0] - p[0][0], p[-1][1] - p[0][1]) / 8))
            for i in range(steps + 1):
                t = i / steps
                if segment.curve:
                    mt = 1 - t
                    x = mt**3 * p[0][0] + 3 * mt * mt * t * p[1][0] + 3 * mt * t * t * p[2][0] + t**3 * p[3][0]
                    y = mt**3 * p[0][1] + 3 * mt * mt * t * p[1][1] + 3 * mt * t * t * p[2][1] + t**3 * p[3][1]
                else:
                    x = p[0][0] + (p[1][0] - p[0][0]) * t
                    y = p[0][1] + (p[1][1] - p[0][1]) * t
                points.append((x, y))
    return np.array(points)


def profiles(rendered: Rendered) -> tuple[np.ndarray, np.ndarray, float]:
    pts = sample(rendered)
    edges = np.arange(0, CAP_HEIGHT + BAND, BAND)
    left = np.full(len(edges) - 1, np.nan)
    right = np.full(len(edges) - 1, np.nan)
    for i in range(len(edges) - 1):
        mask = (pts[:, 1] >= edges[i]) & (pts[:, 1] < edges[i + 1])
        if mask.any():
            left[i] = pts[mask, 0].min()
            right[i] = pts[mask, 0].max()
    top = float(pts[:, 1].max())
    return left, right, min(top, CAP_HEIGHT)


def pair_value(first: tuple[np.ndarray, np.ndarray, float, float], second: tuple[np.ndarray, np.ndarray, float, float]) -> float:
    _, right, top1, advance = first
    left, _, top2, _ = second
    bands = int(min(top1, top2) // BAND)
    if bands < 4:
        return 0.0
    r = right[:bands]
    l = left[:bands]
    r_extreme = np.nanmax(right)
    l_extreme = np.nanmin(left)
    r = np.where(np.isnan(r), r_extreme - DEPTH, np.maximum(r, r_extreme - DEPTH))
    l = np.where(np.isnan(l), l_extreme + DEPTH, np.minimum(l, l_extreme + DEPTH))
    gap = float(np.mean((advance - r) + l))
    excess = gap - TARGET
    if excess <= 0:
        return 0.0
    return max(FLOOR, -excess * RELAX)


def kern_values(resolver: object) -> dict[tuple[str, str], float]:
    cache: dict[str, tuple[np.ndarray, np.ndarray, float, float]] = {}
    bases = [*LETTERS, *PUNCTUATION]
    for name in bases:
        rendered = resolver.get(name)
        left, right, top = profiles(rendered)
        cache[name] = (left, right, top, rendered.advance)
    values: dict[tuple[str, str], float] = {}
    for a in LETTERS:
        for b in LETTERS:
            value = pair_value(cache[a], cache[b])
            if abs(value) >= MINIMUM:
                values[(f"{RIGHT}{a}", f"{LEFT}{b}")] = round(value / 5) * 5
    return values


def apply_kerning(fonts: list[ufoLib2.Font], values: list[dict[tuple[str, str], float]]) -> None:
    pairs = sorted(set().union(*values))
    for font, own in zip(fonts, values, strict=True):
        for group, members in groups().items():
            font.groups[group] = members
        for pair in pairs:
            font.kerning[pair] = own.get(pair, 0)
