from dataclasses import dataclass


@dataclass(frozen=True)
class Axis:
    tag: str
    name: str
    minimum: int
    default: int
    maximum: int
    labels: tuple[tuple[int, str], ...] = ()


WEIGHT_LABELS = ((300, "Light"), (400, "Regular"), (500, "Medium"), (600, "SemiBold"), (700, "Bold"))
AXES: tuple[Axis, ...] = (Axis("wght", "Weight", 300, 400, 700, WEIGHT_LABELS),)
