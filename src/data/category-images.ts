import type { ImageMetadata } from 'astro';
import { showroomPhoto } from '@data/showroom';
import { projectImages } from '@data/projects';

export interface CategoryImage {
  image: ImageMetadata;
  alt: string;
}

function render(style: string, number: string): CategoryImage {
  const found = projectImages.find((p) => p.image.src.includes(`render-bagno-${style}-${number}`));
  if (!found) throw new Error(`Render non trovato: ${style}-${number}`);
  return { image: found.image, alt: found.alt };
}

/**
 * Immagine di ogni categoria prodotto. Pavimenti, rivestimenti e rubinetteria hanno
 * una foto reale dello showroom; per le altre si usa il render 3D che mostra meglio il prodotto.
 */
export const categoryImages: Record<string, CategoryImage> = {
  pavimenti: showroomPhoto('parete-pavimenti-effetto-legno'),
  rivestimenti: showroomPhoto('rivestimenti-decorati-floreali'),
  sanitari: { ...render('geometrico', '02'), alt: 'Sanitari sospesi e bidet in un bagno progettato da Edil Centro' },
  'arredo-bagno': { ...render('marmo', '05'), alt: 'Mobile bagno in legno con specchio tondo retroilluminato' },
  rubinetteria: showroomPhoto('rubinetteria-e-sanitari-esposti'),
  termoarredo: { ...render('floreale', '08'), alt: 'Bagno con termoarredo scaldasalviette e mobile lavabo' },
  'spazio-doccia': { ...render('floreale', '09'), alt: 'Spazio doccia con box in vetro e piatto doccia nero' },
  'spazio-vasca': { ...render('cementato', '06'), alt: 'Vasca freestanding in un bagno progettato da Edil Centro' },
};

export function categoryImage(slug: string): CategoryImage {
  const entry = categoryImages[slug];
  if (!entry) throw new Error(`Immagine categoria mancante: ${slug}`);
  return entry;
}
