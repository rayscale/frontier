# Frontier Sans

Frontier Sans is the typeface of the Frontier design language: a clear, open grotesque with a tall
x-height, round bowls and flat, deliberately cut terminals. It is original work and is not
derived from Geist, Outfit, Inter, SF, or any other typeface; those were studied only for how
glyphs are generally composed (terminal cuts, stroke contrast, apertures, optical spacing).

## Status

Version 0.1. The font is complete for its declared scope and passes its automated checks, but it has
not been reviewed by a type designer.

| Area              | State                                                                                |
| ----------------- | ------------------------------------------------------------------------------------ |
| Coverage          | Basic Latin, Latin-1, Latin Extended-A, and common punctuation and symbols           |
| Axes              | `wght` 300 to 700, default 400. Other axes are not built                             |
| Features          | `kern`, `ccmp`, `mark`, `mkmk`, `case`, `tnum`, `pnum`, `zero`, `ss01`               |
| Verified          | Unit tests, cross-master interpolation compatibility, FontBakery (0 FAIL)            |
| Accepted warnings | No `avar` table, overlapping contours in the variable font, soft hyphen present      |
| Not verified      | Human optical review, hinting, real-world kerning quality, symbol design (`§ ¶ « »`) |
| Known limitations | `ss01` does not reach precomposed accents; kerning is derived by a script            |

Treat the kerning table and the less common symbols as starting points for a designer's pass.

## How it is made

Each glyph is a stroke skeleton: lines, elliptical arcs, and Hermite splines, defined in
`scripts/design/glyphs/`. `scripts/design/stroke.py` expands a skeleton into an outline with a
fixed number of points, so every master has identical contour structure and interpolates cleanly.
The expansion gives horizontal strokes 90% of the weight of vertical ones, cuts terminals
horizontally, vertically, or along another stroke, and mitres corners between straight segments.
The Light, Regular, and Bold masters share the same skeletons and differ only in stem width
(`scripts/design/metrics.py`). Sidebearings are derived from the open space beside each glyph
(`scripts/design/profile.py`) instead of being set by hand.

```text
typography/
├── pyproject.toml, uv.lock   # Python dependencies, managed by uv
├── scripts/
│   ├── design/               # metrics, stroke expansion, spacing, glyph definitions, kerning
│   ├── build_sources.py      # writes the UFO masters and the Designspace into sources/
│   ├── compile.py            # fontmake build, WOFF2, optional static OTF/TTF
│   ├── optimize.py           # prep and gasp tables
│   ├── validate.py           # FontBakery
│   └── specimen.py           # PNG proofs
├── features/                 # OpenType feature files
├── sources/                  # generated masters and Designspace (not versioned)
├── tests/                    # pytest: coverage, consistency, build
├── specimens/                # specimen page and generated proofs
└── fonts/                    # compiled fonts (not versioned)
```

`kern`, `mark`, and `mkmk` are not written by hand: ufo2ft generates them from the kerning and
anchors that `scripts/build_sources.py` writes into each UFO. The other features live in
`features/`.

## Workflow

Run these from the package (`packages/frontier`) or with `pnpm --filter @rayscale/frontier`.

| Command                        | What it does                                                        |
| ------------------------------ | ------------------------------------------------------------------- |
| `pnpm typography:setup`        | Installs the Python dependencies with `uv sync`                     |
| `pnpm typography:build`        | Generates the sources, compiles the variable font, writes the WOFF2 |
| `pnpm typography:build:static` | Also builds static OTF and TTF instances into `fonts/static/`       |
| `pnpm typography:test`         | Runs the pytest suite                                               |
| `pnpm typography:validate`     | Runs FontBakery on the compiled variable TTF                        |

Requirements: [uv](https://docs.astral.sh/uv/) and Python 3.12 or 3.13 (uv fetches Python if
needed). Builds are reproducible: `SOURCE_DATE_EPOCH` is pinned and the test suite checks that two
builds produce identical bytes.

To change the design, edit the glyph definitions, `features/`, or `metrics.py`, then run
`pnpm typography:build`, `pnpm typography:test`, and `pnpm typography:validate`. Open
`specimens/index.html` in a browser, or run `uv run python -m scripts.specimen proof.png`, to look
at the result. Never edit the generated UFOs or the compiled fonts.

## Integration with Frontier

- `source/styles/fonts.css` declares the `@font-face` for `fonts/FrontierSans-Variable.woff2`.
- `--frontier-font-family` lists `'Frontier Sans'`, then `'Outfit Variable'`, then `sans-serif`.
- `scripts/copy-styles.mjs` copies the WOFF2 to `dist/typography/fonts/` so the same relative URL
  works in source and in the published package. Without a build it warns and text falls back to
  Outfit.
- The package exports the font files as `@rayscale/frontier/fonts/*`.
- `prepublishOnly` builds the font before the package so the published tarball contains it.

## Adding a weight or an axis

Axes are declared in `scripts/design/axes.py` and masters in `scripts/design/metrics.py`.
To add a master on `wght`, add a `Master` and a Designspace source location. To add another axis,
such as `wdth` or `opsz`, add an `Axis`, add masters at its extremes, and make the glyph
definitions read that axis from the `Frame`. The glyph structure must stay identical in every
master; `tests/test_glyph_definitions.py` and `tests/test_sources.py` fail when it does not.

## Adding or changing a glyph

Add a function with the `@glyph` decorator in `scripts/design/glyphs/`. Keep tangent-continuous
segments inside one stroke and start a new stroke at a corner; overlapping round caps form the
joins. Composites with accents are derived from Unicode decompositions in `extended.py`. Rebuild and
run the tests; the coverage test lists any missing code point.
