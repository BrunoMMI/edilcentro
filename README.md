# Edil Centro Srl — Sito Web

Sito web ufficiale di Edil Centro Srl, rivenditore di materiali edili, ceramiche, sanitari e
arredo bagno a Pace del Mela (ME), attivo dal 1969. Include il reparto Ferramenta con sede
distinta.

Realizzato con [Astro](https://astro.build) come sito statico, ottimizzato per performance e SEO,
pronto per il deploy su [Vercel](https://vercel.com).

## Requisiti

- [Node.js](https://nodejs.org) 20 o superiore
- npm 10 o superiore

## Installazione

```bash
npm install
```

## Sviluppo locale

```bash
npm run dev
```

Il sito sarà disponibile su [http://localhost:4321](http://localhost:4321).

## Build di produzione

```bash
npm run build
```

Esegue il type-check (`astro check`) e genera la build statica nella cartella `dist/`.

## Anteprima della build

```bash
npm run preview
```

Serve in locale il contenuto di `dist/` per verificare la build prima del deploy.

## Deploy

Il progetto è pensato per essere pubblicato su GitHub e importato direttamente su
[Vercel](https://vercel.com/new): Astro viene riconosciuto automaticamente, l'output è statico e
non richiede adapter server.

Prima del deploy in produzione, aggiorna il dominio definitivo in `src/consts.ts`
(`SITE_URL`), usato per canonical URL, Open Graph e sitemap.

## Struttura del progetto

```
src/
  assets/       immagini sorgente (ottimizzate automaticamente in build)
  components/   componenti Astro riutilizzabili
  data/         contenuti e dati aziendali (fonte di verità)
  layouts/      layout di base della pagina
  lib/          helper (dati strutturati SEO)
  pages/        rotte del sito
  scripts/      script client-side
  styles/       design system (variabili CSS, reset, utility)
public/         asset statici (favicon, robots.txt, manifest, ecc.)
contenuti/      materiale sorgente originale fornito dal titolare
```

Per la documentazione operativa completa (dove modificare contenuti, sistema cookie, SEO,
regole di sviluppo) vedi [`CLAUDE.md`](./CLAUDE.md).

## Licenza

Tutti i diritti riservati — Edil Centro Srl.
