# Spec: Lyric Band Explorer

> Status: ready-for-agent
> Design: `reference/sources/design/layout.png` (Design Challenge V1, desktop)

## Problem Statement

A music-app user wants to browse the bands available in Lyric Music, quickly find
a specific band by name, and narrow the list to a genre they're in the mood for —
all from a single, glanceable screen — while a welcome panel introduces the
product. Today there is no UI; there is only mock data (`bands.json`, per-band
`<id>.json`) and a set of cover images.

## Solution

A single-screen, dark-themed explorer built from the provided design comp:

- A **top bar** with the Lyric logo, a **genre filter** pill row (All / Country /
  Rock / Pop), a **search box**, and a non-functional **icon bar**.
- A **band grid** (main/left region) of **band cards** — cover image, band name,
  album + year, and description — populated dynamically from `bands.json` with
  each band's **band detail** merged in.
- A **welcome panel** (right region) of static copy, closable via its `×`;
  closing it expands the grid (stretch goal).

Search and genre filter combine (AND). Missing images and missing detail JSON
degrade gracefully to defaults.

## User Stories

1. As a Lyric user, I want the band list to load automatically from `bands.json`, so that I see the catalog without any action.
2. As a Lyric user, I want each band card to show the band name and album, so that I can identify the release.
3. As a Lyric user, I want each card to show a cover image matched to the band's id, so that the list is visual and scannable.
4. As a Lyric user, I want a sensible placeholder image when a band has no cover, so that the layout never breaks on missing assets.
5. As a Lyric user, I want each card to show a description pulled from that band's detail file, so that I learn something about the band.
6. As a Lyric user, I want a default description when a band has no detail file, so that every card reads completely.
7. As a Lyric user, I want a search box above the list, so that I can find a band by name.
8. As a Lyric user, I want the list to filter as I type (real-time), so that I get immediate feedback.
9. As a Lyric user, I want search to be case-insensitive and match partial names, so that I don't have to type exactly.
10. As a Lyric user, I want genre filter pills (All / Country / Rock / Pop), so that I can narrow the list to a genre.
11. As a Lyric user, I want exactly one genre active at a time with a clear active style, so that the current filter is obvious.
12. As a Lyric user, I want "All" to clear the genre constraint, so that I can return to the full list.
13. As a Lyric user, I want search and genre to apply together, so that I can search within a genre.
14. As a Lyric user, I want a clear empty state when nothing matches, so that I know the filter worked and isn't broken.
15. As a Lyric user, I want to click a card to select it and see a distinct selected style (indigo border), so that I can mark the one I'm focused on.
16. As a Lyric user, I want a familiar icon bar (notifications, settings, messages) in the top-right, so that the app feels complete — even though the icons are not functional.
17. As a Lyric user, I want a welcome panel of copy on the right, so that I understand what Lyric Music is.
18. As a Lyric user, I want to close the welcome panel with its `×`, so that I can focus on the bands.
19. As a Lyric user, I want the grid to expand to fill the space when the welcome panel is closed, so that I get more browsing room. (stretch)
20. As a Lyric user, I want the layout to remain usable when the browser is resized, so that it works across desktop widths. (responsive)
21. As a Lyric user, I want a graceful error message if the band data fails to load, so that a network problem doesn't show a blank screen.
22. As a developer, I want the data/filtering logic isolated in one testable unit, so that the core rules are verified without the DOM.

## Implementation Decisions

- **Stack**: React + Vite + Tailwind CSS. Icons via `react-icons`. Tests via
  Vitest + React Testing Library. Rationale: instructions prefer React; Vite is a
  fast, low-ceremony SPA baseline; Tailwind matches the utility-first styling need.
- **App location**: new `app/` directory. `reference/` stays untouched as source
  of truth. Mock data and images are copied into `app/public/` at build/dev time
  (or referenced from a copied `public/` set) so the app fetches over HTTP as the
  assignment intends — no bundler imports of the JSON, to keep the "fetch from a
  served folder" behavior explicit.
- **Primary seam — `useBands` data layer** (single seam, highest point):
  - `loadBands()` — fetch `bands.json`; for each band, resolve cover image and
    fetch band detail (with fallbacks); expose `{ bands, status, error }`.
  - `deriveVisibleBands({ bands, query, genre })` — pure function: case-insensitive
    partial name match AND genre match (`all` = no genre constraint). This is the
    unit under test.
- **Image mapping rule** (encodes a real gotcha in the assets): cover filename is
  `im00${parseInt(id, 10)}.png`, NOT the literal `im${id}.png` the instructions
  imply. This yields `001→im001`, `008→im008`, `010→im0010`, `012→im0012`.
  Unknown/absent files fall back to `default.png` via an `onError` handler on the
  `<img>` (belt-and-suspenders with the known set).
- **Band detail fetch + fallback**: fetch `mock_data/<id>.json`; on any failure
  (404 / parse), use a shared default description string. Only `001` and `005`
  have real detail files today; the design shows lorem-style copy for the rest, so
  the default is a short lorem paragraph.
- **Album + year line**: `bands.json` has no year; the design shows "Album, YEAR".
  Render the album from data; where no year exists, show album alone (no invented
  years). Detail JSON `album` matches summary `album`; summary is authoritative.
- **Filter state**: `genre` (`'all' | 'country' | 'rock' | 'pop'`) and `query`
  (string) held in the top-level component; `selectedId` for the selected band;
  `welcomeOpen` boolean for the panel collapse. All UI state co-located at the
  screen root; the data layer is stateless w.r.t. filters.
- **Genre source**: filters are the fixed design set (All/Country/Rock/Pop). Data
  genres (`rock`/`country`/`pop`) map case-insensitively to the pills.
- **Layout**: CSS grid — top bar spanning full width; below it, a two-column
  region: band grid (auto-fill/`minmax` columns, ~3 across at desktop) and a
  fixed-width welcome panel. `welcomeOpen=false` removes the panel column and lets
  the grid reflow to more columns.
- **Error handling**: `loadBands` sets `status='error'` with a message on
  `bands.json` failure; the screen renders an inline error state instead of the
  grid. Per-band detail/image failures never fail the whole load — they fall back.

## Testing Decisions

- **What makes a good test here**: assert external behavior — given inputs, the
  right bands are visible / the right asset path is chosen — never internal call
  order or component structure.
- **`deriveVisibleBands` (primary, pure-unit)**: query-only filtering (case, partial,
  no-match empty), genre-only filtering (each pill, `all`), combined query∩genre,
  and stability of ordering. This is the bulk of the coverage.
- **Image-path resolver (pure-unit)**: `001→im001`, `010→im0010`, `012→im0012`,
  and an id with no known file → the mapped name (with `default.png` as the
  `onError` fallback verified in a component test).
- **Component behavior (RTL, thin)**: typing in search narrows the rendered cards;
  clicking a genre pill switches results and sets the active style; clicking `×`
  removes the welcome panel and the grid reflows; the empty state renders when no
  bands match.
- **Prior art**: none yet (greenfield); these establish the pattern.

## Out of Scope

- Functional icon-bar actions (notifications/settings/messages) — styled only.
- Real backend / persistence — mock JSON over HTTP only.
- Audio playback, playlists, "Coming Soon" destination — visual only.
- Mobile-first / small-breakpoint design — desktop comp only was provided;
  responsiveness means "usable across desktop widths + graceful reflow", not a
  bespoke mobile layout.
- Invented data (e.g. album release years not present in the mock data).
- Routing / multiple pages — single screen.

## Further Notes

- Design comp uses placeholder band names (Imagine Dragons, ODESZA, …); the real
  cards render the mock data (The Velvet Echo, etc.).
- Brand green `#007264`; full palette sampled in `CONTEXT.md`.
- Font: Inter (self-hosted, no CDN) as a close match to the comp's geometric sans.
- Submission: this public repo + a short README with setup instructions.
