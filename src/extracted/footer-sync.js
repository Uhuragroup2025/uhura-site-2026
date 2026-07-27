/*
  Uhura shared footer.
  Each page exposes <div id="uhura-footer-root" data-uhura-footer></div> as a
  final body-level sibling of the page app/main. This file only renders the
  approved footer into that root so the component has a single source of truth
  and never inherits a local page wrapper.
*/

(() => {
  if (!window.__uhuraServices) return;

  const serviceCatalog = window.__uhuraServices;
  const getRootPrefix = serviceCatalog.getRootPrefix;

  const footerGroups = [
    {
      title: "Soluciones",
      links: serviceCatalog.items.map((service) => ({
        label: service.label,
        href: service.status === "active" ? service.path : null,
      })),
    },
    {
      title: "Empresa",
      links: [
        { label: "Nosotros", href: "nosotros.html" },
        { label: "Nuestro trabajo", href: "#trabajo" },
        { label: "Clientes", href: "#clientes" },
        { label: "Metodología", href: "#metodologia" },
      ],
    },
    {
      title: "Contacto",
      links: [
        { label: "Hablemos", href: "/contacto/" },
        { label: "www.uhuragroup.com", href: "https://www.uhuragroup.com" },
        { label: "LinkedIn", href: null },
        { label: "Instagram", href: null },
      ],
    },
  ];

  const localizeHref = (href) => {
    const root = getRootPrefix();
    if (href.startsWith("/")) return serviceCatalog.resolvePath(href);
    if (href.startsWith("#")) return root + "/index.html" + href;
    if (href === "nosotros.html") return root + "/nosotros.html";
    if (href === "casos/kaiowa.html") return root + "/casos/kaiowa.html";
    return href;
  };

  const renderLink = (item) => item.href ? `
    <div style="margin-bottom:11px">
      <a href="${localizeHref(item.href)}" class="uhura-shared-footer__link">
        <span class="uhura-shared-footer__link-dot"></span>
        ${item.label}
      </a>
    </div>
  ` : `
    <div style="margin-bottom:11px">
      <span class="uhura-shared-footer__link" aria-disabled="true">
        <span class="uhura-shared-footer__link-dot"></span>
        ${item.label}
      </span>
    </div>
  `;

  const renderColumn = (group) => `
    <div>
      <div class="uhura-shared-footer__column-title">${group.title}</div>
      ${group.links.map(renderLink).join("")}
    </div>
  `;

  const renderFooter = () => `
    <footer class="uhura-shared-footer" data-uhura-footer-sync="true">
      <div class="uhura-shared-footer__container">
        <div class="uhura-shared-footer__line"></div>
      </div>
      <div class="uhura-shared-footer__container uhura-shared-footer__top">
        <div class="uhura-shared-footer__brand">
          <div class="uhura-shared-footer__brandmark">
            <span class="uhura-shared-footer__brandmark-name">UHURA</span>
            <span class="uhura-shared-footer__brandmark-dot">.</span>
            <span class="uhura-shared-footer__brandmark-group">group</span>
          </div>
          <p class="uhura-shared-footer__brand-copy">Performance y crecimiento digital. Estrategia, growth, websites, ecommerce y AI agents para marcas que no se conforman con lo promedio.</p>
          <div class="uhura-shared-footer__badges">
            ${["Colombia", "México", "USA"].map((label) => `<span>${label}</span>`).join("")}
          </div>
        </div>
        ${footerGroups.map(renderColumn).join("")}
      </div>
      <div class="uhura-shared-footer__container uhura-shared-footer__cta-wrap">
        <div class="uhura-shared-footer__cta">
          <div class="uhura-shared-footer__cta-copy">
            <div class="uhura-shared-footer__cta-title">
              No necesitas más tráfico. <span>Necesitas conversión.</span>
            </div>
            <div class="uhura-shared-footer__cta-subcopy">Diseñemos un sistema que convierta mejor cada visita.</div>
          </div>
          <a href="${localizeHref("/contacto/")}" data-uhura-footer-cta class="button-primary uhura-shared-footer__cta-link">Hablemos →</a>
        </div>
      </div>
      <div class="uhura-shared-footer__container uhura-shared-footer__bottom">
        <span>© 2026 Uhura Group. Todos los derechos reservados.</span>
      </div>
    </footer>
  `;

  const attachHover = (footer) => {
    footer.querySelectorAll("a").forEach((link) => {
      if (link.hasAttribute("data-uhura-footer-cta")) {
        link.addEventListener("mouseenter", () => {
          link.style.transform = "translateY(-2px)";
          link.style.boxShadow = "0 12px 32px rgba(137,69,240,0.45)";
        });
        link.addEventListener("mouseleave", () => {
          link.style.transform = "translateY(0)";
          link.style.boxShadow = "0 8px 24px rgba(137,69,240,0.35)";
        });
        return;
      }

      link.addEventListener("mouseenter", () => {
        link.style.color = "#ffffff";
        const dot = link.querySelector("span");
        if (dot) {
          dot.style.background = "#c1a1ff";
          dot.style.boxShadow = "0 0 6px rgba(193,161,255,0.8)";
        }
      });
      link.addEventListener("mouseleave", () => {
        link.style.color = "rgba(255,255,255,0.72)";
        const dot = link.querySelector("span");
        if (dot) {
          dot.style.background = "transparent";
          dot.style.boxShadow = "none";
        }
      });
    });
  };

  const sync = () => {
    const globalRoot = document.querySelector("#uhura-footer-root[data-uhura-footer]");
    const mounts = globalRoot ? [globalRoot] : Array.from(document.querySelectorAll("[data-uhura-footer]"));
    if (!mounts.length) return false;

    mounts.forEach((mount) => {
      if (mount.dataset.uhuraFooterReady === "true") return;
      mount.innerHTML = renderFooter();
      mount.dataset.uhuraFooterReady = "true";
      attachHover(mount.querySelector("footer"));
    });

    return true;
  };

  const boot = () => {
    let tries = 0;
    const tick = () => {
      if (sync() || tries++ > 40) return;
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
