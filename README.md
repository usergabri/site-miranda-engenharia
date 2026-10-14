# Miranda Engenharia — site institucional

![Página inicial do site Miranda Engenharia](docs/screenshot.png)

**Visualizar online:** https://usergabri.github.io/site-miranda-engenharia/

Site institucional da Miranda Engenharia (engenharia mecânica especializada em NR-13, laudos técnicos e ART), feito com [Astro](https://astro.build), GSAP e Lenis.

## Rodar localmente

```bash
npm install
npm run dev
```

Abra http://localhost:4321.

## Publicação

- **GitHub Pages (prévia):** cada push na branch `main` publica o site automaticamente pelo workflow [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), usando `SITE_BASE=/site-miranda-engenharia/`.
- **Domínio oficial (engmiranda.com.br):** veja o passo a passo em [DEPLOY.md](DEPLOY.md).

Textos e dados de contato ficam em `src/config/site.ts` e `src/data/content.ts`.
