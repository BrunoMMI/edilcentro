export interface CookieItem {
  name: string;
  /** Dove viene memorizzato. */
  storage: string;
  provider: string;
  purpose: string;
  duration: string;
}

export interface CookieCategory {
  slug: string;
  title: string;
  description: string;
  required: boolean;
  items: CookieItem[];
}

/**
 * Categorie di cookie effettivamente utilizzate dal sito.
 * Il sito NON utilizza attualmente cookie di analytics o marketing: le voci
 * "preferenze", "analytics" e "marketing" NON sono presenti finché non verranno
 * realmente attivate. L'architettura (qui e in CookieConsent.astro) è pronta ad
 * accogliere nuove categorie semplicemente aggiungendo una voce a questo array:
 * il pannello preferenze e la tabella della Cookie Policy si aggiornano da soli.
 */
export const cookieCategories: CookieCategory[] = [
  {
    slug: 'necessari',
    title: 'Necessari',
    description:
      'Strumenti tecnici indispensabili per il funzionamento del sito (ad esempio memorizzare la tua scelta sui cookie). Non richiedono consenso e non possono essere disattivati.',
    required: true,
    items: [
      {
        name: 'edilcentro-cookie-consent',
        storage: 'localStorage del browser',
        provider: 'Edil Centro (prima parte)',
        purpose: 'Ricorda le preferenze espresse nel banner cookie, così da non riproporlo a ogni visita.',
        duration: 'Fino alla cancellazione dei dati del sito dal browser',
      },
    ],
  },
];
