import {test, expect, Locator} from "@playwright/test"


test ("Auto suggest dropdown", async ({page})=>{
await page.goto("https://www.flipkart.com/");
test.setTimeout(120000);


// 1. if popup_prompt is visible then this code will automatically close it.
    const closePromp = page.locator('span[role="button"]')
    await closePromp.isVisible();
    await closePromp.click();


// go to flipkart and search 'smart' and then inspect it.
// use name attribut along with tag; css
await page.locator("input[name='q']").first().fill("smart"); // searching with smart
await page.waitForTimeout(12000);




// Once you type smart in the search bar, you'll see different suggest which can't be inspected.
// there are number of methods, but not all methods are guaranteed to work all the time, trial and error
// Method1: to capture these, go to selector hub and turn ON debugger in the inspect area. As soon as you open the debugger, go to Search bar and search smart, after this the screen will freeze and options will be available.


// Method2 (most promising): Search smart in the search bar, go to inspect and hit ctrl+shift+p; cmd will open, type "Emulate focussed page";
// You'll see opttion in the search bar are now static and you can hover to see their class and attributes;
// now you can hover on the search suggestions and you'll be able to see their locators info.Note; Once you have locate teh element, disable the emulation by ctlr+shift+p




// 2. auto suggest option
//const options:Locator = page.locator("//ul/li[@class='humcQA']");
const options:Locator = page.locator("//ul/li");
const counts = await options.count();
console.log("Auto suggested options count",counts);




// 3. Print all the option in the console
const textOption: string[] = await options.allTextContents();
console.log(textOption);


// 4. print last option from above string
console.log("third element throgh std method",textOption[3]); // non clickable text
console.log('third clickable text',await options.nth(3).innerText()) //clickable


// 5. click on search for smartphone from the suggested option
for (let i=0; i<=counts; i++)
{
    const text = await options.nth(i).innerText()
    test.setTimeout(60000);
    if(text === 'smartphone')
        {
            await options.nth(i).click();
            break; // if we don't break, then system will keep on executing for loop where option === smartphone.
        }
}


});




// Go to Orange HRM sign in with Admin@admin123, go to PIM and then Select Job Title, which are hidden upon inspect
// use same ctrl+shift+p menthod to located hidden option
test ("Hidden dropdown", async ({page})=>{
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
    test.setTimeout(120000);


    // 1. log in
    await page.getByRole('textbox',{name:'Username'}).fill("Admin");
    await page.getByPlaceholder('Password').fill('admin123');
    test.setTimeout(120000);
    await page.locator('button[type="submit"]').click();


    // 2. Under PIM, Select Job Title
    await page.getByText('PIM',{exact:true}).click();
    test.setTimeout(120000);
    await page.locator("form i").nth(2).click(); // select correct section i.e Job Title


    // 3. get all the option in a string
    //const joblist:Locator = page.locator("//div[@role='listbox']/div[@role='option']");
    const joblist:Locator = page.locator("//div[@role='listbox']/div[@role='option']");
    test.setTimeout(120000);


    const contxt:string[] = await joblist.allTextContents();
    console.log("all records",contxt);


    // 4. click on particular option
    for (let i=0; i<await joblist.count();i++)
    {
        const txt = await joblist.nth(i).textContent();
        if(txt==='Automaton Tester')
        {
            await joblist.nth(i).click();
            break;
        }
    }


});
