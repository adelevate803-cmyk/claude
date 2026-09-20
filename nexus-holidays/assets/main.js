// Nexus Holidays — shared front-end behavior (no build step, no framework).

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/* ---------- Mobile nav ---------- */
function initNav() {
  const burger = document.querySelector(".nx-nav__burger");
  const mobile = document.querySelector(".nx-nav__mobile");
  if (!burger || !mobile) return;
  burger.addEventListener("click", () => {
    const open = mobile.classList.toggle("is-open");
    burger.setAttribute("aria-expanded", open ? "true" : "false");
  });
  mobile.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => mobile.classList.remove("is-open")),
  );
}

/* ---------- Scroll reveal (transform-only, screenshot-safe) ---------- */
function initReveal() {
  const els = document.querySelectorAll(".reveal");
  if (!els.length) return;
  if (prefersReducedMotion()) {
    els.forEach((el) => el.classList.add("is-in"));
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18, rootMargin: "0px 0px -8% 0px" },
  );
  els.forEach((el) => observer.observe(el));
}

/* ---------- Parallax image (Bespoke section) ---------- */
function initParallax() {
  const el = document.querySelector("[data-parallax]");
  if (!el || prefersReducedMotion()) return;
  let raf = 0;
  function update() {
    raf = 0;
    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight || 1;
    const center = rect.top + rect.height / 2;
    const progress = Math.max(-1, Math.min(1, (center - vh / 2) / vh));
    el.style.setProperty("--parallax-y", `${(progress * 28).toFixed(1)}px`);
  }
  window.addEventListener("scroll", () => { if (!raf) raf = requestAnimationFrame(update); }, { passive: true });
  window.addEventListener("resize", update);
  update();
}

/* ---------- Pointer 3D tilt (destination cards) ---------- */
function initTilt() {
  if (prefersReducedMotion()) return;
  document.querySelectorAll("[data-tilt]").forEach((el) => {
    el.addEventListener("pointermove", (event) => {
      const rect = el.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;
      el.style.setProperty("--tilt-x", `${(-py * 6).toFixed(2)}deg`);
      el.style.setProperty("--tilt-y", `${(px * 6).toFixed(2)}deg`);
    });
    el.addEventListener("pointerleave", () => {
      el.style.setProperty("--tilt-x", "0deg");
      el.style.setProperty("--tilt-y", "0deg");
    });
  });
}

/* ---------- Journey scroll-scrub ----------
   4 stacked <video> elements fill the sticky stage. Scroll position through
   the tall .journey wrapper maps to [active leg index, time within that leg],
   so scrubbing forward AND backward both work, and each leg holds its own
   still frame while the visitor pauses. */
function initJourney() {
  const journey = document.querySelector(".journey");
  if (!journey) return;
  const videos = Array.from(journey.querySelectorAll(".journey__video"));
  const chapters = Array.from(journey.querySelectorAll(".journey__chapter"));
  const dots = Array.from(journey.querySelectorAll(".journey__progress span"));
  const scrollHint = journey.querySelector(".journey__scroll-hint");
  if (!videos.length) return;

  const weights = videos.map((v) => parseFloat(v.dataset.weight || "1"));
  const totalWeight = weights.reduce((a, b) => a + b, 0);
  let boundaries = [0];
  weights.forEach((w) => boundaries.push(boundaries[boundaries.length - 1] + w / totalWeight));

  let activeIndex = -1;
  let ready = false;
  let pendingSeeks = new Map();

  function trySeek(video, t) {
    if (video.readyState >= 1) {
      const dur = video.duration || 0;
      video.currentTime = Math.min(Math.max(t, 0), Math.max(dur - 0.05, 0));
    } else {
      pendingSeeks.set(video, t);
      video.addEventListener(
        "loadedmetadata",
        () => {
          const t2 = pendingSeeks.get(video);
          if (t2 != null) {
            video.currentTime = Math.min(Math.max(t2, 0), Math.max(video.duration - 0.05, 0));
          }
        },
        { once: true },
      );
    }
  }

  function update() {
    const rect = journey.getBoundingClientRect();
    const total = rect.height - window.innerHeight;
    const scrolled = -rect.top;
    let progress = total > 0 ? scrolled / total : 0;
    progress = Math.max(0, Math.min(1, progress));

    if (progress > 0.001 && scrollHint) scrollHint.classList.add("is-hidden");

    let idx = boundaries.length - 2;
    for (let i = 0; i < boundaries.length - 1; i++) {
      if (progress >= boundaries[i] && progress <= boundaries[i + 1]) {
        idx = i;
        break;
      }
    }
    const legSpan = boundaries[idx + 1] - boundaries[idx];
    const legProgress = legSpan > 0 ? (progress - boundaries[idx]) / legSpan : 0;

    if (idx !== activeIndex) {
      videos.forEach((v, i) => v.classList.toggle("is-active", i === idx));
      chapters.forEach((c, i) => c.classList.toggle("is-active", i === idx));
      dots.forEach((d, i) => d.classList.toggle("is-active", i === idx));
      activeIndex = idx;
    }

    const activeVideo = videos[idx];
    if (activeVideo) {
      const dur = activeVideo.duration || parseFloat(activeVideo.dataset.duration || "5");
      trySeek(activeVideo, legProgress * dur);
    }
  }

  let raf = 0;
  function onScroll() {
    if (!raf) raf = requestAnimationFrame(() => { raf = 0; update(); });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  update();
}

document.addEventListener("DOMContentLoaded", () => {
  initNav();
  initReveal();
  initParallax();
  initTilt();
  initJourney();
});
