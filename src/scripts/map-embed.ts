export {};

const facades = document.querySelectorAll<HTMLElement>('[data-map-facade]');

facades.forEach((facade) => {
  const button = facade.querySelector<HTMLButtonElement>('[data-map-load]');
  button?.addEventListener('click', () => {
    const src = facade.dataset.mapSrc;
    const title = facade.dataset.mapTitle ?? 'Mappa';
    if (!src) return;

    const iframe = document.createElement('iframe');
    iframe.src = src;
    iframe.title = title;
    iframe.loading = 'lazy';
    iframe.referrerPolicy = 'no-referrer-when-downgrade';
    iframe.setAttribute('allowfullscreen', '');

    facade.replaceChildren(iframe);
    facade.classList.add('is-loaded');
  });
});