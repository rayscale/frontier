# Frontier Sans

**The typeface of Frontier.**

Frontier Sans is a variable sans-serif with a tall x-height, round bowls, and flat, deliberately cut terminals. It is the typeface of the Frontier design language and is built from source in this directory.

It is original work. It is not derived from Geist, Outfit, Inter, SF, or any other typeface. Those were studied only for how glyphs are generally composed: terminal cuts, stroke contrast, apertures, and optical spacing.

## Contents

- [Features](#features)
- [Usage](#usage)
- [Workflow](#workflow)
- [How it is made](#how-it-is-made)
- [Project layout](#project-layout)
- [Integration with Frontier](#integration-with-frontier)
- [Extending the typeface](#extending-the-typeface)
- [Development](#development)

## Features

- **Variable weight** — One `wght` axis from 300 to 700, with Regular at 400. Light, Regular, and Bold are the masters, and Medium and SemiBold are instances between them.
- **Latin coverage** — Basic Latin, Latin-1, Latin Extended-A, and common punctuation and symbols.
- **OpenType features** — `kern`, `ccmp`, `mark`, `mkmk`, `case`, `tnum`, `pnum`, `zero`, and `ss01`.
- **Figures** — Proportional by default, with tabular figures and a slashed zero available as features.
- **Reproducible builds** — The build pins `SOURCE_DATE_EPOCH`, and a test checks that two builds produce identical bytes.
- **Web and static output** — A variable WOFF2 by default, and static OTF and TTF instances on demand.

## Usage

The Frontier styles already use the typeface through the `--frontier-font-family` token, which lists `'Frontier Sans'`, then `'Outfit Variable'`, then `sans-serif`.

```css
body {
  font-family: var(--frontier-font-family);
  font-variant-numeric: tabular-nums;
}
```

The compiled font files are exported as `@rayscale/frontier/fonts/*`.

## Workflow

Run these from the package (`packages/frontier`) or with `pnpm --filter @rayscale/frontier`.

| Command                        | Description                                                          |
| ------------------------------ | -------------------------------------------------------------------- |
| `pnpm typography:setup`        | Installs the Python dependencies with `uv sync`.                     |
| `pnpm typography:build`        | Generates the sources, compiles the variable font, writes the WOFF2. |
| `pnpm typography:build:static` | Also builds static OTF and TTF instances into `fonts/static/`.       |
| `pnpm typography:test`         | Runs the pytest suite.                                               |
| `pnpm typography:validate`     | Runs FontBakery on the compiled variable TTF.                        |

The toolchain needs [uv](https://docs.astral.sh/uv/) and Python 3.12 or 3.13. uv fetches Python when it is missing.

To change the design, edit the glyph definitions, `features/`, or `scripts/design/metrics.py`. Then run `pnpm typography:build`, `pnpm typography:test`, and `pnpm typography:validate`. Open `specimens/index.html` in a browser, or run `uv run python -m scripts.specimen proof.png`, to look at the result. The generated UFOs and the compiled fonts are output and are never edited by hand.

## How it is made

Each glyph is a stroke skeleton made of lines, elliptical arcs, and Hermite splines, defined in `scripts/design/glyphs/`. `scripts/design/stroke.py` expands a skeleton into an outline with a fixed number of points, so every master has the same contour structure and interpolates cleanly.

The expansion gives horizontal strokes 90% of the weight of vertical ones, cuts terminals horizontally, vertically, or along another stroke, and mitres corners between straight segments. The Light, Regular, and Bold masters share the same skeletons and differ only in stem width, set in `scripts/design/metrics.py`.

Sidebearings come from the open space beside each glyph (`scripts/design/profile.py`), not from values set by hand. Accented letters are composed from Unicode decompositions in `scripts/design/glyphs/extended.py`.

`kern`, `mark`, and `mkmk` are not written by hand. ufo2ft generates them from the kerning and anchors that `scripts/build_sources.py` writes into each UFO. The other features live in `features/`.

## Project layout

```text
typography/
├── pyproject.toml, uv.lock   # Python dependencies, managed by uv
├── scripts/
│   ├── design/               # metrics, stroke expansion, spacing, glyph definitions, kerning
│   ├── build_sources.py      # writes the UFO masters and the Designspace into sources/
│   ├── compile.py            # fontmake build, WOFF2, optional static OTF and TTF
│   ├── optimize.py           # prep and gasp tables
│   ├── validate.py           # FontBakery
│   └── specimen.py           # PNG proofs
├── features/                 # OpenType feature files
├── sources/                  # generated masters and Designspace (not versioned)
├── tests/                    # pytest: coverage, consistency, spacing, kerning, build
├── specimens/                # specimen page and generated proofs
└── fonts/                    # compiled fonts (not versioned)
```

## Integration with Frontier

- `source/styles/fonts.css` declares the `@font-face` for `fonts/FrontierSans-Variable.woff2`.
- `--frontier-font-family` lists Frontier Sans first and Outfit as the fallback.
- `scripts/copy-styles.mjs` copies the WOFF2 to `dist/typography/fonts/`, so the same relative URL works in source and in the built package. Without a build, it warns and text falls back to Outfit.
- `prepublishOnly` builds the font before the package, so the tarball contains it.

## Extending the typeface

**A weight or an axis.** Axes are declared in `scripts/design/axes.py` and masters in `scripts/design/metrics.py`. To add a master on `wght`, add a `Master` and a Designspace source location. To add another axis, such as `wdth` or `opsz`, add an `Axis`, add masters at its extremes, and make the glyph definitions read that axis from the `Frame`. The glyph structure has to stay identical in every master. `tests/test_glyph_definitions.py` and `tests/test_sources.py` fail when it does not.

**A glyph.** Add a function with the `@glyph` decorator in `scripts/design/glyphs/`. Keep tangent-continuous segments inside one stroke, and start a new stroke at a corner between a curve and a line. Rebuild and run the tests. The coverage test lists any missing code point.

## Development

> [!WARNING]
> Frontier Sans is at version 0.1 and has not been reviewed by a type designer.
>
> The glyph set, the build, and the OpenType features are covered by tests, including a check over every glyph in every master. FontBakery reports no failures, with three accepted warnings: no `avar` table, overlapping contours in the variable font, and the presence of a soft hyphen.
>
> Hinting is not done. Kerning is derived by a script and has not been tuned by hand. Some symbols, such as `@`, `&`, `§`, and `¶`, are still rough.
>
> `ss01` does not reach precomposed accented letters.
>
> More information will be added as the typeface progresses.
