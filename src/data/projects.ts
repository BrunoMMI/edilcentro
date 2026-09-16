import type { ImageMetadata } from 'astro';

export interface ProjectStyle {
  slug: string;
  label: string;
  description: string;
}

export const projectStyles: ProjectStyle[] = [
  {
    slug: 'marmo',
    label: 'Marmo',
    description: 'Venature naturali e colori delicati per atmosfere rilassanti.',
  },
  {
    slug: 'cementato',
    label: 'Cementato',
    description: 'Linee pulite e materiali materici per un’estetica essenziale e moderna.',
  },
  {
    slug: 'geometrico',
    label: 'Geometrico',
    description: 'Forme, contrasti e simmetrie perfette dal carattere contemporaneo.',
  },
  {
    slug: 'pennellata',
    label: 'Effetto Pennellata',
    description: 'Texture morbide e sfumature quasi pittoriche che trasformano lo spazio.',
  },
  {
    slug: 'floreale',
    label: 'Floreale',
    description: 'Motivi ispirati alla natura per uno stile contemporaneo e delicato.',
  },
];

export interface ProjectImage {
  style: string;
  image: ImageMetadata;
  alt: string;
}

const projectModules = import.meta.glob<{ default: ImageMetadata }>('/src/assets/progetti/*.{jpeg,jpg,png}', {
  eager: true,
});

export const projectImages: ProjectImage[] = Object.entries(projectModules)
  .map(([path, mod]) => {
    const fileName = path.split('/').pop()!;
    const match = fileName.match(/render-bagno-([a-z]+)-(\d+)/);
    const style = match ? match[1] : 'altro';
    const num = match ? match[2] : '';
    const styleLabel = projectStyles.find((s) => s.slug === style)?.label ?? style;
    return {
      style,
      image: mod.default,
      alt: `Render progetto bagno in stile ${styleLabel} realizzato da Edil Centro, ambientazione ${num}`,
    };
  })
  .sort((a, b) => a.image.src.localeCompare(b.image.src));
