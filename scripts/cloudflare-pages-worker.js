/*
 * Worker de Cloudflare Pages para www.uhuragroup.com (se publica como dist/_worker.js).
 *
 * Orden:
 *   1. Redirecciones 301 exactas (URLs viejas con un destino conocido).
 *   2. Archivos del sitio (env.ASSETS). Si existen, se sirven tal cual.
 *   3. Si no existen y la ruta es de contenido del sitio anterior que hoy vive en
 *      el blog (casos de /resultados/, imágenes de /wp-content/), 301 a /blog/...
 *   4. Si no, la respuesta 404 de Pages (404.html con estado 404).
 *
 * /blog* no pasa por aquí: lo atiende el Worker uhura-blog-proxy.
 * El sitio anterior (WordPress) se movió a /blog/ con las mismas rutas, por eso
 * muchas URLs viejas apuntan a /blog/<misma ruta>/.
 */

const PERMANENT_REDIRECTS = new Map([
  // Rutas del sitio estático anterior.
  ["/index.html", "/"],
  ["/nosotros.html", "/nosotros/"],
  ["/casos/kaiowa", "/resultados/kaiowa/"],
  ["/casos/kaiowa/", "/resultados/kaiowa/"],
  ["/casos/kaiowa.html", "/resultados/kaiowa/"],
  ["/casos-de-exito/cristar", "/resultados/tienda-cristar/"],
  ["/casos-de-exito/cristar/", "/resultados/tienda-cristar/"],
  ["/casos-de-exito/cristar/index.html", "/resultados/tienda-cristar/"],

  // Servicios del WordPress anterior con equivalente en el sitio nuevo.
  ["/ecommerce-y-plataformas/", "/servicios/websites-ecommerce/"],
  ["/solucion-ecommerce/", "/servicios/websites-ecommerce/"],
  ["/performance-digital/", "/servicios/seo-growth/"],
  ["/software-digital-shelf/", "/servicios/digital-shelf/"],
  ["/landing-digital-shelf/", "/servicios/digital-shelf/"],

  // Páginas del WordPress anterior que siguen vivas en el blog con la misma ruta.
  ["/bonafont-en-tu-casa/", "/blog/bonafont-en-tu-casa/"],
  ["/tienda/", "/blog/tienda/"],
  ["/ia-mode/", "/blog/ia-mode/"],
  ["/inteligencia-artificial/", "/blog/ia-mode/"],
  ["/partners/", "/blog/partners/"],
  ["/melonn/", "/blog/melonn/"],
  ["/soluciones-digitales/", "/blog/soluciones-digitales/"],
  ["/consultoria-y-transformacion/", "/blog/consultoria-y-transformacion/"],
  ["/webinar-digital-shelf/", "/blog/webinar-digital-shelf/"],
  ["/landing-ai-growth-assistant/", "/blog/landing-ai-growth-assistant/"],
  ["/casos-de-exito/", "/blog/casos-de-exito/"],
  ["/resultados", "/blog/resultados/"],
  ["/resultados/", "/blog/resultados/"],
  ["/dermaswiss/", "/blog/dermaswiss/"],
  ["/lusamine/", "/blog/lusamine/"],
  ["/grupo-alfara/", "/blog/grupo-alfara/"],
  ["/politica-de-privacidad/", "/blog/politica-de-privacidad/"],
  ["/terminos-y-condiciones/", "/blog/terminos-y-condiciones/"],
  ["/tratamiento-de-datos/", "/blog/tratamiento-de-datos/"],
  ["/accessibility-statement/", "/blog/accessibility-statement/"],
  ["/accessibility-statement-2/", "/blog/accessibility-statement-2/"],

  // Sitemaps del WordPress anterior (Rank Math). Hoy viven en /blog/.
  ["/sitemap_index.xml", "/blog/sitemap_index.xml"],
  ["/post-sitemap.xml", "/blog/post-sitemap.xml"],
  ["/page-sitemap.xml", "/blog/page-sitemap.xml"],
  ["/resultados-sitemap.xml", "/blog/resultados-sitemap.xml"],
]);

// Contenido del sitio anterior que no existe en el sitio nuevo pero sí en el blog:
// los casos de /resultados/<caso>/ (salvo los que ya tienen página nueva, que
// se sirven como archivos) y las imágenes subidas a WordPress.
const BLOG_FALLBACK_PREFIXES = ["/resultados/", "/wp-content/uploads/"];

const findRedirect = (pathname) => {
  if (PERMANENT_REDIRECTS.has(pathname)) return PERMANENT_REDIRECTS.get(pathname);
  // Misma URL sin la barra final (por ejemplo /partners).
  const lastSegment = pathname.split("/").pop();
  if (lastSegment && !lastSegment.includes(".") && PERMANENT_REDIRECTS.has(pathname + "/")) {
    return PERMANENT_REDIRECTS.get(pathname + "/");
  }
  return null;
};

const redirectTo = (target, incomingUrl) => {
  const destination = new URL(target, incomingUrl);
  destination.search = incomingUrl.search;
  return Response.redirect(destination.toString(), 301);
};

export default {
  async fetch(request, env) {
    const incomingUrl = new URL(request.url);

    const redirectTarget = findRedirect(incomingUrl.pathname);
    if (redirectTarget) return redirectTo(redirectTarget, incomingUrl);

    const assetResponse = await env.ASSETS.fetch(request);
    if (assetResponse.status !== 404) return assetResponse;

    if (BLOG_FALLBACK_PREFIXES.some((prefix) => incomingUrl.pathname.startsWith(prefix))) {
      return redirectTo("/blog" + incomingUrl.pathname, incomingUrl);
    }

    return assetResponse;
  },
};
