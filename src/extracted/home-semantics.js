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

  const refresh = () => {
    const titleReady = promoteHeroTitle();
    const meetingReady = activateButton(
      "Agendar reunión",
      "mailto:catalina@uhuragroup.com?subject=Agendar%20reuni%C3%B3n%20con%20Uhura"
    );
    const casesReady = activateButton("Ver casos de éxito", "#trabajo");
    labelCarouselControls();
    return titleReady && meetingReady && casesReady;
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
