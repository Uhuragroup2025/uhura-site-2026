# Uhura Site 2026

Esta carpeta contiene la versión aprobada y el proceso de limpieza progresiva del sitio Uhura.

## Continuidad actual

Antes de continuar el trabajo, leer:

- `README-CONTINUAR.md`

Ese archivo define las paginas vivas, la regla de no crear copias infinitas y que patrones deben centralizarse globalmente.

## Archivos aprobados congelados

Los tres HTML originales quedaron guardados en:

- `approved-snapshot/home-approved.html`
- `approved-snapshot/nosotros-approved.html`
- `approved-snapshot/case-kaiowa-approved.html`

## Ruta de trabajo actual

Regla visual: si cambia visualmente frente a la home aprobada, todavía no sirve.

La home principal actual es:

- `index.html`

Nota: `index.html` ya no debe tratarse como copia intocable del snapshot inicial; es la pagina viva actual y puede recibir ajustes aprobados.

La copia de trabajo segura también es idéntica al snapshot:

- `workbench/home-working.html`

La reconstrucción limpia inicial que no debía reemplazar visualmente la home quedó preservada como:

- `experimental-clean-index.html`

## Páginas vivas / en progreso

- `index.html`
- `nosotros.html`
- `casos/kaiowa.html`
- `servicios/producto-digital.html`
- `servicios/growth.html`
- `servicios/creatividad.html`

`servicios/ai-agents.html` permanece como página planificada, fuera de la
navegación y del sitemap, con `noindex, nofollow` temporal.

## Staging y rastreo

- La publicación de staging usa OpenAI Sites sobre Cloudflare Workers.
- `scripts/build-staging.sh` crea un paquete público por lista permitida,
  conserva `_headers`, aplica su directiva desde el Worker y verifica
  `.assetsignore` antes de empaquetar.
- `_headers` aplica `X-Robots-Tag: noindex, nofollow` a todo el staging.
- `.assetsignore` excluye `archive/`, `approved-snapshot/`, `visual-mirror/` y
  `workbench/` del paquete público.
- `sitemap.xml` contiene únicamente las seis páginas vivas.
- El Home sigue dependiendo de JavaScript para su contenido principal. Para
  staging interno se acepta; antes de producción se debe implementar prerender
  o HTML inicial semántico.

## Espejo visual aprobado

También existe una carpeta de espejo visual sin reinterpretaciones:

- `visual-mirror/index.html`
- `visual-mirror/nosotros.html`
- `visual-mirror/case-kaiowa.html`

## Sistema compartido

- `src/styles/uhura-system.css`: tokens, layout, botones, títulos, badges y responsive.
- `src/extracted/global-nav-sync.js`: única fuente de verdad de la navegación global.
- `src/extracted/footer-sync.js`: única fuente de verdad del footer global.
- `src/components/uhura-components.js`: componentes de contenido compartido; no es owner de navegación ni footer.
- `assets/`: logos, fotos del equipo y assets de casos.

## Extracciones seguras

Estas piezas fueron aisladas desde la home aprobada y forman parte del sistema compartido:

- `src/extracted/home-title-scale.css`
- `src/extracted/global-nav-sync.js`
- `src/extracted/footer-sync.js`

La hoja de ruta vive en:

- `architecture/cleanup-roadmap.md`

Nota: el sistema compartido debe aplicarse progresivamente sobre copias espejo, componente por componente, validando que no haya cambios visuales no deseados.

## Cómo verlo

Abre `index.html` directamente o levanta un servidor desde esta carpeta:

```bash
cd /Users/monsalveuhura/Documents/Codex/2026-06-17/files-mentioned-by-the-user-uhura/uhura-site-2026
python3 -m http.server 8082
```

Luego abre:

```txt
http://localhost:8082/index.html
```
