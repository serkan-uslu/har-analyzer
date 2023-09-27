import fs from 'fs';
import path from 'path';
import { URL } from 'url';
import chalk from 'chalk';
import puppeteer from 'puppeteer';
import { website } from '../config.js';
import PuppeteerHar from 'puppeteer-har';

// Renkli ve formatlı log mesajları için fonksiyon
export const logWithColor = (message, color = 'white') => {
  console.log(`${new Date()} ${chalk[color](message)}`);
};

// URL, User-Agent ve zaman damgasını alarak dosya adı oluştur
const generateFilename = (url, userAgentType) => {
  const parsedUrl = new URL(url);
  const domain = parsedUrl.hostname.replace(/\./g, '_').replace(/:/g, '_');
  const timestamp = new Date().toISOString().replace(/[:\-T\.]/g, '');
  return `${domain}_${userAgentType}_${timestamp}`;
};

// Klasör oluşturmak için fonksiyon
const ensureDirectoryExistence = (filePath) => {
  const dirname = path.dirname(filePath);
  if (!fs.existsSync(dirname)) {
    fs.mkdirSync(dirname, { recursive: true });
  }
};

export const analyzeHar = async (filePath) => {
  let harData;
  try {
    harData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (error) {
    logWithColor('HAR dosyası okunamıyor.', 'red');
    return;
  }

  const entries = harData.log.entries;
  if (!entries || entries.length === 0) {
    logWithColor('HAR dosyasında kayıt bulunamadı.', 'red');
    return;
  }

  // Basic Stats
  logWithColor('Basic Stats:', 'green');

  const totalRequests = entries.length;
  logWithColor(`  Total number of requests: ${totalRequests}`, 'yellow');

  const totalSize = entries.reduce(
    (acc, entry) => acc + (entry.response.content.size || 0),
    0,
  );
  logWithColor(`  Total size of responses: ${totalSize} bytes`, 'yellow');

  // HTTP Methods
  const methods = {};
  entries.forEach((entry) => {
    const method = entry.request.method;
    methods[method] = (methods[method] || 0) + 1;
  });
  logWithColor('HTTP Methods:', 'green');

  for (const [method, count] of Object.entries(methods)) {
    logWithColor(`  ${method}: ${count}`, 'yellow');
  }

  // Status Codes
  const statusCodes = {};
  entries.forEach((entry) => {
    const statusCode = entry.response.status;
    statusCodes[statusCode] = (statusCodes[statusCode] || 0) + 1;
  });
  logWithColor('Status Codes', 'green');
  for (const [code, count] of Object.entries(statusCodes)) {
    logWithColor(`  ${code}: ${count}`, 'yellow');
  }

  // Domains
  const domains = {};
  entries.forEach((entry) => {
    const domain = new URL(entry.request.url).hostname;
    domains[domain] = (domains[domain] || 0) + 1;
  });
  logWithColor('Domains:', 'green');
  for (const [domain, count] of Object.entries(domains)) {
    logWithColor(`  ${domain}: ${count}`, 'yellow');
  }

  // MIME Types
  const mimeTypes = {};
  entries.forEach((entry) => {
    const mimeType = entry.response.content.mimeType;
    mimeTypes[mimeType] = (mimeTypes[mimeType] || 0) + 1;
  });
  logWithColor('MIME Types:', 'green');
  for (const [type, count] of Object.entries(mimeTypes)) {
    logWithColor(`  ${type}: ${count}`, 'yellow');
  }

  // Response Times
  const responseTimes = entries
    .map((entry) => entry.time)
    .sort((a, b) => a - b);
  const maxResponseTime = Math.max(...responseTimes);
  const minResponseTime = Math.min(...responseTimes);
  console.log(chalk.green('Response Times:'));
  logWithColor('Response Times:', 'green');
  logWithColor(`  Max: ${maxResponseTime} ms`, 'yellow');
  logWithColor(`  Min: ${minResponseTime} ms`, 'yellow');
};

export const createHarFilePath = async (url, filenameBase) => {
  const parsedUrl = new URL(url);
  const mainDomain = parsedUrl.hostname;
  const outputFolder = `./sites/${mainDomain}`;
  const harPath = path.join(outputFolder, `${filenameBase}.har`);
  return harPath;
};

// HAR dosyası oluşturma işlemleri
export const startCaptureHarFile = async (url, userAgentType) => {
  const filenameBase = generateFilename(url, userAgentType);

  const harPath = await createHarFilePath(url, filenameBase);
  ensureDirectoryExistence(harPath);

  logWithColor('Tarayıcı açılıyor...', 'blue');
  const browser = await puppeteer.launch({
    headless: false,
    devtools: false,
    ignoreHTTPSErrors: true,
    args: website.settings.puppeteerArgs,
  });

  logWithColor('Yeni bir sayfa açılıyor...', 'blue');
  const page = await browser.newPage();

  // User-Agent türüne göre ayarları yap
  const userAgent =
    website.userAgentInfo[userAgentType] || website.userAgentInfo.desktop;
  page.setUserAgent(userAgent);

  // HAR kaydı başlat
  const har = new PuppeteerHar(page);
  await har.start({ path: harPath });

  logWithColor('Sayfa yükleniyor...', 'blue');
  await page.goto(url);

  logWithColor('HAR dosyası kaydediliyor...', 'blue');
  await har.stop();

  logWithColor('Tarayıcı kapatılıyor...', 'blue');
  await browser.close();

  logWithColor('Analiz yapılıyor...', 'blue');
  await analyzeHar(harPath);

  logWithColor('İşlem tamamlandı.', 'green');
};
