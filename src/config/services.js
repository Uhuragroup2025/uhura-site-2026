/* Neutral service catalog and route resolution shared by global consumers. */

(() => {
  if (window.__uhuraServices) return;

  const items = [
    {
      label: "Websites & Ecommerce",
      description: "Websites y ecommerce que convierten.",
      path: "/servicios/websites-ecommerce/",
      key: "websites-ecommerce",
      status: "active",
    },
    {
      label: "Brand & Content",
      description: "Marca, campañas y contenido con intención comercial.",
      path: "/servicios/brand-content/",
      key: "brand-content",
      status: "active",
    },
    {
      label: "SEO & Growth",
      description: "Visibilidad, adquisición, performance y medición.",
      path: "/servicios/seo-growth/",
      key: "seo-growth",
      status: "active",
    },
    {
      label: "Digital Shelf",
      description: "Contenido de producto y monitoreo digital.",
      path: "/servicios/digital-shelf/",
      key: "digital-shelf",
      status: "active",
    },
    {
      label: "AI Agents",
      description: "Automatización con data y criterio.",
      path: "/servicios/ai-agents.html",
      key: "ai-agents",
      status: "planned",
    },
  ].map((item) => Object.freeze(item));

  const getRootPrefix = () => {
    const path = window.location.pathname.replace(/\\/g, "/");
    const servicesIndex = path.lastIndexOf("/servicios/");

    if (servicesIndex >= 0) {
      const serviceTail = path.slice(servicesIndex + "/servicios/".length);
      return serviceTail.includes("/") ? "../.." : "..";
    }

    if (path.includes("/workbench/") || path.includes("/casos/")) return "..";
    return ".";
  };

  const resolvePath = (path) => {
    if (!path || !path.startsWith("/")) return path;
    const localPath = (
      window.location.protocol === "file:" &&
      path.endsWith("/")
    ) ? path + "index.html" : path;
    return getRootPrefix() + localPath;
  };

  const getByKey = (key) => items.find((item) => item.key === key) || null;
  const getActive = () => items.filter((item) => item.status === "active");
  const matchPath = (pathname = window.location.pathname) =>
    items.find((item) => pathname.includes(item.path)) || null;

  window.__uhuraServices = Object.freeze({
    items: Object.freeze(items),
    getActive,
    getByKey,
    getRootPrefix,
    matchPath,
    resolvePath,
  });
})();
