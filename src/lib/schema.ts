import { SITE_URL } from '@/consts';
import { mainLocation, social, companyLegalName } from '@data/site';

/**
 * Helper per generare dati strutturati Schema.org.
 * Vengono inserite solo informazioni verificabili: nessuna recensione/valutazione
 * aggregata fittizia, nessuna coordinata geografica non confermata.
 */

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    name: companyLegalName,
    url: SITE_URL,
    logo: `${SITE_URL}/og-default.jpg`,
    image: `${SITE_URL}/og-default.jpg`,
    telephone: mainLocation.phoneHref.replace('tel:', ''),
    email: mainLocation.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: mainLocation.street,
      addressLocality: mainLocation.city,
      addressRegion: mainLocation.region,
      postalCode: mainLocation.cap,
      addressCountry: 'IT',
    },
    areaServed: {
      '@type': 'City',
      name: 'Pace del Mela',
    },
    sameAs: [social.facebook, social.instagram],
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: companyLegalName,
    url: SITE_URL,
    inLanguage: 'it-IT',
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
