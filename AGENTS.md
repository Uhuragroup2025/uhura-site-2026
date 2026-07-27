# Uhura Site 2026 - Design System Guardrails

These rules apply to every new page and to any component migration.

## Required workflow

Narrative -> Patterns -> Components -> Foundations -> HTML -> Guardrail -> Responsive QA.

Do not start from page-specific HTML or CSS and invent a system afterward.

## Typography

- `--type-display` is reserved for the main Homepage H1.
- Secondary-page H1 titles use `--type-page`.
- Section titles use `--type-section`.
- Subsections use `--type-subsection`.
- Card and sidebar titles use `--type-card`.
- Metrics use `--type-metric`; never use Hero, Display, Page or Section scales.
- New pages must not declare local `font-size`, `line-height`, `letter-spacing` or `clamp()`.
- HTML heading semantics and visual roles are separate responsibilities.

## Components

- Do not use Display, Page, Section, Editorial or Narrative title classes inside cards.
- Do not use Display, Page or Section title classes inside sidebars.
- Do not create local buttons, cards, badges, metrics, panels or sidebars when a global API resolves the need.
- `.button-primary` is contextual: lime on dark and purple/violet on light.
- Card metadata uses the global pixel marker, not the section eyebrow line.
- Dark metrics use a lime value with a white/lavender label.
- Light panels require dark text; dark panels require light text.

## Ownership

- CSS Foundations and components: `src/styles/uhura-system.css`.
- Component behavior: `src/components/uhura-components.js`.
- Architecture and API: `architecture/component-system.md`.
- Visual verification: `workbench/design-system.html`.
- Global navigation and footer remain owned by their extracted files.

Run `scripts/check-design-system.sh <new-page-or-local-css>` before responsive QA.
The guardrail is intentionally simple and does not replace visual or semantic review.
