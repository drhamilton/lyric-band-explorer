# Issue tracker: GitHub

Issues and specs (PRDs) for this repo live as GitHub issues on
`drhamilton/lyric-band-explorer`. Use the `gh` CLI for all operations.

## Conventions

- **Create an issue**: `gh issue create --title "..." --body "..."`. Use a heredoc for multi-line bodies.
- **Read an issue**: `gh issue view <number> --comments`.
- **List issues**: `gh issue list --state open --json number,title,body,labels`.
- **Comment on an issue**: `gh issue comment <number> --body "..."`
- **Apply / remove labels**: `gh issue edit <number> --add-label "..."` / `--remove-label "..."`
- **Close**: `gh issue close <number> --comment "..."`

`gh` infers the repo from `git remote -v` when run inside the clone.

## PRs as a request surface: no.

## When a skill says "publish to the issue tracker"

Create a GitHub issue.

## When a skill says "fetch the relevant ticket"

Run `gh issue view <number> --comments`.

## Label vocabulary

The `triage` skill is not installed, so the full triage flow is not in use. The
`to-spec` skill applies `ready-for-agent` to a completed spec; `to-tickets`
applies it to implementation-ready tickets. Additional labels used here:

- `spec` — the PRD issue
- `ticket` — an implementation ticket derived from the spec
