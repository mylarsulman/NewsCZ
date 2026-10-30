# News Aggregator – Moderní statický český news web

Moderní替代方案 pro WordPress + pluginy. Statický web generovaný z RSS feedů, nasazený zdarma na GitHub Pages / Cloudflare Pages / Netlify.

## 🎯 Funkce

- **Hourly updates** – GitHub Actions cron jede každou hodinu v 5. minutě
- **24+ českých zdrojů** – iDNES, Novinky, Aktuálně, Seznam Zprávy, Deník N, Reflex, Echo24, Root, Lupa, HN, E15, BBC, Sport.cz a další
- **6 kategorií** – Domov, Svět, Sport, Ekonomika, Tech, Kultura
- **Statický web** – žádná databáze, žádný PHP, rychlost < 100ms TTFB
- **Responzivní design** – mobile-first, dark mode, přístupnost (WCAG AA)
- **RSS výstup** – pro čtečky
- **Zero cost** – hosting zdarma navždy

## 🚀 Rychlý start

```bash
# Klonování
git clone https://github.com/VASE_UCET/news-aggregator.git
cd news-aggregator

# Instalace
npm install

# Jednorázový build (scrape + generate + build)
npm run full-build

# Vývojový server
npm run dev
```

## 📁 Struktura projektu

```
news-aggregator/
├── .github/workflows/deploy.yml   # CI/CD – hourly build & deploy
├── scripts/
│   ├── scrape-feeds.js            # Stahuje RSS feeds
│   └── generate-pages.js          # Generuje Astro stránky
├── src/
│   ├── data/feeds.js              # Konfigurace RSS zdrojů
│   ├── layouts/Layout.astro       # Hlavní layout (header, nav, footer)
│   ├── components/
│   │   └── ArticleList.astro      # Seznam článků (grid)
│   ├── pages/
│   │   ├── index.astro            # Domovská stránka
│   │   ├── domaci.astro           # Kategorie
│   │   ├── zahranici.astro
│   │   ├── sport.astro
│   │   ├── ekonomika.astro
│   │   ├── tech.astro
│   │   └── kultura.astro
│   └── content/data/              # Generovaná JSON data
├── astro.config.mjs
└── package.json
```

## ⚙️ Konfigurace zdrojů

Upravte `src/data/feeds.js` – přidejte/odeberte RSS feedy:

```javascript
export const FEEDS = [
  { name: 'Nový zdroj', category: 'domaci', url: 'https://example.com/rss' },
  // ...
];
```

Kategorie musí odpovídat `CATEGORIES` poli.

## 🔄 Jak to funguje

1. **GitHub Actions** spustí workflow každou hodinu (`cron: '5 * * * *'`)
2. `scrape-feeds.js` stáhne všechny RSS feedy → uloží `src/content/data/articles.json`
3. `generate-pages.js` seskupí podle kategorií → vygeneruje `.astro` stránky v `src/pages/`
4. `astro build` vytvoří statický web do `dist/`
5. `actions/deploy-pages` nasadí na **GitHub Pages** (nebo Cloudflare Pages / Netlify)

## 🌐 Nasazení

### GitHub Pages (výchozí)
1. Repo → Settings → Pages → Source: **GitHub Actions**
2. Push na `main` → web na `https://VASE_UCET.github.io/news-aggregator/`

### Cloudflare Pages (doporučeno – rychlejší CDN)
1. Cloudflare Dashboard → Pages → Connect to Git
2. Build command: `npm run full-build`
3. Output directory: `dist`
4. Custom domain zdarma

### Netlify
1. New site from Git
2. Build command: `npm run full-build`
3. Publish directory: `dist`

## 📊 Monitoring

- GitHub Actions → workflow runs (vidíte úspěch/neúspěch každé hodiny)
- Přidejte UptimeRobot / Better Uptime na URL pro alerty

## 🎨 Přizpůsobení designu

Všechny styly jsou v `src/layouts/Layout.astro` v `<style is:global>` – CSS custom properties pro snadné theming:
- `--primary`, `--accent`, `--bg`, `--card-bg`, `--text`, `--border`
- Dark mode automaticky přes `prefers-color-scheme`

## 📄 Licence

MIT – používejte, upravujte, šiřte.

---

**Vytvořeno jako moderní alternativa k WordPress + Feedzy/Pluginy pro leplay.42web.io**