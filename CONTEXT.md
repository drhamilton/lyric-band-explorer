# CONTEXT — Lyric Band Explorer

Domain glossary for the take-home. Use these terms consistently in issues, tests,
component names, and prose.

## Glossary

- **Band** — a musical act shown in the explorer. Sourced from `bands.json`.
  Fields: `id`, `band_name`, `album`, `genre`.
- **Band summary** — the `bands.json` record: `id`, `band_name`, `album`, `genre`.
  Enough to render a card without the detail fetch.
- **Band detail** — the per-band record at `mock_data/<id>.json`: `id`,
  `description`, `album`. Only `001` and `005` have one; all others fall back to
  **default detail text**.
- **Band card** — the grid tile: cover image, band name (accent green), album +
  year line, description. Left/main region of the layout.
- **Cover image** — the band's image in `sources/`. Filename rule:
  `im00${parseInt(id, 10)}.png` (so `010 → im0010.png`, `012 → im0012.png`),
  falling back to `default.png` when absent.
- **Genre filter** — the pill row: `All`, `Country`, `Rock`, `Pop`. One active at
  a time. `All` clears the genre constraint.
- **Search query** — free text filtering bands by `band_name`, combined with the
  active genre filter (AND).
- **Welcome panel** — the right-hand static copy panel ("Welcome to Lyric Music"),
  closable via its `×`. Closing it expands the band grid (stretch goal).
- **Selected band** — a card the user has clicked; rendered with the indigo
  selection border from the design.
- **Icon bar** — the non-functional top-right icons (notifications, settings,
  messages).

## Palette (sampled from `reference/sources/design/layout.png`)

- `bg` `#0f0f10` · `surface` `#181818` · `panel` `#242424` · `card` `#000000`
- `accent` `#007264` (brand green; renders ~`#307064` on black)
- `selected` `#5664f6` · `muted` `#727272`
