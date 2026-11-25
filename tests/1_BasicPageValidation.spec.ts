import {test,expect,Locator} from "@playwright/test";


test("verify page title",  async ({page})=>{
    await page.goto("http://www.automationpractice.pl/index.php");
    let pageTitle:String = await page.title(); // returns title of the page
    console.log(pageTitle);
    await expect(page).toHaveTitle("/My Shop/"); // compare to this title
   
})


test("verify page url",  async ({page})=>{
    await page.goto("http://www.automationpractice.pl/index.php");
    let pageURL:String = await page.url(); // returns url of the page
    console.log(pageURL);
    await expect(page).toHaveURL("http://www.automationpractice.pl/index.php"); // compare to this utl
   
})




test("Google page validation",  async ({page})=>{


    // Go To URL
    await page.goto("https://www.google.com/");


    // Search with Keywords
    await page.getByRole('combobox', { name: 'Search' }).fill("Playwright");
    await page.getByRole('combobox', { name: 'Search' }).press("Enter");


    // Click on playlist
   
    test.setTimeout(600000);
    await page.getByRole('link', { name: 'Playwright: Fast and reliable' }).first().click();


    // validate web page title
    await expect(page).toHaveTitle("/Playwright enables reliable web automation for testing, scripting, and AI agents/");
   
})






test("Cursor and Assert",  async ({page})=>{


   await page.goto('https://www.bing.com/');
   await page.getByRole('combobox', { name: 'Enter your search term' }).fill('Playwright tutorial');
   await page.getByRole('searchbox', { name: 'Enter your search here -' }).click();
 


   await expect(page.getByRole('link', { name: 'Fast and reliable end-to-end' })).toBeVisible();
   await page.getByRole('link', { name: 'Fast and reliable end-to-end' }).click();
   await expect(page.getByRole('heading', { name: 'Built for testing' })).toBeVisible();
})




test("Static XPATH Demo", async ({page})=>{


    await page.goto("https://demowebshop.tricentis.com/");
    test.setTimeout(12000);


    // Absolute XPATH to find the image logo
    const absPath:Locator = page.locator("//html/body/div[4]/div[1]/div[1]/div[1]/a[1]/img[1]");
    await expect(absPath).toBeVisible();


    // Relative path with single attribute Search bar
    const singleAbsPath:Locator = page.locator("//input[@value='Search store']");
    await expect(singleAbsPath).toBeVisible();


    // Relative path with Multi attribute for Search BUTTON
    const multiAbsPath:Locator = page.locator("//input[@value='Search'][@type='submit']");
    await expect(multiAbsPath).toBeVisible();


    // Relative path with contains() method, products with hyperlink
    const containsAbsPath:Locator = page.locator("//h2/a[contains(@href,'/build-your-cheap-own-computer')]");      // used h2 since without this there were two elemetns matching, so sleeves upto highter path.
    await expect(containsAbsPath).toBeVisible();


    // Relative path for starts-with() function
    const startsWithAbsPath:Locator = page.locator("//h2/a[starts-with(@href,'/build')]");
    console.log(await startsWithAbsPath.count()) // returns the count of products startw with /build
    expect(await startsWithAbsPath.count()).toBeGreaterThan(0);


    // Relative XPath with text() function - having word 'register'
    const textAbsPath:Locator = page.locator("//a[text()='Register']");
    console.log(await textAbsPath.count()) // returns the count of products startw with /build
    expect(await textAbsPath.count()).toBeGreaterThan(0);


    // Relative XPath with last() funciton - Select Google+ under 'follow us footer note'
    const lastAbsPath:Locator = page.locator("//div[@class='column follow-us']/ul/li[last()]");
    console.log("text content of last element",await lastAbsPath.textContent()) // returns the count of products startw with /build


    // Relative XPath with position() funciton - Select Google+ under 'follow us footer note'
    const positionAbsPath:Locator = page.locator("//div[@class='column follow-us']/ul/li[position()=3]");
    console.log("text content of last element",await positionAbsPath.textContent()) // returns the position of products startw with /build




})




test("Dynamic XPATH Demo", async ({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/")
    test.setTimeout(12000)
    let dynamicPath:Locator = page.locator("//button[@name='start' or 'stop'][@class='start']");


    // click the button
    await dynamicPath.click();


    // wait for 2 sec
    await page.waitForTimeout(2000);


});
