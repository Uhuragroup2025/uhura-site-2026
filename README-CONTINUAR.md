# Uhura Site 2026 - Guia de continuidad

Este archivo existe para continuar el proyecto sin crear copias infinitas ni perder el criterio visual aprobado.

## Regla principal

Si un cambio altera visualmente lo aprobado sin haberlo pedido, no sirve todavia.

La prioridad es trabajar sobre las paginas vivas, conservar el lenguaje visual de Uhura y centralizar patrones compartidos de forma gradual.

## Paginas vivas oficiales

Estas son las paginas que deben editarse cuando el cambio ya esta aprobado para entrar al sitio:

- Home: `index.html`
- Nosotros: `nosotros.html`
- Caso Kaiowa: `casos/kaiowa.html`
- Servicio Digital Products: `servicios/producto-digital.html`
- Servicio Growth: `servicios/growth.html` (ruta operativa y navegable; continua en evolucion visual y de contenido, no es una pagina final ni congelada)
- Servicio Creatividad: `servicios/creatividad.html`

Estas seis paginas son la fuente operativa del sitio. `servicios/ai-agents.html`
permanece en estado `planned`, fuera de navegacion y sitemap, con
`noindex, nofollow` temporal. Si una nueva pagina entra en produccion, debe
agregarse a esta lista antes de seguir iterando.

## Staging y SEO tecnico

- `_headers` debe acompañar el deploy de staging para aplicar
  `X-Robots-Tag: noindex, nofollow` global.
- `.assetsignore` excluye `archive/`, `approved-snapshot/`, `visual-mirror/` y
  `workbench/` del paquete publico.
- `robots.txt` y `sitemap.xml` no incluyen snapshots, mirrors, workbench ni AI
  Agents mientras siga planificada.
- El Home conserva su composición visual y usa un `h1` real en el titular.
  `src/extracted/home-semantics.js` conecta las acciones y nombres accesibles
  que el bundle heredado no exponía.
- Riesgo aceptado solo para staging interno: el contenido principal del Home
  depende de JavaScript. Antes de produccion se requiere prerender o HTML
  inicial semantico.

## Archivos historicos / no editar

Estos archivos y carpetas son referencia, archivo o pruebas. No se deben usar como fuente de verdad ni editar para cambios de produccion:

- `archive/kaiowa.html`: antes `kaiowa.html` en la raiz; duplicado huerfano, no usar.
- `archive/experimental-clean-index.html`: antes `experimental-clean-index.html`; experimento antiguo, no usar.
- `visual-mirror/*`: referencia visual, no produccion.
- `workbench/*`: pruebas temporales.
- `approved-snapshot/*`: snapshots aprobados, no editar.
- `outputs/uhura-share-preview/*`: export/preview externo.

## No crear mas copias por defecto

Evitar crear archivos tipo `home-final-final.html`, `home-v2.html`, `home-new.html` o variantes similares.

Usar este criterio:

- Ajuste pequeno aprobado: editar la pagina viva.
- Ajuste riesgoso: usar `workbench/` temporalmente y promover solo si se aprueba visualmente.
- Respaldo historico: guardar solo snapshots relevantes en `approved-snapshot/`.
- Prueba que no se aprueba: borrar o dejar documentada como experimental, no usar como fuente.

## Snapshots aprobados

Estos archivos son referencia historica, no el lugar principal de trabajo:

- `approved-snapshot/home-approved.html`
- `approved-snapshot/nosotros-approved.html`
- `approved-snapshot/case-kaiowa-approved.html`
- `approved-snapshot/home-before-wide-grid-promotion.html`

No editarlos salvo que explicitamente se quiera crear un nuevo snapshot aprobado.

## Workbench

`workbench/` es una zona de prueba controlada.

Uso correcto:

- Probar extracciones o cambios de alto riesgo.
- Comparar visualmente contra la pagina viva.
- Promover el candidato a la pagina viva solo cuando el resultado se vea igual o mejor, y este aprobado.

Uso incorrecto:

- Continuar haciendo cambios importantes sobre muchas versiones paralelas.
- Usar un candidato viejo como si fuera la fuente actual.

## Sistema compartido

La intencion es que el sitio tenga patrones globales, no ajustes repetidos pagina por pagina.

Archivos compartidos actuales:

- `src/extracted/global-nav-sync.js`: sincronizacion del menu global.
- `src/extracted/footer-sync.js`: footer global de la home.
- `src/extracted/home-title-scale.css`: escala tipografica para titulos principales y secundarios.
- `src/extracted/partners-marquee.css`: cintillo de partners/logos.
- `src/extracted/wide-grid.css`: ancho de grilla alineado al header.
- `src/extracted/theme-exit-governor.js`: control de transiciones dark/light por salida de seccion.
- `src/extracted/home-service-links.js`: adaptador declarativo multicard que enlaza `Creative Strategy`, `Digital Products` y `Revenue Growth` desde Home hacia sus rutas reales sin tocar el bundle principal.
- `assets/services/previews/`: previews estables del bloque de capacidades de Home. Los archivos externos deben copiarse aqui con nombres versionables antes de enlazarlos.
- `src/styles/uhura-system.css`: tokens y sistema visual base para nuevas paginas limpias.
- `src/components/uhura-components.js`: componentes compartidos en progreso.

## Layout System

El layout debe salir de tokens globales en `src/styles/uhura-system.css`, no de anchos inventados por seccion.

Tokens principales:

- `--layout-gutter`: padding lateral responsive.
- `--layout-narrow`: ancho editorial para textos largos, formularios y lectura profunda.
- `--layout-default`: ancho estandar del sitio, alineado con el header/home.
- `--layout-wide`: ancho para grids, cards, carruseles y bloques visuales.
- `--layout-max`: ancho maximo para composiciones especiales controladas.
- `--section-space`: espaciado vertical estandar.
- `--section-space-tight`: secciones compactas.
- `--section-space-roomy`: secciones de mayor presencia.

Clases reutilizables:

- `.container-narrow`: contenido editorial, formularios, textos largos.
- `.container` / `.container-default` / `.shell`: ancho estandar. `.shell` queda como alias para no romper paginas existentes.
- `.container-wide`: grids, cards, logos, contenido visual.
- `.container-full` / `.container-full-bleed`: heroes, sliders, benchmarks inmersivos o secciones que rompen contenedor.
- `.container-max`: composiciones especiales con limite mayor.
- `.hero-base`: base vertical global para heroes principales.
- `.hero-base__shell`: ancho hero con gutter amplio, alineado al hero de la Home.
- `.hero-base__grid`: grilla 52/48 para heroes de dos columnas.
- `.hero-base__copy` / `.hero-base__media`: columnas internas del hero.
- `.hero-base__story`: bloque narrativo primario del hero.
- `.hero-base__title` / `.hero-base__body`: escala y ritmo editorial del hero.
- `.section`: ritmo vertical estandar.
- `.section-tight`: ritmo compacto.
- `.section-roomy`: ritmo amplio.
- `.section-full`: seccion sin padding vertical automatico.

Regla de uso:

- No usar `max-width` suelto en nuevas secciones si existe una variante del sistema.
- Si una seccion necesita un ancho nuevo, primero evaluar si debe ser `narrow`, `default`, `wide` o `full bleed`.
- Hero Base v1 esta activo. Los heroes principales nuevos deben usar la familia `.hero-base*`.
- La Home sigue siendo la referencia visual aprobada del hero, pero no esta migrada a Hero Base v1.
- Consumidores migrados: Producto Digital, Nosotros y Kaiowa.
- Nuevas paginas no deben crear heroes locales. Deben consumir Hero Base v1 y dejar lo visual propio como contenido del slot correspondiente.
- Si realmente hace falta una nueva variante, crearla como token global antes de aplicarla en una pagina.

Regla importante:

- El menu se modifica en `src/extracted/global-nav-sync.js`.
- El footer se modifica en `src/extracted/footer-sync.js`.
- `index.html`, `nosotros.html` y `casos/kaiowa.html` deben cargar esos mismos archivos.
- No ajustar menu o footer manualmente dentro de una pagina individual salvo que sea una prueba temporal en `workbench/`.
- Cada pagina debe tener un unico mount global `<div id="uhura-footer-root" data-uhura-footer></div>`.
- Ese mount debe vivir fuera de wrappers locales: en Home es hermano de `#root`; en Nosotros, Kaiowa y futuras paginas debe ser hermano final de `main`.
- El footer global se marca con `data-uhura-footer-sync="true"` solo para identificar el componente renderizado.
- La causa raiz del desajuste anterior fue que Home montaba el footer dentro del bundle React mientras Nosotros y Kaiowa usaban un mount fuera de `main`. Home ya no monta footer dentro del wrapper local; ahora usa `#uhura-footer-root` como las demas paginas.
- No usar `footer-sync.js` para corregir overrides locales de ancho, padding o tipografia. Si una pagina trae un footer heredado, se elimina el render local y se deja solo el mount global.
- Validacion actual: Home, Nosotros y Kaiowa tienen un solo mount de footer, cargan `footer-sync.js`, no tienen `<footer>` estatico local y Home no llama el footer heredado del bundle. Para futuras paginas, repetir esta misma regla antes de publicar.

## Component System

El sistema de componentes esta documentado en `architecture/component-system.md`.

Fuentes de verdad:

- `src/styles/uhura-system.css`: tokens, layout, tipografia y clases reutilizables.
- `src/extracted/global-nav-sync.js`: menu global.
- `src/extracted/footer-sync.js`: footer global.
- `src/components/uhura-components.js`: mounts compartidos como el cintillo de partners.

Regla: `src/components/uhura-components.js` no debe definir variantes de nav/footer. Ese archivo solo debe manejar componentes y mounts de contenido. El menu vive en `src/extracted/global-nav-sync.js` y el footer vive en `src/extracted/footer-sync.js`.

Componentes ya formalizados:

- Section Header: `.section-header`, `.section-header.center`, `.section-header.split`, `.eyebrow`, `.section-title`, `.editorial-title`, `.italic`.
- Buttons: `.button-primary`, `.button-secondary`, `.button-ghost`, `.button-cata`, `.cta-row`.
- Cards y panels: `.card`, `.uhura-card`, `.card-padded`, `.card-light`, `.card-dark`, `.panel-light`, `.panel-dark`, `.panel-roomy`.
- Process cards: `.process-grid`, `.process-card`.
- Narrative blocks: `.narrative-section`, `.narrative-grid`, `.narrative-kicker`, `.narrative-title`, `.narrative-copy`.
- Split panels: `.split-panel`.
- Sidebar: `.sidebar`, `.sidebar-card`, `.avatar-row`, `.filter-pills`, `.case-list`.
- Metricas: `.metric`, `.metric-row`, `.metric-bar`, `.metric-bar-item`, `.metric-bar-value`, `.metric-bar-label`.
- Formularios: `.form-grid`, `.field`, `.select-field`.
- Media: `.media-card`, `.shot`.
- Marquee de partners: `[data-expertise-strip]`, `.expertise-strip`, `.expertise-track`, `.expertise-logo`.

Regla:

- No crear una variante nueva de boton, card, badge, sidebar, metrica, formulario, menu, footer o marquee dentro de una pagina individual.
- Si el sitio necesita una variante, primero se registra en `uhura-system.css` y se documenta en `architecture/component-system.md`.
- La home sigue siendo la fuente visual de verdad, pero el bundle heredado debe tocarse con cuidado. Preferir adaptadores compartidos antes que editar el bloque grande.
- Si un componente local tiene una intencion visual unica, documentarlo antes de forzarlo al sistema global.

## Que debe centralizarse

Cuando se detecte una diferencia pequena entre paginas, no resolver con estilos sueltos si puede ser un patron global.

Prioridades de centralizacion:

- Header/menu global: mismo logo, links, estados, animacion de borde, desktop y mobile.
- Footer global: mismo CTA, columnas, links, estilos y espaciado.
- Titulos H1: escala, interlineado, peso, uso de italic editorial.
- Titulos secundarios H2/H3: tamano, ritmo vertical y jerarquia.
- Eyebrows/badges: mayusculas, tracking, color, peso, linea decorativa.
- Copys de parrafo en dark: blanco con opacidad suficiente, no gris demasiado bajo.
- Copys de parrafo en light: color oscuro/lavanda sobrio con contraste.
- Botones/CTAs: estilos premium consistentes, incluyendo CTAs con foto de Catalina.
- Cards: radios, bordes, sombras, padding y comportamiento responsive.
- Cintillo de partners: logos full color, fondo claro suficiente, loop pausado en hover.
- Theme engine: evitar que una seccion visible herede el theme de la siguiente.

## Estado actual por pagina

### Home

Archivo vivo: `index.html`

Estado:

- Es la pagina principal actual.
- Recibio el candidato de grilla ancha.
- Tiene header global, footer global, cintillo partners, theme governor y ajustes recientes del hero.
- Puede requerir detalles minimos de copy, responsive y spacing, pero debe editarse sobre `index.html`, no creando otra home.

Pendiente conocido:

- El H1 del hero ya debe leer completo en tres lineas:
  - `Crecimiento sin limites`
  - `IA, datos y un equipo`
  - `con experiencia`
- Mantener `sin limites` y `experiencia` con la italic editorial actual.
- La card `Digital Products` debe abrir `servicios/producto-digital.html` y la card `Revenue Growth` debe abrir `servicios/growth.html`. Ambos enlaces viven en el adaptador declarativo `src/extracted/home-service-links.js` para evitar editar manualmente el bundle heredado de la home.

### Growth

Archivo vivo tecnico: `servicios/growth.html`

Estado:

- La ruta esta operativa y puede recibir navegacion interna desde Home.
- La pagina continua en evolucion visual y de contenido; declararla viva no significa que este finalizada, aprobada por completo o congelada.
- Growth se renderiza como `Growth Paid Media` dentro del dropdown global `Soluciones`; la ruta tecnica se mantiene bajo `servicios/growth.html`.

### Digital Products

Archivo vivo: `servicios/producto-digital.html`

Estado:

- Pagina de servicio creada para explicar Producto Digital como sistema de crecimiento, no como desarrollo web tradicional.
- Cubre sitios web, ecommerce, productos digitales, UX/UI, contenido para vender e implementacion.
- Usa Layout System, Component System, menu global, footer global y cintillo `[data-expertise-strip]`.
- El footer global y el menu global se cargan con prefijo de ruta `../` mediante los scripts compartidos.
- Hero actualizado con el mensaje `Creamos tiendas, sitios y plataformas que convierten.`. Por decision visual, este hero no lleva CTAs por ahora.
- Hero visual como `Particle orb / sistema digital vivo`: nodos primarios y secundarios, microcopy por hover, lineas orbitales, particulas sutiles y soporte para `prefers-reduced-motion`.
- Hero y capas viven dentro de un mismo wrapper oscuro `product-command-experience` con el background Uhura compartido para evitar cortes visuales entre secciones.
- La pagina ya no debe tratarse como landing plana de cards. La seccion principal de capas ahora es una `Morphing Interface` editorial con pinned scroll: el bloque queda fijo en desktop y las capas cambian una a una con el avance del scroll, sin cards ni visual lateral; la descripcion vive como parrafo debajo del titulo y en mobile queda visible para lectura.
- La seccion de capas debe sentirse como el corazon narrativo de la pagina: `Entendimiento`, `Experiencia`, `Interfaz`, `Contenido`, `Construccion` y `Medicion`.
- `product-light-zone` agrupa assets, plataformas y casos en un solo bloque light continuo.
- La seccion `Framework / Definimos. Disenamos. Construimos. Optimizamos.` fue eliminada de la estructura.
- Los casos de Producto Digital ya no son una grilla local. Usan el mount global `<div data-success-cases></div>`, renderizado desde `src/components/uhura-components.js` y estilado en `src/styles/uhura-system.css`.
- La Home sigue intacta por ahora: su seccion `Casos de exito / Resultados que hablan solos.` vive dentro del bundle heredado y funciona como fuente visual aprobada hasta migrarla con control.
- `data-success-cases` no es una reinterpretacion. Es un componente espejo creado desde la auditoria de la seccion real de Home: DOM, datos, orden, proporciones, cards, metricas, spacing, navegacion, responsive y comportamiento de carrusel.
- `data-success-cases` no define background propio. Debe heredar el ambiente visual del wrapper donde se monta, por ejemplo `product-light-zone`, para que el componente sea portable y no altere el fondo de la pagina.
- Orden del componente espejo: Cristar, Yamaha, Lili Pink, BOSI, Kaiowa y Melendez, respetando el array real extraido de Home.
- Prueba de paridad: `workbench/success-cases-parity.html`.
- El cierre usa el mensaje global de Home: `El siguiente paso / No necesitas mas trafico. Necesitas un sistema que convierta.`

Regla:

- Las paginas bajo `servicios/` deben cargar assets compartidos con prefijo `../`.
- No crear estilos sueltos si el componente ya existe en `uhura-system.css`.
- Success Cases no se recrea visualmente. Se extrae como componente espejo desde la Home aprobada y luego se consume en nuevas paginas.
- Si se modifica fondo, spacing, shadow, card, badge o navegacion de Success Cases, hacerlo en el componente global o en el wrapper padre segun responsabilidad: el componente controla cards/interaccion; el wrapper controla background.
- Si se crea otra pagina de servicio, usar esta como plantilla base estructural, no duplicar variantes visuales del menu, footer, botones o cards.
- Si se ajusta la consola del hero o la narrativa morphing, trabajar sobre `servicios/producto-digital.html`; no crear variantes paralelas salvo prueba temporal en `workbench/`.

### Nosotros

Archivo vivo: `nosotros.html`

Estado:

- Tiene hero con photo wall del equipo.
- Debe usar el mismo header global de la home.
- Debe usar el footer global de la home.
- Tiene ajustes pendientes posibles de centrado, CTAs y consistencia tipografica.

Regla:

- No crear una nueva pagina de nosotros; seguir trabajando sobre `nosotros.html`.

### Caso Kaiowa

Archivo vivo recomendado: `casos/kaiowa.html`

Estado:

- Aun tiene detalles por ajustar.
- Debe evolucionar como plantilla base para futuros casos de estudio.
- Debe sentirse editorial, con menos cajas sueltas y mas narrativa continua.

Regla:

- No crear nuevos `case-kaiowa-v...html`.
- Ajustar sobre el archivo vivo.
- Si hay duplicidad con `kaiowa.html` en raiz, decidir una sola ruta activa y sincronizar/eliminar la otra cuando sea seguro.

## Validacion obligatoria

Despues de tocar HTML con JavaScript embebido, validar que no se rompio la carga:

```bash
node - <<'NODE'
const fs=require('fs');
for (const path of [
  'uhura-site-2026/index.html',
  'uhura-site-2026/nosotros.html',
  'uhura-site-2026/casos/kaiowa.html',
  'uhura-site-2026/servicios/producto-digital.html'
]) {
  if (!fs.existsSync(path)) continue;
  const html=fs.readFileSync(path,'utf8');
  const scripts=[...html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)];
  for (let i=0;i<scripts.length;i++) new Function(scripts[i][1]);
  console.log(path,'JS_OK');
}
NODE
```

Si una pagina queda en blanco, normalmente hay un error de sintaxis en el JS embebido.

## Como verlo

Abrir directo:

- `index.html`
- `nosotros.html`
- `casos/kaiowa.html`
- `servicios/producto-digital.html`

O levantar servidor local desde esta carpeta:

```bash
cd /Users/monsalveuhura/Documents/Codex/2026-06-17/files-mentioned-by-the-user-uhura/uhura-site-2026
python3 -m http.server 8082
```

Abrir:

```txt
http://localhost:8082/index.html
```

## Criterio para el proximo Codex

Antes de editar:

1. Leer este archivo.
2. Confirmar cual es la pagina viva.
3. Revisar si el cambio debe ser global o local.
4. Evitar crear copias nuevas salvo que sea una prueba riesgosa.
5. Validar JS y abrir visualmente.

La meta no es tener mas archivos. La meta es tener una version viva, limpia y consistente.

## Ultimo ajuste Producto Digital

- Hero visual mantiene el orb/halo de particulas como pieza principal.
- Se eliminaron del hero los chips `Analytics` y `Marketplace`.
- Se elimino la frase `No piezas aisladas · sistema completo` de la estructura, no queda oculta por CSS.
- El aro de particulas usa microparticulas en tonos blancos con densidad optimizada para performance: 420 puntos en desktop y 180 en mobile, menor DPR interno, conexiones reducidas y pausa automatica fuera de viewport.
- Los chips activos del hero quedan balanceados en 8 señales: UX, UI, Ecommerce, Data, IA, Performance, SEO e Integraciones.
