import sys
from pathlib import Path

import ufoLib2
from fontTools.designspaceLib import (
    AxisDescriptor,
    AxisLabelDescriptor,
    DesignSpaceDocument,
    InstanceDescriptor,
    SourceDescriptor,
)
from ufoLib2.objects import Anchor, Component

from scripts.design.axes import AXES
from scripts.design.glyph import GLYPHS, GlyphSpec, Rendered, placement, render
from scripts.design.glyphs import load
from scripts.design.kerning import apply_kerning, kern_values
from scripts.design.metrics import CAP_HEIGHT, MASTERS, UPM, X_HEIGHT, Master
from scripts.design.stroke import Contour, Segment

ROOT = Path(__file__).resolve().parent.parent
SOURCES = ROOT / "sources"
FAMILY = "Frontier Sans"
SPACE_ADVANCE = 250
FEATURES = ("prefix", "ccmp", "case", "numerals", "stylistic")
INSTANCES = {"Light": 300, "Regular": 400, "Medium": 500, "SemiBold": 600, "Bold": 700}


def rect(x0: float, y0: float, x1: float, y1: float, clockwise: bool) -> Contour:
    corners = [(x0, y0), (x0, y1), (x1, y1), (x1, y0)]
    if not clockwise:
        corners.reverse()
    corners.append(corners[0])
    return [Segment((a, b)) for a, b in zip(corners, corners[1:], strict=False)]


def notdef(master: Master) -> Rendered:
    t = master.stem * 0.6
    outer = rect(60, 0, 520, CAP_HEIGHT, True)
    inner = rect(60 + t, t, 520 - t, CAP_HEIGHT - t, False)
    return Rendered([outer, inner], 580, {})


def draw_contours(glyph: ufoLib2.objects.Glyph, contours: list[Contour], dx: float = 0, dy: float = 0) -> None:
    pen = glyph.getPointPen()
    for contour in contours:
        pen.beginPath()
        for segment in contour:
            offcurves, end = segment.points[1:-1], segment.points[-1]
            for point in offcurves:
                pen.addPoint((round(point[0] + dx, 2), round(point[1] + dy, 2)))
            kind = "curve" if segment.curve else "line"
            pen.addPoint((round(end[0] + dx, 2), round(end[1] + dy, 2)), segmentType=kind)
        pen.endPath()


class Resolver:
    def __init__(self, master: Master) -> None:
        self.master = master
        self.cache: dict[str, Rendered] = {}

    def get(self, name: str) -> Rendered:
        if name not in self.cache:
            spec = GLYPHS[name]
            if spec.components:
                self.cache[name] = self.composite(spec)
            else:
                self.cache[name] = render(spec, self.master)
        return self.cache[name]

    def composite(self, spec: GlyphSpec) -> Rendered:
        (base_name, _), (mark_name, place) = spec.components
        base, mark = self.get(base_name), self.get(mark_name)
        dx, dy = placement(base, mark, place)
        advance = base.advance
        right = max(base.bounds[2], mark.bounds[2] + dx)
        if place == "right":
            advance = right + (base.advance - base.bounds[2])
        elif place == "after":
            advance = base.advance + mark.advance
        anchors = {k: v for k, v in base.anchors.items()}
        if place == "above":
            anchors["top"] = (anchors["top"][0], mark.bounds[3] + dy)
        bounds = (
            min(base.bounds[0], mark.bounds[0] + dx),
            min(base.bounds[1], mark.bounds[1] + dy),
            right,
            max(base.bounds[3], mark.bounds[3] + dy),
        )
        result = Rendered([], advance, anchors, bounds)
        result.parts = [(base_name, 0.0, 0.0), (mark_name, dx, dy)]
        return result


def glyph_order() -> list[str]:
    named = sorted((min(s.unicodes), n) for n, s in GLYPHS.items() if s.unicodes)
    unnamed = sorted(n for n, s in GLYPHS.items() if not s.unicodes)
    return [".notdef"] + [n for _, n in named] + unnamed


def build_master(master: Master, order: list[str], resolver: Resolver) -> ufoLib2.Font:
    font = ufoLib2.Font()
    info = font.info
    info.familyName = FAMILY
    info.styleName = master.style
    info.unitsPerEm = UPM
    info.ascender = 970
    info.descender = -260
    info.xHeight = X_HEIGHT
    info.capHeight = CAP_HEIGHT
    info.versionMajor, info.versionMinor = 0, 1
    info.copyright = "Copyright (c) Rayscale. Frontier Sans is part of Frontier."
    info.openTypeNameLicense = "MIT License"
    info.openTypeNameDesigner = "Rayscale"
    info.openTypeOS2WeightClass = master.wght
    info.openTypeOS2TypoAscender = 970
    info.openTypeOS2TypoDescender = -260
    info.openTypeOS2Selection = [7]
    info.openTypeOS2TypoLineGap = 0
    info.openTypeOS2WinAscent = 1010
    info.openTypeOS2WinDescent = 280
    info.openTypeHheaAscender = 970
    info.openTypeHheaDescender = -260
    info.openTypeHheaLineGap = 0
    info.postscriptUnderlinePosition = -100
    info.postscriptUnderlineThickness = round(master.stem * 0.6)
    font.lib["public.glyphOrder"] = order
    for name in order:
        glyph = font.newGlyph(name)
        if name == ".notdef":
            rendered = notdef(master)
            glyph.width = rendered.advance
            draw_contours(glyph, rendered.contours)
            continue
        spec = GLYPHS[name]
        glyph.unicodes = list(spec.unicodes)
        rendered = resolver.get(name)
        glyph.width = round(rendered.advance)
        if spec.components:
            for part, dx, dy in rendered.parts:
                glyph.components.append(Component(part, transformation=(1, 0, 0, 1, round(dx, 2), round(dy, 2))))
        else:
            draw_contours(glyph, rendered.contours)
        if not spec.combining or spec.mark:
            for anchor_name, (ax, ay) in rendered.anchors.items():
                glyph.appendAnchor(Anchor(round(ax, 2), round(ay, 2), name=anchor_name))
    font.features.text = "".join(f"include(../features/{name}.fea);\n" for name in FEATURES)
    return font


def build_designspace() -> None:
    doc = DesignSpaceDocument()
    for axis in AXES:
        doc.addAxis(
            AxisDescriptor(
                tag=axis.tag,
                name=axis.name,
                minimum=axis.minimum,
                default=axis.default,
                maximum=axis.maximum,
                labelNames={"en": axis.name},
                axisLabels=[
                    AxisLabelDescriptor(name=label, userValue=value, elidable=value == axis.default)
                    for value, label in axis.labels
                ],
            )
        )
    for master in MASTERS.values():
        doc.addSource(
            SourceDescriptor(
                filename=f"FrontierSans-{master.style}.ufo",
                familyName=FAMILY,
                styleName=master.style,
                location={"Weight": master.wght},
            )
        )
    for style, wght in INSTANCES.items():
        doc.addInstance(
            InstanceDescriptor(
                familyName=FAMILY,
                styleName=style,
                filename=f"instances/FrontierSans-{style}.ufo",
                location={"Weight": wght},
            )
        )
    doc.write(SOURCES / "FrontierSans.designspace")


def build_sources() -> None:
    load()
    SOURCES.mkdir(exist_ok=True)
    order = glyph_order()
    masters = list(MASTERS.values())
    resolvers = [Resolver(m) for m in masters]
    fonts = [build_master(m, order, r) for m, r in zip(masters, resolvers, strict=True)]
    apply_kerning(fonts, [kern_values(r) for r in resolvers])
    for master, font in zip(masters, fonts, strict=True):
        font.save(SOURCES / f"FrontierSans-{master.style}.ufo", overwrite=True)
    build_designspace()


if __name__ == "__main__":
    build_sources()
    sys.stdout.write(f"Built {len(GLYPHS) + 1} glyphs into {SOURCES}\n")
