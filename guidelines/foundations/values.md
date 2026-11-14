# Values

This page lists the concrete values behind Metric's foundations. Each foundation explains when and
why to use them; this page is the only place where the numbers and colors are stated.

Values are expressed in logical units. An implementation maps them to the units of its platform;
the relationships between values are what the system guarantees.

## Colors

### Neutral palette

| Name     | Value     |
| -------- | --------- |
| Gray 50  | `#f7f7f7` |
| Gray 100 | `#f0f0f0` |
| Gray 200 | `#e4e4e4` |
| Gray 300 | `#d1d1d1` |
| Gray 400 | `#a6a6a6` |
| Gray 450 | `#8f8f8f` |
| Gray 500 | `#6b6b6b` |
| Gray 600 | `#545454` |
| Gray 700 | `#3d3d3d` |
| Gray 800 | `#262626` |
| Gray 900 | `#171717` |
| Gray 950 | `#0b0b0b` |
| White    | `#ffffff` |
| Black    | `#000000` |

### Roles

| Role            | Light     | Dark      |
| --------------- | --------- | --------- |
| Page            | `#ffffff` | `#0b0b0b` |
| Surface         | `#f0f0f0` | `#1a1a1a` |
| Overlay         | `#ffffff` | `#262626` |
| Scrim           | Black 60% | Black 70% |
| Text            | `#171717` | `#f0f0f0` |
| Text muted      | `#545454` | `#a6a6a6` |
| Text subtle     | `#6b6b6b` | `#8f8f8f` |
| Text disabled   | `#8f8f8f` | `#767676` |
| Text inverse    | `#ffffff` | `#171717` |
| Primary         | `#171717` | `#f0f0f0` |
| On primary      | `#ffffff` | `#171717` |
| Primary hover   | `#3d3d3d` | `#d1d1d1` |
| Primary pressed | `#545454` | `#a6a6a6` |
| Highlight       | `#e4e4e4` | `#3d3d3d` |
| Pressed         | `#d1d1d1` | `#545454` |
| Selected        | `#171717` | `#f0f0f0` |
| Selected text   | `#ffffff` | `#171717` |
| Border          | `#767676` | `#767676` |
| Border subtle   | `#d1d1d1` | `#3d3d3d` |
| Border strong   | `#545454` | `#a6a6a6` |
| Border disabled | `#d1d1d1` | `#3d3d3d` |
| Focus           | `#171717` | `#f0f0f0` |
| Danger          | `#b42318` | `#f87171` |
| Danger hover    | `#961c12` | `#fca5a5` |
| Danger pressed  | `#7f1d1d` | `#fecaca` |
| On danger       | `#ffffff` | `#171717` |

Success, warning, and information have no color role. They use the neutral text, icon, and border
roles described in [Colors](./colors.md).

## Spacing

| Step | Value |
| ---- | ----- |
| 0    | 0     |
| 1    | 4     |
| 2    | 8     |
| 3    | 12    |
| 4    | 16    |
| 5    | 20    |
| 6    | 24    |
| 8    | 32    |
| 10   | 40    |
| 12   | 48    |
| 16   | 64    |

## Radius

| Token | Value |
| ----- | ----- |
| All   | 0     |

## Borders

| Token             | Value |
| ----------------- | ----- |
| Functional border | 1     |
| Strong border     | 2     |

## Focus

| Token          | Value |
| -------------- | ----- |
| Outline width  | 2     |
| Outline offset | 2     |

## Controls

| Token          | Value |
| -------------- | ----- |
| Control height | 36    |
| Hit area       | 44    |
| Menu item      | 36    |
| Table row      | 36    |
| Table header   | 40    |
| Checkbox       | 16    |
| Radio          | 16    |
| Switch track   | 36×20 |
| Switch thumb   | 16    |
| Slider track   | 4     |
| Slider thumb   | 16    |

## Surfaces

The system has three surface levels: page, surface, and overlay. Their values are listed under
[Roles](#roles). There is no shadow role.

## Typography

### Sizes and line heights

| Size | Line height |
| ---- | ----------- |
| 12   | 16          |
| 14   | 20          |
| 16   | 24          |
| 20   | 28          |
| 24   | 32          |
| 32   | 40          |
| 40   | 48          |
| 48   | 56          |

### Weight

| Token   | Value |
| ------- | ----- |
| Regular | 400   |

No other weight is part of the system.

### Families

| Role | Value      |
| ---- | ---------- |
| Sans | Geist Sans |
| Mono | Geist Mono |

Numbers are tabular by default.

## Icons

| Token           | Value   |
| --------------- | ------- |
| Grid            | 24      |
| Size inline     | 16      |
| Size control    | 20      |
| Size standalone | 24      |
| Stroke          | 1.5     |
| Caps and joins  | Square  |
| Default form    | Outline |
| Active form     | Filled  |

## Layout

### Breakpoints

| Name     | Width    |
| -------- | -------- |
| Compact  | < 600    |
| Medium   | 600–959  |
| Expanded | 960–1279 |
| Wide     | ≥ 1280   |

### Grid

| Name     | Columns | Margin | Gutter |
| -------- | ------- | ------ | ------ |
| Compact  | 4       | 16     | 16     |
| Medium   | 8       | 24     | 24     |
| Expanded | 12      | 32     | 24     |
| Wide     | 12      | 48     | 32     |

### Reading

| Token           | Value |
| --------------- | ----- |
| Reading measure | 68ch  |

## Layering

| Token   | Value |
| ------- | ----- |
| Sticky  | 10    |
| Overlay | 100   |
| Popup   | 200   |
| Tooltip | 300   |
| Toast   | 400   |

## Motion

Durations are in milliseconds.

### Durations

| Token   | Value |
| ------- | ----- |
| Fast    | 120   |
| Base    | 160   |
| Medium  | 200   |
| Enter   | 240   |
| Exit    | 160   |
| Ambient | 1600  |
| Spinner | 800   |

Fast answers a direct input. Base carries a state change. Medium carries a movement across a
surface. Enter and Exit are used when a temporary surface appears or leaves. Ambient is the slow
rhythm of a loading placeholder. Spinner is the rotation of the indeterminate indicator.

### Curves

| Token    | Value                        |
| -------- | ---------------------------- |
| Standard | `cubic-bezier(0.2, 0, 0, 1)` |
| Exit     | `cubic-bezier(0.4, 0, 1, 1)` |
| Ambient  | `ease-in-out`                |
| Spinner  | Linear                       |

Standard decelerates into its destination without overshoot. Exit accelerates away. Ambient is
symmetric, for looping motion that should not read as urgent.

### Press

| Token  | Value |
| ------ | ----- |
| Travel | 1     |
