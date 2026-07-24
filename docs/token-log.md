# Token / cost ledger

Running account of the build. Token/cost figures come from Claude Code's `/cost`
command (authoritative — the model can't read its own counts).

> Note: `/cost` is **session-cumulative** — there is no native per-commit / per-PR
> / per-ticket token attribution. Per-stage deltas only exist if `/cost` is
> snapshotted at each ticket boundary *as the work happens* and subtracted; they
> can't be reconstructed after the fact. This run wasn't snapshotted live, so the
> per-stage column is left `_tbd_` and only an end-of-build total is meaningful.

| Milestone | Issue | Commit | `/cost` snapshot |
|-----------|-------|--------|------------------|
| Repo + workflow setup (spec, tickets, labels) | #1, #9–16 | `beb5146`→`abbacad` | _tbd_ |
| Scaffold app + test tooling | #9 | `feat(#9)` | _tbd_ |
| Tracer bullet: band grid (+ TS migration) | #10 | `feat(#10)` | _tbd_ |
| Top bar chrome | #13 | `feat(#13)` | _tbd_ |
| Search | #11 | `feat(#11)` | _tbd_ |
| Genre filters + combined | #12 | `feat(#12)` | _tbd_ |
| Welcome panel + collapse | #14 | `feat(#14)` | _tbd_ |
| Selected + responsive + error | #15 | `feat(#15)` | _tbd_ |
| Design polish (type specs, gaps, panel height) | — | `style: …` ×3 | _tbd_ |
| README + final verify | #16 | `docs(#16)` | _tbd_ |

> Tip: `/cost` = session tokens + $ cost; `/context` = context-window usage.
