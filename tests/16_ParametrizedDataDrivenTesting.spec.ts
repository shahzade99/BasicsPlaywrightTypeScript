import { test, expect } from '@playwright/test';


const searchItems:string[] = ['laptop','Gift Card', 'SmartPhone', 'Monitor']  // test data


// Method1: using forLoop to iterate over items




for(const search of searchItems)
{
  test(`Single Search ${search}`, async ({ page }) => { // title should be dynamic els playright will count as duplicate title;
  await page.goto('https://demowebshop.tricentis.com/');
  await page.locator('#small-searchterms').click();
  await page.locator('#small-searchterms').fill('search');
  await page.locator('#small-searchterms').click();
  await page.getByRole('link', { name: 'Picture of 14.1-inch Laptop' }).click();
  await expect.soft(page).toHaveTitle("Demo Web Shop. 14.1-inch Laptop");
});
}






// M2: ForEach function
searchItems.forEach((item)=>
{


  test(`Single Search ${item}`, async ({ page }) => {
  await page.goto('https://demowebshop.tricentis.com/');
  await page.locator('#small-searchterms').click();
  await page.locator('#small-searchterms').fill('search');
  await page.locator('#small-searchterms').click();
  await page.getByRole('link', { name: 'Picture of 14.1-inch Laptop' }).click();
  await expect.soft(page).toHaveTitle("Demo Web Shop. 14.1-inch Laptop");
  })


});






// Automate log in with userId and Pw with 2D array


//step1: Define the test data
const loginData:string[][] = [
    ['laura.taylor786@example.com','test123','valid'],
    ['abc@123.com','test123','invalid'],
    ['valid@123.com','test123','invalid'],
    [' ',' ','invalid'],
]


//step2: iterate on test data to get username, password and validityState


for(const [email,pass,validity] of loginData)  // created 3 varialbles, here [] array which rep [][];
{




    // step4 now we can keep the ierating funciotn in describe to group them.


    test.describe("log in data driven test",async() => {


        // step3 within the describe test put all the acutal code implementation
            test(`log in test for ${email} and ${pass}`, async ({ page }) => {
            await page.goto('https://demowebshop.tricentis.com/login');
            await page.locator("//input[@name='Email']").fill(email);
            await page.locator("//input[@name='Password']").fill("pass");
            await page.locator("input[value='Log in']").click();


            // once logged in successfully, page will have logout button on the top
            // if login was unsuccessfull, I'll get "Login was unsuccessful" messageError


            if (validity==='valid'){
                const logoutLink = page.getByText('Log out');
                await expect(logoutLink).toBeVisible({timeout:50000});
            }else{
                const errorMessage = page.locator(".validation-summary-errors");
                await expect(errorMessage).toBeVisible({timeout:5000});  //validation1


                await expect(page).toHaveURL("https://demowebshop.tricentis.com/login") //validation2


            }


        });


    });


}




import { test, expect } from '@playwright/test';
import fs from 'fs';


// Automate log in with userId and Pw with JSON DataSet


//step1: read data from json
const jsonPath = "testdata/data.json";
const loginData:any = JSON.parse(fs.readFileSync(jsonPath,"utf-8"));






    // step4 now we can keep the ierating funciotn in describe to group them.


test.describe("log in data driven test",async() => {
    //step2: iterate on test data to get username, password and validityState


    for(const [email,pass,validity] of loginData)
    {
            // step3 within the describe test put all the acutal code implementation
                test(`log in test for ${email} and ${pass}`, async ({ page }) => {
                await page.goto('https://demowebshop.tricentis.com/login');
                await page.locator("//input[@name='Email']").fill(email);
                await page.locator("//input[@name='Password']").fill("pass");
                await page.locator("input[value='Log in']").click();


                // once logged in successfully, page will have logout button on the top
                // if login was unsuccessfull, I'll get "Login was unsuccessful" messageError


                if (validity==='valid'){
                    const logoutLink = page.getByText('Log out');
                    await expect(logoutLink).toBeVisible({timeout:50000});
                }else{
                    const errorMessage = page.locator(".validation-summary-errors");
                    await expect(errorMessage).toBeVisible({timeout:5000});  //validation1


                    await expect(page).toHaveURL("https://demowebshop.tricentis.com/login") //validation2


                }


            });


       


    }
});

import { test, expect } from '@playwright/test';
import fs from 'fs';
import {parse} from 'csv-parse/readFileSync';


// Automate log in with userId and Pw with JSON DataSet


//step1: read data from csv
const csvPath = "testdata/data.csv";
const fileContent =fs.readFileSync(csvPath,"utf-8");  //this has all the data in plain text, we need to get eachand every data line by line
const records = parse(fileContent,{columns:true,skip_empty_lines:true})  // path, row,col, emptyline




    // step4 now we can keep the ierating funciotn in describe to group them.


test.describe("log in data driven test",async() => {
    //step2: iterate on test data to get username, password and validityState


    for(const data of records)
    {
            // step3 within the describe test put all the acutal code implementation
                test(`log in test for ${data.email} and ${data.pass}`, async ({ page }) => {
                await page.goto('https://demowebshop.tricentis.com/login');
                await page.locator("//input[@name='Email']").fill(data.email);
                await page.locator("//input[@name='Password']").fill(data.pass);
                await page.locator("input[value='Log in']").click();


                // once logged in successfully, page will have logout button on the top
                // if login was unsuccessfull, I'll get "Login was unsuccessful" messageError


                if (data.validity==='valid'){
                    const logoutLink = page.getByText('Log out');
                    await expect(logoutLink).toBeVisible({timeout:50000});
                }else{
                    const errorMessage = page.locator(".validation-summary-errors");
                    await expect(errorMessage).toBeVisible({timeout:5000});  //validation1


                    await expect(page).toHaveURL("https://demowebshop.tricentis.com/login") //validation2


                }


            });


       


    }
});
