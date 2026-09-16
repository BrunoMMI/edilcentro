export {};

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const elements = document.querySelectorAll<HTMLElement>('[data-reveal]');

if (prefersReducedMotion || elements.length === 0) {
  elements.forEach((el) => el.classList.add('is-visible'));
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLElement;
          const index = Number(target.dataset.revealIndex ?? 0);
          target.style.setProperty('--reveal-delay', `${Math.min(index * 90, 450)}ms`);
          target.classList.add('is-visible');
          observer.unobserve(target);
        }
      }
    },
    { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
  );

  elements.forEach((el) => observer.observe(el));
}