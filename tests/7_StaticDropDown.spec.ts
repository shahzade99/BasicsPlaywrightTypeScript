import {test,expect,Locator} from "@playwright/test";




test("Dropdown Value Single Element Simple Validation", async ({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");
    test.setTimeout(120000);


    // Selecting Single country element by different methods
    const countryButton:Locator= page.getByLabel("country")
    await countryButton.click();
    await countryButton.selectOption({index:5});  //by using indexing
    test.setTimeout(70000)
    await countryButton.selectOption("India");     // by visible text
    test.setTimeout(70000)
    await countryButton.selectOption({label:"China"});     // by using label
    test.setTimeout(70000)
    await countryButton.selectOption({value:"uk"});     // by using value attribute


});


test("Dropdown Value Single Element Array validation", async ({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");
    test.setTimeout(120000);
   
    // Selecting All the country list via css path
    const dropDownOptions:Locator = page.locator("#country>option");


    // 1. return single country
    /*const oneCountry:String | null = await dropDownOptions.textContent();
    console.log(oneCountry);*/           // return single text content


    // 2. return all country
    const optionsText:String[] = await dropDownOptions.allTextContents();    // select all text contents
    console.log(optionsText);  // if results have additonal \n and spaces; need to trim




    // trimming each results in optionsText
    // we are mapping current dirty value to new trimmed value.
    const cleanedOptions:String[] = optionsText.map(text => text.trim()); // text is a variable
    console.log(cleanedOptions);




    // 3. Validate if one specific country is available in the dropdown
    expect(cleanedOptions).toContain("Germany");




    // 4. Printing options form the dropdown


    for(const x of cleanedOptions)
    {
        console.log(x);
    }


});    




test("Dropdown Value Multi Selection Element validation", async ({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");
    test.setTimeout(120000);


    // Consider Colors dropdowp, where we can selection more than one option


// 1. Select Option from the drop down (4 ways)
    // use highlighted data from inspect, sometime it will work without option as well "> option"
    //1a. visible text
    await page.locator("#colors").selectOption(["Red","Blue","Green"]) //as its multi-select


    //1b. using value attribute
    // these values are from the value label inside the inspect<value> <red> <Red> </value>
     await page.locator("#colors").selectOption(["red","blue","yellow"])


    // 1c. using labels inside the inpsect
    await page.locator("#colors").selectOption([{label:"Blue"},{label:"Green"}])


    // 1d. using index
    await page.locator("#colors").selectOption([{index:0},{index:2},{index:3}]);




// 2. Check the number of options in the dropdown
    const dropColorOptions:Locator = page.locator("#colors>option");
    await expect(dropColorOptions).toHaveCount(7);
   
   
// 3. Check an option present inthe dropdown
    const allText:String [] = await dropColorOptions.allTextContents()
    const mapText:String[] = allText.map(x => x.trim());      // x is variable here.
    console.log(mapText);
    expect(mapText). toContain("Green");
   
// 4. Printing option from the dropdown
    for(const i of mapText){
        console.log(i);
    }  
   
   


// 5. Is the list in sorted order; Example of Sorted List from above url
    // idea is to take an original array, then sort them into new array and then compare element of each array as its index
    const dropDownAnimals:Locator= page.locator("#animals>option"); // sorted
    //const dropDownAnimals:Locator= page.locator("#colors>option"); // not sorted


    const contextDrop:String[]= await dropDownAnimals.allTextContents();
    console.log(contextDrop);


    // trimming the contextDrop;
    const trimDrop:String[] = contextDrop.map(x => x.trim());


    // cleaning up the data
    /*const originalList:String[] = trimDrop;
    const sortedList:String[] = trimDrop.sort();*/ // sort() is mutable,hence this will also update the value in the original list and hence o/p will be same irrespective of order.
    // to avoid this issue, use 3 dots at the begining ex: ...trimDrop, so that value will be impacted only in the specified varaible.


    const originalList:String[] = [...trimDrop];
    const sortedList:String[] = [...trimDrop].sort();


    console.log("originial list", originalList);
    console.log("sortedList", sortedList);
 
    // Is sorted order


    expect(originalList).toEqual(sortedList);




// 6. Does the list have duplicates
    // example in Colors
    //const dropDownAnimals:Locator= page.locator("#animals>option"); // no duplicate
    //const dropDownAnimals:Locator= page.locator("#colors>option"); // duplicate


    // Array and Tuple allow duplicates but Set doesn't allow duplicates
    const originalSet:String[] = trimDrop;
   
    const uniqueSet = new Set<String> // declaring empty Set
    const duplicateArray:String[]=[];    // declaring empty Array and initialize it


    // Now, logic is take varible X and see if it is in Unique or Array
    // If found in unique, that means, it will be duplicate adn need to send new one into Array
    // If not found in Set, that means unique and send it to Unique Set


    for (const x of originalList){


        if(uniqueSet.has(x))
        {
            duplicateArray.push(x);     // sending X value to duplicate
        }
        else{
            uniqueSet.add(x);
        }


    }


    console.log("unique list", uniqueSet);
    console.log("duplicate List", duplicateArray);


    if(duplicateArray.length>0){
        console.log("duplicate items found", duplicateArray);
    }
    else{
        console.log("unique element", uniqueSet);
    }


});
