(function () {
  "use strict";

  const GTM_ID = "GTM-PZ35GMR9";
  const CONTACT_PATH = "/contacto/";
  const ROOT = document.documentElement;

  if (ROOT.dataset.uhuraAnalyticsInitialized === "true") return;
  ROOT.dataset.uhuraAnalyticsInitialized = "true";

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    "gtm.start": Date.now(),
    event: "gtm.js"
  });

  const tag = document.createElement("script");
  const firstScript = document.getElementsByTagName("script")[0];
  tag.async = true;
  tag.src = "https://www.googletagmanager.com/gtm.js?id=" + GTM_ID;
  firstScript.parentNode.insertBefore(tag, firstScript);

  function getContactLocation(link) {
    if (link.closest("[data-uhura-nav]")) return "navigation";
    if (link.closest("[data-uhura-footer]")) return "footer";
    if (link.closest(".hero-base")) return "hero";
    return "content";
  }

  document.addEventListener("click", function (event) {
    const link = event.target.closest("a[href]");
    if (!link) return;

    let destination;
    try {
      destination = new URL(link.href, window.location.href);
    } catch (error) {
      return;
    }

    if (destination.pathname !== CONTACT_PATH) return;

    window.dataLayer.push({
      event: "contact_cta_click",
      contact_location: getContactLocation(link),
      link_url: destination.href,
      page_path: window.location.pathname
    });
  }, { passive: true });
})();
