# CLAUDE.md

Documentazione operativa del progetto per sessioni future con Claude Code.

## Project Overview

Sito web di **Edil Centro Srl**, rivenditore di materiali edili, ceramiche, sanitari e arredo
bagno con sede a Pace del Mela (ME), attivo dal 1969 (a partire dalla storica attività
"Ceramiche Valenti"). Il sito comprende anche un reparto **Ferramenta** con sede distinta.

Questo sito sostituisce integralmente il precedente (`edilcentrosrl.info`, WordPress). È stato
ricostruito da zero con Astro come sito statico, con un nuovo design editoriale/premium ispirato
al mondo dell'architettura e dello showroom di ceramiche, mantenendo tutte le informazioni
aziendali reali (contatti, sedi, orari, brand, categorie prodotto) recuperate dal vecchio sito e
dalla cartella `contenuti/` fornita dal titolare.

## Stack

- **Astro 7** (output statico, `output: 'static'`)
- **TypeScript** (strict, via `astro/tsconfigs/strict`)
- **@astrojs/sitemap** per la sitemap XML
- CSS puro (variabili CSS, nessun framework tipo Tailwind/Bootstrap)
- JavaScript vanilla per le interazioni (nessuna libreria frontend pesante)
- Font **self-hosted** in `public/fonts/` (Bricolage Grotesque per i titoli, Figtree per il corpo testo): nessuna richiesta a Google Fonts

## Commands

```bash
npm install       # installa le dipendenze
npm run dev       # avvia il server di sviluppo (http://localhost:4321)
npm run build     # esegue "astro check" (type-check) + build statica in dist/
npm run preview   # serve la build di dist/ in locale per verifica pre-deploy
```

Esegui sempre `npm run build` prima di considerare concluso un intervento: deve terminare senza
errori né warning.

## Project Structure

```
src/
  assets/          immagini sorgente (ottimizzate da astro:assets in fase di build)
    brands/        loghi brand, organizzati per gruppo (arredo-bagno, pavimenti-rivestimenti, rubinetteria, sanitari, termoarredo)
    ferramenta/     foto reparto ferramenta
    logo/           logo-full.svg (tetto + scritta + payoff), logo-wordmark.svg (scritta + rombo, usato nell'header), logo-edilcentro.svg (originale)
    progetti/       render 3D bagni (prefisso "render-bagno-<stile>-NN"): SOLO per la pagina /progetti/
    showroom/       21 foto reali del locale (edil-centro-showroom-<slug>.jpg, 2200px)
  components/
    contact/        MapEmbed (mappa Google Maps con caricamento on-click)
    cookie/         CookieConsent (banner + dialog preferenze)
    home/           sezioni della homepage (Hero, Intro, Services, WhyUs, ecc.)
    layout/         Header, Footer
    legal/          LegalLayout (wrapper tipografico per Privacy/Cookie Policy)
    products/       CategorySection, CategoryJumpNav (pagina Prodotti: testo + griglia loghi, nessuna foto)
    seo/            Seo.astro (meta tag, canonical, Open Graph)
    ui/             SectionHeading, Breadcrumbs, PageHero (variante con foto), RoofRule, Gallery (galleria + lightbox, usata da Progetti e Showroom)
  data/             fonte di verità per tutti i contenuti (vedi sotto)
  layouts/          BaseLayout.astro (head, Header, Footer, CookieConsent, JSON-LD)
  lib/              schema.ts (helper per i dati strutturati Schema.org)
  pages/            una cartella per rotta (index, prodotti, progetti, ferramenta, contatti,
                     showroom, privacy-policy, cookie-policy, 404)
  scripts/          script client-side importati dai componenti (reveal, header, cookie-consent,
                     gallery, counters, map-embed)
  styles/           global.css (design system: variabili, reset, tipografia, utility)
public/             favicon, manifest, robots.txt, llms.txt, immagini OG
contenuti/          materiale sorgente originale fornito dal titolare (foto alta risoluzione,
                     HEIC, logo vettoriale, docx categorie). NON referenziato direttamente dal
                     sito: le immagini usate sono copiate/rinominate in src/assets.
```

## Components

- **Header.astro**: sticky, cambia stile allo scroll, menu mobile fullscreen (`header.ts`).
- **CookieConsent.astro**: banner + `<dialog>` preferenze, categorie definite in
  `src/data/cookie-categories.ts` (oggi solo "necessari"). Logica in `cookie-consent.ts`,
  persistenza in `localStorage` (`edilcentro-cookie-consent`).
- **Gallery.astro**: griglia (con filtri opzionali per gruppo) + lightbox accessibile (`<dialog>`,
  frecce, tasti ← →, Esc). Logica in `gallery.ts`; il filtro iniziale si può passare via hash
  (`/progetti/#marmo`).
- **MapEmbed.astro**: mostra una "facciata" con bottone; l'iframe di Google Maps viene creato
  solo al click (`map-embed.ts`), per non caricare contenuti di terze parti automaticamente.
- **CategorySection.astro**: blocco per ogni categoria in `/prodotti/` (descrizione + tutti i loghi
  dei marchi collegati via `brandGroup`). Le categorie NON hanno foto.

## Content

Tutti i contenuti testuali/dati strutturati vivono in `src/data/`, **non** hardcoded nelle
pagine:

- `site.ts` — ragione sociale, sedi (showroom + ferramenta), telefoni, email, social, anno di
  fondazione. **Unica fonte di verità per i dati di contatto.**
- `categories.ts` — le 8 categorie prodotto (testi dal file `Categorie.docx`), con riferimento al
  gruppo di brand (nessuna immagine).
- `showroom.ts` — elenco delle foto del locale con alt text; `showroomPhoto('slug')` le recupera.
- `brands.ts` — carica automaticamente i loghi da `src/assets/brands/<gruppo>/` via
  `import.meta.glob` e ne deriva il nome dal filename.
- `projects.ts` — carica i render da `src/assets/progetti/` via `import.meta.glob`, deriva stile
  e alt-text dal filename. **I render 3D vanno usati solo in `/progetti/`**, mai in home o altrove.
- `content.ts` — servizi, punti "perché sceglierci", testimonianze, FAQ.
- `ferramenta.ts` — settori merceologici e vantaggi del reparto ferramenta.
- `nav.ts` — voci di navigazione principali e footer legale.
- `cookie-categories.ts` — categorie cookie con elenco degli strumenti (`items`): alimenta sia il
  pannello preferenze sia la tabella della Cookie Policy.

**Per modificare un testo, un numero di telefono, un orario o aggiungere un brand: modifica
sempre il file in `src/data/`, mai il markup nei componenti/pagine.**

Per aggiungere un nuovo brand: rinomina il logo in kebab-case e copialo nella sottocartella
corretta di `src/assets/brands/`; comparirà automaticamente nella categoria collegata e nella
sezione "Brand" della homepage (deduplicata per nome).

Per aggiungere nuovi render/progetti: copia il file in `src/assets/progetti/` con il nome
`render-bagno-<stile>-NN.jpeg` (lo stile deve corrispondere a uno slug in
`src/data/projects.ts → projectStyles`, oppure aggiungine uno nuovo).

## Styling

Design system "Arco" in `src/styles/global.css`: forme morbide e moderne, ma con gli stessi colori del
logo. Archi (`.arch`, finestra/specchio), forme "foglia" (`.leaf`, angoli opposti), pulsanti e
chip a pillola, header fluttuante a pillola, pannelli a tutta larghezza che rientrano dai bordi
(`--panel-inset`, `--radius-xl`), ombre profonde e delicate, sfumature blu/verde sui pannelli scuri.
Evita di tornare a spigoli vivi o bordi netti: usa sempre i token `--radius-*`.

- **Colori**: variabili `--color-*`; blu `#1c5d90` e verde `#009845` del logo, navy `#0d2c46` per le
  superfici scure, neutri freddi (porcellana/gres). Il verde per il testo è `--color-accent-dark`.
- **Tipografia**: `--font-display` (Bricolage Grotesque, titoli in grassetto condensato) e
  `--font-body` (Figtree). File woff2 in `public/fonts/` con `@font-face` in `global.css`.
- **Griglie**: classe `.tile-grid` (gap = `--grout`, 14px) + moduli bianchi arrotondati con `--shadow-sm`.
- **Logo**: header = `logo-wordmark.svg` (62px di altezza, 46px su mobile); footer = `logo-full.svg`
  su riquadro bianco. Gli SVG sono ritagliati dall'originale (viewBox stretta).
- Nessun "eyebrow" maiuscolo sopra i titoli: i titoli devono reggersi da soli.
- Ogni componente ha uno `<style>` scoped Astro; solo variabili/reset/utility globali in `global.css`.
- Animazioni "reveal on scroll" via `data-reveal` (+ `data-reveal-index`), `reveal.ts`; rispettano
  `prefers-reduced-motion`.
- Breakpoint usati: 1100px (griglie a 2 colonne), 1080px (menu mobile), 900px (impilamento),
  560px (1 colonna / telefono).

⚠️ **Attenzione alla cascata**: il reset globale include `* { margin: 0 }` e regole su
`[hidden]`/`dialog`. Se aggiungi un nuovo `<dialog>` o elementi con toggle `hidden`, verifica che
non vengano sovrascritti da regole di componente con specificità uguale.

## SEO e GEO

- **Seo.astro**: title, meta description, canonical, robots (`max-image-preview:large`), Open Graph,
  Twitter Card, `geo.region`/`geo.placename` (IT-ME, Pace del Mela). Ogni pagina passa `title`,
  `description`, `path` a `BaseLayout` (opzionali `image`, `breadcrumbs`, `jsonLd`).
- **Dati strutturati** (`src/lib/schema.ts`, iniettati da `BaseLayout`): showroom come
  `HomeAndConstructionBusiness`/`Store` (catalogo `hasOfferCatalog`, `areaServed`, `foundingDate`),
  Ferramenta come `HardwareStore` con `openingHoursSpecification`, `WebSite`, `BreadcrumbList`;
  `FAQPage` in home; `CollectionPage`/`ImageGallery` in Prodotti, Progetti, Showroom.
  Nessuna recensione/rating fittizio e nessuna coordinata geografica non verificata.
- **Sitemap**: `@astrojs/sitemap` genera `sitemap-index.xml` + `sitemap-0.xml`. Dominio in
  `src/consts.ts` (`SITE_URL`): **aggiornalo prima del deploy** (anche in `public/robots.txt`).
- **robots.txt** ammette esplicitamente i crawler AI (GPTBot, ClaudeBot, PerplexityBot, ecc.).
- **llms.txt** (`public/llms.txt`): riassunto per i motori generativi (sedi, orari, marchi, pagine).
  Tienilo allineato a `src/data/` quando cambiano contatti, orari o marchi.
- `og-default.jpg` (1200x630) e `logo.png` (512x512) in `public/`.
- Un solo `<h1>` per pagina (nella hero/PageHero), meta description univoca, breadcrumb coerenti.
- `vercel.json`: header di sicurezza e cache dei font.

## Cookie System

- Nessun cookie di analytics/marketing attualmente in uso (solo cookie tecnici necessari).
- `src/data/cookie-categories.ts` definisce le categorie mostrate nel pannello preferenze:
  aggiungere una categoria qui la rende automaticamente visibile nel dialog e nella tabella della
  Cookie Policy — **non attivare mai uno script di terze parti prima che l'utente abbia dato
  consenso esplicito per la relativa categoria**.
- Stato persistito in `localStorage` sotto la chiave `edilcentro-cookie-consent` (elencata in
  `cookie-categories.ts` e quindi nella Cookie Policy).
- Il link "Preferenze cookie" nel footer (e il pulsante nella Cookie Policy) riapre il pannello.
- Banner: "Accetta tutti" e "Solo necessari" hanno lo stesso peso visivo.
- I font sono self-hosted e la mappa Google si carica solo al click: se aggiungi servizi di terze
  parti aggiorna Privacy Policy e Cookie Policy.

## Images

- Le immagini sorgente processate vivono in `src/assets/` e vengono ottimizzate automaticamente
  da `astro:assets` (formati moderni, `widths`/`sizes` responsive, lazy loading di default tranne
  dove `loading="eager"` è esplicitamente richiesto, es. hero above-the-fold).
- Le foto del locale in `src/assets/showroom/` sono già ridimensionate a 2200px (JPEG q80) dagli
  originali di `contenuti/Foto Locale Edil Centro srl/`.
- **Non forzare `width` e `height` insieme su un'immagine con aspect ratio sconosciuto/variabile**
  (es. loghi brand): Astro ridimensiona forzando quelle proporzioni esatte, causando crop
  indesiderati. Specifica solo `height` (o solo `width`) e lascia che Astro calcoli l'altro lato
  in proporzione; usa `widths`/`sizes` per le immagini a piena larghezza.
- La cartella `contenuti/` contiene i file originali (alta risoluzione, HEIC, docx) e non è
  referenziata dal sito: è materiale di archivio per eventuali future modifiche.

## Deployment

1. Crea un repository GitHub e fai push del progetto (la cartella `contenuti/` può restare
   fuori dal repository se non necessaria in produzione — vedi nota in `.gitignore`).
2. Importa il repository su [Vercel](https://vercel.com/new): Vercel riconosce automaticamente
   Astro, non è necessaria configurazione aggiuntiva (output statico, nessun adapter server).
3. Prima del primo deploy in produzione, aggiorna `SITE_URL` in `src/consts.ts` con il dominio
   definitivo (necessario per canonical, Open Graph, sitemap, robots.txt).
4. Verifica in `robots.txt` (`public/robots.txt`) che l'URL della sitemap corrisponda al dominio
   definitivo.

## Development Rules

- Non duplicare componenti: riusa quelli in `src/components/ui` e `src/components/home` prima di
  crearne di nuovi.
- Non inventare dati aziendali (indirizzi, telefoni, orari, anni di esperienza, brand,
  recensioni): ogni dato deve essere verificabile dal vecchio sito o dalla cartella `contenuti/`.
  Vedi sezione "Dati da verificare" sotto per i punti ancora aperti.
- Mantieni il sito responsive (mobile-first) e accessibile (focus visibile, contrasto, target
  touch ≥44px, `prefers-reduced-motion` rispettato).
- Mantieni la SEO: un solo `<h1>` per pagina, meta description univoca, breadcrumb coerenti.
- Usa sempre gli asset in `src/assets/` (derivati da `contenuti/`) prima di considerare immagini
  stock.
- Evita dipendenze npm non necessarie: il sito è volutamente leggero (solo Astro +
  `@astrojs/sitemap`).
- **Esegui sempre `npm run build` prima di considerare terminato un intervento** e assicurati che
  finisca senza errori/warning (`astro check` è incluso nello script `build`).

## Dati da verificare (a cura del titolare)

Questi punti sono stati lasciati intenzionalmente incompleti o segnalati nel sito perché non
verificabili dal vecchio sito o dalla cartella `contenuti/`:

- **Orari di apertura dello showroom principale** (Via Giovanni Verga 4): non pubblicati sul
  vecchio sito. Attualmente non mostrati in `/contatti/` per non inventarli
  (`src/data/site.ts → mainLocation.hours = null`). Se disponibili, aggiungerli in quel campo
  nello stesso formato usato per `ferramentaLocation.hours`.
- **P.IVA / numero REA**: non presenti sul vecchio sito (i link Privacy/Cookie erano rotti).
  Segnalato con un callout visibile in cima a `/privacy-policy/`.
- **Testimonianze homepage** (Francesco L., Giulia M., Elisa V.): presenti sul vecchio sito ma
  senza collegamento a una piattaforma di recensioni verificabile (Google, Trustpilot, ecc.).
  Riportate in `src/data/content.ts` con nota nei commenti; da confermare con il titolare prima
  della pubblicazione definitiva, o da sostituire con recensioni reali linkate a Google Business
  Profile.
- **WhatsApp**: non è stato aggiunto un pulsante WhatsApp nella pagina Contatti perché non era
  chiaro dal vecchio sito se il numero cellulare fosse effettivamente utilizzato per WhatsApp
  Business. Se confermato, aggiungere un link `https://wa.me/<numero>` accanto ai pulsanti
  "Chiama"/"Scrivi una email" in `src/pages/contatti/index.astro`.
