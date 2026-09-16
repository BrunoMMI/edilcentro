/**
 * Dati aziendali reali di Edil Centro SRL.
 * Fonte: sito precedente (https://edilcentrosrl.info/) incrociato con i materiali
 * nella cartella "Contenuti" (logo, docx categorie, foto sede/ferramenta).
 *
 * IMPORTANTE: non aggiungere qui dati non verificati (P.IVA, orari non confermati,
 * recensioni non verificate, ecc). Vedi CLAUDE.md, sezione "Dati da verificare".
 */

export const companyName = 'Edil Centro Srl';
export const companyLegalName = 'Edil Centro S.r.l.';
export const foundedYear = 1969;
export const foundedNote = 'Dal 1969, con radici nella storica attività "Ceramiche Valenti"';

export const currentYear = new Date().getFullYear();
export const yearsOfActivity = currentYear - foundedYear;

export const siteTagline =
  "Da oltre cinquant'anni, punto di riferimento a Pace del Mela per materiali edili, ceramiche e arredo bagno";

export const mainLocation = {
  name: 'Showroom Edil Centro',
  street: 'Via Giovanni Verga, 4',
  cap: '98042',
  city: 'Pace del Mela',
  province: 'ME',
  region: 'Sicilia',
  phone: '090 933194',
  phoneHref: 'tel:+39090933194',
  mobile: '+39 348 868 2559',
  mobileHref: 'tel:+393488682559',
  email: 'info@edil-centro.net',
  emailHref: 'mailto:info@edil-centro.net',
  // Orari non pubblicati sul sito precedente: da confermare con il titolare prima della pubblicazione.
  hours: null as null | { days: string; time: string }[],
  mapsQuery: 'Via Giovanni Verga, 4, 98042 Pace del Mela ME',
  mapsHref: 'https://www.google.com/maps/search/?api=1&query=Via+Giovanni+Verga+4+98042+Pace+del+Mela+ME',
};

export const ferramentaLocation = {
  name: 'Ferramenta Edil Centro',
  street: 'Via Papa Giovanni XXIII, 4',
  cap: '98042',
  city: 'Pace del Mela',
  province: 'ME',
  region: 'Sicilia',
  phone: '090 933447',
  phoneHref: 'tel:+39090933447',
  mobile: '+39 376 073 9206',
  mobileHref: 'tel:+393760739206',
  email: 'info@edil-centro.net',
  emailHref: 'mailto:info@edil-centro.net',
  hours: [
    { days: 'Lunedì – Venerdì', time: '6:30 – 12:30 e 15:00 – 19:00' },
    { days: 'Sabato', time: '6:30 – 12:00' },
    { days: 'Domenica', time: 'Chiuso' },
  ],
  mapsQuery: 'Via Papa Giovanni XXIII, 4, 98042 Pace del Mela ME',
  mapsHref: 'https://www.google.com/maps/search/?api=1&query=Via+Papa+Giovanni+XXIII+4+98042+Pace+del+Mela+ME',
};

export const social = {
  facebook: 'https://www.facebook.com/ceramicheearredobagno',
  instagram: 'https://www.instagram.com/edil_centro.srl/',
};

export const seoDefaults = {
  locale: 'it_IT',
  siteName: 'Edil Centro Srl',
  twitterHandle: undefined as string | undefined,
};
