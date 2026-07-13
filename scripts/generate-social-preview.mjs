import sharp from '/Users/hufmay/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp/lib/index.js';
import { fileURLToPath } from 'node:url';

const width = 1200;
const height = 630;
const photo = await sharp(fileURLToPath(new URL('../assets/hero-ekaterina.png', import.meta.url)))
  .resize(420, height, { fit: 'cover', position: 'centre' })
  .png()
  .toBuffer();

const overlay = `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="fade" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#eef8fb"/>
      <stop offset="0.72" stop-color="#eef8fb" stop-opacity="0.96"/>
      <stop offset="1" stop-color="#eef8fb" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect x="0" y="0" width="820" height="630" fill="url(#fade)"/>
  <g transform="translate(66 60)" fill="none" stroke="#49bbc0" stroke-width="4" stroke-linecap="round">
    <path d="M30 2C11 13 11 39 30 51C49 39 49 13 30 2Z"/>
    <path d="M30 2C11 13 11 39 30 51C49 39 49 13 30 2Z" transform="rotate(120 30 27)"/>
    <path d="M30 2C11 13 11 39 30 51C49 39 49 13 30 2Z" transform="rotate(240 30 27)"/>
  </g>
  <text x="140" y="102" font-family="Georgia, serif" font-size="52" font-weight="700" fill="#26313a">7-Я</text>
  <text x="66" y="192" font-family="Arial, sans-serif" font-size="20" font-weight="700" letter-spacing="2.4" fill="#6f4b88">ПСИХОЛОГ · КРАСНОДАР</text>
  <text x="66" y="286" font-family="Georgia, serif" font-size="54" font-weight="600" fill="#26313a">Когда тревожно внутри,</text>
  <text x="66" y="351" font-family="Georgia, serif" font-size="50" font-style="italic" font-weight="600" fill="#6f4b88">об этом можно говорить</text>
  <text x="66" y="438" font-family="Arial, sans-serif" font-size="27" fill="#44515b">Бережная поддержка подростков,</text>
  <text x="66" y="478" font-family="Arial, sans-serif" font-size="27" fill="#44515b">родителей и семей без оценок и давления</text>
  <rect x="66" y="532" width="360" height="54" rx="27" fill="#6f4b88"/>
  <text x="246" y="567" text-anchor="middle" font-family="Arial, sans-serif" font-size="21" font-weight="700" fill="#fff">Екатерина Юрьевна</text>
</svg>`;

await sharp({ create: { width, height, channels: 4, background: '#eef8fb' } })
  .composite([
    { input: photo, left: 780, top: 0 },
    { input: Buffer.from(overlay), left: 0, top: 0 },
  ])
  .png({ compressionLevel: 9 })
  .toFile(fileURLToPath(new URL('../assets/social-preview.png', import.meta.url)));
