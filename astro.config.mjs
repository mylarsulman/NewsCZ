import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://news-aggregator.pages.dev',
  output: 'static',
  build: {
    inlineStylesheets: 'auto',
  },
  compressHTML: true,
  prefetch: true,
});