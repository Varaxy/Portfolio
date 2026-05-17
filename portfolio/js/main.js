// ── Scroll reveal ──────────────────────────────────────
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  },
  { threshold: 0.08 }
);

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

// ── Active nav highlight ────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const onScroll = () => {
  let current = '';
  sections.forEach((s) => {
    if (window.scrollY >= s.offsetTop - 140) current = s.id;
  });
  navLinks.forEach((a) => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
};

window.addEventListener('scroll', onScroll, { passive: true });

// ── Hero rings slow rotation ────────────────────────────
const rings = document.querySelector('.hero-rings');

if (rings) {
  let angle = 0;

  const rotateRings = () => {
    angle += 0.015;
    rings.style.transform = `translateY(-50%) rotate(${angle}deg)`;
    requestAnimationFrame(rotateRings);
  };

  rotateRings();
}
