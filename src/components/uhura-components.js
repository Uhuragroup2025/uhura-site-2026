const rootPrefix = document.currentScript?.dataset.root || ".";

const expertise = document.querySelectorAll("[data-expertise-strip]");
const logos = [
  ["WordPress", "logo wordpress.webp"],
  ["Shopify", "logo shopify.webp"],
  ["Google Partner", "logo google partner.webp"],
  ["VTEX", "logo vtex.webp"],
  ["Google Analytics", "logo google analytics.webp"],
  ["Microsoft Clarity", "logo-clarity.webp"]
];
expertise.forEach((mount) => {
  const items = [...logos, ...logos].map(([label, file]) => `
    <img class="expertise-logo" src="${rootPrefix}/assets/logos/${file}" alt="${label}" loading="lazy">
  `).join("");
  mount.innerHTML = `<div class="expertise-strip"><div class="expertise-track">${items}</div></div>`;
});

const successCases = [
  {
    brand: "cristar",
    type: "B2C",
    logo: "logo-cristar.webp",
    badge: "Performance & Adquisición",
    href: `${rootPrefix}/casos/kaiowa.html`,
    metrics: [
      ["7,13", "ROAS", "Partimos de 2,2 en 8 meses"],
      ["2×", "ROI", "Dos veces más óptimo mes a mes"],
      ["+167%", "GAP vs meta", "67% por encima del cumplimiento anual"]
    ],
    stack: "SHOPIFY · PERFORMANCE · CRO"
  },
  {
    brand: "yamaha",
    type: "B2C",
    logo: "logo-yamaha.webp",
    badge: "Performance & Adquisición",
    href: `${rootPrefix}/casos/kaiowa.html`,
    metrics: [
      ["4,47", "ROAS", "Partimos de 0,9 en 6 meses (+396%)"],
      ["$59K", "CPA", "Reducimos de $177K a $59.807"],
      ["7,67%", "CTR", "Subimos de 2,6% a 7,67%"]
    ],
    stack: "VTEX · WHATSAPP"
  },
  {
    brand: "lili-pink",
    type: "B2C",
    logo: "",
    client: "Lili Pink",
    badge: "Performance & Adquisición",
    href: `${rootPrefix}/casos/kaiowa.html`,
    metrics: [
      ["16M", "Impresiones", "Visibilidad masiva en 6 meses"],
      ["+10K", "Seguidores", "Adquiridos desde pauta en Tiktok e Instagram"],
      ["4,47%", "CTR", "Gran afinidad de audiencias a la marca"]
    ],
    stack: "SOCIAL MEDIA"
  },
  {
    brand: "bosi",
    type: "B2C",
    logo: "Logo-bosi.png",
    badge: "Performance & Adquisición",
    href: `${rootPrefix}/casos/kaiowa.html`,
    metrics: [
      ["+350K", "Reconocimiento", "Alcance en campaña de brand awareness"],
      ["+2M", "Interacciones", "Reconectamos con la audiencia existente"]
    ],
    stack: "SOCIAL MEDIA"
  },
  {
    brand: "kaiowa",
    type: "B2B",
    logo: "logo-kaiowa-.webp",
    badge: "Rediseño Web",
    href: `${rootPrefix}/casos/kaiowa.html`,
    metrics: [
      ["6:03", "Min. en sitio", "Tiempo promedio de permanencia"],
      ["10.1K", "Visitas/mes", "Crecimiento de tráfico orgánico"],
      ["3,62", "Páginas/sesión", "Mayor interés en el contenido"]
    ],
    stack: "WEB"
  },
  {
    brand: "melendez",
    type: "B2C",
    logo: "logo-constructora melendez.webp",
    badge: "REDISEÑO WEB + CRO",
    href: `${rootPrefix}/casos/kaiowa.html`,
    metrics: [
      ["+488%", "USUARIOS NUEVOS", "Crecimiento después del rediseño"],
      ["+502%", "VISTAS", "Mayor descubrimiento de proyectos"],
      ["+105%", "PÁGINAS / USUARIO", "Mayor profundidad de navegación"]
    ],
    stack: "WORDPRESS · UX · CRO"
  }
];

const successMounts = document.querySelectorAll("[data-success-cases]");
successMounts.forEach((mount) => {
  const intro = mount.dataset.copy || "Marcas reales, retos reales, resultados medibles. Así trabajamos.";
  mount.innerHTML = `
    <section class="success-cases" aria-labelledby="success-cases-title" data-component="success-cases">
      <div class="success-cases-shell">
        <div class="success-cases-header">
          <p class="success-cases-eyebrow"><span aria-hidden="true"></span><strong>Casos de éxito</strong></p>
          <h2 class="section-title" id="success-cases-title">Resultados que <span class="italic">hablan solos.</span></h2>
          <p class="body-large">${intro}</p>
        </div>
        <div class="success-cases-viewport" data-cursor="drag">
          <div class="success-cases-track"></div>
        </div>
        <div class="success-case-nav" aria-label="Navegar casos de exito">
          <div class="success-case-dots" aria-hidden="true"></div>
          <div class="success-case-arrows">
            <button class="success-case-prev" type="button" aria-label="Caso anterior">←</button>
            <button class="success-case-next" type="button" aria-label="Caso siguiente">→</button>
          </div>
        </div>
      </div>
    </section>`;

  const cardMarkup = (item) => `
    <a class="success-case-card" data-brand="${item.brand}" href="${item.href}">
      <span class="success-case-type">${item.type}</span>
      <div class="success-case-branding">
        <div class="success-case-logo-wrap">
          ${item.logo ? `<img class="success-case-logo" src="${rootPrefix}/assets/logos/${item.logo}" alt="${item.client || item.brand}" loading="lazy">` : `<strong class="success-case-client">${item.client}</strong>`}
        </div>
        <span class="success-case-pill">${item.badge}</span>
      </div>
      <div class="success-case-metrics">
        ${item.metrics.map(([value, label, note]) => `
          <div class="success-case-metric">
            <div class="success-case-stat">
              <strong class="success-case-value">${value}</strong>
              <span class="success-case-label">${label}</span>
            </div>
            <p>${note}</p>
          </div>
        `).join("")}
      </div>
      <p class="success-case-footer">${item.stack}</p>
    </a>`;

  const track = mount.querySelector(".success-cases-track");
  const component = mount.querySelector(".success-cases");
  const viewport = mount.querySelector(".success-cases-viewport");
  const prev = mount.querySelector(".success-case-prev");
  const next = mount.querySelector(".success-case-next");
  const dotsWrap = mount.querySelector(".success-case-dots");
  let page = 0;
  let dotsCount = 0;
  let isPaused = false;
  let autoplay;
  let dragStart = 0;

  const visibleCount = () => {
    const computed = component ? window.getComputedStyle(component) : null;
    const count = Number.parseInt(computed?.getPropertyValue("--success-cases-visible"), 10);
    return Number.isFinite(count) && count > 0 ? count : 3;
  };

  const groupsFor = (count) => {
    const groups = [];
    for (let i = 0; i < successCases.length; i += count) {
      groups.push(successCases.slice(i, i + count));
    }
    return groups;
  };

  const update = () => {
    const count = visibleCount();
    const groups = groupsFor(count);
    const max = Math.max(0, groups.length - 1);
    page = Math.min(page, max);
    if (track) {
      track.innerHTML = groups[page].map(cardMarkup).join("");
    }
    if (dotsWrap && dotsCount !== groups.length) {
      dotsCount = groups.length;
      dotsWrap.innerHTML = Array.from({ length: dotsCount }).map((_, dotIndex) => `<span class="${dotIndex === page ? "is-active" : ""}"></span>`).join("");
    }
    if (prev) prev.disabled = page === 0;
    if (next) next.disabled = page === max;
    dotsWrap?.querySelectorAll("span").forEach((dot, dotIndex) => dot.classList.toggle("is-active", dotIndex === page));
  };

  const goTo = (nextPage) => {
    const max = Math.max(0, groupsFor(visibleCount()).length - 1);
    page = Math.max(0, Math.min(nextPage, max));
    track?.classList.add("is-swapping");
    window.setTimeout(() => {
      update();
      track?.classList.remove("is-swapping");
    }, 120);
  };

  const startAutoplay = () => {
    window.clearInterval(autoplay);
    autoplay = window.setInterval(() => {
      if (isPaused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const max = Math.max(0, groupsFor(visibleCount()).length - 1);
      goTo(page >= max ? 0 : page + 1);
    }, 5500);
  };

  prev?.addEventListener("click", () => {
    goTo(page - 1);
  });
  next?.addEventListener("click", () => {
    goTo(page + 1);
  });
  mount.addEventListener("mouseenter", () => { isPaused = true; });
  mount.addEventListener("mouseleave", () => { isPaused = false; });
  viewport?.addEventListener("pointerdown", (event) => { dragStart = event.clientX; });
  viewport?.addEventListener("pointerup", (event) => {
    const delta = event.clientX - dragStart;
    if (Math.abs(delta) > 50) goTo(delta < 0 ? page + 1 : page - 1);
  });
  window.addEventListener("resize", update, { passive: true });
  update();
  startAutoplay();
});

(() => {
  const roots = Array.from(document.querySelectorAll("[data-morph-interface]"))
    .filter((root) => root.dataset.pinnedNarrativeInitialized !== "true");

  if (!roots.length) return;

  const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const desktopQuery = window.matchMedia("(min-width: 981px)");
  const instances = [];

  const createInstance = (root) => {
    const steps = Array.from(root.querySelectorAll(".morph-step[data-layer]"));
    if (!steps.length) return null;

    root.dataset.pinnedNarrativeInitialized = "true";
    root.style.setProperty("--morph-step-count", String(steps.length));
    root.style.setProperty("--morph-scroll-height", `${steps.length * 124}vh`);

    let activeIndex = -1;
    let previousTimer;

    const setActive = (step, index = steps.indexOf(step)) => {
      if (!step || (index === activeIndex && step.classList.contains("is-active"))) return;

      const previousIndex = activeIndex;
      activeIndex = index;
      root.dataset.active = step.dataset.layer;
      window.clearTimeout(previousTimer);

      steps.forEach((item, itemIndex) => {
        item.classList.toggle("is-active", itemIndex === index);
        item.classList.toggle("is-previous", itemIndex === previousIndex && itemIndex !== index);
      });

      previousTimer = window.setTimeout(() => {
        steps.forEach((item) => item.classList.remove("is-previous"));
      }, 560);
    };

    const updateByScroll = () => {
      if (!desktopQuery.matches || reduceMotionQuery.matches) return;

      const rect = root.getBoundingClientRect();
      const scrollable = Math.max(1, rect.height - window.innerHeight);
      const progress = Math.min(1, Math.max(0, -rect.top / scrollable));
      const index = Math.min(steps.length - 1, Math.floor(progress * steps.length));
      setActive(steps[index], index);
    };

    const resetForMode = () => {
      window.clearTimeout(previousTimer);

      if (!desktopQuery.matches || reduceMotionQuery.matches) {
        steps.forEach((item) => {
          item.classList.add("is-active");
          item.classList.remove("is-previous");
        });
        activeIndex = -1;
        return;
      }

      steps.forEach((item) => item.classList.remove("is-active", "is-previous"));
      activeIndex = -1;
      setActive(steps[0], 0);
      updateByScroll();
    };

    return { resetForMode, updateByScroll };
  };

  roots.forEach((root) => {
    const instance = createInstance(root);
    if (instance) instances.push(instance);
  });

  if (!instances.length) return;

  let ticking = false;

  const updateAll = () => {
    ticking = false;
    instances.forEach((instance) => instance.updateByScroll());
  };

  const requestUpdate = () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(updateAll);
  };

  const resetAll = () => {
    instances.forEach((instance) => instance.resetForMode());
    requestUpdate();
  };

  resetAll();

  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate, { passive: true });
  desktopQuery.addEventListener("change", resetAll);
  reduceMotionQuery.addEventListener("change", resetAll);
})();

(() => {
  const roots = Array.from(document.querySelectorAll("[data-progressive-narrative]"))
    .filter((root) => root.dataset.progressiveNarrativeInitialized !== "true");

  if (!roots.length) return;

  const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const supportsObserver = "IntersectionObserver" in window;
  const viewportFocusInstances = [];

  const revealAll = (root, items) => {
    root.classList.remove("is-enhanced");
    items.forEach((item, index) => {
      item.style.setProperty("--progressive-index", String(index));
      item.classList.add("is-visible");
      item.classList.remove("is-active");
    });
  };

  const setActive = (items, activeItem) => {
    items.forEach((item) => item.classList.toggle("is-active", item === activeItem));
  };

  roots.forEach((root) => {
    const items = Array.from(root.querySelectorAll("[data-progressive-item], .progressive-narrative__item"));
    if (!items.length) return;

    root.dataset.progressiveNarrativeInitialized = "true";
    root.style.setProperty("--progressive-count", String(items.length));
    items.forEach((item, index) => item.style.setProperty("--progressive-index", String(index)));

    if (root.dataset.progressiveMode === "viewport-focus") {
      root.classList.add("is-enhanced");
      items.forEach((item) => item.classList.add("is-visible"));
      viewportFocusInstances.push({ root, items, boundaries: [], activeIndex: -1 });
      return;
    }

    if (reduceMotionQuery.matches || !supportsObserver) {
      revealAll(root, items);
      return;
    }

    root.classList.add("is-enhanced");

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        if (root.dataset.progressiveActive !== "false") {
          setActive(items, entry.target);
        }
      });
    }, {
      rootMargin: "0px 0px -18% 0px",
      threshold: [0.18, 0.42, 0.68]
    });

    items.forEach((item) => observer.observe(item));

    reduceMotionQuery.addEventListener("change", () => {
      if (reduceMotionQuery.matches) {
        observer.disconnect();
        revealAll(root, items);
      }
    }, { once: true });
  });

  if (!viewportFocusInstances.length) return;

  let frame = 0;
  let geometryPending = true;
  let observedNav = null;
  const resizeObserver = "ResizeObserver" in window
    ? new ResizeObserver(() => requestFrame(true))
    : null;

  const getRenderedNav = () => document.querySelector(".uhura-nav-wrap");

  const getUsableTop = () => {
    const nav = getRenderedNav();
    if (!nav) return 24;

    if (resizeObserver && nav !== observedNav) {
      if (observedNav) resizeObserver.unobserve(observedNav);
      resizeObserver.observe(nav);
      observedNav = nav;
    }

    const rect = nav.getBoundingClientRect();
    return Math.min(window.innerHeight, Math.max(0, rect.bottom) + 24);
  };

  const measureGeometry = () => {
    const usableTop = getUsableTop();
    const focusYViewport = usableTop + ((window.innerHeight - usableTop) * .5);

    viewportFocusInstances.forEach((instance) => {
      const centers = instance.items.map((item) => {
        const rect = item.getBoundingClientRect();
        return window.scrollY + rect.top + (rect.height / 2);
      });

      instance.focusYViewport = focusYViewport;
      instance.boundaries = centers
        .slice(0, -1)
        .map((center, index) => (center + centers[index + 1]) / 2);
      instance.activeIndex = -1;
    });
  };

  const getActiveIndex = (instance) => {
    const focusYDocument = window.scrollY + instance.focusYViewport;
    let index = 0;

    while (index < instance.boundaries.length && focusYDocument >= instance.boundaries[index]) {
      index += 1;
    }

    return index;
  };

  const applyViewportFocus = (instance) => {
    const nextActiveIndex = getActiveIndex(instance);
    if (nextActiveIndex === instance.activeIndex && instance.items[nextActiveIndex]?.classList.contains("is-active")) return;

    instance.activeIndex = nextActiveIndex;
    instance.items.forEach((item, index) => {
      const distance = Math.min(2, Math.abs(index - nextActiveIndex));
      item.dataset.progressiveDistance = String(distance);
      item.classList.toggle("is-active", distance === 0);
      item.classList.toggle("is-neighbor", distance === 1);
      item.classList.toggle("is-distant", distance >= 2);
    });
  };

  const flush = () => {
    frame = 0;
    if (geometryPending) {
      geometryPending = false;
      measureGeometry();
    }
    viewportFocusInstances.forEach(applyViewportFocus);
  };

  function requestFrame(measure = false) {
    geometryPending = geometryPending || measure;
    if (frame) return;
    frame = window.requestAnimationFrame(flush);
  }

  if (resizeObserver) {
    viewportFocusInstances.forEach(({ root, items }) => {
      resizeObserver.observe(root);
      items.forEach((item) => resizeObserver.observe(item));
    });
  }

  window.addEventListener("scroll", () => requestFrame(), { passive: true });
  window.addEventListener("resize", () => requestFrame(true), { passive: true });
  reduceMotionQuery.addEventListener("change", () => requestFrame(true));
  requestFrame(true);
})();

(() => {
  const roots = Array.from(document.querySelectorAll("[data-ambient-field]"))
    .filter((root) => root.dataset.ambientFieldInitialized !== "true");

  if (!roots.length) return;

  const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const coarsePointerQuery = window.matchMedia("(pointer: coarse)");
  const canTrackPointer = () => (
    !document.hidden &&
    !reduceMotionQuery.matches &&
    !coarsePointerQuery.matches
  );
  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
  const getExpressiveProfile = () => {
    const memory = Number(navigator.deviceMemory || 8);
    const cores = Number(navigator.hardwareConcurrency || 8);

    if (memory <= 4 || cores <= 4) {
      return { name: "low", fieldWidth: 180, dprCap: 1, maxFps: 30, staticOnly: true };
    }
    if (memory < 8 || cores < 8) {
      return { name: "medium", fieldWidth: 240, dprCap: 1.25, maxFps: 30, staticOnly: false };
    }
    return { name: "high", fieldWidth: 250, dprCap: 1.25, maxFps: 60, staticOnly: false };
  };
  const expressiveProfile = getExpressiveProfile();
  const canAnimateExpressive = () => canTrackPointer() && !expressiveProfile.staticOnly;
  const expressiveGovernor = {
    emaAlpha: 0.14,
    downshiftFrames: { 60: 8, 45: 6 },
    downshiftThreshold: { 60: 16, 45: 22 },
    upshiftThreshold: { 45: 12, 30: 20 },
    healthyWindow: 1500,
    changeCooldown: 900
  };

  const existing = window.__uhuraAmbientField;
  const controller = existing || {
    roots: new Set(),
    visible: new Set(),
    expressive: new Set(),
    activeExpressive: null,
    pointer: { x: window.innerWidth / 2, y: window.innerHeight / 2 },
    current: { x: window.innerWidth / 2, y: window.innerHeight / 2 },
    velocity: { x: 0, y: 0, amount: 0 },
    hasPointer: false,
    frame: 0,
    expressiveFrame: 0,
    expressiveLastTime: 0,
    expressiveFps: 0,
    expressiveTargetFps: expressiveProfile.maxFps,
    expressiveRenderEma: 0,
    expressiveIntervalEma: 1000 / 60,
    expressiveSlowFrames: 0,
    expressiveHealthySince: 0,
    expressiveLevelChangedAt: 0,
    expressiveLastRenderedAt: 0,
    expressiveFrameBudget: 0,
    expressivePhysicsDelta: 0,
    expressiveForceRender: true,
    expressiveLastPointerAt: -Infinity,
    expressiveActivityUntil: 0,
    expressiveSettleUntil: 0,
    observer: null,
    resizeObserver: null,
    rootSizes: new WeakMap(),
    listening: false,
    pageVisible: !document.hidden
  };
  if (typeof controller.hasPointer !== "boolean") {
    controller.hasPointer = false;
  }
  if (!controller.velocity) {
    controller.velocity = { x: 0, y: 0, amount: 0 };
  }
  if (!controller.rootSizes) {
    controller.rootSizes = new WeakMap();
  }
  if (!controller.expressiveTargetFps) {
    controller.expressiveTargetFps = expressiveProfile.maxFps;
    controller.expressiveRenderEma = 0;
    controller.expressiveIntervalEma = 1000 / 60;
    controller.expressiveSlowFrames = 0;
    controller.expressiveHealthySince = 0;
    controller.expressiveLevelChangedAt = 0;
    controller.expressiveLastRenderedAt = 0;
    controller.expressiveFrameBudget = 0;
    controller.expressivePhysicsDelta = 0;
    controller.expressiveForceRender = true;
    controller.expressiveLastPointerAt = -Infinity;
  }
  controller.expressiveTargetFps = Math.min(controller.expressiveTargetFps, expressiveProfile.maxFps);
  controller.pageVisible = !document.hidden;

  const applyStatic = (root) => {
    root.style.setProperty("--ambient-x", "50%");
    root.style.setProperty("--ambient-y", "42%");
    root.style.setProperty("--ambient-parallax-x", "0px");
    root.style.setProperty("--ambient-parallax-y", "0px");
  };

  const updateRoot = (root) => {
    const rect = root.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return;

    const localX = clamp(((controller.current.x - rect.left) / rect.width) * 100, 0, 100);
    const localY = clamp(((controller.current.y - rect.top) / rect.height) * 100, 0, 100);
    const offsetX = clamp(((localX - 50) / 50) * 18, -18, 18);
    const offsetY = clamp(((localY - 50) / 50) * 18, -18, 18);

    root.style.setProperty("--ambient-x", `${localX.toFixed(2)}%`);
    root.style.setProperty("--ambient-y", `${localY.toFixed(2)}%`);
    root.style.setProperty("--ambient-parallax-x", `${offsetX.toFixed(2)}px`);
    root.style.setProperty("--ambient-parallax-y", `${offsetY.toFixed(2)}px`);
  };

  const tick = () => {
    controller.frame = 0;

    if (!canTrackPointer() || !controller.visible.size) {
      controller.roots.forEach(applyStatic);
      return;
    }

    controller.current.x += (controller.pointer.x - controller.current.x) * 0.22;
    controller.current.y += (controller.pointer.y - controller.current.y) * 0.22;
    controller.velocity.amount *= 0.88;
    controller.visible.forEach((root) => {
      if (!root.classList.contains("ambient-field--expressive") && root.dataset.ambientVariant !== "expressive") {
        updateRoot(root);
      }
    });

    if (
      Math.abs(controller.pointer.x - controller.current.x) > 0.1 ||
      Math.abs(controller.pointer.y - controller.current.y) > 0.1
    ) {
      controller.frame = window.requestAnimationFrame(tick);
    } else {
      controller.velocity.amount = 0;
    }
  };

  const requestTick = () => {
    if (controller.frame || !canTrackPointer() || !controller.visible.size) return;
    controller.frame = window.requestAnimationFrame(tick);
  };

  const onPointerMove = (event) => {
    if (!canTrackPointer()) return;
    const now = performance.now();
    const startsPointerBurst = now - controller.expressiveLastPointerAt > 80;
    const deltaX = event.clientX - controller.pointer.x;
    const deltaY = event.clientY - controller.pointer.y;
    controller.hasPointer = true;
    controller.pointer.x = event.clientX;
    controller.pointer.y = event.clientY;
    controller.velocity.x += (deltaX - controller.velocity.x) * 0.35;
    controller.velocity.y += (deltaY - controller.velocity.y) * 0.35;
    controller.velocity.amount = clamp(controller.velocity.amount + Math.hypot(deltaX, deltaY) / 220, 0, 1);
    controller.expressiveLastPointerAt = now;
    controller.expressiveActivityUntil = now + 180;
    requestTick();
    requestExpressiveTick(startsPointerBurst);
  };

  const resetAll = () => {
    if (controller.frame) {
      window.cancelAnimationFrame(controller.frame);
      controller.frame = 0;
    }
    if (controller.expressiveFrame) {
      window.cancelAnimationFrame(controller.expressiveFrame);
      controller.expressiveFrame = 0;
    }
    controller.roots.forEach(applyStatic);
    controller.expressive.forEach((renderer) => {
      renderer.resizePending = true;
      renderer.staticDrawn = false;
      if (!document.hidden && controller.visible.has(renderer.root)) renderer.drawStatic();
      renderer.root.dataset.ambientFps = "0";
      renderer.root.dataset.ambientState = document.hidden ? "paused" : "static";
    });
  };

  const makeExpressiveRenderer = (root) => {
    const canvas = root.querySelector(".ambient-field__canvas");
    if (!canvas || !canvas.getContext) return null;

    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return null;

    const offscreen = document.createElement("canvas");
    const offscreenContext = offscreen.getContext("2d", { alpha: false });
    if (!offscreenContext) return null;

    const colors = {
      dark: [9, 5, 19],
      panel: [20, 11, 36],
      purple: [99, 25, 162],
      violet: [138, 77, 255],
      lavender: [185, 164, 253],
      blue: [79, 125, 255],
      cyan: [48, 183, 205],
      lime: [211, 224, 129]
    };

    const mix = (a, b, amount) => ([
      a[0] + (b[0] - a[0]) * amount,
      a[1] + (b[1] - a[1]) * amount,
      a[2] + (b[2] - a[2]) * amount
    ]);

    const smoothstep = (edge0, edge1, value) => {
      const t = clamp((value - edge0) / Math.max(0.0001, edge1 - edge0), 0, 1);
      return t * t * (3 - 2 * t);
    };

    const renderer = {
      root,
      canvas,
      context,
      offscreen,
      offscreenContext,
      width: 0,
      height: 0,
      fieldWidth: 0,
      fieldHeight: 0,
      dpr: 1,
      imageData: null,
      xCoords: null,
      yCoords: null,
      grainMap: null,
      time: 0,
      pointerInfluence: 0,
      resizePending: true,
      staticDrawn: false,
      qualityScale: 1,
      blobs: [
        { x: .76, y: .17, r: .62, color: colors.purple, mass: 1.18, speed: .050, warp: .12, phase: .4 },
        { x: .34, y: .33, r: .72, color: colors.purple, mass: 1.38, speed: .043, warp: .16, phase: 2.1 },
        { x: .16, y: .76, r: .34, color: colors.cyan, mass: .46, speed: .052, warp: .12, phase: 3.2 },
        { x: .72, y: .76, r: .58, color: colors.blue, mass: .68, speed: .036, warp: .14, phase: 4.5 },
        { x: .58, y: .50, r: .36, color: colors.lavender, mass: .54, speed: .042, warp: .09, phase: 5.4 },
        { x: .91, y: .82, r: .08, color: colors.lime, mass: .10, speed: .060, warp: .05, phase: 1.3 }
      ],
      resize(width, height) {
        const rect = width && height ? { width, height } : root.getBoundingClientRect();
        const nextDpr = Math.min(window.devicePixelRatio || 1, expressiveProfile.dprCap);
        const nextWidth = Math.max(1, Math.round(rect.width));
        const nextHeight = Math.max(1, Math.round(rect.height));
        const staticFieldWidth = coarsePointerQuery.matches || reduceMotionQuery.matches
          ? Math.min(180, expressiveProfile.fieldWidth)
          : expressiveProfile.fieldWidth;
        const targetFieldWidth = Math.max(150, Math.min(260, Math.round(staticFieldWidth * this.qualityScale)));
        const targetFieldHeight = Math.max(120, Math.min(260, Math.round(targetFieldWidth * (nextHeight / Math.max(1, nextWidth)))));

        if (
          nextWidth === this.width &&
          nextHeight === this.height &&
          nextDpr === this.dpr &&
          targetFieldWidth === this.fieldWidth &&
          targetFieldHeight === this.fieldHeight
        ) {
          this.resizePending = false;
          return false;
        }

        this.width = nextWidth;
        this.height = nextHeight;
        this.dpr = nextDpr;
        this.fieldWidth = targetFieldWidth;
        this.fieldHeight = targetFieldHeight;
        canvas.width = Math.round(nextWidth * nextDpr);
        canvas.height = Math.round(nextHeight * nextDpr);
        canvas.style.width = `${nextWidth}px`;
        canvas.style.height = `${nextHeight}px`;
        context.setTransform(nextDpr, 0, 0, nextDpr, 0, 0);
        offscreen.width = targetFieldWidth;
        offscreen.height = targetFieldHeight;
        this.imageData = offscreenContext.createImageData(targetFieldWidth, targetFieldHeight);
        this.xCoords = new Float32Array(targetFieldWidth);
        this.yCoords = new Float32Array(targetFieldHeight);
        this.grainMap = new Float32Array(targetFieldWidth * targetFieldHeight);
        for (let x = 0; x < targetFieldWidth; x += 1) {
          this.xCoords[x] = x / Math.max(1, targetFieldWidth - 1);
        }
        for (let y = 0; y < targetFieldHeight; y += 1) {
          this.yCoords[y] = y / Math.max(1, targetFieldHeight - 1);
          for (let x = 0; x < targetFieldWidth; x += 1) {
            this.grainMap[y * targetFieldWidth + x] = (this.hash(x + 9.1, y - 3.4) - .5) * 3.2;
          }
        }
        this.staticDrawn = false;
        this.resizePending = false;
        const currentQuality = expressiveProfile.staticOnly
          ? "low"
          : expressiveProfile.name === "medium" || controller.expressiveTargetFps <= 30
            ? "medium"
            : "high";
        root.dataset.ambientQuality = currentQuality;
        root.dataset.ambientCapability = expressiveProfile.name;
        root.dataset.ambientDpr = nextDpr.toFixed(2);
        root.dataset.ambientResolution = `${targetFieldWidth}x${targetFieldHeight}`;
        return true;
      },
      noise(x, y, t) {
        return (
          Math.sin(x * 5.1 + y * 2.7 + t * .42) * .50 +
          Math.sin(x * 11.7 - y * 6.3 - t * .31) * .28 +
          Math.cos((x + y) * 8.4 + t * .22) * .22
        );
      },
      hash(x, y) {
        const value = Math.sin(x * 127.1 + y * 311.7) * 43758.5453123;
        return value - Math.floor(value);
      },
      blobState(blob, index, staticMode) {
        const t = staticMode ? 0 : this.time;
        const pointerX = controller.current.x / Math.max(1, window.innerWidth);
        const pointerY = controller.current.y / Math.max(1, window.innerHeight);
        const pointerPull = controller.hasPointer ? this.pointerInfluence : 0;
        const px = (pointerX - blob.x) * pointerPull;
        const py = (pointerY - blob.y) * pointerPull;
        const polarity = index % 2 === 0 ? 1 : -1;

        return {
          x: blob.x + Math.sin(t * blob.speed + blob.phase) * blob.warp * .38 + px * .12 * polarity,
          y: blob.y + Math.cos(t * blob.speed * .86 + blob.phase) * blob.warp * .28 + py * .10 * -polarity,
          r: blob.r * (1 + Math.sin(t * blob.speed * 1.8 + blob.phase) * .035 + pointerPull * .026),
          color: blob.color,
          mass: blob.mass,
          stretchX: 1 + Math.sin(t * .18 + index) * .28,
          stretchY: 1 + Math.cos(t * .16 + index) * .22
        };
      },
      renderField(staticMode = false) {
        if (this.resizePending || !this.imageData) this.resize();
        if (!this.imageData) return;

        const width = this.fieldWidth;
        const height = this.fieldHeight;
        const data = this.imageData.data;
        const xCoords = this.xCoords;
        const yCoords = this.yCoords;
        const grainMap = this.grainMap;
        const t = staticMode ? 0 : this.time;
        const states = this.blobs.map((blob, index) => this.blobState(blob, index, staticMode));
        const pointerX = controller.current.x / Math.max(1, window.innerWidth);
        const pointerY = controller.current.y / Math.max(1, window.innerHeight);
        const speedLift = controller.hasPointer ? controller.velocity.amount : 0;
        let offset = 0;
        let pixelIndex = 0;

        for (let y = 0; y < height; y += 1) {
          const ny = yCoords[y];
          for (let x = 0; x < width; x += 1) {
            const nx = xCoords[x];
            const pointerDx = nx - pointerX;
            const pointerDy = ny - pointerY;
            let pointerLens = 0;
            let pointerCore = 0;
            let pointerRing = 0;
            if (controller.hasPointer) {
              const pointerDistance = Math.hypot(pointerDx, pointerDy);
              pointerLens = this.pointerInfluence * Math.exp(-pointerDistance * (2.9 - speedLift * .75));
              pointerCore = this.pointerInfluence * Math.exp(-pointerDistance * (6.4 - speedLift * 1.4));
              pointerRing = this.pointerInfluence * smoothstep(.12, .30, pointerDistance) * (1 - smoothstep(.40, .70, pointerDistance)) * (1 + speedLift * .45);
            }
            const warpA = this.noise(nx * 1.9 + 7.4, ny * 1.6 - 2.2, t) * .0225;
            const warpB = this.noise(nx * 2.2 - 1.3, ny * 2.0 + 4.8, t + 18) * .019;
            const fold = Math.sin((nx * 4.2 + warpB * 6) + (ny * 4.0 + warpA * 6) + (t + 31) * .22) * .009;
            const ux = nx + warpA + fold + pointerDx * pointerLens * (.072 + speedLift * .040);
            const uy = ny + warpB - fold * .68 + pointerDy * pointerLens * (.064 + speedLift * .034);
            const localNoise = clamp(.5 + this.noise(ux * 5.0 + 4.3, uy * 5.0 - 2.7, t + 13) * .32, 0, 1);
            const pointerCompression = pointerRing * .30 - pointerCore * (1.22 + speedLift * .38);
            let field = 0;
            let edge = 0;
            let colorWeight = 0;
            let red = 0;
            let green = 0;
            let blue = 0;

            states.forEach((blob, index) => {
              const dx = (ux - blob.x) / blob.stretchX;
              const dy = (uy - blob.y) / blob.stretchY;
              const distanceSquared = dx * dx + dy * dy + 0.0009;
              const contribution = (blob.r * blob.r * blob.mass) / distanceSquared;
              const localVariation = (localNoise - .5) * (index % 2 === 0 ? .05 : -.05);
              const warpedContribution = contribution * (.88 + localNoise * .22 + localVariation);
              field += warpedContribution;
              edge += Math.exp(-distanceSquared / Math.max(.0001, blob.r * blob.r * .42));
              red += blob.color[0] * warpedContribution;
              green += blob.color[1] * warpedContribution;
              blue += blob.color[2] * warpedContribution;
              colorWeight += warpedContribution;
            });

            const matter = smoothstep(1.72, 8.6, field + pointerCompression);
            const hot = smoothstep(6.2, 17.5, field + pointerCompression * 1.6);
            const contour = Math.pow(smoothstep(.22, 1.3, edge), 1.4);
            const restColumn = Math.exp(-Math.pow((nx - .48) / .19, 2) - Math.pow((ny - .48) / .62, 2));
            const restHead = Math.exp(-Math.pow((nx - .38) / .25, 2) - Math.pow((ny - .18) / .22, 2));
            const restBottom = Math.exp(-Math.pow((nx - .62) / .70, 2) - Math.pow((ny - 1.04) / .30, 2));
            const rest = clamp(restColumn * .74 + restHead * .42 + restBottom * .45 + pointerLens * (.48 + speedLift * .16) + pointerCore * (.70 + speedLift * .24), 0, .98);
            const grain = grainMap[pixelIndex];
            const baseBlue = mix(colors.dark, colors.blue, smoothstep(0, 1, 1 - ny) * .16 + smoothstep(0, 1, nx) * .07);
            const base = mix(baseBlue, colors.panel, smoothstep(.12, .80, ny) * .12);
            const weighted = colorWeight > 0 ? [red / colorWeight, green / colorWeight, blue / colorWeight] : colors.dark;
            let color = mix(base, weighted, clamp(matter * .98 + contour * .08, 0, 1));
            color = mix(color, colors.lavender, smoothstep(.50, .90, hot) * .045);
            color = mix(color, colors.cyan, smoothstep(.66, 1.0, contour) * .10 + pointerRing * .026);
            color = mix(color, colors.lime, hot * .014);
            color = mix(color, colors.dark, rest * .34 + pointerCore * .58);

            const luminosity = .28 + matter * .84 + hot * .28 - rest * .78 + pointerRing * .07;
            const shade = clamp(luminosity, .06, 1.34);
            data[offset] = clamp(color[0] * shade + grain, 0, 255);
            data[offset + 1] = clamp(color[1] * shade + grain, 0, 255);
            data[offset + 2] = clamp(color[2] * shade + grain, 0, 255);
            data[offset + 3] = 255;
            offset += 4;
            pixelIndex += 1;
          }
        }

        offscreenContext.putImageData(this.imageData, 0, 0);
        context.save();
        context.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
        context.imageSmoothingEnabled = true;
        context.imageSmoothingQuality = "high";
        context.drawImage(offscreen, 0, 0, this.width, this.height);
        context.globalCompositeOperation = "soft-light";
        const depth = context.createRadialGradient(this.width * .54, this.height * .48, 0, this.width * .54, this.height * .48, this.width * .78);
        depth.addColorStop(0, "rgba(255,255,255,.10)");
        depth.addColorStop(.45, "rgba(0,0,0,0)");
        depth.addColorStop(1, "rgba(0,0,0,.72)");
        context.fillStyle = depth;
        context.fillRect(0, 0, this.width, this.height);
        context.globalCompositeOperation = "source-over";
        context.restore();
      },
      drawStatic() {
        if (this.staticDrawn && !this.resizePending) return;
        this.pointerInfluence = 0;
        this.renderField(true);
        this.staticDrawn = true;
      },
      update(delta) {
        this.staticDrawn = false;
        this.time += delta * .00035;
        const influenceTarget = canTrackPointer() && controller.hasPointer ? 1 : 0;
        const influenceBlend = 1 - Math.pow(1 - .11, delta / 16.7);
        this.pointerInfluence += (influenceTarget - this.pointerInfluence) * influenceBlend;
        this.renderField(false);
      }
    };

    return renderer;
  };

  const shouldUseExpressive = (root) => (
    root.dataset.ambientVariant === "expressive" ||
    root.classList.contains("ambient-field--expressive")
  );

  const setExpressiveTargetFps = (renderer, targetFps, time) => {
    targetFps = Math.min(targetFps, expressiveProfile.maxFps);
    if (controller.expressiveTargetFps === targetFps) return;
    controller.expressiveTargetFps = targetFps;
    controller.expressiveSlowFrames = 0;
    controller.expressiveHealthySince = 0;
    controller.expressiveLevelChangedAt = time;
    controller.expressiveFrameBudget = 0;
    const nextQualityScale = expressiveProfile.name === "high"
      ? (targetFps >= 60 ? 1 : .96)
      : 1;
    if (renderer.qualityScale !== nextQualityScale) {
      renderer.qualityScale = nextQualityScale;
      renderer.resizePending = true;
    }
    renderer.root.dataset.ambientQuality = expressiveProfile.staticOnly
      ? "low"
      : expressiveProfile.name === "medium" || targetFps <= 30
        ? "medium"
        : "high";
    renderer.root.dataset.ambientFpsTarget = String(targetFps);
  };

  const resumeExpressiveGovernor = (renderer, time) => {
    controller.expressiveTargetFps = Math.min(controller.expressiveTargetFps, expressiveProfile.maxFps);
    controller.expressiveRenderEma = 0;
    controller.expressiveIntervalEma = 1000 / controller.expressiveTargetFps;
    controller.expressiveSlowFrames = 0;
    controller.expressiveHealthySince = 0;
    controller.expressiveLevelChangedAt = time - expressiveGovernor.changeCooldown;
    controller.expressiveLastRenderedAt = 0;
    controller.expressiveFrameBudget = 0;
    controller.expressivePhysicsDelta = 0;
    controller.expressiveForceRender = true;
    renderer.root.dataset.ambientFpsTarget = String(controller.expressiveTargetFps);
    renderer.root.dataset.ambientRenderMs = "0.00";
  };

  const updateExpressiveGovernor = (renderer, renderMs, time) => {
    const alpha = expressiveGovernor.emaAlpha;
    controller.expressiveRenderEma = controller.expressiveRenderEma
      ? controller.expressiveRenderEma * (1 - alpha) + renderMs * alpha
      : renderMs;
    renderer.root.dataset.ambientRenderMs = controller.expressiveRenderEma.toFixed(2);

    const target = controller.expressiveTargetFps;
    const canChange = time - controller.expressiveLevelChangedAt >= expressiveGovernor.changeCooldown;
    const downshiftAt = expressiveGovernor.downshiftThreshold[target];

    if (downshiftAt && controller.expressiveRenderEma > downshiftAt) {
      controller.expressiveSlowFrames += 1;
      controller.expressiveHealthySince = 0;
      const requiredFrames = expressiveGovernor.downshiftFrames[target];
      if (canChange && controller.expressiveSlowFrames >= requiredFrames) {
        setExpressiveTargetFps(renderer, target === 60 ? 45 : 30, time);
      }
      return;
    }

    controller.expressiveSlowFrames = 0;
    const upshiftAt = expressiveGovernor.upshiftThreshold[target];
    if (!upshiftAt || controller.expressiveRenderEma >= upshiftAt) {
      controller.expressiveHealthySince = 0;
      return;
    }

    if (!controller.expressiveHealthySince) {
      controller.expressiveHealthySince = time;
      return;
    }

    if (
      canChange &&
      time - controller.expressiveHealthySince >= expressiveGovernor.healthyWindow
    ) {
      const nextTarget = target === 30 ? 45 : 60;
      if (nextTarget <= expressiveProfile.maxFps) setExpressiveTargetFps(renderer, nextTarget, time);
    }
  };

  const renderExpressiveFrame = (renderer, delta, time) => {
    const startedAt = performance.now();
    renderer.update(delta);
    const renderMs = performance.now() - startedAt;

    if (controller.expressiveLastRenderedAt) {
      const interval = time - controller.expressiveLastRenderedAt;
      controller.expressiveIntervalEma = controller.expressiveIntervalEma * .82 + interval * .18;
    }
    controller.expressiveLastRenderedAt = time;
    controller.expressiveFps = Math.round(1000 / Math.max(1, controller.expressiveIntervalEma));
    renderer.root.dataset.ambientFps = String(controller.expressiveFps);
    updateExpressiveGovernor(renderer, renderMs, time);
  };

  const expressiveTick = (time) => {
    controller.expressiveFrame = 0;
    const renderer = controller.activeExpressive;
    if (!renderer || !controller.visible.has(renderer.root)) return;

    if (!canAnimateExpressive()) {
      renderer.drawStatic();
      renderer.root.dataset.ambientFps = "0";
      renderer.root.dataset.ambientState = document.hidden ? "paused" : "static";
      return;
    }

    const delta = controller.expressiveLastTime ? Math.min(48, time - controller.expressiveLastTime) : 16.7;
    controller.expressiveLastTime = time;
    controller.expressiveFrameBudget += delta;
    controller.expressivePhysicsDelta += delta;

    const targetInterval = 1000 / controller.expressiveTargetFps;
    const forcedFrame = controller.expressiveForceRender;
    let rendered = false;
    if (forcedFrame || controller.expressiveFrameBudget + .5 >= targetInterval) {
      controller.expressiveForceRender = false;
      controller.expressiveFrameBudget = forcedFrame
        ? 0
        : Math.max(0, controller.expressiveFrameBudget - targetInterval);
      const physicsDelta = controller.expressivePhysicsDelta;
      controller.expressivePhysicsDelta = 0;
      renderExpressiveFrame(renderer, physicsDelta, time);
      rendered = true;
    }

    const pointerDistance = Math.hypot(
      controller.pointer.x - controller.current.x,
      controller.pointer.y - controller.current.y
    );
    const influenceTarget = controller.hasPointer ? 1 : 0;
    const influenceDistance = Math.abs(influenceTarget - renderer.pointerInfluence);
    let shouldContinue = (
      time < controller.expressiveActivityUntil ||
      time < controller.expressiveSettleUntil ||
      pointerDistance > 0.35 ||
      controller.velocity.amount > 0.008 ||
      influenceDistance > 0.01 ||
      renderer.resizePending
    );

    if (!shouldContinue && !rendered && controller.expressivePhysicsDelta > 0) {
      const physicsDelta = controller.expressivePhysicsDelta;
      controller.expressivePhysicsDelta = 0;
      renderExpressiveFrame(renderer, physicsDelta, time);
      shouldContinue = Math.abs(influenceTarget - renderer.pointerInfluence) > 0.01;
    }

    if (shouldContinue) {
      controller.expressiveFrame = window.requestAnimationFrame(expressiveTick);
    } else {
      controller.expressiveLastTime = 0;
      controller.expressiveLastRenderedAt = 0;
      controller.expressiveFrameBudget = 0;
      controller.expressivePhysicsDelta = 0;
      renderer.root.dataset.ambientFps = "0";
      renderer.root.dataset.ambientState = "resting";
    }
  };

  const requestExpressiveTick = (forceFrame = false) => {
    const renderer = controller.activeExpressive;
    if (!renderer || !controller.visible.has(renderer.root)) return;
    if (!canAnimateExpressive()) {
      if (document.hidden) {
        renderer.root.dataset.ambientFps = "0";
        renderer.root.dataset.ambientState = "paused";
        return;
      }
      renderer.drawStatic();
      renderer.root.dataset.ambientFps = "0";
      renderer.root.dataset.ambientState = "static";
      return;
    }
    if (forceFrame) controller.expressiveForceRender = true;
    if (controller.expressiveFrame) return;
    resumeExpressiveGovernor(renderer, performance.now());
    controller.expressiveLastTime = 0;
    renderer.root.dataset.ambientState = "active";
    controller.expressiveFrame = window.requestAnimationFrame(expressiveTick);
  };

  if (!controller.observer && "IntersectionObserver" in window) {
    controller.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          controller.visible.add(entry.target);
          if (controller.activeExpressive?.root === entry.target) {
            controller.expressiveSettleUntil = performance.now() + 450;
          }
          requestTick();
          requestExpressiveTick(true);
        } else {
          controller.visible.delete(entry.target);
          if (controller.activeExpressive?.root === entry.target && controller.expressiveFrame) {
            window.cancelAnimationFrame(controller.expressiveFrame);
            controller.expressiveFrame = 0;
          }
          if (controller.activeExpressive?.root === entry.target) {
            entry.target.dataset.ambientFps = "0";
            entry.target.dataset.ambientState = "paused";
          }
        }
      });
    }, { threshold: 0.02 });
  }

  if (!controller.resizeObserver && "ResizeObserver" in window) {
    controller.resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        const root = entry.target;
        const rect = root.getBoundingClientRect();
        const nextWidth = Math.max(1, Math.round(rect.width));
        const nextHeight = Math.max(1, Math.round(rect.height));
        const previous = controller.rootSizes.get(root);

        if (previous?.width === nextWidth && previous?.height === nextHeight) return;
        controller.rootSizes.set(root, { width: nextWidth, height: nextHeight });

        const renderer = controller.activeExpressive?.root === root
          ? controller.activeExpressive
          : null;
        if (!renderer) return;

        renderer.resizePending = true;
        renderer.resize(nextWidth, nextHeight);
        controller.expressiveActivityUntil = performance.now() + 120;
        if (controller.visible.has(root)) requestExpressiveTick(true);
      });
    });
  }

  roots.forEach((root) => {
    root.dataset.ambientFieldInitialized = "true";
    controller.roots.add(root);
    applyStatic(root);
    if (shouldUseExpressive(root)) {
      if (!controller.activeExpressive) {
        const renderer = makeExpressiveRenderer(root);
        if (renderer) {
          controller.activeExpressive = renderer;
          controller.expressive.add(renderer);
        }
      } else {
        root.dataset.ambientExpressiveDisabled = "true";
      }
    }
    if (controller.observer) {
      controller.observer.observe(root);
    } else {
      controller.visible.add(root);
    }
    if (controller.resizeObserver) {
      controller.resizeObserver.observe(root);
    }
  });

  if (!existing) {
    window.__uhuraAmbientField = controller;
  }

  if (!controller.listening) {
    controller.listening = true;
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    reduceMotionQuery.addEventListener("change", resetAll);
    coarsePointerQuery.addEventListener("change", resetAll);
    document.addEventListener("visibilitychange", () => {
      controller.pageVisible = !document.hidden;
      if (document.hidden) {
        if (controller.frame) {
          window.cancelAnimationFrame(controller.frame);
          controller.frame = 0;
        }
        if (controller.expressiveFrame) {
          window.cancelAnimationFrame(controller.expressiveFrame);
          controller.expressiveFrame = 0;
        }
        controller.expressive.forEach((renderer) => {
          renderer.root.dataset.ambientFps = "0";
          renderer.root.dataset.ambientState = "paused";
        });
        return;
      }

      requestTick();
      requestExpressiveTick(true);
    });
    if (!controller.resizeObserver) {
      window.addEventListener("resize", resetAll, { passive: true });
      window.addEventListener("resize", requestExpressiveTick, { passive: true });
    }
  }
  requestExpressiveTick(true);
})();
