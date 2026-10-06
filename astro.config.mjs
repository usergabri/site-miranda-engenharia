import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';

export default defineConfig({
  site: 'https://engmiranda.com.br',
  integrations: [sitemap(), icon()],
  build: { inlineStylesheets: 'auto' },
});
