// User-run only. Do not execute this to circumvent an agent browser access restriction.
import { createRequire } from 'node:module';
import { createServer } from 'node:http';
import { readFile, mkdir, writeFile, realpath } from 'node:fs/promises';
import path from 'node:path';

const [rootArgument, output, dependencies] = process.argv.slice(2);
if (!rootArgument || !output || !dependencies) throw new Error('Run scripts/verify-local.ps1');
const root = await realpath(rootArgument);
const require = createRequire(path.join(dependencies, '__validation__.cjs'));
const { chromium } = require('playwright');
const mime = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.pdf': 'application/pdf' };
const server = createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    const file = await realpath(path.resolve(root, '.' + (pathname === '/' ? '/index.html' : pathname)));
    const relative = path.relative(root, file);
    if (relative.startsWith('..') || path.isAbsolute(relative) || relative.split(path.sep).some(part => part.startsWith('.'))) {
      response.writeHead(403).end(); return;
    }
    response.writeHead(200, { 'Content-Type': mime[path.extname(file)] || 'application/octet-stream' });
    response.end(await readFile(file));
  } catch { response.writeHead(404).end(); }
});
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
await mkdir(output, { recursive: true });
let browser;
const results = [];
try {
  for (const channel of ['chrome', 'msedge']) {
    try { browser = await chromium.launch({ channel }); break; } catch { /* Try another installed browser. */ }
  }
  if (!browser) throw new Error('Google Chrome 또는 Microsoft Edge를 설치하세요.');
  for (const [name, width, height, mobile] of [
    ['pc-1440', 1440, 1000, false], ['pc-1920', 1920, 1080, false],
    ['mobile-390', 390, 844, true], ['mobile-430', 430, 932, true], ['print-a4', 794, 1123, false]
  ]) {
    console.log(`검사 중: ${name}`);
    const context = await browser.newContext({ viewport: { width, height }, isMobile: mobile, hasTouch: mobile, deviceScaleFactor: 1 });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    if (name === 'print-a4') await page.emulateMedia({ media: 'print' });
    await page.goto(`http://127.0.0.1:${server.address().port}/`, { waitUntil: 'load', timeout: 60000 });
    // Scroll through the document to request lazy-loaded images/embeds.
    await page.evaluate(async () => {
      for (let y = 0; y < document.documentElement.scrollHeight; y += innerHeight) {
        scrollTo(0, y); await new Promise(resolve => setTimeout(resolve, 80));
      }
      scrollTo(0, 0);
      await document.fonts.ready;
      await Promise.all([...document.images].map(img => img.decode().catch(() => {})));
    });
    const checks = await page.evaluate(() => {
      const visible = element => { const r = element.getBoundingClientRect(); return r.width > 0 && r.height > 0 && getComputedStyle(element).visibility !== 'hidden'; };
      const label = element => element.id || element.getAttribute('alt') || element.className || element.tagName;
      const images = [...document.images].filter(visible);
      const cards = [...document.querySelectorAll('.featured-media, .media-box-modern')].filter(visible);
      const overlaps = [];
      for (let i = 0; i < cards.length; i++) for (let j = i + 1; j < cards.length; j++) {
        if (cards[i].contains(cards[j]) || cards[j].contains(cards[i])) continue;
        const a = cards[i].getBoundingClientRect(), b = cards[j].getBoundingClientRect();
        if (Math.min(a.right, b.right) - Math.max(a.left, b.left) > 2 && Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top) > 2) overlaps.push(`${label(cards[i])} / ${label(cards[j])}`);
      }
      return {
        horizontalOverflow: document.documentElement.scrollWidth > innerWidth + 2,
        brokenImages: images.filter(img => !img.complete || !img.naturalWidth).map(img => ({ label: label(img), src: img.getAttribute('src') })),
        mediaOverlaps: overlaps,
        clippedMedia: cards.filter(card => card.scrollHeight > card.clientHeight + 3 && ['hidden', 'clip'].includes(getComputedStyle(card).overflowY)).map(label),
        note: 'DOM 검사이며 PDF 페이지 분할이나 모든 텍스트 겹침을 판정하지 않습니다.'
      };
    });
    if (name === 'print-a4') {
      await page.pdf({ path: path.join(output, 'portfolio-a4.pdf'), format: 'A4', printBackground: true, preferCSSPageSize: true, displayHeaderFooter: false });
    } else await page.screenshot({ path: path.join(output, `${name}.png`), fullPage: true, animations: 'disabled' });
    results.push({ name, width, height, checks, scriptErrors: errors });
    await context.close();
  }
  const escape = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
  await writeFile(path.join(output, 'checks.json'), JSON.stringify({ generatedAt: new Date().toISOString(), visualReview: 'NOT_COMPLETED', results }, null, 2));
  await writeFile(path.join(output, 'report.html'), `<!doctype html><html lang="ko"><meta charset="utf-8"><title>포트폴리오 로컬 검증</title><style>body{font:16px/1.6 sans-serif;max-width:1100px;margin:32px auto;padding:16px}img{width:100%;border:1px solid #ccc}pre{white-space:pre-wrap;background:#f2f5fa;padding:16px}section{margin:40px 0}</style><h1>로컬 검증 결과 · 최종 통과 미판정</h1><p>모바일은 화면 크기·터치 에뮬레이션입니다. 실제 휴대전화, Safari 및 실제 YouTube 재생은 별도 확인이 필요합니다. 외부 이미지·영상은 인터넷 연결이 필요합니다.</p><p><a href="portfolio-a4.pdf" target="_blank">A4 PDF 열기</a> · <a href="checks.json">검사 수치</a></p><h2>필수 수동 검수</h2><p>PDF를 모든 페이지 확인하세요: 사진/영상 카드 겹침, 페이지 밖 잘림, 불필요한 빈 페이지, 글자 크기, 시각자료 비율. 아래 PC/모바일 화면도 전체 확인하세요. 자동 검사에서 문제가 없어도 검수 완료가 아닙니다.</p>${results.map(result => `<section><h2>${escape(result.name)}</h2><pre>${escape(JSON.stringify(result, null, 2))}</pre>${result.name !== 'print-a4' ? `<a href="${result.name}.png" target="_blank"><img src="${result.name}.png" alt="${result.name} 전체 화면"></a>` : '<p>인쇄 DOM 수치는 참고용입니다. 반드시 PDF 자체를 검수하세요.</p>'}</section>`).join('')}</html>`);
  console.log(`결과: ${output}\n화면 및 PDF 시각 검수는 아직 완료되지 않았습니다.`);
} finally {
  if (browser) await browser.close();
  await new Promise(resolve => server.close(resolve));
}
