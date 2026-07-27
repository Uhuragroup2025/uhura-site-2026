(function () {
  const THEMES = {
    dark: {
      "--mood-canvas-dark": "1",
      "--mood-canvas-light": "0",
      "--mood-page-bg": "#0b0814",
      "--mood-text-primary": "255,255,255",
      "--mood-text-sub": "255,255,255,0.38",
      "--mood-text-tert": "255,255,255,0.22",
      "--mood-surface": "rgba(255,255,255,0.07)",
      "--mood-border": "rgba(137,69,240,0.12)",
      "--mood-nav-bg": "rgba(11,8,20,0.88)",
      "--mood-nav-text": "rgba(255,255,255,0.55)",
      "--mood-nav-border": "rgba(137,69,240,0.12)",
      "--mood-logo": "255,255,255",
      "--mood-cta-bg": "linear-gradient(135deg,#8945f0,#501f92)",
      "--mood-cta-text": "255,255,255"
    },
    light: {
      "--mood-canvas-dark": "0",
      "--mood-canvas-light": "1",
      "--mood-page-bg": "#f2edf8",
      "--mood-text-primary": "26,10,46",
      "--mood-text-sub": "26,10,46,0.5",
      "--mood-text-tert": "26,10,46,0.32",
      "--mood-surface": "rgba(255,255,255,0.80)",
      "--mood-border": "rgba(137,69,240,0.14)",
      "--mood-nav-bg": "rgba(248,244,252,0.92)",
      "--mood-nav-text": "rgba(26,10,46,0.62)",
      "--mood-nav-border": "rgba(137,69,240,0.10)",
      "--mood-logo": "26,10,46",
      "--mood-cta-bg": "linear-gradient(135deg,#8945f0,#501f92)",
      "--mood-cta-text": "255,255,255"
    }
  };

  const html = document.documentElement;
  let ticking = false;
  let lastMood = null;

  function byId(id) {
    return document.getElementById(id);
  }

  function sectionByText(needles) {
    const sections = Array.from(document.querySelectorAll("main section"));
    return sections.find((section) => {
      const text = section.textContent || "";
      return needles.some((needle) => text.includes(needle));
    });
  }

  function rect(el) {
    return el ? el.getBoundingClientRect() : null;
  }

  function visibleRatio(el) {
    const box = rect(el);
    if (!box || box.height <= 0) return 0;
    const visible = Math.max(0, Math.min(box.bottom, window.innerHeight) - Math.max(box.top, 0));
    return visible / box.height;
  }

  function applyMood(mood) {
    if (!THEMES[mood]) return;
    html.style.setProperty(
      "--mood-transition",
      "background-color 420ms cubic-bezier(0.16,1,0.3,1), color 320ms cubic-bezier(0.16,1,0.3,1), border-color 320ms cubic-bezier(0.16,1,0.3,1), opacity 320ms cubic-bezier(0.16,1,0.3,1)"
    );
    Object.entries(THEMES[mood]).forEach(([key, value]) => {
      if (html.style.getPropertyValue(key) !== value) {
        html.style.setProperty(key, value);
      }
    });
    if (html.getAttribute("data-mood") !== mood) {
      html.setAttribute("data-mood", mood);
    }
    lastMood = mood;
  }

  function decideMood() {
    const benchmark = byId("benchmark");
    const results = byId("trabajo");
    const brands = byId("clientes");
    const methodology = byId("metodologia");
    const aiLayer = sectionByText(["IA integrada", "IA + Data", "AI Layer", "Porque automatizar"]);

    if (!benchmark || !results || !brands || !methodology) return null;

    const vh = window.innerHeight || 1;
    const aiBox = rect(aiLayer);
    const brandsBox = rect(brands);
    const methodologyBox = rect(methodology);
    const benchmarkBox = rect(benchmark);

    const aiStillPresent = aiBox && aiBox.bottom > vh * 0.24 && visibleRatio(aiLayer) > 0.10;
    const brandsReady = brandsBox && brandsBox.top < vh * 0.84;
    const brandsStillPresent = brandsBox && brandsBox.bottom > vh * 0.18 && visibleRatio(brands) > 0.04;
    const methodologyDominant =
      methodologyBox && methodologyBox.top < vh * 0.54 && (!brandsBox || brandsBox.bottom <= vh * 0.30);
    const benchmarkReady =
      benchmarkBox && benchmarkBox.top < vh * 0.88 && (!aiBox || aiBox.bottom <= vh * 0.30);

    if (brandsReady || brandsStillPresent) return "dark";
    if (methodologyDominant) return "dark";
    if (benchmarkReady || visibleRatio(benchmark) > 0.04 || visibleRatio(results) > 0.04 || visibleRatio(brands) > 0.04) {
      return "light";
    }
    if (aiStillPresent) return "dark";
    return "dark";
  }

  function update() {
    ticking = false;
    const mood = decideMood();
    if (mood && (mood !== lastMood || html.getAttribute("data-mood") !== mood)) applyMood(mood);
  }

  function schedule() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  }

  function boot() {
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    new MutationObserver(schedule).observe(html, { attributes: true, attributeFilter: ["style", "data-mood"] });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, { once: true });
  } else {
    boot();
  }
})();
