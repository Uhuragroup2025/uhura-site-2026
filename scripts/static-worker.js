const STAGING_ROBOTS_DIRECTIVE = "noindex, nofollow";

const DOCUMENT_ROUTES = new Map([
  ["/", ["/__content/index.page", "text/html; charset=utf-8"]],
  ["/index.html", ["/__content/index.page", "text/html; charset=utf-8"]],
  ["/nosotros/", ["/__content/nosotros/index.page", "text/html; charset=utf-8"]],
  ["/resultados/kaiowa/", ["/__content/resultados/kaiowa/index.page", "text/html; charset=utf-8"]],
  ["/resultados/tienda-cristar/", ["/__content/resultados/tienda-cristar/index.page", "text/html; charset=utf-8"]],
  ["/contacto/", ["/__content/contacto/index.page", "text/html; charset=utf-8"]],
  ["/servicios/websites-ecommerce/", ["/__content/servicios/websites-ecommerce/index.page", "text/html; charset=utf-8"]],
  ["/servicios/brand-content/", ["/__content/servicios/brand-content/index.page", "text/html; charset=utf-8"]],
  ["/servicios/seo-growth/", ["/__content/servicios/seo-growth/index.page", "text/html; charset=utf-8"]],
  ["/servicios/digital-shelf/", ["/__content/servicios/digital-shelf/index.page", "text/html; charset=utf-8"]],
  ["/robots.txt", ["/__content/robots.data", "text/plain; charset=utf-8"]],
  ["/sitemap.xml", ["/__content/sitemap.data", "application/xml; charset=utf-8"]],
]);

const worker = {
  async fetch(request, env) {
    const incomingUrl = new URL(request.url);
    const documentRoute = DOCUMENT_ROUTES.get(incomingUrl.pathname);
    const assetUrl = new URL(request.url);
    if (documentRoute) assetUrl.pathname = documentRoute[0];

    const assetRequest = new Request(assetUrl, request);
    const assetResponse = await env.ASSETS.fetch(assetRequest);
    const headers = new Headers(assetResponse.headers);
    if (documentRoute) headers.set("Content-Type", documentRoute[1]);
    headers.set("X-Robots-Tag", STAGING_ROBOTS_DIRECTIVE);
    headers.set("Cache-Control", "no-store");

    return new Response(assetResponse.body, {
      status: assetResponse.status,
      statusText: assetResponse.statusText,
      headers,
    });
  },
};

export default worker;
