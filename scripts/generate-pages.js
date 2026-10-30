// Generate category pages and index
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';
import { FEEDS, CATEGORIES } from '../src/data/feeds.js';

const dataPath = join(process.cwd(), 'src/content/data/articles.json');
if (!existsSync(dataPath)) {
  console.error('Run scrape-feeds.js first');
  process.exit(1);
}

const articles = JSON.parse(readFileSync(dataPath, 'utf-8'));

// Group by category
const byCategory = {};
for (const cat of CATEGORIES) {
  byCategory[cat.id] = articles.filter(a => a.category === cat.id).slice(0, 30);
}

// All articles for homepage
const homepageArticles = articles.slice(0, 50);

// Save processed data
const outDir = join(process.cwd(), 'src/content/data');
writeFileSync(join(outDir, 'by-category.json'), JSON.stringify(byCategory, null, 2));
writeFileSync(join(outDir, 'homepage.json'), JSON.stringify(homepageArticles, null, 2));

// Generate static category pages for Astro
const pagesDir = join(process.cwd(), 'src/pages');
for (const cat of CATEGORIES) {
  const catArticles = byCategory[cat.id];
  const content = `---
import Layout from '../layouts/Layout.astro';
import ArticleList from '../components/ArticleList.astro';

const articles = ${JSON.stringify(catArticles, null, 2)};
const category = ${JSON.stringify(cat)};
---

<Layout title="${cat.name} – News" category={category}>
  <ArticleList articles={articles} />
</Layout>`;
  writeFileSync(join(pagesDir, `${cat.id}.astro`), content);
}

// Homepage
const homepageContent = `---
import Layout from '../layouts/Layout.astro';
import ArticleList from '../components/ArticleList.astro';
import CategoryNav from '../components/CategoryNav.astro';

const articles = ${JSON.stringify(homepageArticles, null, 2)};
const categories = ${JSON.stringify(CATEGORIES, null, 2)};
---

<Layout title="News – Czech agregator" category={null}>
  <CategoryNav categories={categories} active={null} />
  <ArticleList articles={articles} />
</Layout>`;
writeFileSync(join(pagesDir, 'index.astro'), homepageContent);

console.log('Generated category pages and homepage');