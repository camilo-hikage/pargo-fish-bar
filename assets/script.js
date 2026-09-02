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

// ---------- lightbox da galeria ----------
(function () {
  const items = [...document.querySelectorAll(".gallery .g-item")];
  if (!items.length) return;

  const srcs = items.map((b) => {
    const img = b.querySelector("img");
    return { src: img.getAttribute("src"), alt: img.getAttribute("alt") || "" };
  });

  const box = document.createElement("div");
  box.className = "lightbox";
  box.setAttribute("role", "dialog");
  box.setAttribute("aria-modal", "true");
  box.hidden = true;
  box.innerHTML =
    '<button class="lb-btn lb-close" aria-label="Fechar">\u2715</button>' +
    '<button class="lb-btn lb-nav lb-prev" aria-label="Anterior">\u2039</button>' +
    '<img alt="" />' +
    '<button class="lb-btn lb-nav lb-next" aria-label="Pr\u00f3xima">\u203a</button>' +
    '<span class="lb-count"></span>';
  document.body.appendChild(box);

  const lbImg = box.querySelector("img");
  const lbCount = box.querySelector(".lb-count");
  let idx = 0;

  const render = (i) => {
    idx = (i + srcs.length) % srcs.length;
    lbImg.src = srcs[idx].src;
    lbImg.alt = srcs[idx].alt;
    lbCount.textContent = idx + 1 + " / " + srcs.length;
  };
  const open = (i) => {
    render(i);
    box.hidden = false;
    document.body.style.overflow = "hidden";
  };
  const close = () => {
    box.hidden = true;
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
    if (e.target === box) close();
  });
  document.addEventListener("keydown", (e) => {
    if (box.hidden) return;
    if (e.key === "Escape") close();
    else if (e.key === "ArrowLeft") render(idx - 1);
    else if (e.key === "ArrowRight") render(idx + 1);
  });
})();
