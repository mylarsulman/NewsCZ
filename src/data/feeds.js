// Czech news RSS feeds configuration
export const FEEDS = [
  // Mainstream news
  { name: 'iDNES.cz', category: 'domaci', url: 'https://servis.idnes.cz/rss.aspx?c=zpravodaj' },
  { name: 'Novinky.cz', category: 'domaci', url: 'https://www.novinky.cz/rss' },
  { name: 'Aktuálně.cz', category: 'domaci', url: 'https://www.aktualne.cz/rss/' },
  { name: 'Seznam Zprávy', category: 'domaci', url: 'https://www.seznamzpravy.cz/rss' },
  { name: 'Deník N', category: 'domaci', url: 'https://denikn.cz/feed/' },
  { name: 'Reflex.cz', category: 'domaci', url: 'https://www.reflex.cz/rss' },
  
  // Sport
  { name: 'Novinky Sport', category: 'sport', url: 'https://www.novinky.cz/rss/sport' },
  { name: 'Aktuálně Sport', category: 'sport', url: 'https://www.aktualne.cz/rss/sport/' },
  { name: 'Sport.cz', category: 'sport', url: 'https://www.sport.cz/rss' },
  
  // Tech/Science
  { name: 'Lupa.cz', category: 'tech', url: 'https://www.lupa.cz/rss.xml' },
  { name: 'Zive.cz', category: 'tech', url: 'https://www.zive.cz/rss/' },
  
  // Economy
  { name: 'E15.cz', category: 'ekonomika', url: 'https://www.e15.cz/rss/' },
  
  // World
  { name: 'iDNES Zahraniční', category: 'zahranici', url: 'https://servis.idnes.cz/rss.aspx?c=zahranicni' },
  { name: 'Novinky Zahraniční', category: 'zahranici', url: 'https://www.novinky.cz/rss/zahranicni' },
  { name: 'BBC News Czech', category: 'zahranici', url: 'https://www.bbc.com/czech/index.xml' },
  
  // Culture/Lifestyle
  { name: 'Novinky Kultura', category: 'kultura', url: 'https://www.novinky.cz/rss/kultura' },
  { name: 'A2larm', category: 'kultura', url: 'https://a2larm.cz/feed/' },
];

export const CATEGORIES = [
  { id: 'domaci', name: 'Z domova', icon: '🏠' },
  { id: 'zahranici', name: 'Ze světa', icon: '🌍' },
  { id: 'sport', name: 'Sport', icon: '⚽' },
  { id: 'ekonomika', name: 'Ekonomika', icon: '💰' },
  { id: 'tech', name: 'Technologie', icon: '💻' },
  { id: 'kultura', name: 'Kultura', icon: '🎭' },
];