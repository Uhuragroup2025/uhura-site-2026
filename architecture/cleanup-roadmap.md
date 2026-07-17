# Uhura Site 2026 Cleanup Roadmap

## Status

The current approved homepage is a compiled single-file React build inside `approved-snapshot/home-approved.html`.
The active `index.html` is intentionally an exact mirror of that file.

## Why We Are Not Rebuilding Directly

The approved file contains:

- One large bundled CSS block.
- One bundled React app rendered into `#root`.
- Small late patches for typography and global nav.

Changing the bundled app directly is high-risk because small edits can affect layout, animations, mobile behavior, or asset loading.

## Safe Extraction Order

1. Preserve exact visual mirrors.
2. Extract late patches into sidecar candidates.
3. Normalize shared primitives: typography, nav links, logo marquee, footer.
4. Build reusable pages from the approved visual, one section at a time.
5. Replace bundled sections only after visual parity is confirmed.

## Extracted Candidates

- `src/extracted/home-title-scale.css`
- `src/extracted/global-nav-sync.js`

These are not attached to the active home yet. They exist so we can centralize safely in the next pass.

## Components To Centralize Later

- Global premium nav.
- Typography scale and eyebrow badges.
- Partner/logo marquee.
- Footer CTA block.
- Case study sidebar.
- Light/dark theme transition rules.

## Guardrail

No cleanup is complete until the page still looks like the approved snapshot.
