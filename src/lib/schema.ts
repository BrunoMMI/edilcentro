import { SITE_URL } from '@/consts';
import { mainLocation, ferramentaLocation, social, companyLegalName, foundedYear } from '@data/site';
import { categories } from '@data/categories';

/**
 * Helper per generare dati strutturati Schema.org (JSON-LD).
 * Vengono inserite solo informazioni verificabili: nessuna recensione/valutazione
 * aggregata fittizia, nessuna coordinata geografica non confermata.
 */

const ORG_ID = `${SITE_URL}/#organization`;
const HARDWARE_ID = `${SITE_URL}/#ferramenta`;

const address = (loc: typeof mainLocation | typeof ferramentaLocation) => ({
  '@type': 'PostalAddress',
  streetAddress: loc.street,
  addressLocality: loc.city,
  addressRegion: loc.region,
  postalCode: loc.cap,
  addressCountry: 'IT',
});

const e164 = (href: string) => href.replace('tel:', '');

/** Showroom: attività principale, con catalogo prodotti e zona servita. */
export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['HomeAndConstructionBusiness', 'Store'],
    '@id': ORG_ID,
    name: companyLegalName,
    alternateName: ['Edil Centro', 'Ceramiche Valenti'],
    description:
      'Showroom di ceramiche, pavimenti, rivestimenti, sanitari, arredo bagno e rubinetteria a Pace del Mela (Messina), con reparto ferramenta. Attivo dal 1969.',
    url: SITE_URL,
    logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png`, width: 512, height: 512 },
    image: [`${SITE_URL}/og-default.jpg`],
    foundingDate: String(foundedYear),
    telephone: [e164(mainLocation.phoneHref), e164(mainLocation.mobileHref)],
    email: mainLocation.email,
    address: address(mainLocation),
    hasMap: mainLocation.mapsHref,
    areaServed: [
      { '@type': 'City', name: 'Pace del Mela' },
      { '@type': 'AdministrativeArea', name: 'Provincia di Messina' },
    ],
    knowsAbout: categories.map((c) => c.title),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Prodotti Edil Centro',
      url: `${SITE_URL}/prodotti/`,
      itemListElement: categories.map((c) => ({
        '@type': 'OfferCatalog',
        name: c.title,
        description: c.shortDescription,
        url: `${SITE_URL}/prodotti/#${c.slug}`,
      })),
    },
    department: { '@id': HARDWARE_ID },
    sameAs: [social.facebook, social.instagram],
  };
}

/** Reparto Ferramenta: sede distinta, con orari di apertura verificati. */
export function ferramentaSchema() {
  const days = (list: string[], opens: string, closes: string) => ({
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: list,
    opens,
    closes,
  });

  return {
    '@context': 'https://schema.org',
    '@type': 'HardwareStore',
    '@id': HARDWARE_ID,
    name: ferramentaLocation.name,
    url: `${SITE_URL}/ferramenta/`,
    image: `${SITE_URL}/og-default.jpg`,
    telephone: [e164(ferramentaLocation.phoneHref), e164(ferramentaLocation.mobileHref)],
    email: ferramentaLocation.email,
    address: address(ferramentaLocation),
    hasMap: ferramentaLocation.mapsHref,
    parentOrganization: { '@id': ORG_ID },
    openingHoursSpecification: [
      days(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], '06:30', '12:30'),
      days(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], '15:00', '19:00'),
      days(['Saturday'], '06:30', '12:00'),
    ],
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: companyLegalName,
    url: SITE_URL,
    inLanguage: 'it-IT',
    publisher: { '@id': ORG_ID },
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}
