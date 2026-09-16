export {};

const counters = document.querySelectorAll<HTMLElement>('[data-counter]');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function animateCounter(el: HTMLElement) {
  const target = Number(el.dataset.counter ?? '0');
  if (prefersReducedMotion || target === 0) {
    el.textContent = String(target);
    return;
  }

  const duration = 1400;
  const start = performance.now();

  function tick(now: number) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = String(Math.round(eased * target));
    if (progress < 1) requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

const observer = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        animateCounter(entry.target as HTMLElement);
        observer.unobserve(entry.target);
      }
    }
  },
  { threshold: 0.4 },
);

counters.forEach((el) => observer.observe(el));