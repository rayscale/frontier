import sys
from pathlib import Path

from fontTools.ttLib import TTFont
from PIL import Image, ImageDraw, ImageFont

from scripts.compile import BUILD, VARIABLE

SPECIMENS = Path(__file__).resolve().parent.parent / "specimens"
TEXT = "abcdefghijklmnopqrstuvwxyz\nABCDEFGHIJKLMNOPQRSTUVWXYZ\n0123456789 .,:;!?&@#%()[]{}/-+=*"


def font_at(weight: int, size: int) -> ImageFont.FreeTypeFont:
    font = ImageFont.truetype(str(BUILD / f"{VARIABLE}.ttf"), size)
    font.set_variation_by_axes([weight])
    return font


def proof(text: str, out: Path, weights: tuple[int, ...] = (300, 400, 700), size: int = 96) -> Path:
    lines = text.split("\n")
    sheet = Image.new("L", (2400, len(weights) * len(lines) * int(size * 1.35) + 40), 255)
    draw = ImageDraw.Draw(sheet)
    y = 20
    for weight in weights:
        font = font_at(weight, size)
        for line in lines:
            draw.text((30, y), line, font=font, fill=0)
            y += int(size * 1.35)
    SPECIMENS.mkdir(exist_ok=True)
    sheet.save(out)
    return out


def atlas(weight: int, out: Path, size: int = 70, columns: int = 22, start: int = 0, count: int = 0) -> Path:
    cmap = sorted(TTFont(BUILD / f"{VARIABLE}.ttf").getBestCmap())
    codes = [c for c in cmap if c > 0x20 and c != 0xAD and c != 0xA0]
    codes = codes[start : start + count] if count else codes
    cell = int(size * 1.5)
    rows = -(-len(codes) // columns)
    sheet = Image.new("L", (columns * cell, rows * cell), 255)
    draw = ImageDraw.Draw(sheet)
    font = font_at(weight, size)
    for i, code in enumerate(codes):
        x, y = (i % columns) * cell, (i // columns) * cell
        draw.rectangle((x, y, x + cell - 1, y + cell - 1), outline=225)
        draw.text((x + cell // 2, y + int(cell * 0.62)), chr(code), font=font, fill=0, anchor="ms")
    SPECIMENS.mkdir(exist_ok=True)
    sheet.save(out)
    return out


if __name__ == "__main__":
    if sys.argv[1] == "atlas":
        weight, name = int(sys.argv[2]), sys.argv[3]
        start = int(sys.argv[4]) if len(sys.argv) > 4 else 0
        count = int(sys.argv[5]) if len(sys.argv) > 5 else 0
        atlas(weight, SPECIMENS / name, start=start, count=count)
    else:
        text = sys.argv[2].replace("\\n", "\n") if len(sys.argv) > 2 else TEXT
        proof(text, SPECIMENS / sys.argv[1])
