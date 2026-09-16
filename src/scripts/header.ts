export {};

const header = document.querySelector<HTMLElement>('[data-site-header]');
const toggle = document.querySelector<HTMLButtonElement>('[data-nav-toggle]');
const nav = document.querySelector<HTMLElement>('[data-mobile-nav]');
const navLinks = nav?.querySelectorAll('a') ?? [];

const setScrolled = () => {
  if (!header) return;
  header.classList.toggle('is-scrolled', window.scrollY > 12);
};
setScrolled();
window.addEventListener('scroll', setScrolled, { passive: true });

function closeNav() {
  if (!toggle || !nav) return;
  toggle.setAttribute('aria-expanded', 'false');
  nav.dataset.open = 'false';
  document.body.style.removeProperty('overflow');
}

function openNav() {
  if (!toggle || !nav) return;
  toggle.setAttribute('aria-expanded', 'true');
  nav.dataset.open = 'true';
  document.body.style.overflow = 'hidden';
}

toggle?.addEventListener('click', () => {
  const isOpen = toggle.getAttribute('aria-expanded') === 'true';
  if (isOpen) closeNav();
  else openNav();
});

navLinks.forEach((link) => link.addEventListener('click', closeNav));

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeNav();
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 900) closeNav();
});