<!-- document.getElementById("year").textContent = new Date().getFullYear(); -->

// ==========================
// Open <details> from hash
// ==========================
  window.addEventListener("DOMContentLoaded", () => {
    const hash = window.location.hash.slice(1);
    if (!hash) return;

    const target = document.getElementById(hash);
    if (target && target.tagName.toLowerCase() === "details") {
      target.open = true;
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });

 // ==========================
 // Theme Toggle (with persist)
 // ==========================
 const root = document.documentElement;
 const themeToggle = document.getElementById('themeToggle');
 const saved = localStorage.getItem('theme');
 if (saved) document.documentElement.setAttribute('data-theme', saved);
 themeToggle.addEventListener('click', () => {
   const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
   root.setAttribute('data-theme', next);
   localStorage.setItem('theme', next);
   themeToggle.textContent = next === 'dark' ? '🌙' : '🌞';
 });
 themeToggle.textContent = root.getAttribute('data-theme') === 'dark' ? '🌙' : '🌞';

 // ==========================
 // Scroll‑spy active nav
 // ==========================
 const navLinks = [...document.querySelectorAll('[data-link]')];
 const sections = navLinks.map(a => document.querySelector(a.getAttribute('href')));
 const obs = new IntersectionObserver(entries => {
   entries.forEach(entry => {
     const idx = sections.indexOf(entry.target);
     if (idx > -1) {
       navLinks[idx].classList.toggle('active', entry.isIntersecting);
     }
   });
 }, { rootMargin: '-60% 0px -35% 0px', threshold: 0.01 });
 sections.forEach(s => s && obs.observe(s));

 // ==========================
 // Reveal on scroll
 // ==========================
 const toReveal = document.querySelectorAll('.reveal');
 const rObs = new IntersectionObserver((entries) => {
   entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); rObs.unobserve(e.target); } });
 }, { threshold: 0.15 });
 toReveal.forEach(el => rObs.observe(el));

 // ==========================
 // Copy email helper
 // ==========================
 document.getElementById('copyEmail').addEventListener('click', async () => {
   try {
     await navigator.clipboard.writeText('cathy.checora@gmail.com');
     const btn = document.getElementById('copyEmail');
     const prev = btn.textContent;
     btn.textContent = 'Copied!';
     setTimeout(() => btn.textContent = prev, 1300);
   } catch (e) { alert('Copy failed. Email: cathy.checora@gmail.com'); }
 });

 // ==========================
 // Year + Back to top button
 // ==========================
 document.getElementById('year').textContent = new Date().getFullYear();
 const toTop = document.getElementById('toTop');
 const toggleTop = () => {
   const show = window.scrollY > 240;
   toTop.style.opacity = show ? 1 : 0;
   toTop.style.pointerEvents = show ? 'auto' : 'none';
 };
 window.addEventListener('scroll', toggleTop, { passive: true });
 toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

 // ==========================
 // Keyboard shortcuts
 // ==========================
 // g + p -> Projects, g + a -> About, g + c -> Contact
 let gPressed = false;
 window.addEventListener('keydown', (e) => {
   if (e.key.toLowerCase() === 'g') { gPressed = true; setTimeout(() => gPressed = false, 700); }
   if (gPressed) {
     if (e.key.toLowerCase() === 'p') document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
     if (e.key.toLowerCase() === 'a') document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
     if (e.key.toLowerCase() === 'c') document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
   }
 });

 // ==========================
 // Mobile hamburger + animation
 // ==========================
 const burger = document.getElementById('hamburger');
 const mobile = document.getElementById('mobileMenu');
 const scrim = document.getElementById('scrim');
 const openMobile = () => {
   burger.setAttribute('aria-expanded', 'true');
   mobile.classList.add('open');
   scrim.hidden = false; scrim.classList.add('open');
   document.body.style.overflow = 'hidden';
 };
 const closeMobile = () => {
   burger.setAttribute('aria-expanded', 'false');
   mobile.classList.remove('open');
   scrim.classList.remove('open');
   setTimeout(() => { scrim.hidden = true; }, 220);
   document.body.style.overflow = '';
 };
 const toggleMobile = () => {
   const expanded = burger.getAttribute('aria-expanded') === 'true';
   expanded ? closeMobile() : openMobile();
 };

 burger.addEventListener('click', toggleMobile);
 scrim.addEventListener('click', closeMobile);

 // Close on link click
 mobile.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
   if (mobile.classList.contains('open')) closeMobile();
 }));
 // Close on Escape
 window.addEventListener('keydown', (e) => { if (e.key === 'Escape' && mobile.classList.contains('open')) closeMobile(); });
