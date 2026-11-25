import { test, expect } from '@playwright/test';


test('codegen test', async ({ page }) => {
  await page.goto('https://www.youtube.com/');
  await page.getByRole('combobox', { name: 'Search' }).click();
  await page.getByRole('combobox', { name: 'Search' }).fill('Playwright by testers talk');
  await page.getByRole('combobox', { name: 'Search' }).press('Enter');
  await expect(page.getByRole('link', { name: 'Playwright by Testers Talk' })).toBeVisible();
});


/**
 * run npx playwright codegen and two window will appear
 */