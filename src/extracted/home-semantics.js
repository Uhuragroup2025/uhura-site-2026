/* Staging-safe semantic and interaction fixes for the legacy Home bundle. */

(() => {
  if (window.__uhuraHomeSemanticsInitialized) return;
  window.__uhuraHomeSemanticsInitialized = true;

  const copyAttributes = (source, target) => {
    Array.from(source.attributes).forEach((attribute) => {
      target.setAttribute(attribute.name, attribute.value);
    });
  };

  const promoteHeroTitle = () => {
    if (document.querySelector("main h1")) return true;
    const hero = document.querySelector("section#hero");
    if (!hero) return false;

    const candidates = Array.from(hero.querySelectorAll("div")).filter((element) => {
      const text = (element.textContent || "").replace(/\s+/g, " ").trim();
      return text.includes("Crecimiento") && text.includes("IA, datos y un equipo");
    });
    const title = candidates.sort(
      (first, second) => first.querySelectorAll("*").length - second.querySelectorAll("*").length
    )[0];
    if (!title) return false;

    const heading = document.createElement("h1");
    copyAttributes(title, heading);
    while (title.firstChild) heading.appendChild(title.firstChild);
    title.replaceWith(heading);
    return true;
  };

  const activateButton = (label, destination) => {
    const button = Array.from(document.querySelectorAll("main button")).find(
      (candidate) => candidate.textContent.trim() === label
    );
    if (!button || button.dataset.uhuraActionReady === "true") return Boolean(button);
    button.dataset.uhuraActionReady = "true";
    button.addEventListener("click", () => {
      window.location.href = destination;
    });
    return true;
  };

  const resolveContactHref = () => {
    const catalog = window.__uhuraServices;
    if (catalog?.resolvePath) return catalog.resolvePath("/contacto/");
    return window.location.protocol === "file:" ? "contacto/index.html" : "/contacto/";
  };

  const labelCarouselControls = () => {
    document.querySelectorAll("main button").forEach((button) => {
      const label = button.textContent.trim();
      if (label === "←" && !button.hasAttribute("aria-label")) {
        button.setAttribute("aria-label", "Caso anterior");
      }
      if (label === "→" && !button.hasAttribute("aria-label")) {
        button.setAttribute("aria-label", "Caso siguiente");
      }
    });
  };

  const refineCapabilitiesHeading = () => {
    const heading = Array.from(document.querySelectorAll("main h2")).find(
      (candidate) => candidate.textContent.trim() === "Lo que hacemos"
    );
    if (!heading) return false;

    const wrapper = heading.parentElement;
    const suffix = Array.from(wrapper?.children || []).find(
      (candidate) => candidate !== heading && candidate.textContent.trim() === "mejor."
    );
    if (!suffix) return false;

    heading.textContent = "Lo que hacemos ";
    suffix.textContent = "mejor:";
    [heading, suffix].forEach((node) => {
      node.classList.add("section-title");
      node.style.fontSize = "";
      node.style.lineHeight = "";
      node.style.letterSpacing = "";
    });
    wrapper.dataset.homeCapabilitiesHeading = "true";
    heading.dataset.homeCapabilitiesHeadingText = "true";
    suffix.dataset.homeCapabilitiesHeadingScript = "true";
    return true;
  };

  const escapeAttribute = (value) =>
    String(value)
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

  const defaultClientLogos = [
    ["Bonafont", "assets/logos/logo-bonafont.webp"],
    ["Kaiowa", "assets/logos/logo-kaiowa-.webp"],
    ["Únula", "assets/logos/logo-unula.webp"],
    ["Uhura Group", "assets/logos/logo-uhura-negro.webp"],
    ["Yamaha", "assets/logos/logo-yamaha.webp"],
    ["Danone", "assets/logos/logo-danone.webp"],
    ["Cristar", "assets/logos/logo-cristar.webp"]
  ];

  const getText = (element) => (element?.textContent || "").replace(/\s+/g, " ").trim();

  const removeHeroSupportElements = () => {
    const hero = document.querySelector("section#hero");
    if (!hero) return false;

    const removed = [];
    Array.from(hero.querySelectorAll("p")).forEach((paragraph) => {
      if (getText(paragraph) === "El crecimiento digital no es suerte. Es performance, estrategia y acción.") {
        removed.push(paragraph);
      }
    });
    Array.from(hero.querySelectorAll("div")).forEach((element) => {
      if (getText(element) === "Scroll") {
        removed.push(element);
      }
    });
    removed.forEach((element) => element.remove());
    hero.dataset.homeHeroRefined = "true";
    return true;
  };

  const markHeroMetrics = () => {
    const hero = document.querySelector("section#hero");
    if (!hero) return false;
    const metricGrid = Array.from(hero.querySelectorAll("div")).find((element) => {
      const text = getText(element);
      return text.includes("Retorno promedio") && text.includes("Proyectos entregados") && element.children.length === 4;
    });
    if (!metricGrid) return false;

    metricGrid.dataset.homeHeroMetrics = "true";
    Array.from(metricGrid.children).forEach((item) => {
      item.dataset.homeHeroMetric = "true";
      const content = Array.from(item.children).find((child) => child.children.length >= 2);
      if (content) content.dataset.homeHeroMetricContent = "true";
      const spans = Array.from(item.querySelectorAll("span"));
      const label = spans.at(-1);
      if (label) {
        label.setAttribute("data-home-hero-metric-label", "true");
        label.classList.add("metric-caption");
      }
    });
    return true;
  };

  const markBottleneckCards = () => {
    const section = Array.from(document.querySelectorAll("main section")).find((element) =>
      getText(element).includes("Antes de crecer, encuentra el cuello de botella.")
    );
    if (!section) return false;
    section.dataset.homeBottleneckSection = "true";
    const grid = Array.from(section.querySelectorAll("div")).find((element) => {
      const text = getText(element);
      return text.includes("Pauta") && text.includes("Sitio") && text.includes("Datos") && text.includes("Operación") && element.children.length === 4;
    });
    if (!grid) return false;
    grid.dataset.homeBottleneckGrid = "true";
    Array.from(grid.children).forEach((card) => {
      card.dataset.homeBottleneckCard = "true";
    });
    return true;
  };

  const markServiceCards = () => {
    const section = document.getElementById("servicios");
    if (!section) return false;
    const grid = Array.from(section.querySelectorAll("div")).find((element) => {
      const text = getText(element);
      return (
        text.includes("No diseñamos para impresionar") &&
        text.includes("Construimos plataformas digitales") &&
        text.includes("Gestionamos presupuestos") &&
        element.children.length >= 3
      );
    });
    if (!grid) return false;
    grid.dataset.homeServiceCardsGrid = "true";
    Array.from(grid.children).forEach((card) => {
      const text = getText(card);
      if (
        text.includes("Brand & Content") ||
        text.includes("Websites & Ecommerce") ||
        text.includes("SEO & Growth")
      ) {
        card.dataset.homeServiceCard = "true";
      }
    });
    return true;
  };

  const refineDiagnosisLabels = () => {
    const benchmark = document.getElementById("benchmark");
    if (!benchmark) return false;
    const labels = new Map([
      ["Pais", "¿En qué país está tu empresa?"],
      ["País", "¿En qué país está tu empresa?"],
      ["Industria", "¿Cuál es tu industria?"],
      ["Facturacion", "¿Cuál es tu facturación mensual?"],
      ["Facturación", "¿Cuál es tu facturación mensual?"],
      ["Madurez", "¿En qué etapa está tu empresa?"]
    ]);

    let changed = false;
    Array.from(benchmark.querySelectorAll("label > span")).forEach((span) => {
      const replacement = labels.get(getText(span));
      if (!replacement) return;
      span.textContent = replacement;
      span.dataset.homeDiagnosisLabel = "true";
      span.classList.add("metric-label");
      changed = true;
    });
    benchmark.dataset.homeDiagnosisRefined = "true";
    return changed;
  };

  const markDiagnosisResult = () => {
    const benchmark = document.getElementById("benchmark");
    if (!benchmark) return false;
    const result = Array.from(benchmark.querySelectorAll("div")).find((element) => {
      const text = getText(element);
      return text.includes("ROAS") && text.includes("Saludable") && text.includes("Cómo mejorar");
    });
    if (!result) return false;
    result.dataset.homeDiagnosisResult = "true";
    const score = Array.from(result.querySelectorAll("div")).find((element) => getText(element) === "3.5ROAS");
    if (score) score.dataset.homeDiagnosisScore = "true";
    Array.from(result.querySelectorAll("span")).forEach((span) => {
      const text = getText(span);
      if (text === "3.5" || text === "ROAS") span.dataset.homeDiagnosisScoreText = "true";
    });
    return true;
  };

  const upgradeClientsLogoRail = () => {
    const section = document.getElementById("clientes");
    if (!section) return false;
    if (section.querySelector("[data-home-clients-logo-rail='true']")) return true;

    const legacyMarquee = section.querySelector(".uhura-logo-marquee");
    const legacyImages = Array.from(legacyMarquee?.querySelectorAll("img") || []);
    const logos = legacyImages.length
      ? Array.from(
          legacyImages
            .reduce((items, image) => {
              const src = image.getAttribute("src");
              if (src && !items.has(src)) {
                items.set(src, [image.getAttribute("alt") || "", src]);
              }
              return items;
            }, new Map())
            .values()
        )
      : defaultClientLogos;

    let host = legacyMarquee?.parentElement || null;
    if (!host) {
      const headingContainer = section.querySelector("[data-home-clients-heading='true']")?.parentElement;
      if (!headingContainer) return false;
      host = document.createElement("div");
      headingContainer.after(host);
    }
    if (!host || !logos.length) return false;

    host.removeAttribute("style");
    host.className = "logo-rail logo-rail--brands";
    host.dataset.logoRail = "";
    host.dataset.homeClientsLogoRail = "true";
    host.setAttribute("aria-label", "Marcas que crecieron");
    host.innerHTML = `
      <p class="logo-rail__label">Marcas que crecieron con Uhura</p>
      <div class="logo-rail__viewport">
        <div class="logo-rail__track">
          <div class="logo-rail__group">
            ${logos
              .map(
                ([label, src]) =>
                  `<img class="logo-rail__logo" src="${escapeAttribute(src)}" alt="${escapeAttribute(label)}" loading="lazy">`
              )
              .join("")}
          </div>
        </div>
      </div>
    `;
    return true;
  };

  const refineClientsHeading = () => {
    const section = document.getElementById("clientes");
    if (!section) return false;

    const heading = Array.from(section.querySelectorAll("h2")).find((candidate) =>
      candidate.textContent.includes("Marcas que")
    );
    if (!heading) return false;

    const wrapper = heading.closest("div");
    if (wrapper) wrapper.dataset.homeClientsHeading = "true";
    heading.classList.add("section-title");
    heading.style.fontSize = "";
    heading.style.lineHeight = "";
    heading.style.letterSpacing = "";
    return true;
  };

  const mountPresencePills = () => {
    const section = document.getElementById("clientes");
    if (!section) return false;
    if (section.querySelector("[data-presence-pills='true']")) return true;

    const label = Array.from(section.querySelectorAll("span")).find(
      (candidate) => candidate.textContent.trim() === "Presencia:"
    );
    if (!label) return false;

    const host = label.parentElement;
    if (!host) return false;

    host.dataset.presencePills = "true";
    host.innerHTML = `
      <span class="home-presence-pills__label">Presencia</span>
      <ul class="home-presence-pills__list" aria-label="Países con presencia">
        <li><span aria-hidden="true">🇨🇴</span> Colombia</li>
        <li><span aria-hidden="true">🇲🇽</span> México</li>
        <li><span aria-hidden="true">🇺🇸</span> Estados Unidos</li>
      </ul>
    `;
    return true;
  };

  const refresh = () => {
    const titleReady = promoteHeroTitle();
    const meetingReady = activateButton("Agendar reunión", resolveContactHref());
    const casesReady = activateButton("Ver casos de éxito", "#trabajo");
    labelCarouselControls();
    const heroSupportReady = removeHeroSupportElements();
    const heroMetricsReady = markHeroMetrics();
    const bottleneckReady = markBottleneckCards();
    const serviceCardsReady = markServiceCards();
    const diagnosisLabelsReady = refineDiagnosisLabels();
    const diagnosisResultReady = markDiagnosisResult();
    const capabilitiesHeadingReady = refineCapabilitiesHeading();
    const clientsHeadingReady = refineClientsHeading();
    const clientsLogoRailReady = upgradeClientsLogoRail();
    const presenceReady = mountPresencePills();
    return (
      titleReady &&
      meetingReady &&
      casesReady &&
      heroSupportReady &&
      heroMetricsReady &&
      bottleneckReady &&
      serviceCardsReady &&
      diagnosisLabelsReady &&
      diagnosisResultReady &&
      capabilitiesHeadingReady &&
      clientsHeadingReady &&
      clientsLogoRailReady &&
      presenceReady
    );
  };

  const boot = () => {
    let attempts = 0;
    const tick = () => {
      if (refresh() || attempts >= 60) return;
      attempts += 1;
      window.setTimeout(tick, 100);
    };
    tick();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, { once: true });
  } else {
    boot();
  }
})();
