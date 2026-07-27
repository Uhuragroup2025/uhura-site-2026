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
    const meetingReady = activateButton(
      "Agendar reunión",
      "mailto:catalina@uhuragroup.com?subject=Agendar%20reuni%C3%B3n%20con%20Uhura"
    );
    const casesReady = activateButton("Ver casos de éxito", "#trabajo");
    labelCarouselControls();
    const capabilitiesHeadingReady = refineCapabilitiesHeading();
    const clientsHeadingReady = refineClientsHeading();
    const clientsLogoRailReady = upgradeClientsLogoRail();
    const presenceReady = mountPresencePills();
    return (
      titleReady &&
      meetingReady &&
      casesReady &&
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
