const LEGACY_ORIGIN_HOST = "legacy-origin.uhuragroup.com";

const PERMANENT_REDIRECTS = new Map([
  ["/index.html", "/"],
  ["/nosotros.html", "/nosotros/"],
  ["/casos/kaiowa", "/resultados/kaiowa/"],
  ["/casos/kaiowa/", "/resultados/kaiowa/"],
  ["/casos/kaiowa.html", "/resultados/kaiowa/"],
  ["/casos-de-exito/cristar", "/resultados/tienda-cristar/"],
  ["/casos-de-exito/cristar/", "/resultados/tienda-cristar/"],
  ["/casos-de-exito/cristar/index.html", "/resultados/tienda-cristar/"],
  ["/ecommerce-y-plataformas/", "/servicios/websites-ecommerce/"],
  ["/performance-digital/", "/servicios/seo-growth/"],
  ["/software-digital-shelf/", "/servicios/digital-shelf/"],
]);

const LEGACY_PREFIXES = [
  "/blog/",
  "/resultados/",
  "/wp-content/",
  "/wp-includes/",
  "/wp-json/",
];

const LEGACY_EXACT_PATHS = new Set([
  "/blog",
  "/blog/",
  "/resultados",
  "/resultados/",
  "/ia-mode",
  "/ia-mode/",
  "/soluciones-digitales",
  "/soluciones-digitales/",
  "/consultoria-y-transformacion",
  "/consultoria-y-transformacion/",
  "/partners",
  "/partners/",
  "/melonn",
  "/melonn/",
  "/politica-de-privacidad",
  "/politica-de-privacidad/",
  "/terminos-y-condiciones",
  "/terminos-y-condiciones/",
  "/tratamiento-de-datos",
  "/tratamiento-de-datos/",
  "/sitemap_index.xml",
  "/post-sitemap.xml",
  "/page-sitemap.xml",
  "/resultados-sitemap.xml",
  "/agente-sitemap.xml",
  "/moto-sitemap.xml",
  "/mastermega_content-sitemap.xml",
]);

const shouldUseLegacyOrigin = (pathname) =>
  LEGACY_EXACT_PATHS.has(pathname) ||
  LEGACY_PREFIXES.some((prefix) => pathname.startsWith(prefix));

const proxyLegacy = async (request, incomingUrl) => {
  const legacyUrl = new URL(incomingUrl);
  legacyUrl.protocol = "https:";
  legacyUrl.hostname = "uhuragroup.com";
  legacyUrl.port = "";

  const response = await fetch(new Request(legacyUrl, request), {
    cf: { resolveOverride: LEGACY_ORIGIN_HOST },
  });
  const headers = new Headers(response.headers);

  if (!["uhuragroup.com", "www.uhuragroup.com"].includes(incomingUrl.hostname)) {
    headers.set("X-Robots-Tag", "noindex, nofollow");
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
};

export default {
  async fetch(request, env) {
    const incomingUrl = new URL(request.url);
    const redirectTarget = PERMANENT_REDIRECTS.get(incomingUrl.pathname);

    if (redirectTarget) {
      const destination = new URL(redirectTarget, incomingUrl);
      destination.search = incomingUrl.search;
      return Response.redirect(destination, 301);
    }

    const assetResponse = await env.ASSETS.fetch(request);
    if (assetResponse.status !== 404 || !shouldUseLegacyOrigin(incomingUrl.pathname)) {
      return assetResponse;
    }

    try {
      return await proxyLegacy(request, incomingUrl);
    } catch {
      return assetResponse;
    }
  },
};
