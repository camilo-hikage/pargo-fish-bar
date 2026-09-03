// ---------- header: sombra ao rolar ----------
const header = document.getElementById("header");
const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 20);
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

// ---------- menu mobile ----------
const toggle = document.getElementById("navToggle");
toggle.addEventListener("click", () => {
  const open = header.classList.toggle("nav-open");
  toggle.setAttribute("aria-expanded", String(open));
  document.body.style.overflow = open ? "hidden" : "";
});
header.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    if (header.classList.contains("nav-open")) {
      header.classList.remove("nav-open");
      toggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    }
  }),
);

// ---------- abas do menu ----------
const tabs = document.querySelectorAll(".menu-tabs button");
const panels = document.querySelectorAll(".menu-panel");
tabs.forEach((tab) =>
  tab.addEventListener("click", () => {
    tabs.forEach((t) => t.setAttribute("aria-selected", "false"));
    tab.setAttribute("aria-selected", "true");
    const target = tab.dataset.tab;
    panels.forEach((p) => p.classList.toggle("is-active", p.dataset.panel === target));
  }),
);

// ---------- reveal ao rolar ----------
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12 },
);
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

// ---------- ano no rodapé ----------
document.getElementById("year").textContent = new Date().getFullYear();

// ---------- parallax do hero ao rolar ----------
(function () {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const hero = document.querySelector(".hero");
  if (!hero) return;
  const copy = hero.querySelector(".hero-copy");
  const media = hero.querySelector(".hero-media");
  const strip = hero.querySelector(".hero-strip");
  let ticking = false;

  const update = () => {
    ticking = false;
    const y = window.scrollY;
    const vh = window.innerHeight;
    if (y > vh) return; // hero já saiu de cena
    const p = Math.min(y / (vh * 0.85), 1); // 0 → 1 conforme rola o hero
    if (copy) {
      copy.style.transform = "translateY(" + y * 0.28 + "px)";
      copy.style.opacity = String(1 - p);
    }
    if (media) {
      media.style.transform = "translateY(" + y * 0.1 + "px) scale(" + (1 - p * 0.05) + ")";
      media.style.opacity = String(1 - p * 0.8);
    }
    if (strip) {
      strip.style.transform = "translateY(" + y * 0.45 + "px)";
      strip.style.opacity = String(Math.max(0, 1 - p * 1.6));
    }
  };

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    },
    { passive: true },
  );
  update();
})();

// ---------- lightbox da galeria (fotos e v\u00eddeos) ----------
(function () {
  const items = [...document.querySelectorAll(".gallery .g-item")];
  if (!items.length) return;

  const media = items.map((b) => ({
    kind: b.dataset.kind === "video" ? "video" : "img",
    src: b.dataset.full || (b.querySelector("img, video") || {}).src || "",
    alt: (b.querySelector("img") || {}).alt || "",
  }));

  const box = document.createElement("div");
  box.className = "lightbox";
  box.setAttribute("role", "dialog");
  box.setAttribute("aria-modal", "true");
  box.hidden = true;
  box.innerHTML =
    '<button class="lb-btn lb-close" aria-label="Fechar">\u2715</button>' +
    '<button class="lb-btn lb-nav lb-prev" aria-label="Anterior">\u2039</button>' +
    '<div class="lb-stage"></div>' +
    '<button class="lb-btn lb-nav lb-next" aria-label="Pr\u00f3xima">\u203a</button>' +
    '<span class="lb-count"></span>';
  document.body.appendChild(box);

  const stage = box.querySelector(".lb-stage");
  const lbCount = box.querySelector(".lb-count");
  let idx = 0;

  const render = (i) => {
    idx = (i + media.length) % media.length;
    const m = media[idx];
    stage.innerHTML = "";
    if (m.kind === "video") {
      const v = document.createElement("video");
      v.src = m.src;
      v.controls = true;
      v.autoplay = true;
      v.loop = true;
      v.playsInline = true;
      stage.appendChild(v);
    } else {
      const im = document.createElement("img");
      im.src = m.src;
      im.alt = m.alt;
      stage.appendChild(im);
    }
    lbCount.textContent = idx + 1 + " / " + media.length;
  };
  const open = (i) => {
    render(i);
    box.hidden = false;
    document.body.style.overflow = "hidden";
  };
  const close = () => {
    box.hidden = true;
    stage.innerHTML = "";
    document.body.style.overflow = "";
  };

  items.forEach((b, i) => b.addEventListener("click", () => open(i)));
  box.querySelector(".lb-close").addEventListener("click", close);
  box.querySelector(".lb-prev").addEventListener("click", (e) => {
    e.stopPropagation();
    render(idx - 1);
  });
  box.querySelector(".lb-next").addEventListener("click", (e) => {
    e.stopPropagation();
    render(idx + 1);
  });
  box.addEventListener("click", (e) => {
    if (e.target === box || e.target === stage) close();
  });
  document.addEventListener("keydown", (e) => {
    if (box.hidden) return;
    if (e.key === "Escape") close();
    else if (e.key === "ArrowLeft") render(idx - 1);
    else if (e.key === "ArrowRight") render(idx + 1);
  });
})();
