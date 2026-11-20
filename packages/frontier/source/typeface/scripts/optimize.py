from fontTools.ttLib import TTFont, newTable
from fontTools.ttLib.tables import ttProgram

SMART_DROPOUT = bytes.fromhex("b801ff85b0048d")
GASP_ALL = 0x000F


def optimize(font: TTFont) -> TTFont:
    prep = newTable("prep")
    prep.program = ttProgram.Program()
    prep.program.fromBytecode(SMART_DROPOUT)
    font["prep"] = prep
    gasp = newTable("gasp")
    gasp.version = 1
    gasp.gaspRange = {0xFFFF: GASP_ALL}
    font["gasp"] = gasp
    return font


def optimize_file(path: str) -> None:
    font = TTFont(path, recalcTimestamp=False)
    optimize(font)
    font.save(path)
