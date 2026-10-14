import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';

// SITE_BASE permite publicar em subcaminho (ex.: GitHub Pages em /site-miranda-engenharia/).
// Sem a variável, o site é gerado na raiz (Netlify / engmiranda.com.br).
export default defineConfig({
  site: 'https://engmiranda.com.br',
  base: process.env.SITE_BASE || '/',
  integrations: [sitemap(), icon()],
  build: { inlineStylesheets: 'auto' },
});
