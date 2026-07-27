(() => {
  if (!window.__uhuraServices) return;

  const catalog = window.__uhuraServices;
  const serviceRoutes = [
    {
      key: "brand-content",
      signatures: [
        /(?:Creative\s*Strategy|Brand\s*&\s*Content)/i,
        /Brand\s*(?:\u00b7|\u2022)\s*Identity\s*(?:\u00b7|\u2022)\s*Campaigns?/i
      ]
    },
    {
      key: "websites-ecommerce",
      signatures: [
        /(?:Digital\s*Products|Websites?\s*&\s*Ecommerce)/i,
        /Web\s*(?:\u00b7|\u2022)\s*Ecommerce\s*(?:\u00b7|\u2022)\s*UX/i
      ]
    },
    {
      key: "seo-growth",
      signatures: [
        /(?:Revenue\s*Growth|SEO\s*&\s*Growth)/i,
        /Paid\s*Media\s*(?:\u00b7|\u2022)\s*Analytics\s*(?:\u00b7|\u2022)\s*CRO/i
      ]
    }
  ].map((route) => {
    const service = catalog.getByKey(route.key);
    return {
      ...route,
      id: route.key,
      href: service ? catalog.resolvePath(service.path) : null,
      ariaLabel: service ? `Abrir solución ${service.label}` : "",
    };
  }).filter((route) => route.href);

  const existing = window.__uhuraHomeServiceLinks;
  if (existing) {
    existing.refresh();
    return;
  }

  const isOutsideGlobalChrome = (element) => (
    !element.closest(".uhura-nav-wrap") &&
    !element.closest(".uhura-shared-footer")
  );

  const isCardSized = (element) => {
    const rect = element.getBoundingClientRect();
    return (
      rect.width >= 220 &&
      rect.width <= 820 &&
      rect.height >= 160 &&
      rect.height <= 920
    );
  };

  const matchesService = (element, service) => {
    const text = element.textContent || "";
    return service.signatures.every((signature) => signature.test(text));
  };

  const findServiceCard = (service) => {
    const titleSignature = service.signatures[0];
    const candidates = Array.from(document.querySelectorAll("h2,h3,h4,p,span,div"))
      .filter((element) => titleSignature.test((element.textContent || "").trim()))
      .filter(isOutsideGlobalChrome);

    for (const label of candidates) {
      let node = label;
      for (let depth = 0; depth < 8 && node; depth += 1, node = node.parentElement) {
        if (
          isOutsideGlobalChrome(node) &&
          isCardSized(node) &&
          matchesService(node, service)
        ) {
          return node;
        }
      }
    }

    return null;
  };

  const isNestedControl = (event, card) => {
    const control = event.target.closest(
      "a,button,input,select,textarea,[role='button'],[role='link']"
    );
    return Boolean(control && control !== card);
  };

  const markNumber = (element) => {
    if (!element || !/^0[1-4]$/.test((element.textContent || "").trim())) return;
    element.dataset.homeCapabilityNumber = "true";
    element.setAttribute("aria-hidden", "true");
  };

  const annotateCapabilityRows = () => {
    const rows = Array.from(document.querySelectorAll("[data-preview-src][data-preview-label]"));
    rows.forEach((row) => {
      const children = Array.from(row.children);
      const label = children.find(
        (child) => (child.textContent || "").trim() === row.dataset.previewLabel
      );

      row.dataset.homeCapabilityRow = "true";
      markNumber(children[0]);
      if (label) label.dataset.homeCapabilityLabel = "true";
    });
    return rows.length > 0;
  };

  const annotateCardNumber = (card) => {
    Array.from(card.children).forEach(markNumber);
  };

  const enhanceCard = (service) => {
    const card = findServiceCard(service);
    if (!card) return false;
    annotateCardNumber(card);
    if (card.dataset.uhuraServiceLink === service.id) return true;

    card.dataset.uhuraServiceLink = service.id;
    card.dataset.href = service.href;
    card.setAttribute("role", "link");
    card.setAttribute("tabindex", "0");
    card.setAttribute("aria-label", service.ariaLabel);
    card.style.cursor = "pointer";

    card.addEventListener("click", (event) => {
      if (isNestedControl(event, card)) return;
      window.location.href = service.href;
    });

    card.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      if (isNestedControl(event, card)) return;
      event.preventDefault();
      window.location.href = service.href;
    });

    return true;
  };

  const refresh = () => {
    const rowsReady = annotateCapabilityRows();
    const cardsReady = serviceRoutes.map(enhanceCard).every(Boolean);
    return rowsReady && cardsReady;
  };

  const boot = () => {
    let tries = 0;
    const tick = () => {
      if (refresh() || tries > 60) return;
      tries += 1;
      window.setTimeout(tick, 150);
    };

    tick();
    const observer = new MutationObserver(refresh);
    observer.observe(document.body, { childList: true, subtree: true });
    window.__uhuraHomeServiceLinks.observer = observer;
  };

  window.__uhuraHomeServiceLinks = { refresh, observer: null };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, { once: true });
  } else {
    boot();
  }
})();
