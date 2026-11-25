import {test,expect,Locator} from "@playwright/test";


test("Test Input Actions", async ({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/")
    const textBox:Locator = page.locator("#name");


    await expect(textBox).toBeVisible();  // check for field visibility


    await expect(textBox).toBeEnabled();   // check for field active


    await expect(textBox).toHaveId("name"); // check for name attribute


    /*const maxlen:String | null = await textBox.getAttribute("maxlenght");  // check for length attribute
    expect.soft(maxlen).toBe('15'); */ //asserting maxlenght value


    await textBox.fill("Shahzad Mohammed")
    console.log("Input value of the First Name",await textBox.inputValue());
})


test("Test Radio Button", async ({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/")
    // Gender male button
    const maleRadio:Locator = page.locator("#male"); // Male radio button
    await expect(maleRadio).toBeVisible();
    await expect (maleRadio).toBeEnabled();
    await expect(maleRadio).toHaveId("male");


    const veri:boolean = await maleRadio.isChecked()   // check if radio button is checked or not; return true or false
    expect(veri).toBe(false) // validating this to be unchecked


    await maleRadio.check();  // marking as true


    await expect(maleRadio).toBeChecked(); // asserting checked mark as true.


});




test("Test Checkbox", async ({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");
    // 1. Checkbox Sunday
    const sundayBox:Locator = page.getByLabel("Sunday");
    await expect(sundayBox).toBeVisible();
    await sundayBox.check();
    await expect(sundayBox).toBeChecked(); // assert the checked box for Sunday


    // 2. Select all the checkbox provided like sunday, monday etc
    const days =["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]  // creating a label to map with target elements


    // use map function AS label.map(indexofLabel arrowfun with lable mapped from inspect element)
    const TargetCheckBox:Locator[] = days.map(index => page.getByLabel(index));


    // assert number of checkboxes in above array
    expect(TargetCheckBox.length).toBe(7);


    // To select all checkboxes we need to iterate over TargetCheckBox one by one
    for (const i of TargetCheckBox){
        await i.check();  // to mark each one of them as true
        await expect(i).toBeChecked();   // assertion to validation the truth.
    }




    // 3. Uncheck last 3 checkbox from all the sleected checkbox permormed in above script and perform the assertion
    for (const i of TargetCheckBox.slice(-3)){ // adding slice method to capture last 3 elements.
        await i.uncheck();  // to mark each one of them as true
        await expect(i).not.toBeChecked(); }       // we can use .not to negate at any assertion method.








    // 4.  Toggle the boxes i.e those checked to uncheck and uncheck to checked and assert state to be flipped.
    for (const i of TargetCheckBox){
        // Check the status of the checkboxes
        if (await i.isChecked())
        {
            // only if checked
            for (const i of TargetCheckBox.slice(-3)){ // adding slice method to capture last 3 elements.
            await i.uncheck();  // to mark each one of them as true
            await expect(i).not.toBeChecked(); }
        }
        else {
            // only if not checked
            await i.check();  // to mark each one of them as true
            await expect(i).toBeChecked();
        }    
    }




    // 5. Select custom checkboxes like 1,3,6
    const indexes:number[]= [1,3,6];


     for (const i of indexes){
        await TargetCheckBox[i].check();  // to mark each one of them as true
        await expect(TargetCheckBox[i]).toBeChecked();   // assertion to validation the truth.
    }




    // 6. Select the checkbox based on the value like Sunday or Monday etc
     const weekname:String ="Friday"


     for (const j of days){
        if( j === weekname)
        {
           const newcheckbox = page.getByLabel(j)
           await newcheckbox.check();
            await expect(newcheckbox).toBeChecked();
        }
    }


});
