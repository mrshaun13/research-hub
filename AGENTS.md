# AGENTS.md

## Project overview

Public library that hosts community-contributed research dashboards. Most of this repo's source tree (`src/`, `package.json`, `vite.config.js`, `eslint.config.js`, `index.html`) is **scaffolded by the research-visualizer skill** — do not edit those files here; edit the skill's scaffold templates and re-scaffold.

What is actually developed in this repo:

- `.github/workflows/process-contributions.yml` — Action that validates and merges contributed projects pushed to the `agent-contributions` branch
- `.github/scripts/validate-research-project.mjs` — validation script the Action runs
- `CONTRIBUTING.md` — human-facing contribution guide
- `LICENSE`, repo-level docs

## Setup commands

For local sanity-check builds of the contributed library only:

- Install: `npm install`
- Dev server: `npm run dev`
- Build: `npm run build`
- Lint: `npx eslint .`

If a build or lint failure originates in `src/components/`, `src/App.jsx`, `src/projects/index.js`, or `eslint.config.js`, the fix belongs in the skill's scaffold templates, not here.

## Where to file concerns

| Concern | Repo |
|---|---|
| Anything inside `src/` (HubHome, flyout, compare view, registry, project data, telemetry rendering) | `research-visualizer` (scaffold templates and pipeline) |
| Pipeline behavior, prompt capture, `meta.json` schema, `hub-gen.mjs` | `research-visualizer` |
| GitHub Actions for processing contributions | `research-hub` (here) |
| `CONTRIBUTING.md`, contribution flow, repo-level docs | `research-hub` (here) |

## Contribution flow

The skill pushes completed research to the `agent-contributions` branch. The Action validates structure + builds, then merges to `main`. See `CONTRIBUTING.md`.
