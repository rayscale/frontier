from dataclasses import dataclass

UPM = 1000
X_HEIGHT = 540
CAP_HEIGHT = 720
ASCENDER = 750
DESCENDER = 210
OVERSHOOT = 10


@dataclass(frozen=True)
class Master:
    name: str
    style: str
    wght: int
    stem: int

    @property
    def h(self) -> float:
        return self.stem / 2

    def ink(self, base: float) -> float:
        return base + (self.stem - 84) * 0.6


MASTERS: dict[str, Master] = {
    "light": Master("Light", "Light", 300, 56),
    "regular": Master("Regular", "Regular", 400, 84),
    "bold": Master("Bold", "Bold", 700, 128),
}
