// Gera public/og.jpg (1200x630) para compartilhamento em WhatsApp/redes.
import sharp from 'sharp';
import { readFileSync } from 'node:fs';

const logo = readFileSync('assets/miranda-engenharia-logo.svg', 'utf8').replace(
  '<svg ',
  '<svg width="520" height="171" ',
);

const overlay = `
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" x2="1" y1="0" y2="0">
      <stop offset="0" stop-color="#051216" stop-opacity="0.96"/>
      <stop offset="0.55" stop-color="#051216" stop-opacity="0.8"/>
      <stop offset="1" stop-color="#051216" stop-opacity="0.15"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <text x="64" y="330" font-family="Arial, Helvetica, sans-serif" font-size="58" font-weight="700" fill="#ffffff" letter-spacing="-1.5">Especialista em <tspan fill="#00B8D9">NR-13</tspan></text>
  <text x="64" y="392" font-family="Arial, Helvetica, sans-serif" font-size="27" fill="#c3d6db">Caldeiras · Vasos de pressão · Tubulações · Laudos e ART</text>
  <rect x="64" y="470" width="420" height="52" rx="26" fill="#00B8D9"/>
  <text x="90" y="504" font-family="Arial, Helvetica, sans-serif" font-size="22" font-weight="700" fill="#051216">CREA 216375/D · Todo o Brasil</text>
</svg>`;

await sharp('assets/imagem_engenheiro_atuando.jpeg')
  .resize(1200, 630, { fit: 'cover', position: 'right' })
  .composite([
    { input: Buffer.from(overlay), top: 0, left: 0 },
    { input: Buffer.from(logo), top: 70, left: 48 },
  ])
  .jpeg({ quality: 84, mozjpeg: true })
  .toFile('public/og.jpg');

console.log('public/og.jpg gerado');
