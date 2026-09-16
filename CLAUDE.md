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
- Font: Google Fonts (Fraunces per i titoli, Inter per il corpo testo)

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
    brands/        loghi brand, organizzati per categoria prodotto
    ferramenta/     foto reparto ferramenta
    logo/           logo aziendale (svg + png)
    progetti/       render 3D bagni (prefisso "render-bagno-<stile>-NN")
    showroom/       foto reali dello showroom
  components/
    contact/        MapEmbed (mappa Google Maps con caricamento on-click)
    cookie/         CookieConsent (banner + dialog preferenze)
    home/           sezioni della homepage (Hero, Intro, Services, WhyUs, ecc.)
    layout/         Header, Footer
    legal/          LegalLayout (wrapper tipografico per Privacy/Cookie Policy)
    products/       CategorySection, CategoryJumpNav (pagina Prodotti)
    projects/       ProjectGallery (galleria Progetti con filtro + lightbox)
    seo/            Seo.astro (meta tag, canonical, Open Graph)
    ui/             componenti generici (SectionHeading, Breadcrumbs, PageHero)
  data/             fonte di verità per tutti i contenuti (vedi sotto)
  layouts/          BaseLayout.astro (head, Header, Footer, CookieConsent, JSON-LD)
  lib/              schema.ts (helper per i dati strutturati Schema.org)
  pages/            una cartella per rotta (index, prodotti, progetti, ferramenta, contatti,
                     privacy-policy, cookie-policy, 404)
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
- **ProjectGallery.astro**: griglia filtrabile per stile + lightbox accessibile (`<dialog>`,
  navigazione con frecce, tasti ← →, Esc). Logica in `gallery.ts`.
- **MapEmbed.astro**: mostra una "facciata" con bottone; l'iframe di Google Maps viene creato
  solo al click (`map-embed.ts`), per non caricare contenuti di terze parti automaticamente.
- **CategorySection.astro**: blocco per ogni categoria prodotto nella pagina `/prodotti/`
  (immagine, descrizione, loghi brand collegati via `brandGroup`).

## Content

Tutti i contenuti testuali/dati strutturati vivono in `src/data/`, **non** hardcoded nelle
pagine:

- `site.ts` — ragione sociale, sedi (showroom + ferramenta), telefoni, email, social, anno di
  fondazione. **Unica fonte di verità per i dati di contatto.**
- `categories.ts` — le 8 categorie prodotto (testi presi dal file `Categorie.docx` in
  `contenuti/`), con immagine e riferimento al gruppo di brand.
- `brands.ts` — carica automaticamente i loghi da `src/assets/brands/<gruppo>/` via
  `import.meta.glob` e ne deriva il nome dal filename.
- `projects.ts` — carica i render da `src/assets/progetti/` via `import.meta.glob`, deriva stile
  e alt-text dal filename.
- `content.ts` — servizi, punti "perché sceglierci", testimonianze, FAQ.
- `ferramenta.ts` — settori merceologici e vantaggi del reparto ferramenta.
- `nav.ts` — voci di navigazione principali e footer legale.
- `cookie-categories.ts` — categorie cookie (estendibile in futuro).

**Per modificare un testo, un numero di telefono, un orario o aggiungere un brand: modifica
sempre il file in `src/data/`, mai il markup nei componenti/pagine.**

Per aggiungere un nuovo brand: rinomina il logo in kebab-case e copialo nella sottocartella
corretta di `src/assets/brands/`; comparirà automaticamente nella categoria collegata e nella
sezione "Brand" della homepage (deduplicata per nome).

Per aggiungere nuovi render/progetti: copia il file in `src/assets/progetti/` con il nome
`render-bagno-<stile>-NN.jpeg` (lo stile deve corrispondere a uno slug in
`src/data/projects.ts → projectStyles`, oppure aggiungine uno nuovo).

## Styling

Design system centralizzato in `src/styles/global.css`:

- **Colori**: variabili `--color-*`, palette derivata dai colori del logo (blu `#1c5d90`, verde
  `#009845`) reinterpretata con neutri caldi (cemento/pietra/ceramica).
- **Tipografia**: `--font-display` (Fraunces, titoli) e `--font-body` (Inter, testo).
- **Spaziatura**: scala `--space-3xs` → `--space-3xl`.
- **Superfici**: `--radius-*`, `--shadow-*`.
- **Container**: `--container-max` (1320px) e `--container-pad` (clamp responsive).
- Ogni componente ha uno `<style>` scoped Astro; solo variabili/reset/utility globali vivono in
  `global.css`.
- Animazioni "reveal on scroll" via attributo `data-reveal` (+ `data-reveal-index` per lo
  stagger) gestite da `src/scripts/reveal.ts`; rispettano `prefers-reduced-motion`.

⚠️ **Attenzione alla cascata**: il reset globale include `* { margin: 0 }` e regole su
`[hidden]`/`dialog`. Se aggiungi un nuovo `<dialog>` o elementi con toggle `hidden`, verifica che
non vengano sovrascritti da regole di componente con specificità uguale (vedi commit di fix per
`[hidden]` e `dialog { margin: auto }` in questo file).

## SEO

- **Seo.astro**: title, meta description, canonical, Open Graph, Twitter Card. Ogni pagina passa
  `title`, `description`, `path` a `BaseLayout`.
- **Dati strutturati**: `src/lib/schema.ts` genera JSON-LD (Organization/LocalBusiness, WebSite,
  BreadcrumbList). Iniettati in `BaseLayout.astro`. Nessuna recensione/rating fittizia nei dati
  strutturati.
- **Sitemap**: generata automaticamente da `@astrojs/sitemap` (`astro.config.mjs`). Dominio
  configurato in `src/consts.ts` (`SITE_URL`) — **aggiorna questo valore prima del deploy**.
- **robots.txt** e **llms.txt** in `public/`.
- Un solo `<h1>` per pagina (nella hero/PageHero di ciascuna pagina).

## Cookie System

- Nessun cookie di analytics/marketing attualmente in uso (solo cookie tecnici necessari).
- `src/data/cookie-categories.ts` definisce le categorie mostrate nel pannello preferenze:
  aggiungere una categoria qui la rende automaticamente visibile nel dialog e nella tabella della
  Cookie Policy — **non attivare mai uno script di terze parti prima che l'utente abbia dato
  consenso esplicito per la relativa categoria**.
- Stato persistito in `localStorage` sotto la chiave `edilcentro-cookie-consent`.
- Il link "Gestisci preferenze cookie" nel footer riapre il pannello in qualsiasi momento.

## Images

- Le immagini sorgente processate vivono in `src/assets/` e vengono ottimizzate automaticamente
  da `astro:assets` (formati moderni, `widths`/`sizes` responsive, lazy loading di default tranne
  dove `loading="eager"` è esplicitamente richiesto, es. hero above-the-fold).
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
