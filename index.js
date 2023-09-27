import { website } from './config.js';
import { startCaptureHarFile, logWithColor } from './helpers/index.js';

try {
  if (!website || !website.url || !website.userAgentType) {
    throw new Error('website objesi veya gerekli özellikleri tanımlı değil.');
  }

  startCaptureHarFile(website.url, website.userAgentType);
} catch (err) {
  logWithColor('Bir hata oluştu:', 'red');
  logWithColor(err, 'red');
}
