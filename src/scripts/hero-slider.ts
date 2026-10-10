export {};

const root = document.querySelector<HTMLElement>('[data-hero]');

if (root) {
  const slides = Array.from(root.querySelectorAll<HTMLElement>('[data-hero-slide]'));
  const dots = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-hero-dot]'));
  const captions = Array.from(root.querySelectorAll<HTMLElement>('[data-hero-caption]'));
  const prevBtn = root.querySelector<HTMLButtonElement>('[data-hero-prev]');
  const nextBtn = root.querySelector<HTMLButtonElement>('[data-hero-next]');
  const toggleBtn = root.querySelector<HTMLButtonElement>('[data-hero-toggle]');

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const interval = 6500;

  let current = 0;
  let timer: number | undefined;
  let userPaused = reducedMotion;
  let hoverPaused = false;

  if (reducedMotion) {
    root.dataset.static = 'true';
    toggleBtn?.setAttribute('aria-pressed', 'true');
    toggleBtn?.setAttribute('aria-label', 'Avvia lo slideshow');
  }

  /** Riavvia le animazioni CSS (zoom e barra di avanzamento) sulla diapositiva attiva. */
  function restartAnimation(el: Element | undefined) {
    if (!el) return;
    el.getAnimations({ subtree: true }).forEach((animation) => {
      animation.cancel();
      animation.play();
    });
  }

  function show(index: number) {
    const next = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      const active = i === next;
      slide.classList.toggle('is-active', active);
      slide.setAttribute('aria-hidden', active ? 'false' : 'true');
    });
    dots.forEach((dot, i) => {
      const active = i === next;
      dot.classList.toggle('is-active', active);
      if (active) dot.setAttribute('aria-current', 'true');
      else dot.removeAttribute('aria-current');
    });
    captions.forEach((caption, i) => {
      const active = i === next;
      caption.classList.toggle('is-active', active);
      caption.tabIndex = active ? 0 : -1;
    });
    current = next;
    restartAnimation(slides[next]);
    restartAnimation(dots[next]);
  }

  function stop() {
    window.clearTimeout(timer);
    timer = undefined;
  }

  function schedule() {
    stop();
    if (userPaused || hoverPaused || document.hidden) return;
    timer = window.setTimeout(() => {
      show(current + 1);
      schedule();
    }, interval);
  }

  function syncPaused() {
    const paused = userPaused || hoverPaused || document.hidden;
    root!.dataset.paused = String(paused);
    schedule();
  }

  function go(index: number) {
    show(index);
    schedule();
  }

  prevBtn?.addEventListener('click', () => go(current - 1));
  nextBtn?.addEventListener('click', () => go(current + 1));
  dots.forEach((dot, i) => dot.addEventListener('click', () => go(i)));

  toggleBtn?.addEventListener('click', () => {
    userPaused = !userPaused;
    root.dataset.static = 'false';
    toggleBtn.setAttribute('aria-pressed', String(userPaused));
    toggleBtn.setAttribute('aria-label', userPaused ? 'Avvia lo slideshow' : 'Metti in pausa lo slideshow');
    if (!userPaused) restartAnimation(dots[current]);
    syncPaused();
  });

  if (window.matchMedia('(hover: hover)').matches) {
    root.addEventListener('mouseenter', () => {
      hoverPaused = true;
      syncPaused();
    });
    root.addEventListener('mouseleave', () => {
      hoverPaused = false;
      syncPaused();
    });
  }
  root.addEventListener('focusin', () => {
    hoverPaused = true;
    syncPaused();
  });
  root.addEventListener('focusout', () => {
    hoverPaused = false;
    syncPaused();
  });
  document.addEventListener('visibilitychange', syncPaused);

  root.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') go(current + 1);
    if (event.key === 'ArrowLeft') go(current - 1);
  });

  // Swipe su touch
  let startX = 0;
  let startY = 0;
  root.addEventListener(
    'touchstart',
    (event) => {
      startX = event.touches[0].clientX;
      startY = event.touches[0].clientY;
    },
    { passive: true },
  );
  root.addEventListener(
    'touchend',
    (event) => {
      const dx = event.changedTouches[0].clientX - startX;
      const dy = event.changedTouches[0].clientY - startY;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) go(current + (dx < 0 ? 1 : -1));
    },
    { passive: true },
  );

  syncPaused();
}
