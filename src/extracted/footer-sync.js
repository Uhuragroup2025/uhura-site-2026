/*
  Uhura shared footer.
  Each page exposes <div id="uhura-footer-root" data-uhura-footer></div> as a
  final body-level sibling of the page app/main. This file only renders the
  approved footer into that root so the component has a single source of truth
  and never inherits a local page wrapper.
*/

(() => {
  const getRootPrefix = () => {
    const path = window.location.pathname;
    if (path.includes("/workbench/") || path.includes("/casos/") || path.includes("/servicios/")) return "..";
    return ".";
  };

  const footerGroups = [
    {
      title: "Soluciones",
      links: [
        { label: "Creatividad", href: "servicios/creatividad.html" },
        { label: "Producto digital", href: "servicios/producto-digital.html" },
        { label: "Growth Paid Media", href: "servicios/growth.html" },
        { label: "AI Agents", href: null },
      ],
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
        { label: "catalina@uhuragroup.com", href: "mailto:catalina@uhuragroup.com" },
        { label: "www.uhuragroup.com", href: "https://www.uhuragroup.com" },
        { label: "LinkedIn", href: null },
        { label: "Instagram", href: null },
      ],
    },
  ];

  const localizeHref = (href) => {
    const root = getRootPrefix();
    if (href.startsWith("#")) return root + "/index.html" + href;
    if (href === "nosotros.html") return root + "/nosotros.html";
    if (href === "casos/kaiowa.html") return root + "/casos/kaiowa.html";
    if (href === "servicios/producto-digital.html") return root + "/servicios/producto-digital.html";
    if (href === "servicios/growth.html") return root + "/servicios/growth.html";
    if (href === "servicios/creatividad.html") return root + "/servicios/creatividad.html";
    return href;
  };

  const linkStyle = "font-family:Montserrat, sans-serif;font-weight:400;font-size:12.5px;letter-spacing:0.01em;color:rgba(255,255,255,0.72);text-decoration:none;display:inline-flex;align-items:center;gap:6px;transition:color 220ms ease;";

  const renderLink = (item) => item.href ? `
    <div style="margin-bottom:11px">
      <a href="${localizeHref(item.href)}" style="${linkStyle}">
        <span style="width:3px;height:3px;border-radius:50%;background:transparent;flex-shrink:0"></span>
        ${item.label}
      </a>
    </div>
  ` : `
    <div style="margin-bottom:11px">
      <span style="${linkStyle}" aria-disabled="true">
        <span style="width:3px;height:3px;border-radius:50%;background:transparent;flex-shrink:0"></span>
        ${item.label}
      </span>
    </div>
  `;

  const renderColumn = (group) => `
    <div>
      <div style="font-family:Montserrat, sans-serif;font-weight:700;font-size:10.5px;letter-spacing:0.18em;text-transform:uppercase;color:rgba(225,255,100,0.65);margin-bottom:22px">${group.title}</div>
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
          <div style="font-family:Montserrat, sans-serif;font-weight:800;font-size:26px;letter-spacing:-0.02em;margin-bottom:18px;display:flex;align-items:baseline">
            <span style="background:linear-gradient(135deg, #ffffff 0%, #c1a1ff 100%);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;color:transparent">UHURA</span>
            <span style="color:#e1ff64">.</span>
            <span style="font-family:'Playfair Display', serif;font-style:italic;font-weight:400;font-size:12px;color:rgba(255,255,255,0.3);margin-left:6px;letter-spacing:0.1em">group</span>
          </div>
          <p class="uhura-shared-footer__brand-copy">Performance y crecimiento digital. Estrategia, growth, websites, ecommerce y AI agents para marcas que no se conforman con lo promedio.</p>
          <div style="display:flex;gap:8px;flex-wrap:wrap">
            ${["Colombia", "México", "USA"].map((label) => `<span style="font-family:Montserrat, sans-serif;font-weight:600;font-size:10px;letter-spacing:0.08em;text-transform:uppercase;padding:5px 12px;border-radius:100px;border:1px solid rgba(137,69,240,0.25);background:rgba(137,69,240,0.08);color:rgba(193,161,255,0.85)">${label}</span>`).join("")}
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
          <a href="mailto:catalina@uhuragroup.com" data-uhura-footer-cta class="uhura-shared-footer__cta-link" style="font-family:Montserrat, sans-serif;font-weight:700;font-size:13px;letter-spacing:0.06em;text-transform:uppercase;padding:14px 30px;border-radius:100px;background:linear-gradient(135deg, #c1a1ff 0%, #8945f0 100%);color:#1a1032;text-decoration:none;box-shadow:0 8px 24px rgba(137,69,240,0.35);white-space:nowrap;transition:transform 220ms ease, box-shadow 220ms ease">Agenda una llamada →</a>
        </div>
      </div>
      <div class="uhura-shared-footer__container uhura-shared-footer__bottom">
        <span>© 2026 Uhura Group. Todos los derechos reservados.</span>
        <span>Liquid Glass Design System v3.0</span>
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
