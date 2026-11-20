from importlib import import_module

MODULES = ("lower", "upper", "figures", "punctuation", "marks", "symbols", "extended", "variants")


def load() -> None:
    for module in MODULES:
        import_module(f"scripts.design.glyphs.{module}")
