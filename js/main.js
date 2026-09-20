/* Nexus Holidays — scroll-driven 3D zoom animation system */

document.documentElement.classList.remove('no-js');

(function () {
  const navbar = document.querySelector('.navbar');
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  }, { passive: true });

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', navLinks.classList.contains('open'));
    });
    navLinks.querySelectorAll('a').forEach((a) =>
      a.addEventListener('click', () => navLinks.classList.remove('open'))
    );
  }

  /* Scroll-zoom scenes: each .scene reveals its media + copy with a
     perspective zoom as it crosses the viewport, simulating flying
     into each destination. */
  const scenes = document.querySelectorAll('.scene');

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const media = entry.target.querySelector('.scene-media');
        const content = entry.target.querySelector('.scene-content');
        if (entry.isIntersecting) {
          media && media.classList.add('in-view');
          content && content.classList.add('in-view');
        } else if (entry.boundingClientRect.top > 0) {
          // scrolled back above viewport — reset so it re-plays on the way down
          media && media.classList.remove('in-view');
          content && content.classList.remove('in-view');
        }
      });
    },
    { threshold: 0.35 }
  );

  scenes.forEach((s) => io.observe(s));

  /* Bespoke cards stagger-in */
  const cards = document.querySelectorAll('.bespoke-card');
  const cardIo = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('in-view'), i * 90);
          cardIo.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );
  cards.forEach((c) => cardIo.observe(c));

  /* Subtle continuous parallax drift on scene media while in view,
     tied to scroll position for an extra sense of depth/motion. */
  let ticking = false;
  function parallax() {
    scenes.forEach((scene) => {
      const rect = scene.getBoundingClientRect();
      const vh = window.innerHeight;
      if (rect.bottom < 0 || rect.top > vh) return;
      const progress = 1 - Math.min(Math.max(rect.top / vh, -1), 1); // 0 -> 2
      const media = scene.querySelector('.scene-media');
      if (media && media.classList.contains('in-view')) {
        const drift = (progress - 1) * 14; // -14px .. 14px
        media.style.transform = `scale(1.02) translateY(${drift}px) translateZ(0)`;
      }
    });
    ticking = false;
  }
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(parallax);
      ticking = true;
    }
  }, { passive: true });

  /* Stat counter animation */
  const stats = document.querySelectorAll('.stat .num[data-count]');
  const statIo = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10);
        const suffix = el.dataset.suffix || '';
        const duration = 1400;
        const start = performance.now();
        function tick(now) {
          const p = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(eased * target).toLocaleString() + suffix;
          if (p < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
        statIo.unobserve(el);
      });
    },
    { threshold: 0.6 }
  );
  stats.forEach((s) => statIo.observe(s));
})();
