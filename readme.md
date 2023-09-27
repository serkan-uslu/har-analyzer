# HAR Dosyası Oluşturma ve Analiz Aracı

Bu araç, belirtilen bir web sitesi için bir HAR (HTTP Archive) dosyası oluşturur ve bu dosyayı analiz eder.

## Başlangıç

### Gerekli Modüller

- `fs`: Dosya işlemleri için.
- `path`: Dosya yolu işlemleri için.
- `url`: URL işlemleri için.
- `chalk`: Renkli konsol logları için.
- `puppeteer`: Tarayıcı otomasyonu için.
- `puppeteer-har`: Puppeteer ile HAR dosyası oluşturma için.

### Dosya Yapısı

- `index.js`: Uygulamanın ana giriş noktası.
- `config.js`: Web sitesi ve ayarlarını içeren yapılandırma dosyası.
- `helpers.js`: Yardımcı fonksiyonların bulunduğu dosya.

## Kullanım

1. `config.js` dosyasında `website` nesnesini istediğiniz ayarlara göre düzenleyin.
2. `index.js` dosyasını çalıştırarak HAR dosyasını oluşturun ve analiz edin.

### `config.js` Ayarları

- `url`: Analiz etmek istediğiniz web sitesinin URL'si.
- `userAgentType`: Kullanmak istediğiniz kullanıcı ajanı türü (`desktop` veya `mobile`).
- `userAgentInfo`: Farklı kullanıcı ajanları için tanımlamalar.
- `settings`: Puppeteer için ek ayarlar.

## Fonksiyonlar

### `logWithColor(message, color)`

Renkli ve formatlı log mesajları için fonksiyon.

### `generateFilename(url, userAgentType)`

URL, User-Agent ve zaman damgasını alarak dosya adı oluştur.

### `ensureDirectoryExistence(filePath)`

Belirtilen dosya yolu için klasör oluşturur.

### `analyzeHar(filePath)`

Belirtilen HAR dosyasını analiz eder.

### `createHarFilePath(url, filenameBase)`

HAR dosyası için dosya yolu oluşturur.

### `startCaptureHarFile(url, userAgentType)`

HAR dosyası oluşturma işlemleri.

## Lisans

Bu proje MIT lisansı altında lisanslanmıştır.
