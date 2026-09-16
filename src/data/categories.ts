import type { ImageMetadata } from 'astro';

import imgPavimenti from '@assets/progetti/render-bagno-marmo-02.jpeg';
import imgRivestimenti from '@assets/progetti/render-bagno-geometrico-01.jpeg';
import imgSanitari from '@assets/progetti/render-bagno-marmo-01.jpeg';
import imgArredoBagno from '@assets/progetti/render-bagno-cementato-01.jpeg';
import imgRubinetteria from '@assets/showroom/edil-centro-showroom-01.jpg';
import imgTermoarredo from '@assets/progetti/render-bagno-pennellata-01.jpeg';
import imgSpazioDoccia from '@assets/progetti/render-bagno-cementato-02.jpeg';
import imgSpazioVasca from '@assets/progetti/render-bagno-marmo-04.jpeg';

export interface ProductCategory {
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  image: ImageMetadata;
  brandGroup: string;
}

/**
 * Testi descrittivi presi verbatim (con correzione minima di refusi) dal file
 * "Categorie.docx" fornito nella cartella Contenuti — fonte più aggiornata
 * rispetto al vecchio sito.
 */
export const categories: ProductCategory[] = [
  {
    slug: 'pavimenti',
    title: 'Pavimenti',
    shortDescription: 'Gres e piastrelle per ogni ambiente, tra creatività e tecnologia.',
    description:
      "Vi proponiamo una vasta gamma di pavimenti per la casa. Il nuovissimo assortimento di piastrelle è sinonimo di creatività e tecnologia avanzata. Rinnova i tuoi ambienti, dal salone al bagno, con la nostra gamma esclusiva e di classe di pavimenti. Da noi puoi trovare categorie adatte a ogni esigenza. I pavimenti di queste gamme sono disponibili in diversi colori, motivi e dimensioni, per dare al tuo spazio un aspetto sorprendente. Le nostre collezioni sono proposte sia in finitura lucida che opaca, e in una varietà di materiali per soddisfare ogni gusto e stile.",
    image: imgPavimenti,
    brandGroup: 'pavimenti-rivestimenti',
  },
  {
    slug: 'rivestimenti',
    title: 'Rivestimenti',
    shortDescription: 'Ceramiche versatili che valorizzano lo stile di ogni parete.',
    description:
      'I rivestimenti sono il punto focale di ogni abitazione. I rivestimenti selezionati da Edil Centro sono versatili e possono essere utilizzati in molti modi diversi. Grazie alle loro particolarità ti offrono la completa libertà di scatenare la tua immaginazione, creando il tuo spazio su misura. Queste piastrelle, moderne ed eleganti, arricchiscono squisitamente ogni ambiente, valorizzando lo stile della tua casa.',
    image: imgRivestimenti,
    brandGroup: 'pavimenti-rivestimenti',
  },
  {
    slug: 'sanitari',
    title: 'Sanitari',
    shortDescription: 'Lavabi e sanitari in ceramica o resina, per un bagno di comfort.',
    description:
      "Lavabi, sanitari tradizionali, sospesi, filo-muro e accessori per l'installazione: i nostri sanitari selezionati sono pensati per donare al tuo bagno uno spazio di lusso e comfort. Da noi trovi una grande varietà di modelli tra cui scegliere. La ceramica è il materiale più diffuso per l'arredo bagno, ma non mancano soluzioni in resina, un materiale altrettanto apprezzato per durata ed estetica. Le nostre proposte includono sanitari con copri wc classico oppure con chiusura rallentata soft-close, insieme a una vasta gamma di accessori per l'installazione.",
    image: imgSanitari,
    brandGroup: 'sanitari',
  },
  {
    slug: 'arredo-bagno',
    title: 'Arredo Bagno',
    shortDescription: 'Mobili, specchi e complementi dal design ricercato ed essenziale.',
    description:
      "Nella scelta del mobilio per il bagno sono tanti i criteri da tenere in considerazione, quali la praticità, l'eleganza, la semplicità e soprattutto la qualità dei componenti utilizzati. L'esperienza Edil Centro seleziona e consiglia ai propri clienti una vasta serie di mobili per il bagno, dal design ricercato e dalle linee essenziali e raffinate. Dai mobili ai piani per lavabo, dagli specchi alle appliques, dagli armadi alle colonne fino ai piatti doccia, Edil Centro propone e accompagna il cliente nella valutazione di ogni aspetto legato alla scelta di ogni singolo elemento utile a realizzare l'angolo bagno ideale.",
    image: imgArredoBagno,
    brandGroup: 'arredo-bagno',
  },
  {
    slug: 'rubinetteria',
    title: 'Rubinetteria',
    shortDescription: 'Rubinetti funzionali dal design senza tempo per ogni ambiente bagno.',
    description:
      "Un rubinetto, oltre che bello, deve essere funzionale e perfettamente integrato nell'ambiente. Le rubinetterie giocano un ruolo decisivo in ogni bagno. Ogni giorno devono svolgere la loro funzione e dimostrare la loro durata e resistenza. Dal primo momento in poi, e per molti anni a seguire, il design senza tempo della loro forma squisita deve essere fonte di gioia. Con le sue numerose innovazioni e la varietà di design, i nostri rubinetti trovano la loro casa in innumerevoli bagni da sogno. Immergiti nell'affascinante mondo dei rubinetti selezionati da Edil Centro per lavabi, docce, vasche da bagno o bidet.",
    image: imgRubinetteria,
    brandGroup: 'rubinetteria',
  },
  {
    slug: 'termoarredo',
    title: 'Termoarredo',
    shortDescription: 'Scaldasalviette e radiatori d’arredo, tra funzionalità e design.',
    description:
      'Il termoarredo unisce funzionalità e design, diventando un elemento fondamentale nell’arredamento del bagno. Le soluzioni proposte da Edil Centro offrono un perfetto equilibrio tra riscaldamento efficiente ed estetica raffinata. Ogni ambiente può essere valorizzato con termoarredi eleganti, dalle linee moderne o classiche, pensati per riscaldare e decorare allo stesso tempo.',
    image: imgTermoarredo,
    brandGroup: 'termoarredo',
  },
  {
    slug: 'spazio-doccia',
    title: 'Spazio Doccia',
    shortDescription: 'Box doccia e soluzioni su misura per un momento di puro benessere.',
    description:
      "L'angolo più intimo della casa merita un'attenzione speciale. Ogni ambiente richiede soluzioni personalizzate. La gamma degli spazi doccia selezionata da Edil Centro è disponibile in varie forme e dimensioni. Ogni linea offre una varietà di opzioni di installazione, adattandosi perfettamente a qualsiasi esigenza. Seleziona la tua gamma, per trasformare la doccia in un momento quotidiano di puro benessere.",
    image: imgSpazioDoccia,
    brandGroup: 'arredo-bagno',
  },
  {
    slug: 'spazio-vasca',
    title: 'Spazio Vasca',
    shortDescription: 'Vasche che uniscono comfort, eleganza e relax domestico.',
    description:
      'La vasca da bagno rappresenta il simbolo del relax domestico. Edil Centro propone una selezione di vasche che uniscono comfort, eleganza e funzionalità. Che tu preferisca uno stile moderno o più tradizionale, troverai la soluzione perfetta per trasformare il tuo bagno in una vera oasi di benessere. Materiali resistenti, forme ergonomiche e attenzione al dettaglio rendono ogni vasca un elemento protagonista del tuo spazio.',
    image: imgSpazioVasca,
    brandGroup: 'arredo-bagno',
  },
];
