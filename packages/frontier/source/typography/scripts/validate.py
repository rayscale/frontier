import subprocess
import sys

from scripts.compile import BUILD, VARIABLE

PROFILES = ("check-opentype", "check-universal")


def validate() -> int:
    font = BUILD / f"{VARIABLE}.ttf"
    if not font.is_file():
        sys.stderr.write(f"{font} not found. Run the build first.\n")
        return 2
    status = 0
    for profile in PROFILES:
        command = [
            sys.executable,
            "-m",
            "fontbakery",
            profile,
            "--no-progress",
            "--skip-network",
            "-l",
            "WARN",
            "-e",
            "FAIL",
            str(font),
        ]
        status = max(status, subprocess.run(command, check=False).returncode)
    return status


if __name__ == "__main__":
    sys.exit(validate())
