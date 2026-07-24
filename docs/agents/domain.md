# Domain Docs

How the engineering skills should consume this repo's domain documentation.

## Before exploring, read these

- **`CONTEXT.md`** at the repo root — the domain glossary.
- **`docs/adr/`** — architecture decision records, if any exist.

If any of these files don't exist, proceed silently.

## File structure

Single-context repo:

```
/
├── CONTEXT.md
├── docs/adr/
└── app/            ← the Vite application
```

## Use the glossary's vocabulary

When naming a domain concept (issue title, test name, module name), use the term
as defined in `CONTEXT.md`. Don't drift to synonyms the glossary avoids.
