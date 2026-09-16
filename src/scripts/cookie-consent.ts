export {};

interface ConsentState {
  [category: string]: boolean;
}

const STORAGE_KEY = 'edilcentro-cookie-consent';

const banner = document.querySelector<HTMLElement>('[data-cookie-banner]');
const dialog = document.querySelector<HTMLDialogElement>('[data-cookie-dialog]');
const acceptAllBtns = document.querySelectorAll<HTMLButtonElement>('[data-cookie-accept-all]');
const rejectBtn = document.querySelector<HTMLButtonElement>('[data-cookie-reject]');
const customizeBtn = document.querySelector<HTMLButtonElement>('[data-cookie-customize]');
const saveBtn = document.querySelector<HTMLButtonElement>('[data-cookie-save]');
const closeDialogBtn = document.querySelector<HTMLButtonElement>('[data-cookie-dialog-close]');
const settingsLinks = document.querySelectorAll<HTMLElement>('[data-cookie-settings]');
const toggles = document.querySelectorAll<HTMLInputElement>('[data-cookie-toggle]');

function readConsent(): ConsentState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeConsent(state: ConsentState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...state, updatedAt: Date.now() }));
  } catch {
    /* localStorage non disponibile: il banner ricomparirà al prossimo caricamento */
  }
  document.dispatchEvent(new CustomEvent('cookieconsent:update', { detail: state }));
}

function hideBanner() {
  banner?.setAttribute('hidden', '');
}

function showBanner() {
  banner?.removeAttribute('hidden');
}

function collectToggleState(): ConsentState {
  const state: ConsentState = {};
  toggles.forEach((toggle) => {
    state[toggle.dataset.cookieToggle ?? ''] = toggle.checked || toggle.disabled;
  });
  return state;
}

function applyStateToToggles(state: ConsentState) {
  toggles.forEach((toggle) => {
    const key = toggle.dataset.cookieToggle ?? '';
    if (toggle.disabled) {
      toggle.checked = true;
    } else {
      toggle.checked = Boolean(state[key]);
    }
  });
}

acceptAllBtns.forEach((btn) =>
  btn.addEventListener('click', () => {
    const state: ConsentState = {};
    toggles.forEach((toggle) => {
      state[toggle.dataset.cookieToggle ?? ''] = true;
    });
    writeConsent(state);
    hideBanner();
    dialog?.close();
  }),
);

rejectBtn?.addEventListener('click', () => {
  const state: ConsentState = {};
  toggles.forEach((toggle) => {
    state[toggle.dataset.cookieToggle ?? ''] = Boolean(toggle.disabled);
  });
  writeConsent(state);
  hideBanner();
});

customizeBtn?.addEventListener('click', () => {
  const saved = readConsent();
  if (saved) applyStateToToggles(saved);
  dialog?.showModal();
});

saveBtn?.addEventListener('click', () => {
  writeConsent(collectToggleState());
  hideBanner();
  dialog?.close();
});

closeDialogBtn?.addEventListener('click', () => dialog?.close());

settingsLinks.forEach((link) =>
  link.addEventListener('click', (event) => {
    event.preventDefault();
    const saved = readConsent();
    if (saved) applyStateToToggles(saved);
    if (typeof dialog?.showModal === 'function') {
      dialog.showModal();
    } else {
      showBanner();
    }
  }),
);

const existingConsent = readConsent();
if (existingConsent) {
  applyStateToToggles(existingConsent);
  hideBanner();
} else {
  showBanner();
}