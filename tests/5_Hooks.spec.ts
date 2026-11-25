// Create any test cases and add hooks
import {test,expect,Locator,Page} from "@playwright/test";




test.beforeAll(async ()=>{
    console.log("Running before all tests");
})


test.afterAll(async ()=>{
    console.log("Running after all tests");
})


// Each


test.beforeEach(async ()=>{
    console.log("Running before each tests");
})


test.afterEach(async ()=>{
    console.log("Running after each tests");
})








// locate an element by its title attribute
test("GetByTitle",async ({page})=>{
    console.log("Get By Title Started...")
    await page.goto("https://github.com/BakkappaN/");
    test.setTimeout(120000);
    const homep:Locator = page.getByTitle("Home")
    expect.soft(homep).toHaveText("Home")
 });




// locate an element by its data-test attribute attribute; this is customizable ppt
//note: data-testid can be changed by dev team anytime, hence we need to update config file
      // under use: as testIdAttribute:"data-pw" where data-pw is configured data-testid
test("GetById",async ({page})=>{
    console.log("Get by Id started...")
    await page.goto("https://github.com/BakkappaN/");
    test.setTimeout(120000);
    await page.getByTestId("repositories").first().click();
    await page.getByTestId("projects").first().click();
 });



/*
test1:  
        open application          // before all
        login to application      //before each
            Find products
        logout                    //after each


test2:
        log in                   // before each
            add products
        log out                     // after each
        close the application     // after all
*/


//import { test, expect, Page, Locator } from '@playwright/test';


let page:Page; // this is so, bcse we want to have page vairalbe globally accessible across tests.


test.beforeAll("open application", async ({browser})=>{
    page = await browser.newPage() ///
    await page.goto('https://demoblaze.com/index.html');
})


test.afterAll("close application", async ()=>
{
    await page.close();
})


test.beforeEach("log in to the application", async ()=>
{
    await page.getByRole('link', { name: 'Log in' }).click();
    await page.locator('#loginusername').click();
    await page.locator('#loginusername').fill('admin');
    await page.locator('#loginpassword').click();
    await page.locator('#loginpassword').fill('admin');
    await page.getByRole('button', { name: 'Log in' }).click();
})


test.afterEach("log out of application", async ()=>
{
    await page.locator('#logout2').click();
})


test('browsing the product', async () =>
{
  await page.getByRole('link', { name: 'Phones' }).click();
  await page.getByRole('link', { name: 'Samsung galaxy s6' }).click();
});
