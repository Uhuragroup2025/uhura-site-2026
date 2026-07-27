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
          <path class="home-presence-map__axis" d="M92 58C146 38 208 42 265 70S357 141 382 194"/>
          <path class="home-presence-map__axis home-presence-map__axis--secondary" d="M92 58C130 97 162 126 196 151S260 190 324 204"/>
          <path class="home-presence-map__axis home-presence-map__axis--secondary" d="M168 96C206 83 246 91 285 118S343 165 382 194"/>
          <g class="home-presence-map__satellites">
            <circle cx="56" cy="88" r="3"></circle>
            <circle cx="118" cy="38" r="4"></circle>
            <circle cx="150" cy="138" r="3"></circle>
            <circle cx="235" cy="56" r="3"></circle>
            <circle cx="300" cy="98" r="4"></circle>
            <circle cx="340" cy="168" r="3"></circle>
          </g>
          <g class="home-presence-map__marker home-presence-map__marker--usa" transform="translate(92 58)">
            <circle class="home-presence-map__pulse" r="18"></circle>
            <circle r="7"></circle>
            <path d="M13 0h36"></path>
          </g>
          <g class="home-presence-map__marker home-presence-map__marker--mexico" transform="translate(168 96)">
            <circle class="home-presence-map__pulse" r="16"></circle>
            <circle r="7"></circle>
            <path d="M12 0h34"></path>
          </g>
          <g class="home-presence-map__marker home-presence-map__marker--colombia" transform="translate(196 151)">
            <circle class="home-presence-map__pulse" r="16"></circle>
            <circle r="7"></circle>
            <path d="M12 0h34"></path>
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
