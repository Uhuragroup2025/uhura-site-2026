# Uhura Workbench

This folder is the safe work area for the approved visual version.

## Current Rule

The approved home is the source of truth. If a candidate changes visually, it is not ready.

## Files

- `home-working.html`: byte-for-byte copy of `../approved-snapshot/home-approved.html`.
- `home-candidate-nav.html`: first candidate with the global nav patch externalized to `../src/extracted/global-nav-sync.js`.
- `home-candidate-nav-type.html`: second candidate with global nav and typography scale externalized.
- `home-candidate-nav-type-partners.html`: third candidate with nav, typography and partner marquee styles externalized.
- `home-candidate-nav-type-partners-footer.html`: fourth candidate with footer sync externalized.
- `home-candidate-wide-grid.html`: fifth candidate with the homepage shell width aligned to the header scale.

## Workflow

1. Keep `../approved-snapshot/home-approved.html` untouched.
2. Keep `../index.html` as the current public mirror of the approved home.
3. Test structural cleanup in new candidate files only.
4. Promote a candidate only after visual review.

## Candidate Log

### home-candidate-nav.html

Change:

- Replaced the inline `uhura-global-nav-sync` script with an external script reference.

Expected visual result:

- No visual change.
- Same centered premium header.
- Same nav labels: Casos de éxito, Partners, Nosotros.

Promotion condition:

- If it looks identical to the approved home, use this pattern for the global nav across pages.

Status:

- Visually approved by user.

### home-candidate-nav-type.html

Change:

- Keeps the externalized global nav.
- Replaces the inline title scale styles with `../src/extracted/home-title-scale.css`.

Expected visual result:

- No visual change.
- Same H1, H2 and responsive heading scale.

Promotion condition:

- If it looks identical to `home-candidate-nav.html`, typography can become the second shared primitive.

Status:

- Visually approved by user.

### home-candidate-nav-type-partners.html

Change:

- Keeps the externalized global nav.
- Keeps the externalized title scale.
- Moves the partner/logo marquee CSS to `../src/extracted/partners-marquee.css`.

Expected visual result:

- No visual change.
- Same logo size, spacing, hover pause and scrolling speed.

Promotion condition:

- If it looks identical to `home-candidate-nav-type.html`, the partner/logo marquee CSS can become the third shared primitive.

Status:

- Visually approved by user.

### home-candidate-nav-type-partners-footer.html

Change:

- Keeps the externalized global nav.
- Keeps the externalized title scale.
- Keeps the externalized partner/logo marquee CSS.
- Adds `../src/extracted/footer-sync.js`, which replaces the rendered footer after mount.

Expected visual result:

- Footer should look like the approved home footer.
- Same columns, CTA band, bottom line and hover interactions.

Promotion condition:

- If the footer looks identical, footer sync can become the fourth shared primitive.

Status:

- Visually approved by user.

### home-candidate-wide-grid.html

Change:

- Keeps the externalized global nav, title scale, partner marquee and footer sync.
- Adds `../src/extracted/wide-grid.css` to widen 1200px homepage shells to the header-aligned layout scale.
- Adds `../src/extracted/theme-exit-governor.js` to delay dark/light mood changes until the current visible section is almost out of the viewport.
- Compacts the services module and lets the three upper service cards span the same header-aligned grid width as the AI card.
- Adds the Catalina CTA under the growth leak cards and normalizes section spacing for a steadier homepage rhythm.
- Updates the AI service card copy to "AI + Data + Criterio" and replaces the old vertical service flow with a compact decision graph: IA, Data, Criterio, Ejecucion and Resultados.

Expected visual result:

- More horizontal presence across sections and footer.
- Text readability remains intact because inner copy widths are not expanded.
- Creative Strategy, Digital Products, Revenue Growth and the AI card should fit better in the viewport as one cohesive services block.
- The "Antes de crecer" block should include a premium "Revisémoslo juntos" CTA with Catalina's circular photo.
- The AI card should feel more like a premium analytics/decision system, with subtle node pulses and thin signal lines instead of the previous process checklist.
- IA remains dark while the AI card is still visible.
- Logos/results remain light while the light block is still visible.
- No mobile layout change.

Promotion condition:

- If the homepage feels wider without changing the visual language, this becomes the shared shell width rule.
