# AGENTS.md

## Cursor Cloud specific instructions

This repository is a **static portfolio website** (plain HTML/CSS/vanilla JS). There is
no package manager, no build step, and no backend to compile — the pages are served
as-is.

### Structure
- `index.html` — main portfolio page (hero/starfield canvas, project filters, JPA demo modal, contact links).
- `dashboard.html` — analytics dashboard (reads visit data from Firebase Firestore, renders Chart.js).
- `mespensees.html` — case-study page for the "MesPensees" project.
- `style.css` — shared styles (Tailwind is loaded from a CDN, not built locally).
- `images/`, `TECH/`, `stitch*/` — static assets and PDFs.

### External dependencies (all via CDN, no local install)
- Tailwind CSS (`cdn.tailwindcss.com`) — the console warning "cdn.tailwindcss.com should not be used in production" is expected and harmless in dev.
- Firebase App/Firestore (`gstatic.com/firebasejs`) — the Firebase config keys in `index.html`/`dashboard.html` are public client keys (safe to be in the source of a client-side web app).
- Chart.js and Font Awesome via CDN.

### Running locally
The pages use ES module `import` and `fetch`, so they must be served over HTTP —
opening the files via `file://` will break the Firebase modules. Serve the repo root
with any static server, e.g.:

```
python3 -m http.server 8000
```

Then open `http://localhost:8000/index.html`. Requires network access for the CDN/Firebase
assets to load and for full styling/analytics to work.

### Lint / test / build
There is no lint, test, or build tooling configured in this repo. "Building" is just
serving the static files.
