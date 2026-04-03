const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const siteHeader = document.getElementById("siteHeader");
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

function syncHeaderState() {
  if (!siteHeader) return;
  siteHeader.classList.toggle("is-scrolled", window.scrollY > 18);
}

function setMobileMenu(open) {
  if (!menuBtn || !mobileMenu) return;

  mobileMenu.classList.toggle("is-open", open);
  menuBtn.classList.toggle("is-open", open);
  menuBtn.setAttribute("aria-expanded", String(open));
}

menuBtn?.addEventListener("click", () => {
  const isOpen = menuBtn.getAttribute("aria-expanded") === "true";
  setMobileMenu(!isOpen);
});

mobileMenu?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setMobileMenu(false));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setMobileMenu(false);
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 960) {
    setMobileMenu(false);
  }
});

window.addEventListener("scroll", syncHeaderState, { passive: true });
syncHeaderState();

function initRevealObserver() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    items.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.18, rootMargin: "0px 0px -40px 0px" }
  );

  items.forEach((item) => observer.observe(item));
}

function initCounters() {
  const counters = document.querySelectorAll("[data-count]");
  if (!counters.length) return;

  const animateCounter = (counter) => {
    if (counter.dataset.animated === "true") return;

    const target = Number(counter.getAttribute("data-count"));
    if (!Number.isFinite(target)) return;

    counter.dataset.animated = "true";

    if (prefersReducedMotion) {
      counter.textContent = String(target);
      return;
    }

    const startTime = performance.now();
    const duration = 1200;

    const frame = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      counter.textContent = String(Math.round(target * eased));
      if (progress < 1) window.requestAnimationFrame(frame);
    };

    window.requestAnimationFrame(frame);
  };

  if (!("IntersectionObserver" in window) || prefersReducedMotion) {
    counters.forEach(animateCounter);
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.45 }
  );

  counters.forEach((counter) => observer.observe(counter));
}

const year = document.getElementById("year");
if (year) {
  year.textContent = String(new Date().getFullYear());
}

initRevealObserver();
initCounters();
