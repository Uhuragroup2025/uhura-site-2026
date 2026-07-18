# Uhura Component System

Este documento define los componentes reutilizables del sitio. La regla es simple: si un elemento se repite, debe salir de este sistema antes de crear una variante local.

## Fuentes de verdad

- Tokens, layout, tipografia y componentes CSS: `src/styles/uhura-system.css`
- Menu global: `src/extracted/global-nav-sync.js`
- Footer global: `src/extracted/footer-sync.js`
- Cintillo de partners y mounts simples: `src/components/uhura-components.js`
- Paginas vivas: `index.html`, `nosotros.html`, `casos/kaiowa.html`, `servicios/producto-digital.html`, `servicios/growth.html`, `servicios/creatividad.html`

Nota: la home conserva un bundle heredado. No editar ese bloque grande salvo que sea necesario. Los componentes nuevos deben agregarse como sistema compartido o adaptadores externos.

## Foundations

Foundations gobierna las decisiones base del sistema visual. Antes de crear una clase local, revisar si la necesidad corresponde a una fundacion existente.

| Fundacion | Estado | Fuente actual | Regla |
| --- | --- | --- | --- |
| Color | Activo | Tokens `--uhura-*` en `src/styles/uhura-system.css` | No inventar colores locales fuera de la paleta Uhura. |
| Typography | Activo | Tokens `--type-*` y clases tipograficas | La escala visual sale del sistema, no de `font-size` inline. |
| Spacing | Activo parcial | Tokens `--section-*`, `--layout-*`, `--hero-*` | Usar ritmo global antes de crear padding local. |
| Radius | Activo parcial | Tokens `--component-*-radius`, `--radius` | Los radios deben venir de componentes o tokens. |
| Shadow | Activo parcial | Tokens `--component-shadow-*` | La elevacion debe tener jerarquia, no decoracion libre. |
| Blur | Activo parcial | Cards glass, nav y superficies compartidas | Usar blur solo cuando mejore profundidad sin perder contraste. |
| Opacity | Activo parcial | Muted colors y borders rgba | No bajar contraste de lectura por atmosfera. |
| Z-index | Pendiente | Nav y capas locales | Debe formalizarse antes de sumar overlays complejos. |
| Motion | Backlog aprobado | Hover, orb, sticky, scroll storytelling | No crear motion nuevo sin mapearlo al sistema. |
| Layout | Activo | Containers, hero, section y grid tokens | No usar `max-width` suelto si existe variante global. |

### Typography System

La escala tipografica oficial vive en `src/styles/uhura-system.css`. El HTML puede usar `h1`, `h2`, `h3` o `h4` por semantica, pero la escala visual debe venir de clases y tokens del sistema.

#### Typography & Spacing Foundations v1

La semantica HTML y el rol visual son responsabilidades separadas. Una etiqueta expresa estructura documental; una clase de rol consume la escala visual. Los componentes nuevos no deben crear `clamp()` tipograficos propios si uno de estos roles resuelve su jerarquia.

| Rol | Token | Valor inicial | Consumidores migrados |
| --- | --- | --- | --- |
| Display | `--type-display` | `clamp(34px, 4.1vw, 56px)` | `.display-title` |
| Page | `--type-page` | `clamp(36px, 4vw, 54px)` | `.hero-base__title`, `.progressive-narrative__title` |
| Section | `--type-section` | `clamp(30px, 3.2vw, 44px)` | `.section-title`, `.editorial-title`, `.narrative-title` |
| Subsection | `--type-subsection` | `clamp(25px, 2.4vw, 34px)` | `.subsection-title` |
| Card | `--type-card` | `clamp(20px, 2vw, 28px)` | `.card-title` |
| Body large | `--type-body-lg` | `clamp(17px, 1.35vw, 20px)` | `.body-large` |
| Body | `--type-body` | `clamp(16px, 1.25vw, 19px)` | `.copy` |
| Small | `--type-small` | `13px` | `.small` |
| Caption | `--type-caption` | `12px` | `.caption` |
| Eyebrow | `--type-eyebrow` | `11px` | `.eyebrow` |
| Label | `--type-label` | `11px` | labels y aliases legacy |

Leading: `--leading-display: 1.06`, `--leading-page: 1.04`, `--leading-section: 1.08`, `--leading-subsection: 1.14`, `--leading-card: 1.16`, `--leading-body: 1.82`.

Measures: `--measure-display: 900px`, `--measure-section: 760px`, `--measure-body: 680px`, `--measure-body-narrow: 520px`.

Stacks: `--stack-eyebrow-title: 22px`, `--stack-title-body: 30px`, `--stack-body-actions: 32px`, `--stack-item: clamp(34px, 7vw, 64px)`.

Spacing base: `--space-1` a `--space-14`, desde `4px` hasta `160px`. El ritmo de secciones conserva `--section-space-tight`, `--section-space` y `--section-space-roomy`.

Rangos oficiales:

- Wide: `>= 1440px`.
- Laptop: `981px` a `1439px`.
- Tablet: `761px` a `980px`.
- Mobile: `<= 760px`.
- Los roles tipograficos usan interpolacion continua y nunca aumentan al entrar en un rango menor.
- Los breakpoints cambian layout o modo de interaccion, no crean una segunda escala tipografica local.
- `--type-h1-size`, `--type-h2-size`, `--type-h3-size`, `--type-h4-size` y los aliases `--type-*-size` anteriores permanecen como puente para Home y consumidores pendientes; no son la API para componentes nuevos.
- Home, `home-title-scale.css`, navegacion, footer, metricas, visuales circulares, Kaiowa local y excepciones de Growth quedan pendientes para Fase 3 despues de staging.

Asignacion oficial: Display Title usa `--type-display`; Hero Base y Progressive Narrative usan `--type-page`; Section, Editorial y Narrative Title usan `--type-section`; Subsection y Card Title usan sus tokens homonimos. Progressive Narrative no define un clamp responsive propio.

#### Jerarquia visual oficial

La jerarquia visual del sitio debe leerse en este orden:

```txt
Display Title
↓
Page Title
↓
Section Title
↓
Subsection Title
↓
Card Title
↓
Body Large
↓
Body
↓
Small
↓
Caption
```

Esta piramide no reemplaza la semantica HTML. `.editorial-title` y `.narrative-title` expresan Section Title; `.hero-base__title` y `.progressive-narrative__title` expresan Page Title.

#### Typography Tokens

Los tokens legacy de esta tabla se conservan como compatibilidad para consumidores aun no migrados. Componentes nuevos deben usar los roles de Foundations v1.

| Token | Uso base | Regla de uso | Restriccion |
| --- | --- | --- | --- |
| `--type-h1-size` | Alias legacy de Display. | Puente para Home. | No usar en componentes nuevos. |
| `--type-h2-size` | Alias legacy de Section. | Puente para consumidores pendientes. | No usar en componentes nuevos. |
| `--type-h3-size` | Escala secundaria. | Base de `h3` / `.h3`. | No usar para reemplazar un titulo principal de seccion. |
| `--type-h4-size` | Escala compacta de titulo. | Base de `h4` / `.h4`. | Debe ser la escala alta maxima dentro de sidebars. |
| `--type-body-large-size` | Intro o body destacado. | Base de `.body-large`. | No debe competir con titulos compactos. |
| `--type-body-size` | Body estandar. | Base de `.copy`. | No crear body inline por pagina. |
| `--type-small-size` | Texto auxiliar. | Base de `.small`. | No usar para esconder contenido relevante. |
| `--type-caption-size` | Metadata o texto secundario. | Base de `.caption`. | No usar como parrafo principal. |
| `--type-label-size` | Eyebrows y labels de sistema. | Base de `.eyebrow` y labels pequenos. | No usar como titulo visual. |
| `--type-badge-size` | Badges, pills y metadata compacta. | Base de `.badge` / `.label`. | No usar para headings. |
| `--type-button-size` | Texto de CTAs y botones. | Base de `.button-*`. | No usar como escala editorial. |
| `--type-menu-size` | Navegacion global. | Base de links del menu. | No usar dentro de contenido de pagina. |

#### Typography Components

Los componentes tipograficos aplican los tokens a contextos concretos. Su frecuencia ayuda a evitar que una pagina tenga demasiados niveles compitiendo entre si.

| Clase / token | Uso | Frecuencia | Content width | Regla de uso | Restriccion |
| --- | --- | --- | --- | --- | --- |
| `.display-title` / `--type-display` | Hero principal o titulo dominante de pagina. | 1 por pagina. | Hero o composicion dominante; idealmente 10-12 columnas segun layout. | Usar para el mensaje principal de una pagina o experiencia. | No usar dentro de cards, sidebars, modales o bloques compactos. |
| `.section-title` / `--type-section` | Titulo principal de seccion. | 1 por seccion; aprox. 1-6 por pagina. | Maximo editorial recomendado: 8 columnas. | Usar para abrir secciones completas dentro del flujo principal. | No usar dentro de cards ni sidebars. |
| `.editorial-title` / `--type-section` | Titulo editorial con intencion narrativa. | 0-4 por pagina. | 7-9 columnas, segun densidad narrativa. | Usar cuando el titulo necesita una voz mas editorial o reflexiva. | No duplicar como clase local por pagina. |
| `h3` / `.h3` / `--type-h3-size` | Subtitulos, cards amplias o bloques secundarios. | Flexible. | 5-8 columnas; dentro de card, respetar el ancho del modulo. | Usar para jerarquia secundaria dentro de secciones y modulos de contenido. | No reemplaza a `.section-title` para abrir una seccion completa. |
| `h4` / `.h4` / `--type-h4-size` | Titulos pequenos, sidebar y cards compactas. | Ilimitado con criterio. | Card/sidebar/modulo compacto. | Usar en modulos laterales, cards compactas, labels con titulo y bloques de baja jerarquia. | Sidebar nunca debe usar `.display-title` ni `.section-title`; sus titulos deben usar `h4` / `.h4` o una variante compacta registrada. |
| `.body-large` / `--type-body-large-size` | Intro o parrafo destacado. | 0-2 por seccion. | Maximo recomendado: 60-70ch. | Usar para bajadas principales, intros de seccion o copy de alto enfasis. | No usar en sidebar si compite visualmente con el body principal. |
| `.copy` / `--type-body-size` | Body estandar. | Ilimitado. | Maximo recomendado: 65-75ch. | Usar como parrafo base del sitio, tanto en dark como en light. | No crear `font-size` inline para parrafos; si el body necesita otra escala, debe subir al sistema. |
| `.small` / `--type-small-size` | Texto auxiliar. | Ilimitado. | Maximo recomendado: 50-65ch. | Usar para notas, microcopy o texto de apoyo. | No usar como solucion para esconder contenido importante. |
| `.caption` / `--type-caption-size` | Metadata o texto secundario. | Ilimitado. | Maximo recomendado: 45-60ch. | Usar para fechas, fuentes, aclaraciones y detalles de baja jerarquia. | No usar para parrafos principales ni para informacion critica. |
| `.eyebrow` / `--type-label-size` | Categoria superior de seccion. | 0-1 por bloque principal. | Sigue el ancho del titulo que acompana. | Usar como etiqueta previa al titulo de seccion, con la linea decorativa del sistema. | No crear variantes locales de eyebrow por pagina. |
| `.badge` / `.label` / `--type-badge-size` / `--type-label-size` | Etiquetas pequenas, pills o metadata. | Ilimitado con criterio. | Contenido breve; no debe comportarse como parrafo. | Usar para clasificar, indicar estado o acompanar cards/filtros. | No usarlas como titulos. Si una etiqueta necesita jerarquia de titulo, usar `h4` / `.h4`. |
| `.button-*` / `--type-button-size` | Texto de CTAs y botones. | Segun acciones reales. | Botones y filas de CTA. | Usar solo dentro de componentes de accion del sistema. | No usar como escala de labels editoriales o metadata. |
| `.uhura-nav-link` / `--type-menu-size` | Texto del menu global. | Reservado para nav. | Menu global. | Reservado para navegacion global y patrones equivalentes aprobados. | No usar para contenido de pagina, cards o sidebar. |

Reglas:

- Display Title se usa maximo una vez por pagina.
- Section Title no se usa dentro de cards ni sidebars.
- Sidebar nunca debe usar `.display-title` ni `.section-title`.
- Titulos de sidebar deben usar `h4` / `.h4` o una variante compacta registrada.
- Body de sidebar debe usar `.copy`, `.small` o `.caption` segun jerarquia.
- No crear tamanos inline para titulos o parrafos.
- Si se necesita una nueva escala, primero debe agregarse como token global.
- El HTML puede usar `h1`, `h2`, `h3` o `h4` semanticos, pero la escala visual debe venir de clases/tokens del sistema.
- El ancho de lectura importa tanto como el tamano. Un parrafo `.copy` no debe crecer indefinidamente en pantallas grandes; usar containers y max-width editoriales.
- Sidebars y cards compactas deben reducir jerarquia, no competir con el flujo principal.

#### Anti-patterns

No hacer:

- Usar `.section-title` para el titulo de una card.
- Usar `.display-title` dentro de un sidebar.
- Definir `font-size` inline en titulos, parrafos, badges o CTAs.
- Crear una clase local por pagina como `.product-title`, `.about-title` o `.case-title` solo para cambiar tamano.
- Usar parrafos del sidebar mas grandes que el body principal de la pagina.
- Usar `.badge` o `.label` como reemplazo de un heading real.
- Crear una nueva escala visual sin registrarla primero como token global en `src/styles/uhura-system.css`.

## Uhura Visual Language

Esta capa gobierna reglas visuales reutilizables que no son solamente componentes: fondos, gradientes, glow, ruido, iconografia, charts, elevacion y estados. La meta es que nuevas paginas no inventen atmosferas locales si ya existe una direccion visual aprobada.

### Composition

Composition gobierna como se ordenan las piezas en pantalla: respiracion, balance, ritmo, capas y densidad editorial. No es un componente ni un token; es la regla que evita que una pagina se sienta como una suma de bloques sueltos.

| Criterio | Uso | Regla | Restriccion |
| --- | --- | --- | --- |
| Whitespace | Dar aire y foco a secciones, cards y narrativas. | El espacio debe reforzar jerarquia y lectura. | No llenar vacios con decoracion si el contenido ya respira. |
| Visual Rhythm | Repeticion controlada de titulos, copy, cards y metricas. | Alternar densidad y descanso entre secciones. | No apilar bloques con la misma intensidad visual. |
| Layering | Fondos, glows, cards, media y texto en profundidad. | Cada capa debe tener una funcion: atmosfera, foco o informacion. | No sumar capas que no cambian lectura ni jerarquia. |
| Editorial Density | Cantidad de informacion por pantalla. | Kaiowa puede ser mas editorial; Producto Digital puede ser mas experiencial. | No convertir todas las paginas en dashboards ni todas en manifiestos. |
| Sticky Narrative | Bloques donde el scroll revela o fija una idea. | Usar cuando el contenido evoluciona por pasos. | No usar sticky si solo hay una lista simple. |
| Content Width | Ancho de lectura y composicion. | Copy largo cerca de 65-75ch; titulos y visuales pueden ocupar mas columnas. | No dejar parrafos largos a ancho completo. |
| Asymmetric Layouts | Composiciones con peso visual desigual. | Usar para tension editorial, hero visuals o casos. | La asimetria debe seguir alineaciones claras. |

### 01 - Dark Backgrounds

Uso para heroes, storytelling, CTAs y secciones inmersivas. Deben sentirse profundos, premium y con energia Uhura, sin convertirse en fondos genericos de gradiente.

| Variante | Uso | Rasgos visuales | Restriccion |
| --- | --- | --- | --- |
| Hero Dark | Heroes principales y experiencias de apertura. | Base dark con purple dominante, cyan lateral o inferior, lime como acento puntual y grano fino. | No usar lime como masa principal; debe ser energia/acento. |
| Storytelling Dark | Bloques narrativos largos o transiciones editoriales. | Fondo oscuro mas controlado, glow suave, contraste alto para lectura. | No saturar el fondo si el copy es el protagonista. |
| CTA Dark | Cierres de seccion, contacto o siguiente paso. | Panel oscuro, glow direccional, CTA lime, posible avatar/social proof. | No duplicar CTAs finales si el footer global ya cumple esa funcion. |

Regla: un dark background puede tener glow y noise, pero debe conservar zonas limpias para texto. Si el fondo compite con el mensaje, se baja la intensidad.

### 02 - Light Backgrounds

Uso para lectura, casos, charts, grillas y bloques donde la informacion debe sentirse clara. El light de Uhura no es blanco plano: puede tener lavanda, cyan muy suave y sombras ligeras.

| Variante | Uso | Rasgos visuales | Restriccion |
| --- | --- | --- | --- |
| Editorial | Lectura, narrativa, encabezados y casos. | Fondo claro lavanda/blanco, contraste sobrio, mucho aire. | No usar fondos saturados detras de parrafos largos. |
| Soft | Cards, metricas, process flows y modulos de apoyo. | Superficies suaves, borders bajos, sombras discretas. | No convertir cada bloque en card si la pagina necesita flujo editorial. |
| Canvas | Areas de composicion, charts o visual systems. | Fondo casi blanco con gradientes muy leves y espacio para elementos. | No usar canvas como hero sin una pieza visual clara. |

### 03 - Cards

Las cards son contenedores de informacion, no decoracion. Deben tener jerarquia clara entre titulo, metadata, metrica y accion.

| Variante | Uso | Rasgos visuales | Restriccion |
| --- | --- | --- | --- |
| Metric | Resultados, KPIs y casos de exito. | Numero dominante, microcopy, chart minimo o indicador. | No mezclar demasiadas metricas dentro de una sola card. |
| Feature | Beneficios, capacidades o modulos de servicio. | Titulo compacto, copy corto, icono o marcador visual. | No usar `.section-title` dentro de feature cards. |
| Glass | Superficies sobre fondos dark o visuales. | Transparencia controlada, blur, borde tenue, sombra profunda. | No comprometer contraste de texto. |
| Sidebar | Navegacion contextual, filtros, datos de caso o contacto. | Compacta, sticky cuando aplique, tipografia menor. | No competir con la columna principal ni usar escala de hero/seccion. |

### 04 - Charts

Los charts de Uhura deben funcionar como evidencia visual rapida. No reemplazan analitica profunda; comunican tendencia, cambio o impacto.

| Variante | Uso | Rasgos visuales | Restriccion |
| --- | --- | --- | --- |
| Gradient Line | Tendencia simple en cards de metrica. | Linea fina, color Uhura, cierre ascendente o punto final sutil. | No usar ejes complejos en cards compactas. |
| Area | Enfasis de crecimiento o volumen. | Linea + relleno degradado muy suave. | El area no debe tapar texto ni parecer bloque pesado. |
| Mini Chart | Microvisualizacion dentro de metric cards o flows. | Sparklines, barras simples o indicadores minimos. | No usar si el dato puede leerse mejor como numero. |

Colores sugeridos por intencion: purple para crecimiento/estrategia, lime para eficiencia/optimizacion, cyan para conversion/data/velocidad.

### Data Visualization

Data Visualization gobierna como Uhura muestra evidencia de crecimiento, eficiencia y conversion. Es mas amplio que charts: incluye metric cards, sparklines, barras, progreso y pequenos widgets analiticos.

| Variante | Uso | Rasgos visuales | Restriccion |
| --- | --- | --- | --- |
| Metric Cards | KPIs, resultados de caso y highlights de impacto. | Numero dominante, etiqueta clara, microcopy y posible chart minimo. | No mezclar demasiadas lecturas en una sola card. |
| Spark Lines | Tendencias compactas. | Linea simple, color por intencion, poco detalle. | No usar si el dato principal no necesita tendencia. |
| Mini Charts | Evidencia rapida dentro de cards o modulos. | Area, barras o linea en formato reducido. | No agregar ejes complejos en espacios compactos. |
| Growth Bars | Comparaciones, avance o distribucion. | Barras simples, contraste claro, labels breves. | No usar barras decorativas sin dato real. |
| Progress | Estado, avance de proceso o completitud. | Indicador legible, color semantico y porcentaje cuando aplique. | No usar progress para prometer precision falsa. |
| Analytics Widgets | Bloques pequenos de lectura de producto/data. | Layout compacto, metrica + contexto + senal visual. | No convertir paginas editoriales en dashboards densos. |

### 05 - Glow

El glow es una fuente de energia, no un ornamento fijo. Debe guiar foco, profundidad o continuidad entre secciones.

| Variante | Uso | Rasgos visuales | Restriccion |
| --- | --- | --- | --- |
| Purple | Atmosfera principal Uhura. | Profundo, amplio, editorial. | No usarlo como unica paleta de toda la pagina. |
| Cyan | Tecnologia, data, interfaces y conversion. | Lateral, inferior o puntual; sensacion electrica. | No debe enfriar todo el bloque si el mensaje es humano/editorial. |
| Lime | Accion, CTA, optimizacion y siguiente paso. | Acento pequeno, halo o reflejo. | No usar grandes superficies lime salvo CTA o senal puntual. |

### 06 - Noise

El noise da textura y evita que los gradientes se sientan plasticos. Debe ser casi imperceptible en lectura.

| Variante | Uso | Rasgos visuales | Restriccion |
| --- | --- | --- | --- |
| Fine | Fondos hero, light canvas y glows suaves. | Grano muy sutil, premium, continuo. | Variante por defecto. |
| Medium | Composiciones visuales o fondos con gradiente fuerte. | Textura visible pero controlada. | No usar detras de copy largo. |
| Heavy | Referencias visuales, piezas expresivas o assets puntuales. | Grano evidente, atmosferico. | No usar como base global de pagina. |

### Ambient Field

Ambient Field es el sistema global de atmosfera visual de Uhura. Vive dentro de Uhura Visual Language porque gobierna fondos, profundidad, glow, noise y reaccion ambiental; no es un componente convencional de contenido.

Responsabilidad:

- Crear fondos profundos y reutilizables con la paleta Uhura.
- Combinar base dark/light, aurora mesh, bloom, cursor glow, noise fino y parallax sutil.
- Mantener el contenido siempre por encima de las capas visuales.
- Dar energia editorial sin competir con titulos, body copy o interacciones principales.

Cuando usarlo:

- Heroes, bloques inmersivos, storytelling visual, experiencias de servicio y secciones de alto impacto.
- Wrappers padre de Hero Base, Pinned Narrative o Progressive Narrative cuando la pagina necesita una atmosfera propia.
- Workbench o pruebas controladas antes de promoverlo a paginas vivas.

Cuando no usarlo:

- Secciones largas de lectura donde el fondo pueda cansar o competir con el texto.
- Cards, sidebars, footers o modulos compactos.
- Como decoracion por defecto en todas las secciones.
- Cuando una variante `page-dark` o `page-light` simple sea suficiente.

Variantes actuales:

- Ambient Field - Subtle: implementacion actual. Usa mesh CSS, bloom, cursor glow, noise fino, inercia y desplazamiento maximo de `18px`. Prioriza performance, lectura, storytelling sobrio y secciones donde el contenido domina.
- `.ambient-field--dark`: variante Subtle dark; purple/violet como atmosfera principal, cyan/blue como profundidad tecnologica y lime solo como acento minimo.
- `.ambient-field--light`: variante Subtle light; base clara con lavanda y cyan suave; conserva contraste para texto oscuro.

Variante piloto aprobada:

- Ambient Field - Expressive v1 / Canvas 2D pilot: variante aprobada como piloto controlado. Resuelve masas cromaticas grandes, color atravesando el canvas, formas asimetricas, deformacion organica perceptible, interaccion ambiental que modifica el campo y zonas oscuras de descanso. El caracter visual aprobado es profundo, editorial, fluido y Uhura-first: no debe sentirse como shapes vectoriales translucidas, neon gamer ni textura ruidosa encima.
- Ratio cromatico aprobado: purple dominante como masa principal; lavender como luz secundaria y volumen; cyan minimo para profundidad/data; lime muy puntual como microacento. No tunear localmente colores, intensidad ni comportamiento por pagina.

Gobernanza de Expressive:

- Ambient Field - Expressive es una excepcion controlada del sistema y sigue siendo un piloto controlado.
- Maximo una instancia Expressive por pagina.
- Debe usarse unicamente en una seccion protagonista con recompensa visual clara.
- No puede convertirse en fondo general de toda la pagina.
- No debe repetirse en dos bloques consecutivos.
- El resto de la pagina debe usar Ambient Field - Subtle, `page-dark`, `page-light` o fondos simples.
- En mobile puede degradar a fallback estatico o Subtle.
- En `prefers-reduced-motion` debe conservar la composicion cromatica sin deformacion ni interaccion.
- No tunear localmente colores, intensidad, respuesta al puntero, noise, deformacion ni performance. Cualquier ajuste de Expressive debe hacerse en el sistema y documentarse aqui.
- Si el piloto no alcanza el nivel visual o de performance necesario, el siguiente salto arquitectonico es WebGL shader ligero; no mas tuning local de Canvas por pagina.
- Piloto activo: Home, unicamente en el HERO. Sigue siendo una integracion controlada y no una promocion general de Expressive a otras paginas vivas.

DOM minimo aprobado:

```html
<section class="ambient-field ambient-field--dark" data-ambient-field>
  <div class="ambient-field__mesh" aria-hidden="true"></div>
  <div class="ambient-field__bloom" aria-hidden="true"></div>
  <div class="ambient-field__cursor" aria-hidden="true"></div>
  <div class="ambient-field__noise" aria-hidden="true"></div>
  <div class="ambient-field__content">
    <!-- contenido -->
  </div>
</section>
```

Decision de DOM: las capas son elementos explicitos, no pseudo-elementos, para facilitar depuracion, ajuste de intensidad por capa y futuras variantes sin convertir la atmosfera en una caja negra. Las capas son `aria-hidden` y usan `pointer-events: none`.

Capas:

- `.ambient-field`: wrapper con `isolation: isolate`, `overflow: hidden` y variables de posicion.
- `.ambient-field__mesh`: aurora mesh principal, movimiento lento y editorial.
- `.ambient-field__bloom`: volumen/glow de profundidad.
- `.ambient-field__cursor`: glow reactivo con inercia; no sigue literalmente el mouse.
- `.ambient-field__noise`: grano fino, casi imperceptible.
- `.ambient-field__content`: slot de contenido, siempre por encima.

Interaccion:

- `[data-ambient-field]` inicializa el comportamiento desde `src/components/uhura-components.js`.
- JS setea `--ambient-x`, `--ambient-y`, `--ambient-parallax-x` y `--ambient-parallax-y`.
- El desplazamiento maximo permitido es `18px`.
- Usa `requestAnimationFrame` e interpolacion con inercia.
- Soporta varias instancias con un solo sistema global de pointer/rAF.
- Pausa o deja de actualizar instancias fuera de viewport.
- Expressive solicita `requestAnimationFrame` solo durante pointer, inercia, interpolacion, resize o entrada reciente al viewport; al alcanzar reposo conserva el ultimo frame y detiene el loop.

Performance:

- Una pagina puede tener varias instancias, pero solo las visibles se actualizan.
- El runtime global observa el tamano real de cada host con un unico `ResizeObserver`; las paginas consumidoras no deben emitir `window.resize` artificial ni crear observers locales para Ambient Field.
- Expressive limita el DPR interno a `1.5` y solo realoca canvas, offscreen e `ImageData` cuando cambian realmente host, DPR o field size.
- Expressive v1 combina activacion adaptativa con frecuencia adaptativa global `60/45/30 FPS`, gobernada por el coste real de render mediante EMA.
- El governor baja de `60` a `45 FPS` tras 8 frames sostenidos sobre `16ms`, y de `45` a `30 FPS` tras 6 frames sostenidos sobre `22ms`.
- Para subir exige `1.5s` saludables por debajo de `12ms` (`45` a `60`) o `16ms` (`30` a `45`), con `900ms` de cooldown entre cambios. Cada reactivacion comienza en `60 FPS`.
- Los frames omitidos acumulan delta temporal para conservar la duracion perceptual de fisica e inercia. `data-ambient-fps`, `data-ambient-fps-target` y `data-ambient-render-ms` quedan disponibles para QA.
- `will-change` se usa solo en capas que transforman.
- No usar particulas tipo estrellas, neon agresivo ni seguimiento literal del mouse.
- No activar tracking en `pointer: coarse`.

Mobile y reduced motion:

- Mobile usa version estatica/simplificada.
- `prefers-reduced-motion` desactiva cursor tracking y parallax.
- El fondo debe seguir siendo legible y estable sin JS.

Convivencia:

- Hero Base sigue gobernando layout, padding, ritmo y slots; Ambient Field solo gobierna atmosfera del wrapper.
- Pinned Narrative y Progressive Narrative no deben definir fondos cuando viven dentro de Ambient Field.
- `page-dark` y `page-light` pueden coexistir para contraste, tipografia y componentes; `ambient-field--dark/light` define la atmosfera rica.
- El nav global no debe ir dentro de Ambient Field salvo aprobacion explicita; la atmosfera no debe interferir con su z-index ni lectura.

Arquitectura de Expressive v1:

- Mantener `.ambient-field` como wrapper comun.
- Mantener `.ambient-field__content` como slot comun de contenido.
- Mantener `[data-ambient-field]` como punto de inicializacion comun.
- Usar la variante explicita `.ambient-field--expressive`.
- Expressive debe compartir reduced motion, mobile fallback, paleta, idempotencia y visibilidad por viewport con Subtle.
- Expressive usa `.ambient-field__canvas` siempre detras de `.ambient-field__content`.

Comparacion tecnica para Expressive:

| Tecnologia | Ventaja | Riesgo | Fit |
| --- | --- | --- | --- |
| CSS layered blobs | Muy mantenible, bajo coste, facil de integrar con la API actual. | La deformacion real es limitada; se siente como blobs desplazados, no como campo organico vivo. | Buena para Subtle+, insuficiente para Expressive aprobado. |
| Canvas 2D | Permite masas grandes, ruido, distorsion simple, inercia y deformacion perceptible con buen control de performance. | Requiere cuidar DPR, resize, pausa fuera de viewport y reduced motion. | Mejor opcion minima para Expressive v1. |
| WebGL shader ligero | Mejor deformacion real, fluidez y campos tipo shader/aurora. | Mayor complejidad, debugging mas dificil, riesgo de soporte/performance y mantenimiento. | Potente, pero no necesario para primera version reusable. |

Decision: Expressive v1 usa Canvas 2D como tecnologia minima para el piloto. Permite deformacion real y movimiento organico sin introducir WebGL ni Three.js. CSS layered blobs queda como base Subtle o fallback; WebGL shader queda como siguiente salto si Canvas no alcanza la intensidad visual o performance aprobada. No se deben crear variantes locales de Canvas para resolver diferencias por pagina.

API recomendada para Expressive:

```html
<section class="ambient-field ambient-field--dark ambient-field--expressive" data-ambient-field data-ambient-variant="expressive">
  <canvas class="ambient-field__canvas" aria-hidden="true"></canvas>
  <div class="ambient-field__noise" aria-hidden="true"></div>
  <div class="ambient-field__content">
    <!-- contenido -->
  </div>
</section>
```

Decision de API: usar el mismo `[data-ambient-field]` con `data-ambient-variant="expressive"` o clase `.ambient-field--expressive`. No crear una API separada, porque Subtle y Expressive comparten ownership, reduced motion, mobile fallback, paleta, inicializacion, visibilidad por viewport y content slot. La separacion debe vivir en la variante, no en otro sistema.

### 07 - Iconography

La iconografia debe sentirse clara, ligera y sistemica. En flujos o cards, los iconos pueden vivir dentro de capsulas suaves o circulos con glow leve.

| Variante | Uso | Rasgos visuales | Restriccion |
| --- | --- | --- | --- |
| Outline | Flujos, steps, features y nav visual. | Trazo simple, purple/cyan/lime segun contexto. | Variante por defecto para interfaz. |
| Filled | Estados activos, pasos completados o highlights. | Masa controlada, alto contraste, uso puntual. | No llenar todos los iconos de una secuencia. |
| Editorial | Ilustracion pequena o simbolos narrativos. | Mas expresivo, pero alineado a la paleta y radios del sistema. | No crear estilos de icono por pagina sin registrarlos. |

### Reglas generales

- Visual Language se documenta antes de convertirse en CSS global.
- Si una pagina necesita un fondo, glow, chart o icono nuevo, primero debe mapearse a una variante existente.
- Si no existe variante, se documenta aqui antes de crear clases locales.
- Los fondos gobiernan atmosfera; los componentes gobiernan estructura.
- Charts y metric cards deben ser evidencia, no decoracion.
- Noise y glow deben bajar intensidad cuando hay lectura larga.
- Iconos deben mantener una familia visual consistente: trazo, radio, color e intensidad.

## Patterns

Patterns gobiernan estructuras de pagina completas. Un pattern define layout, ritmo, ancho, columnas y responsive; cada pagina conserva su contenido visual dentro del pattern.

### Hero Base

Fuente visual aprobada: Hero de Home. La Home conserva su composicion heredada y no se migra en esta fase.

Consumidores migrados: Producto Digital, Nosotros, Kaiowa y Creatividad.

Clases:

- `.hero-base`: seccion principal, altura inicial, posicion relativa, overflow y centrado vertical.
- `.hero-base__shell`: shell de 1440px con gutter lateral amplio, padding superior e inferior y compensacion del nav fijo.
- `.hero-base__grid`: grilla 52/48 cuando el hero tiene media.
- `.hero-base__copy`: columna editorial de Home. Crea la zona vertical narrativa que gobierna el punto de entrada de la historia.
- `.hero-base__story`: unidad editorial primaria del hero. Contiene eyebrow, titulo, body y acciones.
- `.hero-base__media`: slot estructural para video, orb, equipo, logo o visual de pagina.
- `.hero-base__title`: escala y ritmo de titulo basados en el hero aprobado de Home.
- `.hero-base__body`: parrafo principal con ancho, escala, interlineado y ritmo de Home.
- `.hero-base__actions`: slot opcional para CTAs dentro del bloque narrativo.

Valores base:

- `min-height`: `92vh` en desktop, `auto` en mobile.
- Shell: `max-width: 1440px`.
- Gutter: `clamp(24px, 6vw, 96px)`.
- Padding desktop: `104px` arriba y `72px` abajo.
- Padding mobile: `96px` arriba y `60px` abajo.
- Grid desktop: `minmax(0, 52fr) minmax(0, 48fr)`.
- Gap desktop: `clamp(44px, 5vw, 76px)`.
- Grid mobile: `1fr`.
- Gap mobile: `clamp(34px, 8vw, 56px)`.
- Copy width: `650px` en desktop y `760px` en mobile.
- Body width: `520px`.
- Eyebrow dentro de copy: `32px` antes del titulo en desktop y `26px` en mobile.

Reglas:

- No crear variantes `hero-service`, `hero-case`, `hero-editorial`, `hero-tall` ni `hero-compact` por ahora.
- Hero Base define layout, padding, margenes, ancho y ritmo.
- `.hero-base__story` gobierna el punto de entrada editorial. La media acompana y no debe definir donde empieza la historia.
- La columna `.hero-base__copy` puede ser mas alta que el bloque textual para crear una zona editorial estable. Esa zona es global del Hero Base, no un offset local por pagina.
- Cada pagina define solo el contenido visual dentro de los slots: Home conserva su composicion heredada, Producto Digital su orb/media, Kaiowa su logo/media/copy del caso, Nosotros su media de equipo y Creatividad su sistema visual circular.
- Elementos de apoyo como cintillos, logos o mounts compartidos deben quedar fuera de `.hero-base__story` cuando no sean parte de la narrativa principal. Si aumentan el peso vertical del hero, deben vivir despues de `.hero-base` para no alterar el punto de entrada editorial.
- No migrar la Home al Hero Base hasta que se apruebe una fase especifica para tocar el bundle heredado.
- Si una pagina no tiene media, puede usar `.hero-base` y `.hero-base__shell` sin `.hero-base__grid`; no hace falta crear una variante.

## Components

Components son piezas reutilizables con responsabilidad concreta: acciones, contenedores, navegacion, formularios, metricas, cards y mounts compartidos. Un componente puede vivir dentro de un patron, pero no debe depender de una pagina especifica.

### Buttons

- `.button-primary`: CTA principal lime.
- `.button-secondary`: CTA secundario oscuro/glass.
- `.button-ghost`: link editorial con underline sutil.
- `.button-cata`: CTA con avatar circular de Catalina.
- `.cta-row`: espaciado estandar para filas de CTA despues de copy.
- `.cta-row.roomy`: espaciado amplio para CTAs que cierran una seccion.

Regla: no crear botones con estilos inline. Si hace falta un nuevo estado, agregarlo aqui.

### Cards y Panels

- `.card`: card light base existente.
- `.uhura-card`: card reusable neutral.
- `.card-padded`: padding estandar para cards.
- `.card-light`: card sobre fondos claros.
- `.card-dark`: card sobre fondos oscuros.
- `.panel-light`: panel amplio sobre light.
- `.panel-dark`: panel amplio sobre dark.
- `.panel-roomy`: variante de panel con padding editorial generoso.
- `.card-kicker` / `.card-index`: indices o small labels dentro de cards.

### Sidebar

Usado en casos de estudio y futuras paginas editoriales.

- `.sidebar`: contenedor sticky.
- `.sidebar-card`: modulo interno.
- `.avatar-row`: fila con foto circular + texto.
- `.filter-pills` / `.tag-filter`: filtros clickeables.
- `.case-list`: listado de casos.

### Metricas

- `.metric`: metrica tipo card.
- `.metric-row`: grilla de metricas.
- `.metric-bar`: barra horizontal tipo enterprise stats.
- `.metric-bar-item`: item dentro de la barra.
- `.metric-bar-value`: valor numerico.
- `.metric-bar-label`: etiqueta de metrica.

### Formularios

- `.form-grid`: grilla responsive para inputs/selects.
- `.field`: wrapper de input.
- `.select-field`: wrapper de select.

### Media

- `.media-card img`: imagen dentro de card visual.
- `.shot img`: capturas de caso de estudio.

### Success Cases

Mount:

```html
<div data-success-cases></div>
```

Clases:

- `.success-cases`
- `.success-cases-viewport`
- `.success-cases-track`
- `.success-case-card`
- `.success-case-nav`

El componente se renderiza desde `src/components/uhura-components.js` y sus estilos viven en `src/styles/uhura-system.css`.

Estado actual:

- La Home conserva su seccion aprobada dentro del bundle heredado y no se migra todavia.
- El componente global es un espejo visual de la Home para nuevas paginas, creado a partir de la auditoria de su DOM, CSS, proporciones, metricas, carrusel, navegacion y responsive.
- El componente no define background propio ni clase `page-light`; hereda el fondo del bloque padre donde se monta. Esto evita que contamine `product-light-zone`, futuras paginas o cualquier wrapper light/dark.
- Producto Digital, Growth y Creatividad consumen este mount global.
- CSS gobierna la cantidad visible mediante `--success-cases-visible`: tres cards en desktop, dos en tablet/intermedio y una en mobile. El controlador JS lee el valor computado y no replica breakpoints.
- Casos del carrusel global: Cristar, Yamaha, Lili Pink, BOSI, Kaiowa y Melendez, respetando el orden y datos extraidos del array real de la Home aprobada.
- Archivo de prueba visual: `workbench/success-cases-parity.html`.

Regla:

- Cuando una pagina pida `Casos de exito / Resultados que hablan solos`, debe montar `data-success-cases`, no crear una grilla local.
- Success Cases no se recrea visualmente. Se extrae como componente espejo desde la Home aprobada: DOM, datos, orden, proporciones, cards, metricas, navegacion, responsive y comportamiento. Luego se consume en nuevas paginas.
- El fondo de Success Cases se controla desde la seccion padre. No agregar gradientes, grids o fondos al componente global salvo que se decida como cambio sistemico para todas las paginas.
- Si se ajusta proporción, card, navegacion, badge o metrica, hacerlo en el componente global.
- Migrar la Home a este componente solo despues de validar paridad visual y sin tocar el bundle heredado de forma riesgosa.

### Pinned Narrative

Pinned Narrative es el patron oficial para narrativas por pasos donde el scroll activa una capa de contenido a la vez. El nombre de producto del componente es `Pinned Narrative`; la API tecnica conserva por ahora las clases `.morph-*` para evitar una renombrada innecesaria y riesgosa.

Categoria conceptual: Sticky Story.

Consumidores vivos: ninguno. Pinned Narrative permanece formalizado y disponible, pero Producto Digital ya no lo consume.

Responsabilidad:

- Controlar composicion, estados, ritmo e interaccion de una narrativa sticky.
- Mantener un step activo en desktop mientras el usuario avanza por scroll.
- Convertirse en una lectura lineal en mobile.
- Respetar `prefers-reduced-motion` mostrando el contenido de forma legible sin depender de animacion.

Responsabilidad que no le pertenece:

- No define background de pagina.
- No define ambiente dark/light, gradientes, glows o atmosfera.
- No depende de Producto Digital, copy, categorias ni cantidad fija de pasos.

API HTML minima:

```html
<section class="section-roomy morphing-layers">
  <div class="container-wide">
    <div class="morph-scroll" data-morph-interface>
      <div class="morph-story" aria-label="Narrativa por capas">
        <article class="morph-step" data-layer="strategy">
          <p class="morph-number">01</p>
          <h2>Entendemos que debe <span class="italic">resolver.</span></h2>
          <p class="morph-category">Descubrimiento</p>
          <p class="morph-description">Copy del paso.</p>
          <div class="morph-capabilities" aria-label="Capacidades">
            <span>UX Research</span>
          </div>
        </article>
      </div>
    </div>
  </div>
</section>
```

Clases oficiales:

- `.morphing-layers`: seccion del patron.
- `.morph-scroll`: area scrollable que recibe `data-morph-interface`.
- `.morph-story`: bloque sticky interno.
- `.morph-step`: item narrativo activable.
- `.morph-number`: indice del paso.
- `.morph-category`: categoria o etapa.
- `.morph-description`: copy explicativo.
- `.morph-capabilities`: lista de capacidades o puntos de apoyo.
- `.is-active`: estado activo interno.
- `.is-previous`: estado transitorio interno.

Atributos data:

- `[data-morph-interface]`: instancia inicializable por `src/components/uhura-components.js`.
- `[data-layer]`: identificador real del step. No debe depender del texto visible.
- `data-active`: estado escrito por JS en la instancia para reflejar el layer activo.

Contenido configurable:

- Numero, titulo, categoria, descripcion y capabilities.
- Cantidad de steps.
- Orden narrativo.
- Ambiente visual del wrapper padre.

Comportamiento:

- Desktop: sticky narrative; un `.morph-step` activo segun progreso de scroll.
- Mobile: steps visibles en flujo lineal.
- Reduced motion: steps visibles sin depender de transiciones.
- Varias instancias pueden existir en una misma pagina sin conflicto.
- El JS calcula `steps.length`, asigna `--morph-step-count` y deriva la altura scrollable de la instancia.

Regla:

- No recrear Pinned Narrative localmente en paginas de servicio, casos o landing pages.
- Si una pagina necesita una narrativa sticky por pasos, debe consumir esta API.
- Si se requiere una variante visual, primero se documenta y se agrega al sistema; no se resuelve como `.service-*`, `.growth-*` o `.case-*` local.
- Maximo una experiencia Pinned Narrative fuerte por pagina. Si el contenido es una secuencia textual sin recompensa visual progresiva, usar Progressive Narrative.

### Progressive Narrative

Progressive Narrative es el patron oficial para secuencias narrativas de lectura natural. Resuelve pasos, argumentos, etapas o capacidades sin sticky, sin scroll hijacking y sin retener el avance del usuario.

Consumidores migrados:

- Producto Digital: narrativa de capas del producto.
- Growth: segundo bloque narrativo de etapas, despues de la experiencia circular.
- Creatividad: sistema creativo por etapas.

Responsabilidad:

- Mostrar una secuencia completa en flujo natural.
- Aplicar reveal al entrar en viewport con stagger sutil.
- Mantener estados activos opcionales sin depender de ellos para comprender el contenido.
- Ser lineal y legible en responsive.
- Respetar `prefers-reduced-motion`.

Responsabilidad que no le pertenece:

- No define background de pagina.
- No reemplaza Pinned Narrative cuando hay una visual progresiva con recompensa clara.
- No oculta contenido si JS no carga.

API HTML minima:

```html
<section class="section-roomy progressive-narrative" data-progressive-narrative>
  <div class="container-wide">
    <div class="progressive-narrative__list">
      <article class="progressive-narrative__item" data-progressive-item>
        <div class="progressive-narrative__meta">
          <p class="progressive-narrative__number">01</p>
          <p class="progressive-narrative__category">Estrategia</p>
        </div>
        <div class="progressive-narrative__content">
          <h2 class="progressive-narrative__title">Entendemos que debe <span class="italic">mover</span> el crecimiento.</h2>
          <p class="progressive-narrative__description">Copy del paso.</p>
          <div class="progressive-narrative__capabilities" aria-label="Capacidades">
            <span>Growth Strategy</span>
          </div>
        </div>
      </article>
    </div>
  </div>
</section>
```

Clases oficiales:

- `.progressive-narrative`: seccion del patron.
- `.progressive-narrative__list`: lista de items.
- `.progressive-narrative__item`: paso narrativo.
- `.progressive-narrative__meta`: columna de numero/categoria.
- `.progressive-narrative__number`: indice del paso.
- `.progressive-narrative__category`: categoria o etapa.
- `.progressive-narrative__content`: columna editorial.
- `.progressive-narrative__title`: titulo del paso.
- `.progressive-narrative__description`: copy explicativo.
- `.progressive-narrative__capabilities`: lista de capacidades o apoyos.
- `.is-visible`: estado interno de reveal.
- `.is-active`: estado opcional del item visible dominante.

Atributos data:

- `[data-progressive-narrative]`: instancia inicializable por `src/components/uhura-components.js`.
- `[data-progressive-item]`: item observable. Puede omitirse si el item usa `.progressive-narrative__item`.
- `data-progressive-active="false"`: desactiva el estado `.is-active` si una pagina solo necesita reveal.
- `data-progressive-mode="viewport-focus"`: activa la variante geometrica Viewport Focus y excluye el `IntersectionObserver` del modo base.

Comportamiento:

- Usa `IntersectionObserver`; no usa listener continuo de scroll.
- El contenido es visible por defecto si JS no carga.
- JS agrega `.is-enhanced` solo cuando puede aplicar reveal progresivo.
- Mobile mantiene lectura lineal.
- Reduced motion muestra todo el contenido sin transiciones.
- Varias instancias pueden existir en una misma pagina sin conflicto.

#### Variante Viewport Focus

Viewport Focus es la variante oficial para secuencias en flujo natural donde un paso debe dominar editorialmente segun una linea focal del viewport, sin sticky ni retencion del scroll.

API:

```html
<section
  class="section-roomy progressive-narrative progressive-narrative--viewport-focus"
  data-progressive-narrative
  data-progressive-mode="viewport-focus"
>
  <div class="container-wide">
    <div class="progressive-narrative__list">
      <article class="progressive-narrative__item" data-progressive-item>
        <!-- Contenido configurable -->
      </article>
    </div>
  </div>
</section>
```

Responsabilidad:

- Mantener un solo `.is-active`.
- Aplicar `.is-neighbor` de forma simetrica al item anterior y siguiente.
- Aplicar `.is-distant` al resto.
- Calcular boundaries como puntos medios entre los centros de items consecutivos.
- Seleccionar el activo contra la linea focal del viewport util, considerando el nav global renderizado.
- Producir el mismo resultado al subir y bajar; no usa direccion, `seen`, `previous` ni `next`.
- Recalibrar geometria con resize y un `ResizeObserver` compartido.
- Coordinar todas las instancias con un solo listener passive de scroll y un unico `requestAnimationFrame`.

Estados:

- `.is-visible`: todos los items permanecen disponibles para lectura.
- `.is-active`: `opacity: 1`, sin blur, escala `1`.
- `.is-neighbor`: `opacity: .38`, blur `2px`, escala `.985`.
- `.is-distant`: `opacity: .14`, blur `4px`, escala `.97`.
- `data-progressive-distance="0|1|2"`: salida interna para QA; no es configuracion publica.

Reglas:

- La transicion editorial es de `260ms`.
- Mobile elimina blur y escala y aumenta la presencia de vecinos y distantes para conservar legibilidad.
- `prefers-reduced-motion` elimina transicion, blur y escala y muestra todo el contenido con presencia completa.
- La variante no define copy, cantidad de pasos, atmosfera, paleta ni layout especifico de pagina.
- No agregar controladores locales. Una instancia Viewport Focus nunca debe usar simultaneamente el `IntersectionObserver` del modo base.

Primer consumidor oficial:

- Growth: segundo bloque narrativo de etapas.

Regla:

- Usar Progressive Narrative para listas narrativas, etapas de servicio, argumentos secuenciales o capacidades que deben leerse sin friccion.
- No recrear esta interaccion localmente.
- Si una pagina ya tiene una experiencia Pinned Narrative fuerte, sus pasos textuales posteriores deben usar Progressive Narrative salvo aprobacion explicita de arquitectura.

### Menu global

Mount:

```html
<div data-uhura-nav></div>
```

El contenido se sincroniza desde `src/extracted/global-nav-sync.js`. No editar navegaciones manualmente dentro de cada pagina.

El menu global usa un modelo declarativo central dentro de `src/extracted/global-nav-sync.js`. Los items principales pueden ser links simples o dropdowns globales.

Dropdowns globales actuales:

- `Soluciones`: agrupa las paginas activas cuyas rutas se mantienen bajo `/servicios/`.
- `Casos de exito`: agrupa los casos activos.

Soluciones actuales:

- Activo y renderizado: Producto Digital (`servicios/producto-digital.html`).
- Activo y renderizado: Creatividad (`servicios/creatividad.html`).
- Activo y renderizado: Growth Paid Media (`servicios/growth.html`).
- Planned y no renderizado todavia: AI Agents.
- Creatividad tambien esta incluida como pagina activa en `sitemap.xml`.

Reglas:

- Las paginas planned pueden existir en el modelo para reservar estructura y orden, pero no deben renderizarse hasta que pasen a `active`.
- No crear links muertos dentro del menu global.
- No buscar links por texto. La navegacion debe resolverse desde `href` o `data-href` reales.
- Si una nueva familia del menu necesita dropdown, debe agregarse al modelo central y reutilizar el mismo render de dropdowns.
- En rutas bajo `/servicios/`, el item principal `Soluciones` debe quedar activo. La logica usa la key interna `soluciones` y las rutas reales; no depende del label visible.
- En rutas bajo `/casos/`, el item principal `Casos de exito` debe quedar activo.

### Footer global

Mount:

```html
<div id="uhura-footer-root" data-uhura-footer></div>
```

El contenido se renderiza desde `src/extracted/footer-sync.js`. El footer debe verse igual en Home, Nosotros, Kaiowa y futuras paginas porque todas montan el mismo componente compartido.

- No editar footer localmente en paginas individuales.
- No crear CTAs finales duplicados por pagina.
- Si cambia el footer, cambiar `footer-sync.js`.
- Cada pagina debe exponer un solo mount: `<div id="uhura-footer-root" data-uhura-footer></div>`.
- El mount debe estar fuera del layout local: como hermano de `#root` en Home o como hermano final de `main` en paginas estaticas.
- El footer compartido usa `data-uhura-footer-sync="true"` solo para identificar el componente renderizado, no para corregir estilos locales en runtime.
- Si una pagina contiene un footer heredado, eliminar su render local y dejar solo el mount global. El sincronizador no debe convivir con footers duplicados ni depender de parches de `max-width`, padding, escala tipografica o posicion del CTA.

## Patterns

Patterns son composiciones reutilizables: combinan foundations, visual language y components para resolver una situacion editorial o de producto. Un patron puede tener clases globales, mounts o solo reglas de composicion.

### Hero

Uso para aperturas principales de pagina o experiencia.

- Debe usar Hero Base cuando aplique: `.hero-base`, `.hero-base__shell`, `.hero-base__grid`, `.hero-base__copy`, `.hero-base__story`, `.hero-base__media`, `.hero-base__title`, `.hero-base__body`.
- Puede combinar visuales propios, media de pagina y CTAs del sistema como contenido dentro de los slots.
- No debe resolver ancho, padding o escala con estilos locales si existe token global.

### Section Header

Uso para encabezados de seccion.

- `.section-header`: bloque base.
- `.section-header.center`: titulo y copy centrados.
- `.section-header.split`: titulo a un lado y copy al otro.
- `.eyebrow`: etiqueta superior con linea decorativa.
- `.section-title`: titulo secundario.
- `.editorial-title`: titulo editorial con escala H2.
- `.italic`: palabra editorial en Playfair.

Regla: Section Header es un patron, no una card. No usar `.section-title` dentro de modulos compactos.

### Narrative

Uso para bloques editoriales de dos columnas donde una frase abre una idea y el copy desarrolla la narrativa.

- `.narrative-section`: seccion editorial con ambiente dark y glow sutil.
- `.narrative-grid`: estructura de dos columnas responsive.
- `.narrative-kicker`: etiqueta superior.
- `.narrative-title`: titulo narrativo.
- `.narrative-copy`: parrafo editorial de apoyo.

Esta variante nacio desde la seccion "Mas que cliente" de Nosotros. No debe duplicarse como `about-story-*` en futuras paginas.

### Sticky Story

Uso para narrativas donde una idea evoluciona con el scroll, como capas de producto, etapas o evidencia progresiva.

Sticky Story es la categoria conceptual. La implementacion reusable oficial es Pinned Narrative, documentada en Components y gobernada por `.morph-*` + `[data-morph-interface]`.

- Debe justificar el sticky con progresion real de contenido.
- Debe tener alternativa legible en mobile.
- Debe respetar `prefers-reduced-motion` cuando incluya animacion.

Regla: no usar sticky para listas simples o decoracion.

### CTA Banner

Uso para cierres intermedios, siguiente paso o accion contextual.

- Puede combinar `CTA Dark`, `.button-primary`, `.button-cata`, avatares/social proof y copy breve.
- Debe diferenciarse del footer global y no duplicar su funcion.
- Debe mantener una sola accion principal.

### Partner Strip

Mount:

```html
<div data-expertise-strip></div>
```

Clases:

- `.expertise-strip`
- `.expertise-track`
- `.expertise-logo`

Los logos viven en `assets/logos/`.

Regla: cuando una pagina necesite prueba de partners/logos, usar este patron antes de crear una grilla local.

### Split Panel

Uso para paneles amplios con texto a dos columnas.

- `.split-panel`: layout base de dos columnas.
- `.split-panel > .copy`: copy alineado y sin margen superior.

Puede combinarse con `.panel-dark`, `.panel-light` y `.panel-roomy`.

### Process

Uso para metodologia, forma de trabajo o pasos de proceso.

- `.process-grid`: grilla responsive de tres columnas.
- `.process-card`: card oscura/glass compacta para pasos.
- `.process-card b`: indice numerico del paso.

Esta variante existe porque `method-card` en Nosotros tenia una intencion visual especifica: explicar proceso con tres pasos sin sentirse como una card generica de servicio.

### Case Sidebar

Uso para casos de estudio y futuras paginas editoriales con navegacion o datos persistentes.

- Puede combinar `.sidebar`, `.sidebar-card`, `.avatar-row`, `.filter-pills`, `.tag-filter`, `.case-list` y metricas.
- Debe usar jerarquia compacta: `h4` / `.h4`, `.copy`, `.small` o `.caption`.
- No debe competir con la narrativa principal.

## Motion System

Estado: Backlog aprobado.

El sitio ya usa movimiento en piezas como orb, sticky sections, hover states y glows. Esta capa sera responsable de formalizar como se mueve Uhura antes de que cada pagina cree interacciones locales.

Responsabilidades:

- Hover.
- Page transition.
- Reveal.
- Orb.
- Scroll storytelling.
- Reduced motion.
- Timing.
- Duration.
- Easing.
- Depth.
- Parallax.

Regla: cualquier motion nuevo debe mapearse a una responsabilidad de esta lista. Si no encaja, se documenta primero antes de implementarlo.

## Criterio de migracion

1. No cambiar visualmente una pagina solo por migrarla.
2. Agregar clases del sistema junto a clases locales cuando haga falta compatibilidad.
3. Quitar estilos inline primero.
4. Luego reemplazar CSS local duplicado por clases globales.
5. Validar visualmente antes de avanzar a otra seccion.

## Inventario actual

### Home

- Usa menu/footer globales mediante scripts extraidos.
- Usa theme governor, partners marquee y layout wide.
- Tiene bundle heredado: migrar solo con mucha cautela.

### Nosotros

- Usa menu/footer globales.
- Migrado: `method-card` ahora consume `.process-grid` / `.process-card`.
- Migrado: `about-culture-card` usa `.panel-dark` / `.panel-roomy` / `.split-panel`.
- Migrado: `about-story-*` ahora consume `.narrative-section` / `.narrative-grid` / `.narrative-*`.
- Migrado: CTAs narrativos usan `.cta-row`.
- Se mantiene local: `team-wall`, porque es una composicion propia del hero de Nosotros.

### Kaiowa

- Usa menu/footer globales.
- Migrado: hero ahora consume Hero Base v1.
- Ya conecta cards, sidebar, filtros y metricas con clases globales.
- Se mantiene local: `case-logo-main` y tratamiento editorial especifico del titulo.
- Pendiente: reducir CSS local cuando se confirme que el visual sigue aprobado.

## Decision Tree

Usar este arbol antes de crear CSS, clases, componentes o patrones nuevos.

```txt
Necesito resolver una pieza visual
↓
¿Existe como foundation, componente, patron o visual language?
↓
Si
↓
La reutilizo
↓
No
↓
¿Es una variante de algo existente?
↓
Si
↓
Extender el sistema y documentar la variante
↓
No
↓
¿Es una necesidad reutilizable en mas de una pagina?
↓
Si
↓
Documentar primero, crear despues
↓
No
↓
Mantener local, explicar por que es unica y evitar convertirla en precedente
```

Regla practica:

- Si es una decision base, va en `Foundations`.
- Si es atmosfera, fondo, glow, iconografia, data viz o textura, va en `Visual Language`.
- Si es una pieza reutilizable concreta, va en `Components`.
- Si es una composicion o flujo, va en `Patterns`.
- Si se mueve, aparece, responde al scroll o cambia por interaccion, va en `Motion System`.

## Regla final

No crear una nueva variante de foundation, visual language, component, pattern, motion, button, card, badge, sidebar, footer, menu, metrica, form o marquee sin registrarla primero en `src/styles/uhura-system.css` cuando aplique y en este documento.
