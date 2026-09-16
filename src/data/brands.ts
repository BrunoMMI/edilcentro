import type { ImageMetadata } from 'astro';

export interface Brand {
  name: string;
  logo: ImageMetadata;
}

const ACRONYMS = new Set(['gs', 'gsg', 'gsi', 'cir', 'abk', 'rak', 'ce', 'si']);

function titleCase(slug: string): string {
  // Rimuove suffissi numerici di duplicato tipo "-1" derivati da "(1)" nel nome file originale.
  const cleanSlug = slug.replace(/-\d+$/, '');
  const words = cleanSlug.split('-');
  return words
    .map((w, i) => {
      if (w === 'e' && i > 0) return 'e';
      if (ACRONYMS.has(w)) return w.toUpperCase();
      return w.charAt(0).toUpperCase() + w.slice(1);
    })
    .join(' ');
}

const brandModules = import.meta.glob<{ default: ImageMetadata }>('/src/assets/brands/**/*.png', {
  eager: true,
});

function loadGroup(groupSlug: string): Brand[] {
  return Object.entries(brandModules)
    .filter(([path]) => path.includes(`/brands/${groupSlug}/`))
    .map(([path, mod]) => {
      const fileName = path.split('/').pop()!.replace(/\.png$/, '');
      return { name: titleCase(fileName), logo: mod.default };
    })
    .sort((a, b) => a.name.localeCompare(b.name));
}

export const brandGroups: Record<string, Brand[]> = {
  'pavimenti-rivestimenti': loadGroup('pavimenti-rivestimenti'),
  sanitari: loadGroup('sanitari'),
  'arredo-bagno': loadGroup('arredo-bagno'),
  rubinetteria: loadGroup('rubinetteria'),
  termoarredo: loadGroup('termoarredo'),
};

/** Elenco completo, deduplicato per nome, per la sezione "Brand" in homepage. */
export const allBrands: Brand[] = Object.values(brandGroups)
  .flat()
  .filter((brand, index, arr) => arr.findIndex((b) => b.name === brand.name) === index)
  .sort((a, b) => a.name.localeCompare(b.name));
