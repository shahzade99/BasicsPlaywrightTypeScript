import {test,expect,Locator} from "@playwright/test"


test ("Extract element from web pages", async ({page})=>{
await page.goto("https://demowebshop.tricentis.com/")
test.setTimeout(120000);


// Selecting all the products in the feature section
//const products:Locator = page.locator("//div[@class='item-box']");
const products:Locator = page.locator(".product-title");


// 1. Select inner text of particular product like virtual card link; innertext v/s textcontent
    console.log("inner text",await products.nth(1).innerText());
    //console.log("textcontent ",await products.nth(1).textContent());




    // Select innner text of all products
    const count:number = await products.count();
   
    for (let i=0; i<count; i++)
    {
        console.log("inner text of",await products.nth(i).innerText());
    }


// 2. Difference b/w allintertext vs all textcontent
  const AllText:String[] = await products.allTextContents();


 console.log("All textcontent ", AllText); // here, same content BUT extra spaces and values; to trim this we can do
  const productTrimmed: String[] = AllText.map( text=>text.trim());
  console.log("product named after trimmed",productTrimmed);




  // 3. All() method; converts locator to locator array[]


  const prodLocator:Locator[] = await products.all()      // this all method will capture EVERY product locator (Details) in this array
  console.log(prodLocator); // basically for each product, we have specific locator array which we can use to get specific details of THAT array


  console.log(await prodLocator[1].innerText()); //will return the inner text of first product


// 4. using all method print all innertext of each product


    // since we have locator of array we can use for...of loop
    for (let x of prodLocator)
    {
        console.log(await x.innerText());
    }


})




test ("Handling static web tables 48.07 of session9", async ({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/")




    // 1. capture table element
    const table:Locator = page.locator('//table[@name="BookTable"]/tbody');
    test.setTimeout(120000);
    await expect(table).toBeVisible();


    // 2. Count number of rows


    //const rows:Locator = page.locator('//table[@name="BookTable"]/tbody/tr');
    const rows:Locator = table.locator('tr'); // This is called Chaining of Locator, here table locator is already defined and we are leveraging that locator to further instpect the element


    test.setTimeout(120000);
    const rowCount = await rows.count();
    console.log("row count is",rowCount);


    // 3. count number of column; basically th aka test header


    const column:Locator = rows.locator('th');
    const columnCount = await column.count();
    console.log("column count is", columnCount);


    // 4. read all data from second row
    const data2:String[] = await rows.nth(2).locator('td').allInnerTexts();
    console.log("column count is", data2);


    //5. Read all data from table
    // convert row locator to locator[]
    const allRowData=await rows.all();      // get all row locator
    console.log("row locator",allRowData);


    for(let x of allRowData) // to exclude header use allRowData.slic(1) here.
    {
        const cols= await x.locator('td').allInnerTexts();
        console.log("All row data", cols)
    }


    //6. Print book name where author is Mukesh


    const MukeshBooks:string[]=[];       // for assertion, array is being initialized //7 count # of books by Mukesh
    for(let x of allRowData.slice(1)) // to exclude header use allRowData.slic(1) here.
    {
        const cell = await x.locator('td').allInnerTexts();
        const author = cell[1];  // Author column selected
        const book = cell[0];    // Book column selected


        if(author ==='Mukesh'){
            console.log(`${author} \t ${book}`)
            MukeshBooks.push(book);
        }


    }


    // 7. Assertion on mukesh books
    test.setTimeout(12000)
    expect(MukeshBooks).toHaveLength(2); // since this is array we need to use length instead of count()




    // 8 Calculate total price of all books
    let totalPrice=0;
    for(let data of allRowData.slice(1)) // to exclude header use allRowData.slic(1) here.
    {
        const cell = await data.locator('td').allInnerTexts();
        const price = cell[3];  // Price column selected
        totalPrice=totalPrice+parseInt(price);


   


    }
    console.log("total price", totalPrice);
});  
