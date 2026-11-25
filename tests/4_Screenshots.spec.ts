import { test, expect } from '@playwright/test';


test('screenshot element test', async ({ page }) => {
  await page.goto('https://www.youtube.com/@testerstalk/');
  await page.locator("#page-header-container").screenshot({path : "./screenshots/ElementScreenthot.png"});
});




test('screenshot page test', async ({ page }) => {
  await page.goto('https://www.youtube.com/@testerstalk/');
  await page.screenshot({path : "./screenshots/PageScreenthot.png"});  // taking overlall page ss
});




test('screenshot full page test', async ({ page }) => {
  await page.goto('https://www.youtube.com/@testerstalk/');
  await page.screenshot({path : "./screenshots/FullPageScreenthot.png", timeout:60000, fullPage:true});  // taking full page ss; timeout to let the page load
});
