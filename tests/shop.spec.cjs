const { test, expect } = require('@playwright/test');

test('registration, cart, reload and saved demo checkout', async ({ page }) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/form.html');
  await page.locator('#signUp').click();
  await page.locator('#username').fill('Demo User');
  await page.locator('#email').fill(`demo-${Date.now()}@example.test`);
  await page.locator('#password').fill('Demo-test-123');
  await page.locator('#submit').click();
  await page.waitForURL('**/home.html');
  await page.goto('/Products.html');
  await expect(page.getByRole('button', { name: 'Add to Cart', exact: true })).toHaveCount(78);
  await page.getByRole('button', { name: 'Add to Cart', exact: true }).first().click();
  await expect(page.locator('#count')).toHaveText('1');
  await page.reload();
  await expect(page.locator('#count')).toHaveText('1');
  await page.goto('/orderform.html');
  for (const [id, value] of Object.entries({fname:'Demo',lname:'User',city:'demo@example.test',streetadd:'Test street',city21:'Yangon',state:'Yangon',telephone:'09123456789'})) await page.locator('#'+id).fill(value);
  await page.locator('#country').selectOption('MMR');
  await page.locator('#placeOrderButton').click();
  await expect(page.locator('#orderStatus')).toContainText('Demo order DEMO-');
  const saved = await page.request.get('/api/orders');
  expect((await saved.json()).orders).toHaveLength(1);
  expect(await page.evaluate(() => localStorage.getItem('cart'))).toBeNull();
  expect(errors).toEqual([]);
});

test('empty checkout and malformed stored cart stay usable', async ({ page }) => {
  await page.goto('/orderform.html');
  await expect(page.locator('#orderStatus')).toContainText('Your cart is empty');
  await expect(page.locator('#placeOrderButton')).toBeDisabled();
  await page.evaluate(() => localStorage.setItem('cart', '{broken'));
  await page.goto('/Products.html');
  await expect(page.getByRole('button', { name: 'Add to Cart', exact: true })).toHaveCount(78);
  await expect(page.locator('#count')).toHaveText('0');
});
