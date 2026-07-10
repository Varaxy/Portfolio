/* Varaxy Thavereak — portfolio interactions */
(function () {
  "use strict";
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- navbar state ---------- */
  const nav = document.getElementById("navbar");
  addEventListener("scroll", () => {
    nav.classList.toggle("scrolled", scrollY > 40);
  }, { passive: true });

  /* ---------- mobile menu ---------- */
  const toggle = document.getElementById("nav-toggle");
  const links = document.getElementById("nav-links");
  toggle.addEventListener("click", () => links.classList.toggle("open"));
  links.addEventListener("click", () => links.classList.remove("open"));

  /* ---------- reveal on scroll ---------- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

  /* ---------- active nav link ---------- */
  const sections = [...document.querySelectorAll("section[id]")];
  const navAs = [...links.querySelectorAll("a")];
  const io2 = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        navAs.forEach((a) =>
          a.classList.toggle("active", a.getAttribute("href") === "#" + e.target.id)
        );
      }
    });
  }, { rootMargin: "-40% 0px -55% 0px" });
  sections.forEach((s) => io2.observe(s));

  /* ---------- rotating role (crossfade) ---------- */
  const roles = [
    "Full-Stack Software Engineer",
    "B.S. Computer Science — 2026",
    "NSF S-STEM Scholar",
    "Systems Thinker",
  ];
  const swap = document.getElementById("role-swap");
  if (!reduced) {
    let i = 0;
    setInterval(() => {
      swap.classList.add("fading");
      setTimeout(() => {
        i = (i + 1) % roles.length;
        swap.textContent = roles[i];
        swap.classList.remove("fading");
      }, 400);
    }, 3200);
  }

  /* ---------- animated counters ---------- */
  const io3 = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const end = +el.dataset.count;
      const t0 = performance.now();
      const dur = 1400;
      const tick = (t) => {
        const p = Math.min((t - t0) / dur, 1);
        const ease = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(end * ease);
        if (p < 1) requestAnimationFrame(tick);
      };
      reduced ? (el.textContent = end) : requestAnimationFrame(tick);
      io3.unobserve(el);
    });
  }, { threshold: 0.6 });
  document.querySelectorAll("[data-count]").forEach((el) => io3.observe(el));

  /* ---------- contact form → prefilled email ---------- */
  document.getElementById("cform").addEventListener("submit", (e) => {
    e.preventDefault();
    const f = e.target;
    const subject = encodeURIComponent("Portfolio contact from " + f.name.value);
    const body = encodeURIComponent(
      f.message.value + "\n\n— " + f.name.value + " (" + f.email.value + ")"
    );
    location.href = "mailto:thavereakvaraxy@gmail.com?subject=" + subject + "&body=" + body;
  });
})();
