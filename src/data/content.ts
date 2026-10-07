export interface Service {
  title: string;
  description: string;
  icon: 'consulenza' | 'consegna' | 'render' | 'assistenza';
}

/** Servizi reali elencati sul vecchio sito, riformulati in modo più editoriale. */
export const services: Service[] = [
  {
    title: 'Consulenza personalizzata',
    description:
      'In showroom un team esperto ti guida passo dopo passo nella scelta di materiali, colori e finiture più adatti al tuo progetto.',
    icon: 'consulenza',
  },
  {
    title: 'Render 3D su misura',
    description:
      "Prima di acquistare, visualizza in anteprima il tuo bagno o ambiente con render fotorealistici pensati sulle tue misure e sui tuoi gusti.",
    icon: 'render',
  },
  {
    title: 'Ritiro in negozio o consegna',
    description:
      'Organizza il ritiro diretto in showroom oppure richiedi la consegna a domicilio dei materiali acquistati.',
    icon: 'consegna',
  },
  {
    title: 'Assistenza post-vendita',
    description:
      'Il supporto di Edil Centro non finisce con l’acquisto: siamo a disposizione per manutenzione e assistenza sui prodotti forniti.',
    icon: 'assistenza',
  },
];

export interface WhyUsPoint {
  title: string;
  description: string;
}

export const whyUsPoints: WhyUsPoint[] = [
  {
    title: 'Esperienza dal 1969',
    description:
      'Oltre cinquant’anni di attività nel settore dei materiali edili, delle ceramiche e dell’arredo bagno, a partire dalla storica esperienza di Ceramiche Valenti.',
  },
  {
    title: 'Un unico punto di riferimento',
    description:
      'Materiali edili, ceramiche, arredo bagno e reparto ferramenta sotto lo stesso tetto, per seguire l’intero progetto senza doversi rivolgere altrove.',
  },
  {
    title: 'Decine di brand selezionati',
    description:
      'Un ampio ventaglio di marchi italiani ed europei per pavimenti, rivestimenti, sanitari, rubinetteria e complementi d’arredo.',
  },
  {
    title: 'Progettazione con render 3D',
    description:
      'Visualizza il risultato prima di iniziare i lavori grazie ai render realizzati su misura per ambienti residenziali.',
  },
];

export interface Testimonial {
  name: string;
  role: string;
  quote: string;
}

/**
 * Testimonianze presenti sul sito precedente (edilcentrosrl.info), riportate qui
 * per completezza. Fonte e autenticità non verificabili in modo indipendente
 * (nessun collegamento a piattaforma recensioni pubblica): da confermare con il
 * titolare prima della pubblicazione definitiva. Vedi CLAUDE.md.
 */
export const testimonials: Testimonial[] = [
  {
    name: 'Francesco L.',
    role: 'Cliente',
    quote:
      'Mi sono rivolto a Edil Centro per la ristrutturazione completa della mia casa: staff preparato, guida passo passo nella scelta dei materiali e prezzi competitivi.',
  },
  {
    name: 'Giulia M.',
    role: 'Cliente',
    quote:
      'Grazie ai render 3D realizzati dal team sono riuscita a visualizzare in anticipo il risultato, con grande cura nella scelta di piastrelle e sanitari.',
  },
  {
    name: 'Elisa V.',
    role: 'Cliente',
    quote:
      'Non sapevo da dove iniziare per ristrutturare il mio appartamento: in negozio mi hanno dedicato tempo e consigli su misura per colori, superfici e finiture.',
  },
];

export interface FaqItem {
  question: string;
  answer: string;
}

/** FAQ costruite solo su informazioni realmente disponibili (nessun dato inventato). */
export const faqItems: FaqItem[] = [
  {
    question: 'Dove si trova lo showroom di Edil Centro?',
    answer:
      'Lo showroom si trova in Via Giovanni Verga 4, a Pace del Mela (ME). Il reparto Ferramenta ha sede distinta in Via Papa Giovanni XXIII 4, sempre a Pace del Mela.',
  },
  {
    question: 'È possibile richiedere un render 3D prima di acquistare?',
    answer:
      'Sì. Il team di Edil Centro realizza render 3D su misura per aiutarti a visualizzare in anteprima il tuo bagno o ambiente prima di procedere con i lavori.',
  },
  {
    question: 'Quali categorie di prodotti tratta Edil Centro?',
    answer:
      'Pavimenti, rivestimenti, sanitari, arredo bagno, rubinetteria, termoarredo, spazio doccia e spazio vasca, oltre al reparto ferramenta per utensili e materiali per l’edilizia.',
  },
  {
    question: 'Quali marchi trovo da Edil Centro?',
    answer:
      'Lo showroom tratta decine di marchi italiani ed europei: per pavimenti e rivestimenti, tra gli altri, Casalgrande Padana, Rak Ceramica, Panaria Group, Ceramica Rondine e Supergres; per sanitari Cielo, Vitra e Geberit; per rubinetteria Cristina, Effepi e Palazzini; per arredo bagno Azzurra e Colavene.',
  },
  {
    question: 'Vendete anche a imprese e professionisti?',
    answer:
      'Sì. Edil Centro fornisce materiali edili e soluzioni per la ristrutturazione sia a privati sia a imprese edili e artigiani, con il reparto Ferramenta dedicato agli strumenti e ai materiali di cantiere.',
  },
  {
    question: 'Quali sono gli orari della Ferramenta?',
    answer:
      'Il reparto Ferramenta è aperto dal lunedì al venerdì dalle 6:30 alle 12:30 e dalle 15:00 alle 19:00, il sabato dalle 6:30 alle 12:00; la domenica è chiuso.',
  },
  {
    question: 'È previsto il ritiro in negozio o la consegna a domicilio?',
    answer:
      'Entrambe le opzioni sono disponibili: puoi ritirare i materiali direttamente in showroom oppure richiedere la consegna a domicilio.',
  },
];
