// documentation => playwirght.dev/docs/dialogs/
// 1. By default dialogs are auto handled by playwright, no additional handling is required
// 2. However, you can regis a dialog handler before your test cases to either accept or dismiss them.


import {test, expect, Locator} from "@playwright/test"


test("simple alertt",async ({page})=>
{
    await page.goto("https://testautomationpractice.blogspot.com");
    test.setTimeout(12000);


    // Accept the alert, this is to do some action, else not required
    page.on('dialog', (dialog) =>          // blue dialog is an event, should not change.
        {
            console.log("dialog type is",dialog.type());
            console.log("dialog text",dialog.message());
            dialog.accept();
        });


    // Invoking the alert
    await page.locator("//button[@id='alertBtn']").click();




});






test("Confirmation alert",async ({page})=>
{
    await page.goto("https://testautomationpractice.blogspot.com");
    test.setTimeout(12000);


    // Accept the alert, this is to do some action, else not required
    page.on('dialog', (dialog) =>          // blue dialog is an event, should not change.
        {
            console.log("dialog type is",dialog.type());
            console.log("dialog text",dialog.message());
            console.log("print cancel",dialog.dismiss());
        });


    // Invoking the alert
    await page.locator("//button[@id='confirmBtn']").click();  // open the dialog and playwright automaticllay cancels it, can't be visible for us.




});




test("Prompt alert",async ({page})=>
{
    await page.goto("https://testautomationpractice.blogspot.com");
    test.setTimeout(12000);


    // Accept the alert, this is to do some action, else not required
    page.on('dialog', (dialog) =>          // blue dialog is an event, should not change.
        {
            console.log("dialog type is",dialog.type());
            console.log("dialog text",dialog.message());
            console.log("default message",dialog.defaultValue);
            //const mess = await dialog.accept("Shahzad M");
            //console.log("new name",mess);  // filling in the value
        });


    // Invoking the alert
    await page.locator("//button[@id='promptBtn']").click();






});


test("Confirmation alerts",async ({page})=>
{
    await page.goto("https://testautomationpractice.blogspot.com");
    test.setTimeout(12000);


    // Accept the alert, this is to do some action, else not required
    page.on('dialog', (dialog) =>          // blue dialog is an event, should not change.
        {
            console.log("dialog type is",dialog.type());
            console.log("dialog text",dialog.message());
            console.log("print cancel",dialog.dismiss());
        });


    // Invoking the alert
    await page.locator("//button[@id='confirmBtn']").click();  // open the dialog and playwright automaticllay cancels it, can't be visible for us.




});




test("Inline frames or Iframe",async ({page})=>
{
    await page.goto("https://testautomationpractice.blogspot.com");
    test.setTimeout(12000);


    // Accept the alert, this is to do some action, else not required
    page.on('dialog', (dialog) =>          // blue dialog is an event, should not change.
        {
            console.log("dialog type is",dialog.type());
            console.log("dialog text",dialog.message());
            console.log("default message",dialog.defaultValue);
            //const mess = await dialog.accept("Shahzad M");
            //console.log("new name",mess);  // filling in the value
        });


    // Invoking the alert
    await page.locator("//button[@id='promptBtn']").click();






});


test("Handling dynamic prompt alerts popup", async ({page}) =>{


    await page.goto("https://www.flipkart.com/");


    // if prompt is visible then this code will automatically close it.
    const closePromp = page.locator('span[role="button"]')
    await closePromp.isVisible();
    await closePromp.click();
   
   
});


// documentation => playwirght.dev/docs/dialogs/
// 1. By default dialogs are auto handled by playwright, no additional handling is required
// 2. However, you can regis a dialog handler before your test cases to either accept or dismiss them.


//import {test, expect, Locator} from "@playwright/test"


test("simple alert",async ({page})=>
{
    await page.goto("https://testautomationpractice.blogspot.com");
    test.setTimeout(12000);


    // Accept the alert, this is to do some action, else not required
    page.on('dialog', (dialog) =>          // blue dialog is an event, should not change.
        {
            console.log("dialog type is",dialog.type());
            console.log("dialog text",dialog.message());
            dialog.accept();
        });


    // Invoking the alert
    await page.locator("//button[@id='alertBtn']").click();




});






test("Confirmation alertt",async ({page})=>
{
    await page.goto("https://testautomationpractice.blogspot.com");
    test.setTimeout(12000);


    // Accept the alert, this is to do some action, else not required
    page.on('dialog', (dialog) =>          // blue dialog is an event, should not change.
        {
            console.log("dialog type is",dialog.type());
            console.log("dialog text",dialog.message());
            console.log("print cancel",dialog.dismiss());
        });


    // Invoking the alert
    await page.locator("//button[@id='confirmBtn']").click();  // open the dialog and playwright automaticllay cancels it, can't be visible for us.




});




test("Prompt alertt",async ({page})=>
{
    await page.goto("https://testautomationpractice.blogspot.com");
    test.setTimeout(12000);


    // Accept the alert, this is to do some action, else not required
    page.on('dialog', (dialog) =>          // blue dialog is an event, should not change.
        {
            console.log("dialog type is",dialog.type());
            console.log("dialog text",dialog.message());
            console.log("default message",dialog.defaultValue);
            //const mess = await dialog.accept("Shahzad M");
            //console.log("new name",mess);  // filling in the value
        });


    // Invoking the alert
    await page.locator("//button[@id='promptBtn']").click();






});


test("Confirmation alertss",async ({page})=>
{
    await page.goto("https://testautomationpractice.blogspot.com");
    test.setTimeout(12000);


    // Accept the alert, this is to do some action, else not required
    page.on('dialog', (dialog) =>          // blue dialog is an event, should not change.
        {
            console.log("dialog type is",dialog.type());
            console.log("dialog text",dialog.message());
            console.log("print cancel",dialog.dismiss());
        });


    // Invoking the alert
    await page.locator("//button[@id='confirmBtn']").click();  // open the dialog and playwright automaticllay cancels it, can't be visible for us.




});




test("Inline frames or Iframee",async ({page})=>
{
    await page.goto("https://testautomationpractice.blogspot.com");
    test.setTimeout(12000);


    // Accept the alert, this is to do some action, else not required
    page.on('dialog', (dialog) =>          // blue dialog is an event, should not change.
        {
            console.log("dialog type is",dialog.type());
            console.log("dialog text",dialog.message());
            console.log("default message",dialog.defaultValue);
            //const mess = await dialog.accept("Shahzad M");
            //console.log("new name",mess);  // filling in the value
        });


    // Invoking the alert
    await page.locator("//button[@id='promptBtn']").click();






});


test("Handling dynamic prompt alerts popups", async ({page}) =>{


    await page.goto("https://www.flipkart.com/");


    // if prompt is visible then this code will automatically close it.
    const closePromp = page.locator('span[role="button"]')
    await closePromp.isVisible();
    await closePromp.click();
   
   
});
