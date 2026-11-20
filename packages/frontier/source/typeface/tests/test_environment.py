def test_toolchain_imports() -> None:
    import fontmake
    import fontTools
    import pathops
    import ufoLib2

    assert all([fontmake, fontTools, pathops, ufoLib2])
