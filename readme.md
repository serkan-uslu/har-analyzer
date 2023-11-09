# HAR Dosyası Oluşturma ve Analiz Aracı

Bu araç, belirtilen bir web sitesi için bir HAR (HTTP Archive) dosyası oluşturur ve bu dosyayı analiz eder.

## Başlangıç

```
npm install
```

komutu ile bağımlılıkları kurun.

### Kullanım

`config.js`: Web sitesi ve ayarlarını içeren yapılandırma dosyasıdır. Bu dosya içine hangi web sitesine ait HAR dosyasını elde etmek istiyorsanız giriniz.

`config.js` Ayarları

- `url`: Analiz etmek istediğiniz web sitesinin URL'si.
- `userAgentType`: Kullanmak istediğiniz kullanıcı ajanı türü (`desktop` veya `mobile`).
- `userAgentInfo`: Farklı kullanıcı ajanları için tanımlamalar.
- `settings`: Puppeteer için ek ayarlar.

### Uygulamayı Çalıştırma

```
node index.js
```

komutu ile uygulamayı çalıştırabilirsiniz.

## Lisans

Bu proje MIT lisansı altında lisanslanmıştır.
