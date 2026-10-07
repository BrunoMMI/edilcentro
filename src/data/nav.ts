export interface NavLink {
  label: string;
  href: string;
}

export const mainNav: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Prodotti', href: '/prodotti/' },
  { label: 'Showroom', href: '/showroom/' },
  { label: 'Progetti', href: '/progetti/' },
  { label: 'Ferramenta', href: '/ferramenta/' },
  { label: 'Contatti', href: '/contatti/' },
];

export const footerLegalNav: NavLink[] = [
  { label: 'Privacy Policy', href: '/privacy-policy/' },
  { label: 'Cookie Policy', href: '/cookie-policy/' },
];
