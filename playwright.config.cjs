const { defineConfig } = require('@playwright/test');
module.exports = defineConfig({
  testDir: './tests', testMatch: '*.spec.cjs',
  use: { baseURL: 'http://127.0.0.1:8797', channel: process.env.PLAYWRIGHT_CHANNEL || undefined },
  webServer: { command: 'python server.py --port 8797 --database .test-data/shop.sqlite', url: 'http://127.0.0.1:8797', reuseExistingServer: false },
});
