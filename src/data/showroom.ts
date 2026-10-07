import type { ImageMetadata } from 'astro';

export interface ShowroomPhoto {
  /** Parte finale del nome file: edil-centro-showroom-<slug>.jpg */
  slug: string;
  alt: string;
  image: ImageMetadata;
}

const modules = import.meta.glob<{ default: ImageMetadata }>('/src/assets/showroom/edil-centro-showroom-*.jpg', {
  eager: true,
});

/** Descrizioni (alt text) in ordine di presentazione nella pagina Showroom. */
const catalog: { slug: string; alt: string }[] = [
  { slug: 'facciata-sanitari-arredi', alt: 'Vetrina dello showroom Edil Centro a Pace del Mela con insegna Sanitari Arredi' },
  { slug: 'facciata-ceramiche', alt: 'Ingresso dello showroom Edil Centro a Pace del Mela con insegna Ceramiche' },
  { slug: 'rubinetteria-e-sanitari-esposti', alt: 'Esposizione di rubinetteria, lavabi e sanitari nello showroom Edil Centro' },
  { slug: 'galleria-coperta-showroom', alt: 'Galleria coperta dello showroom Edil Centro con espositori di piastrelle e rivestimenti' },
  { slug: 'corridoio-lastre-gres', alt: 'Corridoio con lastre di gres porcellanato di grande formato esposte in verticale' },
  { slug: 'corridoio-espositori-onice', alt: 'Espositori di pavimenti e rivestimenti, in primo piano una lastra effetto onice' },
  { slug: 'rivestimenti-decorati-floreali', alt: 'Rivestimenti decorati con motivi floreali e lastre in gres nello showroom' },
  { slug: 'lastre-effetto-marmo', alt: 'Lastre effetto marmo e campionari di ceramica esposti accanto alla finestra' },
  { slug: 'espositore-casalgrande-padana', alt: 'Espositore Casalgrande Padana con gres effetto legno e pietra' },
  { slug: 'espositore-gres-effetto-legno', alt: 'Espositore con pannelli di gres effetto legno e decori floreali' },
  { slug: 'espositore-piastrelle-colorate', alt: 'Espositore di piastrelle colorate e decorate per rivestimenti' },
  { slug: 'parete-pavimenti-effetto-legno', alt: 'Parete espositiva di pavimenti in gres effetto legno, cotto e pietra' },
  { slug: 'campionari-piastrelle', alt: 'Campionari a ventaglio di piastrelle e pannelli espositivi' },
  { slug: 'sala-pavimenti-decorati', alt: 'Sala dello showroom con pavimento in cementine decorate e arredi' },
  { slug: 'galleria-coperta-cotto-e-legno', alt: 'Galleria coperta con espositori in cotto e legno e piante verdi' },
  { slug: 'galleria-coperta-decori', alt: 'Galleria coperta con colonna espositiva di piastrelle decorate' },
  { slug: 'galleria-coperta-cerlat', alt: 'Galleria coperta con campionari Cerlat e piante mediterranee' },
  { slug: 'ingresso-galleria-coperta', alt: 'Ingresso alla galleria coperta con campionari di cementine decorate' },
  { slug: 'showroom-ceramiche-e-cucine', alt: 'Sala dello showroom con ceramiche, camini e sanitari' },
  { slug: 'sala-consulenza-clienti', alt: 'Sala consulenza dello showroom Edil Centro con tavolo e parete in pietra' },
  { slug: 'ufficio-consulenza', alt: 'Ufficio di consulenza dello showroom con scrivania e carta della Sicilia' },
];

function find(slug: string): ImageMetadata {
  const entry = Object.entries(modules).find(([path]) => path.endsWith(`edil-centro-showroom-${slug}.jpg`));
  if (!entry) throw new Error(`Foto showroom non trovata: ${slug}`);
  return entry[1].default;
}

export const showroomPhotos: ShowroomPhoto[] = catalog.map((item) => ({ ...item, image: find(item.slug) }));

export function showroomPhoto(slug: string): ShowroomPhoto {
  const photo = showroomPhotos.find((p) => p.slug === slug);
  if (!photo) throw new Error(`Foto showroom non trovata: ${slug}`);
  return photo;
}
