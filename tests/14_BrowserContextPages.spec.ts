import {test,expect,Page,chromium,firefox,Locator} from "@playwright/test";


test("Browser Context demo", async () =>
{
    const browser = await chromium.launch()     // launching chromium browser, precedence over config
    //const browser = await firefox.launch()
    const context = await browser.newContext();


    const page1 = await context.newPage();
    const page2 = await context.newPage();




    await page1.goto('https://testautomationpractice.blogspot.com/');
    await page2.goto('https://www.google.com/');


    // count # of pages created.
    console.log("pages created", context.pages().length)


    // separate timeout
    await page1.waitForTimeout(2000);
    await page2.waitForTimeout(4000);
})


test("Working with tab/page", async () =>
    {
        const browser = await chromium.launch();
        const context = await browser.newContext();


        const parentPage = await context.newPage();
   
        await parentPage.goto("https://testautomationpractice.blogspot.com/");


        // Task is to click on the NewTab in Parent Page which will open another tab.
           // For this we need to use 'waitEvent' on context for parentPage while child page is executing
           //  which means while child page is executing, parent will hold a promise of either pending, fulfilled or rejected.
           //That's why, both parent and child needs to be run at the same time using Promise.all()
           /*
            ex: context.waitForEvent('page'); will hold pending, fulfilled,rejected promise
                parentPage.locator('button:has-tex("New Tab").click()); opens new page from the parent NewTab element


                // Also; childPage:[Page,void] is similar to [childPage]
            */
        const [childPage] = await Promise.all([context.waitForEvent('page'),(parentPage.locator("button:has-text('New Tab')").click())]);   // two tabs will be opened


        // Approach1: Swith between pages and get titles
        const page = context.pages();             // returns an array
        console.log("number of pages", page.length)


        console.log("title of the parent page", await page[0].title());       // parent
        console.log("title of the child page", await page[1].title());        // child




        // Approach2: Directly from their page reference
        console.log("title of the parent page", await parentPage.title());       // parent
        console.log("title of the child page", await childPage.title());        // child
    });




test("Working with pop up windows", async () =>
    {
        const browser = await chromium.launch();
        const context = await browser.newContext();


        const parentPage = await context.newPage();
   
        await parentPage.goto("https://testautomationpractice.blogspot.com/");


        // Task is to click on the Popwindows in Parent Page which will open another tab.
           // Only difference here is instead of pageEvent, we need to use PopupEvent
        const [childPage] = await Promise.all([context.waitForEvent('page'),(parentPage.locator("button:has-text('Popup Windows')").click())]);   // two popup will be opened




        // Approach1: Swith between pages and get titles
        const page = context.pages();             // returns an array
        console.log("number of pages", page.length)


        console.log("title of the parent page", await page[0].title());       // parent
        console.log("title of the child page", await page[1].title());        // child


        console.log("title of the parent page", await page[0].url());       // parent
        console.log("title of the child page", await page[1].url());        // child
    });
   
test("Authentication pop up windows M1", async () =>
    {
        const browser = await chromium.launch();
        const context = await browser.newContext();
        const page = await context.newPage();


   
        // Method 1 of passing username and password through:
        // http://username:password@domain of website
        await page.goto("http://admin:admin@the-internet.herokuapp.com/basic_auth")
        await expect(page.locator("text=Congratulations")).toBeVisible();
        await expect(page.locator("text=Basic Auth")).toBeVisible();


       
    });  
   
   
test("Authentication pop up windows M2", async () =>
    {
        const browser = await chromium.launch();
        const context = await browser.newContext({httpCredentials:{username:'admin',password:'admin'}});
        const page = await context.newPage();


   
        // Method 2 of passing username and password through: Context
        // {httpCredentials:{username:'admin',password='admin}}
        await page.goto("http://admin:admin@the-internet.herokuapp.com/basic_auth")
        await expect(page.locator("text=Congratulations")).toBeVisible();
        await expect(page.locator("text=Basic Auth")).toBeVisible();


       
    });    
