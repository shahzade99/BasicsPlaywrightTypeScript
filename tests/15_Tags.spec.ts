import {test, expect} from "@playwright/test";


test("test1", async ({page}) =>
{
    await page.goto("https://www.google.com");
    await expect(page).toHaveTitle('Google');
})


// use test.only
test("test2", async ({page}) =>   // only this test will run
{
    await page.goto("https://www.google.com");
    await expect(page).toHaveTitle('Google');
})




test.skip("test3", async ({page}) =>   // this test will be skip for execution
{
    await page.goto("https://www.google.com");
    await expect(page).toHaveTitle('Google');
})


test("test4", async ({page,browserName}) =>   // skip test based on some conditions
{
    test.skip(browserName !== 'chromium', 'This feature is Safari-only');
    await page.goto("https://www.google.com");
    await expect(page).toHaveTitle('Google');
})


test("test5", async ({page}) =>   // this test will be skip for execution
{
    await page.goto("https://www.google.com");
    await expect(page).toHaveTitle('Google');
})


test.fixme("test6", async ({page}) =>   // this test will be skip for execution
{
    await page.goto("https://www.google.com");
    await expect(page).toHaveTitle('Glass');
})


test("test7", async ({page}) =>   // this test will be skip for execution
{
    test.slow();
    await page.goto("https://www.google.com");
    await expect(page).toHaveTitle('Glass');
})
