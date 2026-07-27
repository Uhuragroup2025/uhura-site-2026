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

  const mountPresenceMap = () => {
    const section = document.getElementById("clientes");
    if (!section) return false;
    if (section.querySelector("[data-presence-map='true']")) return true;

    const label = Array.from(section.querySelectorAll("span")).find(
      (candidate) => candidate.textContent.trim() === "Presencia:"
    );
    if (!label) return false;

    const host = label.parentElement;
    if (!host) return false;

    host.dataset.presenceMap = "true";
    host.innerHTML = `
      <div class="home-presence-map__visual" aria-hidden="true">
        <svg viewBox="0 0 420 250" focusable="false">
          <path class="home-presence-map__land" d="M74 42c22-18 56-24 88-18 28 5 45 22 59 44 14 21 31 28 56 24 27-4 51 3 65 24 14 22 10 48-7 69-21 26-61 33-93 22-27-10-50-29-80-27-31 2-54 26-84 18-31-8-46-38-38-70 8-33 11-67 34-86Z"/>
          <path class="home-presence-map__coast" d="M155 76c14 17 22 37 19 61-2 20-12 36-25 51M232 104c-11 24-9 48 4 72M304 116c-22 9-38 24-49 45"/>
          <g class="home-presence-map__marker home-presence-map__marker--usa" transform="translate(138 70)">
            <circle r="12"></circle><path d="M-5 0h10M0-5v10"></path>
          </g>
          <g class="home-presence-map__marker home-presence-map__marker--mexico" transform="translate(175 112)">
            <circle r="12"></circle><path d="M-5 0h10M0-5v10"></path>
          </g>
          <g class="home-presence-map__marker home-presence-map__marker--colombia" transform="translate(232 166)">
            <circle r="12"></circle><path d="M-5 0h10M0-5v10"></path>
          </g>
        </svg>
      </div>
      <div class="home-presence-map__content">
        <span class="home-presence-map__label">Presencia</span>
        <ul class="home-presence-map__list">
          <li><span aria-hidden="true">🇨🇴</span> Colombia</li>
          <li><span aria-hidden="true">🇲🇽</span> México</li>
          <li><span aria-hidden="true">🇺🇸</span> Estados Unidos</li>
        </ul>
      </div>
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
    const presenceReady = mountPresenceMap();
    return titleReady && meetingReady && casesReady && capabilitiesHeadingReady && presenceReady;
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
