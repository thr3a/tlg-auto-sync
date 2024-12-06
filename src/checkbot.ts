import { chromium } from 'rebrowser-playwright';
import { chromePath } from './util';

async function captureWebsite() {
  const browser = await chromium.launch({
    headless: true,
    executablePath: chromePath()
  });

  const context = await browser.newContext({
    userAgent:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36 Edg/131.0.2903.86',
    viewport: { width: 1366, height: 768 },
    locale: 'ja-JP'
  });

  const page = await context.newPage();

  await page.setExtraHTTPHeaders({
    'Accept-Language': 'ja-JP'
  });

  await page.goto('https://bot.sannysoft.com/');
  await page.screenshot({ path: 'screenshot.png', fullPage: true });

  await browser.close();
}

captureWebsite().catch(console.error);
