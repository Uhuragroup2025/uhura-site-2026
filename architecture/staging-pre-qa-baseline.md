# Baseline de QA: staging-pre-qa-baseline

Este documento congela la version de staging aprobada antes de iniciar nuevas
auditorias. Es la referencia oficial para comparar regresiones posteriores.

## Identificacion

- Nombre: `staging-pre-qa-baseline`
- URL: https://uhura-staging-2026.danone-6462.chatgpt.site
- Plataforma: OpenAI Sites sobre Cloudflare Workers
- Acceso: privado; actualmente permitido solo a `paola@uhuragroup.com`
- Fecha y hora del baseline: 2026-07-17 18:36:20 COT (UTC-05:00)
- Fecha y hora UTC: 2026-07-17T23:36:20Z
- Estado del despliegue: exitoso
- Version guardada en Sites: 2
- Commit desplegado: `9f9514dea3bf5a7fef54acce3aaec304a20239bb`
- Hash del paquete desplegado:
  `sha256:8f6db8d20ebd24c1df637c3c17a1ee598c1f584ddeb8989db510f5c10dd26813`
- Referencia Git: tag anotado `staging-pre-qa-baseline`

## Fuente conectada

- Repositorio fuente privado administrado por OpenAI Sites
- Rama conectada: `main`
- Carpeta fuente local: raiz de este repositorio
- Build de staging: `scripts/build-staging.sh`
- Salida publicada: `dist/`

El despliegue no se genera automaticamente al hacer push. Publicar una nueva
version exige guardar explicitamente una version en Sites y desplegarla. Por
lo tanto, cambios posteriores en `main` no sustituyen este baseline por si
solos.

## Paginas incluidas

1. `/index.html`
2. `/nosotros.html`
3. `/casos/kaiowa.html`
4. `/servicios/producto-digital.html`
5. `/servicios/growth.html`
6. `/servicios/creatividad.html`

`/servicios/ai-agents.html` permanece como pagina planificada: esta disponible
para comprobacion directa, pero queda fuera de la navegacion viva y del
`sitemap.xml`.

## Indexacion y estado HTTP verificado

- Las seis paginas vivas responden HTTP 200.
- `robots.txt` y `sitemap.xml` responden HTTP 200.
- Todo el staging entrega `X-Robots-Tag: noindex, nofollow`.
- AI Agents incluye tambien `<meta name="robots" content="noindex, nofollow">`.
- Los canonical y `og:url` apuntan a `https://www.uhuragroup.com/`, no al
  dominio de staging.
- `archive/`, `approved-snapshot/`, `visual-mirror/` y `workbench/` no forman
  parte del paquete publico y sus rutas comprobadas responden HTTP 404.

## Pendientes conocidos

- Home depende de JavaScript para renderizar parte de su contenido principal.
  Para produccion queda pendiente implementar prerender o HTML inicial
  semantico.
- AI Agents sigue en estado planificado, fuera del sitemap y con `noindex`.
- El acceso al staging esta limitado a Paola. Para QA de otras personas se
  deben autorizar revisores o un grupo del workspace.
- Antes de publicar en produccion se debe retirar la proteccion global
  `noindex, nofollow` del entorno que corresponda y repetir la validacion SEO.
- No hay bloqueantes tecnicos conocidos en esta version para QA individual.

## Recuperacion ante una regresion

Opcion preferida, sin reconstruir archivos:

1. Abrir el historial del proyecto en OpenAI Sites.
2. Seleccionar la version guardada 2, asociada al commit
   `9f9514dea3bf5a7fef54acce3aaec304a20239bb`.
3. Desplegar nuevamente esa version en el sitio de staging.
4. Repetir las comprobaciones HTTP, visuales y de navegacion antes de continuar.

Si fuera necesario recuperar tambien el codigo fuente, crear una rama de
restauracion desde el tag `staging-pre-qa-baseline`. No mover `main`, no crear
copias HTML y no desplegar esta referencia en produccion.

## Regla de comparacion

Todas las auditorias posteriores deben comparar sus resultados contra esta
URL, esta version de Sites y el tag `staging-pre-qa-baseline`. Cualquier
diferencia no solicitada en geometria, contenido, componentes, navegacion,
metadata o comportamiento se considera una posible regresion.
