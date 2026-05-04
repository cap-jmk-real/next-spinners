---
title: Expo → export mapping
outline: true
---

# Expo demo name → named export

The [upstream Expo demo](https://github.com/Eronred/expo-agent-spinners) names spinners with string keys. This package exposes each as a **PascalCase `*Spinner` component**. Frames and `intervalMs` match that demo unless noted in the main repo.

**Live previews (grouped by origin, rendered in the docs site):** [Spinner gallery](/reference/spinner-gallery).

## Upstream keys (55)

| Expo (demo) key         | Export                       |
| ----------------------- | ---------------------------- |
| `dots`                  | `DotsSpinner`                |
| `dots2`                 | `Dots2Spinner`               |
| `dots3`                 | `Dots3Spinner`               |
| `dots4`                 | `Dots4Spinner`               |
| `dots5`                 | `Dots5Spinner`               |
| `dots6`                 | `Dots6Spinner`               |
| `dots7`                 | `Dots7Spinner`               |
| `dots8`                 | `Dots8Spinner`               |
| `dots9`                 | `Dots9Spinner`               |
| `dots10`                | `Dots10Spinner`              |
| `dots11`                | `Dots11Spinner`              |
| `dots12`                | `Dots12Spinner`              |
| `dots13`                | `Dots13Spinner`              |
| `dots14`                | `Dots14Spinner`              |
| `sand`                  | `SandSpinner`                |
| `bounce`                | `BounceSpinner`              |
| `dots_circle`           | `DotsCircleSpinner`          |
| `wave`                  | `WaveSpinner`                |
| `scan`                  | `ScanSpinner`                |
| `rain`                  | `RainSpinner`                |
| `pulse`                 | `PulseSpinner`               |
| `snake`                 | `SnakeSpinner`               |
| `sparkle`               | `SparkleSpinner`             |
| `cascade`               | `CascadeSpinner`             |
| `columns`               | `ColumnsSpinner`             |
| `orbit`                 | `OrbitSpinner`               |
| `breathe`               | `BreatheSpinner`             |
| `waverows`              | `WaveRowsSpinner`            |
| `checkerboard`          | `CheckerboardSpinner`        |
| `helix`                 | `HelixSpinner`               |
| `fillsweep`             | `FillSweepSpinner`           |
| `diagswipe`             | `DiagSwipeSpinner`           |
| `dqpb`                  | `DqpbSpinner`                |
| `rolling_line`          | `RollingLineSpinner`         |
| `simple_dots`           | `SimpleDotsSpinner`          |
| `simple_dots_scrolling` | `SimpleDotsScrollingSpinner` |
| `arc`                   | `ArcSpinner`                 |
| `balloon`               | `BalloonSpinner`             |
| `circle_halves`         | `CircleHalvesSpinner`        |
| `circle_quarters`       | `CircleQuartersSpinner`      |
| `point`                 | `PointSpinner`               |
| `square_corners`        | `SquareCornersSpinner`       |
| `toggle`                | `ToggleSpinner`              |
| `triangle`              | `TriangleSpinner`            |
| `grow_horizontal`       | `GrowHorizontalSpinner`      |
| `grow_vertical`         | `GrowVerticalSpinner`        |
| `noise`                 | `NoiseSpinner`               |
| `arrow`                 | `ArrowSpinner`               |
| `double_arrow`          | `DoubleArrowSpinner`         |
| `hearts`                | `HeartsSpinner`              |
| `clock`                 | `ClockSpinner`               |
| `earth`                 | `EarthSpinner`               |
| `moon`                  | `MoonSpinner`                |
| `speaker`               | `SpeakerSpinner`             |
| `weather`               | `WeatherSpinner`             |

## Package-only spinners (11)

These do not have an Expo demo key; they exist only in **next-spinners**:

`AuroraSpinner`, `BloomSpinner`, `EchoSpinner`, `FlowSpinner`, `GleamSpinner`, `HaloSpinner`, `NovaSpinner`, `PrismSpinner`, `RandomSpinner`, `RippleSpinner`, `ZenSpinner`.

**Total named spinners:** 70 — 55 Expo lineage + 11 package-only + 4 mixed-frame (`mixed-x-post-pack`).

For **all** [Loading UI](https://loading-ui.com/) and [Dot Matrix](https://dotmatrix.zzzzshawn.cloud/) loader sources (MIT), this repository vendors full upstream trees under `vendor/loading-ui` and `vendor/dot-matrix`—see `vendor/README.md`. They are not re-exported from the `next-spinners` npm entry (frame spinners only).
