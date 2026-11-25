import {test,expect,Locator} from "@playwright/test"


test("Dynamic web pages", async ({page}) => {


    await page.goto("https://practice.expandtesting.com/dynamic-table");
    test.setTimeout(120000);


    const table:Locator = page.locator("//table[@class='table table-striped']/tbody");
    console.log(table);  // locator is captured


    // 1. Get the value of CPU load for chrome %


        // 1.1 count all the rows
        const rows = await table.locator('tr').all();   // will convert individual rows Locator
        console.log("rows and data of table",rows);




        // 1.2 reach each row and check Chrome
        let cpuLoad='';
        for (const row of rows){
            const processName = await row.locator('td').nth(0).innerText(); // first row is selected from for loop, within first row, we have data in td and within td we have name at 0th index.
           
            if(processName==='Chrome'){


                //cpuLoad = await row.locator('td:has-text()').innerText();   // css syntax within td, look for data having % symbol
                cpuLoad = await row.locator('td',{hasText:"%"}).innerText();  // playwright style
                console.log("CPU Load of Chrome:",cpuLoad);


            }


        }


    // 2. Compare the value in the yellow lable of the website
        const yellowValue:string = await page.locator("//div/p[@id='chrom-cpu']").innerText();
        console.log(yellowValue);


        if(yellowValue.includes(cpuLoad))
        {
            console.log("CPU load of Chrome are equal");
        }
        else{
            console.log("CPU value of chrome are not equal");
        }


        expect(yellowValue).toContain(cpuLoad);


});




test("Dynamic web pages Practice", async ({page}) => {
    await page.goto("https://testautomationpractice.blogspot.com");
    test.setTimeout(12000);


    // 1. netowrk speed of firefox and disk space
    const table:Locator = page.locator("//*[@id='taskTable']/tbody");
    console.log(table);  // locator is captured


    // 1.1 get all the rows
    const rows = await table.locator('tr').all();
    console.log(rows);


    //1.2 get first row and iterate over it
    let memory:string='';
    let disk:string='';


    for(const row of rows)
        {
            const name = await row.locator('td').nth(0).innerText();
            if (name==='Firefox')
            {
                memory = await row.locator('td',{hasText:"MB"}).nth(0).innerText();
                disk = await row.locator('td',{hasText:"MB/s"}).nth(0).innerText();
            }
        }
        console.log("Memory for firefox",memory);
        console.log("Disk for firefox is", disk);
     
});


test("Web Table Pagination All Pages", async ({page}) => {
    await page.goto("https://datatables.net/examples/basic_init/zero_configuration.html");
    test.setTimeout(120000);
    // 1. read data from all table pages
        // 1.1 First make sure pages are available
        let hasMorePage =true;        // Initially assuming we have more pages


        // 1.2 Make sure data for current page is available
        while(hasMorePage)       // since we don't know the max limit, hence While loop
        {
           const rows = await page.locator("//table[@id='example']/tbody/tr").all(); // all rows in array format
           for(const row of rows)
           {
            console.log(await row.innerText());
           }


           // capture next button from inspect
           const nextButton:Locator = page.locator("//button[@class='dt-paging-button next']");
           // check if next button is enabled or disabled
           // At the end of the last page, we see in the inspct that @class has new info 'disabled' added like @class='dt-paging-button disabled' this gives us a signal for last page.


           const isDisabled = await nextButton.getAttribute('class')  // this will give us disabled/enabled info


           if(isDisabled?.includes('disabled'))     //? since value can be string or null
           {
            hasMorePage=false;
            break;
           }
           else
            {
                await nextButton.click();
           }
        }


});    




test("Web Table Pagination Filter and check rows count", async ({page}) => {
    await page.goto("https://datatables.net/examples/basic_init/zero_configuration.html");
    test.setTimeout(12000);
   
    const filter:Locator = page.locator("//select[@aria-controls='example']");
    await filter.selectOption({value:'25'});    // selecting 25 from the filter


    // get all the rows
    const table:Locator[] = await page.locator("//*[@id='example']/tbody/tr").all();


    // get count of all the rows
     test.setTimeout(12000);
    expect(table.length).toBe(25);
});    


test("Search for specific data in a table", async ({page}) => {
    await page.goto("https://datatables.net/examples/basic_init/zero_configuration.html");
    test.setTimeout(12000);
    // data can be on any page
    // look for search box first
    const searchBox:Locator = page.locator("//input[@id='dt-search-0']");
    await searchBox.fill("Gloria Little")




    // get all the rows
    const rows:Locator[] = await page.locator("//*[@id='example']/tbody/tr").all();


    // get row count>0
   
    if(rows.length>=1)
    {
        let matchfound=false;
        for(let row of rows)
        {
            const text = await row.innerText();
            if((text).includes('Gloria Little'))
            {
                console.log("Record exists", text)
                matchfound=true;
                break;
            }
        }
    }
    else{
        console.log("no rows found with serach text")
    }
});
