export interface CookieCategory {
  slug: string;
  title: string;
  description: string;
  required: boolean;
}

/**
 * Categorie di cookie effettivamente utilizzate dal sito.
 * Il sito NON utilizza attualmente cookie di analytics o marketing: le voci
 * "preferenze", "analytics" e "marketing" NON sono presenti finché non verranno
 * realmente attivate. L'architettura (qui e in CookieConsent.astro) è pronta ad
 * accogliere nuove categorie semplicemente aggiungendo una voce a questo array.
 */
export const cookieCategories: CookieCategory[] = [
  {
    slug: 'necessari',
    title: 'Necessari',
    description:
      'Cookie tecnici indispensabili per il funzionamento del sito (es. memorizzazione delle preferenze cookie). Non richiedono consenso e non possono essere disattivati.',
    required: true,
  },
];
