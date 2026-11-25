import {test, expect, Locator,Page} from "@playwright/test"




test("Simple date pickers", async ({page}) =>{


    await page.goto("https://testautomationpractice.blogspot.com/");
    test.setTimeout(120000);


    // 1. identify the locator
    const datePicker:Locator = page.locator('//input[@id="datepicker"]');
   
   


    // 2. MethodOne fill the date by using fill(), this works 90% of the time
    await datePicker.fill("06/12/2026");




    // 3. MethodTwo fill the date by using datepicker
    await datePicker.click();
    const year = '2024';
    const month = 'June'      // Selecting May instead of 05; Calendar shown May 2025 as title
    const date = '20'


    while(true)
    {
        const currentMonth = await page.locator("//span[@class='ui-datepicker-month']").textContent();
        const currentYear = await page.locator("//span[@class='ui-datepicker-year']").textContent();
        if(currentMonth===month && currentYear===year)
        {
            break;
        }


        //future date selection
        //const nextDate = await page.locator("//a[@title='Next']").click(); // if current M and Y not match then go next


        // past date selection
        const prevDate = await page.locator("//a[@title='Prev']").click();




    }


    // once date and month is matched. select date
    // get locator for date, convert them into array and do for of loop to find the match
    const allDate:Locator[] = await page.locator("//table[@class='ui-datepicker-calendar']/tbody/tr/td").all();


    for(const dt of allDate)
    {
        const dateText = await dt.innerText();
        if(dateText===date)
        {
           await dt.click();
            break;
        }
    }






   
   
});




//=========Dynamic Date Picker==========


// Given date, month, year select in the table


async function SelectCalender(tartgetYear:String,targetMonth:String,targetDay:String,page:Page,isFuture:boolean)
{
    // Find the locator for Month and Year
    while(true)
    {
        const currentMonth = await page.locator("//span[@class='ui-datepicker-month']").textContent();
        const currentYear = await page.locator("//span[@class='ui-datepicker-year']").textContent();
        if(currentMonth===targetMonth && currentYear===tartgetYear)
        {
            break;
        }


        // Selecting future or past date


        if(isFuture)
        {
            //future date selection
            const nextDate = await page.locator("//a[@title='Next']").click(); // if current M and Y not match then go next


        } else{
            // past date selection
            const prevDate = await page.locator("//a[@title='Prev']").click();
        }


        await page.waitForTimeout(100);
       
    }


    // once date and month is matched. select date
    // get locator for date, convert them into array and do for of loop to find the match
    const allDate:Locator[] =await page.locator("//table[@class='ui-datepicker-calendar']/tbody/tr/td").all();


    for(const dt of allDate)
    {
    const dateText = await dt.innerText();
    if(dateText===targetDay)
    {
        await dt.click();
        break;
    }
    }
 
}


test("Dynamic date pickers", async ({page}) =>{
await page.goto("https://testautomationpractice.blogspot.com/");


    // identify the locator
    const datePicker:Locator = page.locator('//input[@id="datepicker"]');
    await datePicker.click();


  // Select Month and Year
    const cYear = '2023';
    const cMonth = 'May';
    const cDay = '12';


    SelectCalender(cYear,cMonth,cDay,page,false);   // go to function
    await page.waitForTimeout(120000);
});






//==========Booking.com date picker===============
test("Bootstrap date picker booking.com", async ({page})=>
{


// open booking.com    
await page.goto("https://www.booking.com/")
test.setTimeout(120000);


// select datebox and click
const dateBox:Locator = page.locator("//button[@data-testid='searchbox-dates-container']");


// if prompt is visible then this code will automatically close it.
const closePromp = page.locator('//button[@aria-label="Dismiss sign-in info."]')
await closePromp.isVisible();
await closePromp.click();


await dateBox.click();




//=====Check in data Selection====
let checkinYear:string='2026';
let checkinMonth:string='November';
let checkinDate:string='20';


// Navigate through the calendar to find desired check in Month and Year


while(true)
{
    const checkinData = await page.locator("//h3[@class='e7addce19e af236b7586']").nth(0).innerText(); // two locator sept and oct are matching
   
    // Now we have data in the form of October 2026 and we have to split this into months and year
    const currentMonth = checkinData.split(" ")[0];
    const currentYear = checkinData.split(" ")[1];
   
    if(currentMonth===checkinMonth && currentYear===checkinYear)
    {
        break;
    }else{
        await page.locator("button[aria-label='Next month']").click();
    }
}


// Select checkin date from match month and year.
let allDates = await page.locator("//table[@role='grid'][1]/tbody/tr/td").all();
let checkinDateSelect=false;


for(const dt of allDates)
{
    const dtText = await dt.innerText();
    if(dtText ===checkinDate)
    {
        await dt.click();
        checkinDateSelect=true;
        break;
    }
}


// Assertion to confirm check-in date was selected
expect(checkinDateSelect).toBeTruthy(); // true




});




// for checkout data selection, it will be exactly same, except nth(1) instead of nth(0) below code
//const checkinData = await page.locator("//h3[@class='e7addce19e af236b7586']").nth(1).innerText();
