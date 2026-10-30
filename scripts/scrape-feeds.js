import Parser from 'rss-parser';
import { FEEDS } from '../src/data/feeds.js';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';

const parser = new Parser({
  timeout: 10000,
  headers: {
    'User-Agent': 'Mozilla/5.0 (compatible; NewsAggregator/1.0)'
  }
});

async function fetchFeed(feed) {
  try {
    const parsed = await parser.parseURL(feed.url);
    return parsed.items.slice(0, 20).map(item => ({
      title: item.title || 'Bez titulku',
      link: item.link || '',
      pubDate: item.pubDate || item.isoDate || new Date().toISOString(),
      contentSnippet: item.contentSnippet || item.content || '',
      source: feed.name,
      category: feed.category
    }));
  } catch (error) {
    console.error(`Error fetching ${feed.name}:`, error.message);
    return [];
  }
}

async function main() {
  console.log('Fetching feeds...');
  const allItems = [];
  
  for (const feed of FEEDS) {
    const items = await fetchFeed(feed);
    allItems.push(...items);
    console.log(`  ${feed.name}: ${items.length} items`);
  }
  
  // Sort by date descending
  allItems.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
  
  // Save raw data
  const dataDir = join(process.cwd(), 'src/content/data');
  if (!existsSync(dataDir)) mkdirSync(dataDir, { recursive: true });
  
  writeFileSync(
    join(dataDir, 'articles.json'),
    JSON.stringify(allItems, null, 2)
  );
  
  console.log(`Total articles: ${allItems.length}`);
  console.log('Saved to src/content/data/articles.json');
}

main().catch(console.error);