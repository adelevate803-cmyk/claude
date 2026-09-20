/* Nexus Holidays — WebGL depth layer for the hero.
 * Drifting particle field behind the airplane window, with the camera
 * dollying forward as the hero scrolls past, for a real sense of 3D depth
 * (not just CSS scale) while flying through cloud light. */

(function () {
  const hero = document.querySelector('.hero');
  const canvas = document.getElementById('hero3d');
  if (!hero || !canvas || typeof THREE === 'undefined') return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, 1, 1, 2000);
  camera.position.z = 500;

  const PARTICLE_COUNT = 500;
  const positions = new Float32Array(PARTICLE_COUNT * 3);
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 1400;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 900;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 1200 - 200;
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const material = new THREE.PointsMaterial({
    color: 0xf0cd85,
    size: 3.2,
    transparent: true,
    opacity: 0.55,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  const points = new THREE.Points(geometry, material);
  scene.add(points);

  function resize() {
    const { clientWidth: w, clientHeight: h } = hero;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  resize();
  window.addEventListener('resize', resize);

  let visible = false;
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => (visible = e.isIntersecting)),
    { threshold: 0 }
  );
  io.observe(hero);

  function renderFrame() {
    const rect = hero.getBoundingClientRect();
    const progress = Math.min(Math.max(-rect.top / rect.height, 0), 1);
    camera.position.z = 500 - progress * 380;
    renderer.render(scene, camera);
  }

  if (reduceMotion) {
    renderFrame();
    return;
  }

  function tick() {
    if (visible) {
      points.rotation.y += 0.0007;
      points.rotation.x += 0.0002;
      renderFrame();
    }
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
})();
