# Token / cost ledger

Running account of the build. Token/cost figures come from Claude Code's `/cost`
command (authoritative — the model can't read its own counts). Run `/cost` at a
milestone and paste the number in the "cost snapshot" column to get per-stage
deltas.

| Milestone | Issue | Commit | `/cost` snapshot |
|-----------|-------|--------|------------------|
| Repo + workflow setup (spec, tickets, labels) | #1, #9–16 | `beb5146`→`abbacad` | _tbd_ |
| Scaffold app + test tooling | #9 | `feat(#9)` | _tbd_ |
| Tracer bullet: band grid (+ TS migration) | #10 | `feat(#10)` | _tbd_ |
| Top bar chrome | #13 | `feat(#13)` | _tbd_ |
| Search | #11 | _pending_ | _tbd_ |
| Genre filters + combined | #12 | _pending_ | _tbd_ |
| Welcome panel + collapse | #14 | _pending_ | _tbd_ |
| Selected + responsive + error | #15 | _pending_ | _tbd_ |
| README + final verify | #16 | _pending_ | _tbd_ |

> Tip: `/cost` = session tokens + $ cost; `/context` = context-window usage.
