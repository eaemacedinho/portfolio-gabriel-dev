import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

const projects = [
  ["beforepreview", "https://bpreview.meuinflu.com.br/"],
  ["lavahub", "https://lavahub.com.br/"],
  ["meu-influ", "https://meuinflu.com.br/"],
  ["solar-site", "https://solarexpress.com.br/"],
  ["solar-crm", "https://crm100.solarexpress.com.br/"],
  ["camilla", "https://camilla.meuinflu.com.br/"]
];

const output = "public/projects/live";
await mkdir(output, { recursive: true });

const browser = await chromium.launch({ headless: true });

async function capture(name, url, viewport, suffix) {
  const context = await browser.newContext({
    viewport,
    deviceScaleFactor: 1,
    ignoreHTTPSErrors: true,
    locale: "pt-BR"
  });

  const page = await context.newPage();

  try {
    console.log(`Capturing ${name} ${suffix}: ${url}`);
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
    await page.waitForTimeout(4500);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(500);

    await page.screenshot({
      path: `${output}/${name}-${suffix}.jpg`,
      type: "jpeg",
      quality: 84,
      fullPage: false
    });
  } catch (error) {
    console.error(`Failed ${name} ${suffix}`, error);
  } finally {
    await context.close();
  }
}

for (const [name, url] of projects) {
  await capture(name, url, { width: 1440, height: 900 }, "desktop");
  await capture(name, url, { width: 390, height: 844 }, "mobile");
}

await browser.close();
