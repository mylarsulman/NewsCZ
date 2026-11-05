import Parser from 'rss-parser';
import { FEEDS } from '../src/data/feeds.js';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';

const parser = new Parser({
  timeout: 8000,
  headers: {
    'User-Agent': 'Mozilla/5.0 (compatible; NewsAggregator/1.0)'
  }
});

async function fetchFeedWithTimeout(feed) {
  try {
    const parsed = await parser.parseURL(feed.url);
    return parsed.items.slice(0, 20).map(item => ({
      title: item.title || 'Bez titulku',
      link: item.link || '',
      pubDate: item.pubDate || item.isoDate || new Date().toISOString(),
      contentSnippet: item.contentSnippet || item.content || '',
      source: feed.name,
      category: feed.category,
      image: extractImage(item)
    }));
  } catch (error) {
    console.error(`Error fetching ${feed.name}:`, error.message);
    return [];
  }
}

function extractImage(item) {
  // 1. enclosure (RSS 2.0 standard)
  if (item.enclosure?.url) return item.enclosure.url;
  
  // 2. media:content (Media RSS)
  if (item['media:content']?.[0]?.$?.url) return item['media:content'][0].$.url;
  if (item['media:content']?.[0]?.url) return item['media:content'][0].url;
  
  // 3. media:thumbnail
  if (item['media:thumbnail']?.[0]?.$?.url) return item['media:thumbnail'][0].$.url;
  if (item['media:thumbnail']?.[0]?.url) return item['media:thumbnail'][0].url;
  
  // 4. itunes:image (podcasts sometimes used for news)
  if (item['itunes:image']) return item['itunes:image'];
  
  // 5. Extract first <img src="..."> from content
  const content = item.content || item.contentSnippet || '';
  const imgMatch = content.match(/<img[^>]+src=["']([^"']+)["']/i);
  if (imgMatch) return imgMatch[1];
  
  // 6. Extract from description/summary if different from content
  const desc = item.description || item.summary || '';
  const descImgMatch = desc.match(/<img[^>]+src=["']([^"']+)["']/i);
  if (descImgMatch) return descImgMatch[1];
  
  return null;
}

async function main() {
  console.log('Fetching feeds...');
  const allItems = [];
  
  for (const feed of FEEDS) {
    const items = await fetchFeedWithTimeout(feed);
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