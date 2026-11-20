import argparse
import os
import subprocess
import sys
from pathlib import Path

from fontTools.ttLib import TTFont

from scripts.build_sources import ROOT, SOURCES, build_sources
from scripts.optimize import optimize_file

BUILD = ROOT / "build"
FONTS = ROOT / "fonts"
VARIABLE = "FrontierSans[wght]"
WEB_NAME = "FrontierSans-Variable"


def run_fontmake(*args: str) -> None:
    command = [sys.executable, "-m", "fontmake", "-m", str(SOURCES / "FrontierSans.designspace"), *args]
    subprocess.run(command, check=True, cwd=ROOT, env={**os.environ, "SOURCE_DATE_EPOCH": "1767225600"})


def compile_variable() -> Path:
    run_fontmake(
        "-o", "variable", "--output-dir", str(BUILD), "--overlaps-backend", "pathops", "--no-production-names",
    )
    ttf = next(BUILD.glob("FrontierSans*.ttf"))
    target = BUILD / f"{VARIABLE}.ttf"
    ttf.replace(target)
    optimize_file(str(target))
    return target


def to_woff2(ttf: Path) -> Path:
    font = TTFont(ttf, recalcTimestamp=False)
    font.flavor = "woff2"
    FONTS.mkdir(exist_ok=True)
    target = FONTS / f"{WEB_NAME}.woff2"
    font.save(target)
    return target


def compile_static(formats: list[str]) -> None:
    run_fontmake("-i", "-o", *formats, "--output-dir", str(FONTS / "static"), "--overlaps-backend", "pathops")


def main() -> None:
    parser = argparse.ArgumentParser(description="Compile Frontier Sans.")
    parser.add_argument("--static", nargs="*", choices=["otf", "ttf"], help="Also build static instances")
    args = parser.parse_args()
    build_sources()
    BUILD.mkdir(exist_ok=True)
    for stale in BUILD.glob("*.ttf"):
        stale.unlink()
    ttf = compile_variable()
    FONTS.mkdir(exist_ok=True)
    for stale in FONTS.glob("*.woff2"):
        stale.unlink()
    to_woff2(ttf)
    if args.static:
        compile_static(args.static)


if __name__ == "__main__":
    main()
