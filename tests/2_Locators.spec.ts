import {test,expect,Locator} from "@playwright/test"


// page.getByAltText - identify image or similar text based on alt attribute
// use this tag when your elment support alt text as image and area elements.
test("GetByAllText",async ({page})=>{
    await page.goto("https://demo.nopcommerce.com/");


    const logos:Locator = page.getByAltText("nopCommerce")
    await expect(logos).toBeVisible();
});




// page.getByText - find an element by text it contains; locate by visible text, non-interactive
// can be <p>; <div> etc
test("GetByText",async ({page})=>{
    await page.goto("https://github.com/BakkappaN/");
    test.setTimeout(120000);
    await expect(page.getByText('Testers Talk')).toBeVisible();
});




// All interactive elements: Role (buttons, checkbox,headings,links,lists,tables)
// Click option on Register
test("GetByRole",async ({page})=>{
    await page.goto("https://github.com/BakkappaN/");
   
    expect(page.getByRole("link",{name:"Sign in"}).click());
    await expect(page.getByRole("heading", {name:"Sign in to GitHub"})).toBeVisible(); // checking if Register title is visible after clicking the register button
});




// getByLabel - fill in details in the register field
test("GetByLabel",async ({page})=>{
    await page.goto("https://github.com/BakkappaN/");
    test.setTimeout(120000);
    await page.getByRole("link",{name:"Sign in"}).click();
    await page.getByRole('textbox', { name: 'Username or email address' }).fill("abc@gmail.com");
    await page.getByRole('textbox', { name: 'Password' }).fill("root12345")
    await page.getByRole('button', { name: 'Sign in', exact: true }).first().click();
    await expect(page.getByText('Incorrect username or password')).toBeVisible();
});




// getByPlaceholder - Finds an element with a given placeholder text.
// Ideal for inputs without a label but having a placeholder. LIKE SearchBar
test("GetByPlaceholder,xpath,cssSelectors",async ({page})=>{
    await page.goto("https://www.youtube.com/@testerstalk/");
    test.setTimeout(120000);
    // Placeholder
    await page.getByPlaceholder("Search").fill("/testers talk/");


    // xpath
    await page.locator("//input[@name='search_query']").fill("testers talk");


    // CSS Selectores
    await page.locator("css=input[@name='search_query']").click();  // need to rewrite this.not working
 });




// locate an element by its title attribute
test("GetByTitle",async ({page})=>{
    await page.goto("https://github.com/BakkappaN/");
    test.setTimeout(120000);
    const homep:Locator = page.getByTitle("Home")
    expect(homep).toHaveText("Home")
 });




// locate an element by its data-test attribute attribute; this is customizable ppt
//note: data-testid can be changed by dev team anytime, hence we need to update config file
      // under use: as testIdAttribute:"data-pw" where data-pw is configured data-testid
test("GetById",async ({page})=>{
    await page.goto("https://github.com/BakkappaN/");
    test.setTimeout(120000);
    await page.getByTestId("repositories").first().click();
    await page.getByTestId("projects").first().click();
 });
