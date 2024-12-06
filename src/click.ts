import { type Browser, chromium } from 'rebrowser-playwright';
import { chromePath } from './util';

async function scrapeTwilog(username: string): Promise<void> {
  let browser: Browser | null = null;

  try {
    browser = await chromium.launch({
      headless: true,
      executablePath: chromePath()
    });

    const context = await browser.newContext({
      viewport: { width: 1366, height: 768 },
      userAgent:
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36 Edg/131.0.2903.86',
      locale: 'ja-JP'
    });

    const page = await context.newPage();

    await page.goto(`https://twilog.togetter.com/${username}`);

    await page.waitForSelector('#side-update');

    const updateButton = await page.waitForSelector('#side-update form input[type="submit"]');
    await updateButton.click();

    await page.waitForTimeout(3000);
  } catch (error) {
    console.error('エラーが発生しました:', error);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

async function main() {
  const username = 'amanekey';
  await scrapeTwilog(username);
}

main().catch(console.error);
