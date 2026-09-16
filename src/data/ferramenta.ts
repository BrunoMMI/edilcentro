export interface FerramentaSector {
  title: string;
  description: string;
}

/** Settori/categorie del reparto Ferramenta, ripresi dal vecchio sito e riorganizzati. */
export const ferramentaSectors: FerramentaSector[] = [
  {
    title: 'Utensili manuali ed elettrici',
    description: 'Attrezzatura professionale e per il fai da te, per ogni tipo di lavorazione.',
  },
  {
    title: 'Sistemi di fissaggio',
    description: 'Viti, tasselli, bulloneria e ancoraggi per ogni materiale e applicazione.',
  },
  {
    title: 'Prodotti per la manutenzione',
    description: 'Tutto il necessario per la cura e la manutenzione ordinaria di casa e cantiere.',
  },
  {
    title: 'Sigillanti e accessori',
    description: 'Silicone, adesivi e sigillanti per finiture precise e durature.',
  },
  {
    title: 'Materiali per l’edilizia',
    description: 'Prodotti e materiali di base per la costruzione e la ristrutturazione.',
  },
  {
    title: 'Vernici e prodotti per tinteggiatura',
    description: 'Pitture, smalti e accessori per interni ed esterni.',
  },
  {
    title: 'Prodotti per l’idraulica',
    description: 'Componenti e materiali per impianti idraulici civili e industriali.',
  },
  {
    title: 'Attrezzature professionali',
    description: 'Strumenti di livello professionale per imprese edili e artigiani.',
  },
];

export const ferramentaAdvantages: string[] = [
  'Personale competente pronto a consigliare la soluzione più adatta a ogni esigenza',
  'Reparto integrato con pavimenti, rivestimenti e arredo bagno per progetti completi',
  'Sede dedicata e facilmente raggiungibile a Pace del Mela',
  'Prodotti per il professionista e per il fai da te',
];
