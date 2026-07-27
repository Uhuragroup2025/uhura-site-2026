/* Global navigation: declarative content, shared rendering and interaction. */

(() => {
  const NAV_VERSION = "editorial-v1";
  const MOBILE_QUERY = "(max-width: 860px)";
  const CLOSE_DELAY = 180;

  if (window.__uhuraGlobalNavInitialized) return;
  if (!window.__uhuraServices) return;
  window.__uhuraGlobalNavInitialized = true;

  const serviceCatalog = window.__uhuraServices;
  const getRootPrefix = serviceCatalog.getRootPrefix;

  const getNavModel = () => [
    {
      label: "Soluciones",
      key: "soluciones",
      type: "dropdown",
      intro: {
        eyebrow: "Capacidades conectadas",
        tagline: "De la idea al crecimiento.",
      },
      items: serviceCatalog.items,
    },
    {
      label: "Casos de éxito",
      key: "casos",
      type: "dropdown",
      items: [
        {
          label: "Kaiowa",
          path: "/casos/kaiowa.html",
          key: "kaiowa",
          status: "active",
        },
        {
          label: "Cristar",
          path: "/casos-de-exito/cristar/",
          key: "cristar",
          status: "active",
        },
      ],
    },
    {
      label: "Nosotros",
      path: "/nosotros.html",
      key: "nosotros",
      type: "link",
      status: "active",
    },
  ];

  const getRenderableNavItems = () =>
    getNavModel()
      .map((item) => {
        if (item.type !== "dropdown") return item.status === "planned" ? null : item;
        const activeItems = item.items.filter((child) => child.status === "active");
        return activeItems.length ? { ...item, items: activeItems } : null;
      })
      .filter(Boolean);

  const withRoot = (path) => serviceCatalog.resolvePath(path);

  const renderDropdownChild = (child, index) => {
    const href = withRoot(child.path);
    const itemNumber = String(index + 1).padStart(2, "0");
    return `
                  <a class="uhura-dropdown-link" href="${href}" data-href="${href}" data-uhura-nav-link="${child.key}" role="menuitem">
                    <span class="uhura-dropdown-index">${itemNumber}</span>
                    <span class="uhura-dropdown-name">${child.label}</span>
                    ${child.description ? `<span class="uhura-dropdown-description">${child.description}</span>` : ""}
                    <span class="uhura-dropdown-arrow" aria-hidden="true">→</span>
                  </a>`;
  };

  const renderNavItem = (item) => {
    if (item.type === "dropdown") {
      const panelId = `uhura-dropdown-${item.key}`;
      const compactClass = item.items.length === 1 ? " uhura-dropdown--compact" : "";
      return `
            <div class="uhura-nav-item" data-uhura-dropdown>
              <button class="uhura-nav-link" type="button" data-dropdown-trigger data-uhura-nav-link="${item.key}" aria-expanded="false" aria-controls="${panelId}">${item.label}</button>
              <div class="uhura-dropdown${compactClass}" id="${panelId}" role="menu" aria-label="${item.label}">
                ${item.intro ? `
                <div class="uhura-dropdown-intro" aria-hidden="true">
                  <span>${item.intro.eyebrow}</span>
                  <span>${item.intro.tagline}</span>
                </div>` : ""}
                <div class="uhura-dropdown-grid">
                  ${item.items.map(renderDropdownChild).join("")}
                </div>
              </div>
            </div>`;
    }

    return `<a class="uhura-nav-link" data-uhura-nav-link="${item.key}" href="${withRoot(item.path)}" data-href="${withRoot(item.path)}">${item.label}</a>`;
  };

  const renderNavLinks = () => getRenderableNavItems().map(renderNavItem).join("");

  const getExpectedLinks = () => {
    return getRenderableNavItems().flatMap((item) => {
      if (item.type === "dropdown") {
        return item.items.map((child) => ({ key: child.key, href: withRoot(child.path) }));
      }
      return [{ key: item.key, href: withRoot(item.path) }];
    });
  };

  const renderNav = () => {
    const root = getRootPrefix();
    return `
      <div class="uhura-nav-wrap" data-uhura-global-nav="true" data-uhura-global-nav-version="${NAV_VERSION}">
        <nav class="uhura-nav" aria-label="Navegación principal">
          <a href="${root}/index.html" aria-label="Uhura home">
            <img class="uhura-logo" src="${root}/assets/logos/logo-uhura-blanco.webp" alt="Uhura Group">
          </a>
          <div class="uhura-nav-links" id="uhura-global-nav-links">
            ${renderNavLinks()}
          </div>
          <a class="uhura-nav-cta" href="mailto:catalina@uhuragroup.com">Hablemos <span aria-hidden="true">→</span></a>
          <button class="uhura-menu-toggle" type="button" aria-label="Abrir menú" aria-expanded="false" aria-controls="uhura-global-nav-links"><span aria-hidden="true"></span></button>
        </nav>
      </div>`;
  };

  const normalizeVisuals = () => {
    const root = getRootPrefix();
    document.querySelectorAll(".uhura-nav-logo img, .uhura-logo").forEach((logo) => {
      logo.setAttribute("src", root + "/assets/logos/logo-uhura-blanco.webp");
      logo.setAttribute("alt", "Uhura Group");
    });
    document.querySelectorAll(".uhura-nav-cta").forEach((cta) => {
      if (!cta.querySelector("span")) cta.innerHTML = "Hablemos <span aria-hidden=\"true\">→</span>";
    });
    setActiveState();
  };

  const getActiveKeys = () => {
    const path = window.location.pathname;
    const activeService = serviceCatalog.matchPath(path);
    if (activeService) return new Set(["soluciones", activeService.key]);
    if (path.includes("/servicios/")) return new Set(["soluciones"]);
    if (path.includes("/casos/kaiowa")) return new Set(["casos", "kaiowa"]);
    if (path.includes("/casos-de-exito/cristar")) return new Set(["casos", "cristar"]);
    if (path.includes("/casos-de-exito/")) return new Set(["casos"]);
    if (path.includes("/casos/")) return new Set(["casos"]);
    if (path.includes("/nosotros")) return new Set(["nosotros"]);
    return new Set(["home"]);
  };

  const setActiveState = () => {
    const activeKeys = getActiveKeys();
    document.querySelectorAll(".uhura-nav-link[data-uhura-nav-link]").forEach((link) => {
      const isActive = activeKeys.has(link.dataset.uhuraNavLink);
      link.classList.toggle("is-active", isActive);
      if (isActive) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });
    document.querySelectorAll(".uhura-dropdown a[data-uhura-nav-link]").forEach((link) => {
      const isActive = activeKeys.has(link.dataset.uhuraNavLink);
      link.classList.toggle("is-active", isActive);
      if (isActive) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  };

  const hasExpectedNav = (scope = document) =>
    getExpectedLinks().every((item) =>
      scope.querySelector('[data-uhura-nav-link="' + item.key + '"][href="' + item.href + '"]')
    );

  const refreshNavLinks = (scope = document) => {
    const nav = scope.querySelector(".uhura-nav-links");
    if (!nav) return false;
    if (nav.dataset.uhuraGlobalNavVersion === NAV_VERSION && hasExpectedNav(scope)) return true;
    nav.innerHTML = renderNavLinks();
    nav.dataset.uhuraGlobalNav = "true";
    nav.dataset.uhuraGlobalNavVersion = NAV_VERSION;
    return true;
  };

  const ensureMobileToggle = (scope = document) => {
    const nav = scope.matches?.(".uhura-nav, .uhura-premium-nav")
      ? scope
      : scope.querySelector(".uhura-nav, .uhura-premium-nav");
    const links = nav?.querySelector(".uhura-nav-links");
    if (!nav || !links) return false;

    if (!links.id) links.id = "uhura-global-nav-links";

    const toggles = Array.from(nav.querySelectorAll(".uhura-menu-toggle"));
    toggles.slice(1).forEach((toggle) => toggle.remove());

    let toggle = toggles[0];
    if (!toggle) {
      toggle = document.createElement("button");
      toggle.className = "uhura-menu-toggle";
      toggle.type = "button";
      toggle.innerHTML = '<span aria-hidden="true"></span>';
      nav.appendChild(toggle);
    }

    toggle.setAttribute("aria-label", nav.classList.contains("is-open") ? "Cerrar menú" : "Abrir menú");
    toggle.setAttribute("aria-expanded", String(nav.classList.contains("is-open")));
    toggle.setAttribute("aria-controls", links.id);
    return true;
  };

  const sync = () => {
    const existingWraps = Array.from(document.querySelectorAll(".uhura-nav-wrap"));
    if (existingWraps.length) {
      existingWraps.forEach((wrap, index) => {
        if (index === 0) {
          if (wrap.dataset.uhuraGlobalNavVersion !== NAV_VERSION || !hasExpectedNav(wrap)) {
            wrap.outerHTML = renderNav();
          } else {
            refreshNavLinks(wrap);
          }
        } else {
          wrap.remove();
        }
      });
      ensureMobileToggle(document);
      normalizeVisuals();
      return true;
    }

    document.querySelectorAll("[data-uhura-nav]").forEach((mount) => {
      if (!mount.querySelector(".uhura-nav")) mount.innerHTML = renderNav();
    });

    const nav = document.querySelector(".uhura-nav-links");
    if (!nav) return false;
    if (refreshNavLinks(document)) {
      ensureMobileToggle(document);
      normalizeVisuals();
      return true;
    }
    return false;
  };

  const closeTimers = new WeakMap();
  const isMobile = () => window.matchMedia(MOBILE_QUERY).matches;

  const closeDropdown = (item, returnFocus = false) => {
    if (!item) return;
    const timer = closeTimers.get(item);
    if (timer) window.clearTimeout(timer);
    closeTimers.delete(item);
    item.classList.remove("is-open");
    const trigger = item.querySelector("[data-dropdown-trigger]");
    trigger?.setAttribute("aria-expanded", "false");
    if (returnFocus) trigger?.focus();
  };

  const closeAllDropdowns = (except = null) => {
    document.querySelectorAll("[data-uhura-dropdown].is-open").forEach((item) => {
      if (item !== except) closeDropdown(item);
    });
  };

  const openDropdown = (item) => {
    if (!item) return;
    const timer = closeTimers.get(item);
    if (timer) window.clearTimeout(timer);
    closeTimers.delete(item);
    closeAllDropdowns(item);
    item.classList.add("is-open");
    item.querySelector("[data-dropdown-trigger]")?.setAttribute("aria-expanded", "true");
  };

  const scheduleDropdownClose = (item) => {
    if (!item || isMobile()) return;
    const currentTimer = closeTimers.get(item);
    if (currentTimer) window.clearTimeout(currentTimer);
    closeTimers.set(
      item,
      window.setTimeout(() => {
        if (!item.matches(":hover") && !item.contains(document.activeElement)) closeDropdown(item);
      }, CLOSE_DELAY)
    );
  };

  const closeMobileMenu = (returnFocus = false) => {
    const nav = document.querySelector(".uhura-nav.is-open, .uhura-premium-nav.is-open");
    if (!nav) return;
    nav.classList.remove("is-open");
    const toggle = nav.querySelector(".uhura-menu-toggle");
    toggle?.setAttribute("aria-expanded", "false");
    toggle?.setAttribute("aria-label", "Abrir menú");
    closeAllDropdowns();
    if (returnFocus) toggle?.focus();
  };

  const routeNavClick = (event) => {
    const trigger = event.target.closest("[data-dropdown-trigger]");
    if (trigger) {
      event.preventDefault();
      const item = trigger.closest("[data-uhura-dropdown]");
      item?.classList.contains("is-open") ? closeDropdown(item) : openDropdown(item);
      return;
    }

    const toggle = event.target.closest(".uhura-menu-toggle");
    if (toggle) {
      const navBox = toggle.closest(".uhura-nav, .uhura-premium-nav");
      const isOpen = navBox?.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(Boolean(isOpen)));
      toggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
      if (!isOpen) closeAllDropdowns();
      if (isOpen && event.detail === 0) {
        navBox?.querySelector(".uhura-nav-links a, .uhura-nav-links button")?.focus();
      }
      return;
    }

    const link = event.target.closest(".uhura-nav-links a, .uhura-nav-cta");
    if (!link) return;
    const targetHref = link.dataset.href || link.getAttribute("href");
    if (!targetHref || targetHref.startsWith("mailto:")) return;
    closeAllDropdowns();
    closeMobileMenu();
    event.preventDefault();
    window.location.href = targetHref;
  };

  const routePointerOver = (event) => {
    if (isMobile()) return;
    const item = event.target.closest("[data-uhura-dropdown]");
    if (!item || item.contains(event.relatedTarget)) return;
    openDropdown(item);
  };

  const routePointerOut = (event) => {
    if (isMobile()) return;
    const item = event.target.closest("[data-uhura-dropdown]");
    if (!item || item.contains(event.relatedTarget)) return;
    scheduleDropdownClose(item);
  };

  const routeFocusIn = (event) => {
    if (isMobile()) return;
    const item = event.target.closest("[data-uhura-dropdown]");
    if (item) openDropdown(item);
  };

  const routeFocusOut = (event) => {
    const item = event.target.closest("[data-uhura-dropdown]");
    if (!item || item.contains(event.relatedTarget)) return;
    scheduleDropdownClose(item);
  };

  const routeNavKeydown = (event) => {
    const trigger = event.target.closest("[data-dropdown-trigger]");
    const item = event.target.closest("[data-uhura-dropdown]");
    const menuItem = event.target.closest('[role="menuitem"]');

    if (trigger && ["ArrowDown", "Enter", " "].includes(event.key)) {
      event.preventDefault();
      openDropdown(item);
      item?.querySelector('[role="menuitem"]')?.focus();
      return;
    }

    if (item && event.key === "Escape") {
      event.preventDefault();
      if (isMobile()) {
        closeMobileMenu(true);
      } else {
        closeDropdown(item, true);
      }
      return;
    }

    if (!menuItem || !item) return;
    const menuItems = Array.from(item.querySelectorAll('[role="menuitem"]'));
    const index = menuItems.indexOf(menuItem);
    if (event.key === "ArrowDown") {
      event.preventDefault();
      menuItems[(index + 1) % menuItems.length]?.focus();
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      menuItems[(index - 1 + menuItems.length) % menuItems.length]?.focus();
    } else if (event.key === "Home") {
      event.preventDefault();
      menuItems[0]?.focus();
    } else if (event.key === "End") {
      event.preventDefault();
      menuItems[menuItems.length - 1]?.focus();
    }
  };

  const routeDocumentClick = (event) => {
    routeNavClick(event);
    if (!event.target.closest(".uhura-nav, .uhura-premium-nav")) {
      closeAllDropdowns();
      closeMobileMenu();
    }
  };

  const boot = () => {
    let tries = 0;
    const tick = () => {
      if (sync() || tries++ > 40) return;
      window.setTimeout(tick, 150);
    };
    tick();

    document.addEventListener("click", routeDocumentClick, true);
    document.addEventListener("pointerover", routePointerOver);
    document.addEventListener("pointerout", routePointerOut);
    document.addEventListener("focusin", routeFocusIn);
    document.addEventListener("focusout", routeFocusOut);
    document.addEventListener("keydown", (event) => {
      routeNavKeydown(event);
      if (event.key === "Escape" && !event.defaultPrevented) {
        closeAllDropdowns();
        closeMobileMenu(true);
      }
    });

    window.matchMedia(MOBILE_QUERY).addEventListener("change", () => {
      closeAllDropdowns();
      closeMobileMenu();
    });

    const observer = new MutationObserver(() => sync());
    observer.observe(document.body, { childList: true, subtree: true });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, { once: true });
  } else {
    boot();
  }
})();
