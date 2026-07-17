const STAGING_ROBOTS_DIRECTIVE = "noindex, nofollow";

const worker = {
  async fetch(request, env) {
    const incomingUrl = new URL(request.url);
    const assetUrl = new URL(request.url);
    if (assetUrl.pathname === "/") assetUrl.pathname = "/index.html";

    const assetRequest = new Request(assetUrl, request);
    const assetResponse = await env.ASSETS.fetch(assetRequest);
    const headers = new Headers(assetResponse.headers);
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
