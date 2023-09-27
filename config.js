export const website = {
  url: 'https://amazon.com', // geçerli format: https://example.com
  userAgentType: 'desktop', // desktop veya mobile
  userAgentInfo: {
    desktop:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537',
    mobile:
      'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) CriOS/56.0.2924.75 Mobile/14E5239e Safari/602.1',
  },
  settings: {
    puppeteerArgs: [
      '--start-fullscreen',
      '--window-size=1920,1080',
      '--no-sandbox',
    ],
  },
};
