export {};

const grid = document.querySelector<HTMLElement>('[data-gallery]');
const items = Array.from(document.querySelectorAll<HTMLElement>('[data-gallery-item]'));
const filterButtons = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-gallery-filter]'));
const description = document.querySelector<HTMLElement>('[data-gallery-description]');

const dialog = document.querySelector<HTMLDialogElement>('[data-lightbox]');
const dialogImg = dialog?.querySelector<HTMLImageElement>('[data-lightbox-img]');
const dialogCaption = dialog?.querySelector<HTMLElement>('[data-lightbox-caption]');
const closeBtn = dialog?.querySelector<HTMLButtonElement>('[data-lightbox-close]');
const prevBtn = dialog?.querySelector<HTMLButtonElement>('[data-lightbox-prev]');
const nextBtn = dialog?.querySelector<HTMLButtonElement>('[data-lightbox-next]');

let visibleItems: HTMLElement[] = items;
let currentIndex = 0;

function applyFilter(style: string) {
  visibleItems = [];
  items.forEach((item) => {
    const match = style === 'all' || item.dataset.style === style;
    item.hidden = !match;
    if (match) visibleItems.push(item);
  });
  grid?.setAttribute('data-count', String(visibleItems.length));
  const active = filterButtons.find((b) => b.dataset.galleryFilter === style);
  if (description) description.textContent = active?.dataset.description ?? '';
}

filterButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    filterButtons.forEach((b) => b.setAttribute('aria-pressed', 'false'));
    btn.setAttribute('aria-pressed', 'true');
    applyFilter(btn.dataset.galleryFilter ?? 'all');
  });
});

function openLightboxAt(index: number) {
  const item = visibleItems[index];
  if (!item || !dialog || !dialogImg) return;
  currentIndex = index;
  const fullSrc = item.dataset.full ?? '';
  const alt = item.dataset.alt ?? '';
  dialogImg.src = fullSrc;
  dialogImg.alt = alt;
  if (dialogCaption) dialogCaption.textContent = alt;
  if (!dialog.open) dialog.showModal();
}

items.forEach((item, index) => {
  item.addEventListener('click', () => {
    const idx = visibleItems.indexOf(item);
    openLightboxAt(idx === -1 ? index : idx);
  });
});

function step(delta: number) {
  if (visibleItems.length === 0) return;
  const next = (currentIndex + delta + visibleItems.length) % visibleItems.length;
  openLightboxAt(next);
}

prevBtn?.addEventListener('click', () => step(-1));
nextBtn?.addEventListener('click', () => step(1));
closeBtn?.addEventListener('click', () => dialog?.close());

dialog?.addEventListener('click', (event) => {
  if (event.target === dialog) dialog.close();
});

dialog?.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowRight') step(1);
  if (event.key === 'ArrowLeft') step(-1);
});

function selectFromHash() {
  const hashFilter = decodeURIComponent(window.location.hash.slice(1));
  const match = filterButtons.find((btn) => btn.dataset.galleryFilter === hashFilter);
  if (match) match.click();
  return Boolean(match);
}

window.addEventListener('hashchange', selectFromHash);

if (!selectFromHash()) {
  // Senza il pulsante "Tutti" si parte dal filtro già attivo (il primo)
  const pressed = filterButtons.find((btn) => btn.getAttribute('aria-pressed') === 'true');
  applyFilter(pressed?.dataset.galleryFilter ?? 'all');
}
