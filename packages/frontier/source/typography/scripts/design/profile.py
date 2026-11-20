import numpy as np

from scripts.design.stroke import Contour

BAND = 10


def sample(contours: list[Contour]) -> np.ndarray:
    points: list[tuple[float, float]] = []
    for contour in contours:
        for segment in contour:
            p = segment.points
            steps = 24 if segment.curve else max(2, int(np.hypot(p[-1][0] - p[0][0], p[-1][1] - p[0][1]) / 6))
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


def edges(contours: list[Contour], low: float, high: float) -> tuple[np.ndarray, np.ndarray]:
    pts = sample(contours)
    starts = np.arange(low, high, BAND)
    left = np.full(len(starts), np.nan)
    right = np.full(len(starts), np.nan)
    for i, y in enumerate(starts):
        mask = (pts[:, 1] >= y) & (pts[:, 1] < y + BAND)
        if mask.any():
            left[i] = pts[mask, 0].min()
            right[i] = pts[mask, 0].max()
    return left, right


def open_space(contours: list[Contour], low: float, high: float, depth: float) -> tuple[float, float]:
    left, right = edges(contours, low, high)
    pts = sample(contours)
    x_min, x_max = float(pts[:, 0].min()), float(pts[:, 0].max())
    gap_left = np.where(np.isnan(left), depth, np.minimum(depth, left - x_min))
    gap_right = np.where(np.isnan(right), depth, np.minimum(depth, x_max - right))
    return float(gap_left.mean()), float(gap_right.mean())
