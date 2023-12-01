## Folder Structure:

The Cypress folder is organized into five sub-folders:

1. **fixtures Holds test data.
2. **pageObjects includes page locators and methods for each page.
3. **playwright-report has html report
5. **tests : Spec/test files
5. **playwright.config.ts : serving as a global config file.

### PageObjects:

- pages : Contains basic assertions and include methods specific to each corresponding page.

## Test Execution:

## Pre-Requisites:

1 Node.js 12 or above

2. Go to root folder of playwright project and run 
### `npm install`

### Steps:

1. **Test Execution from Terminal/CLI
### `npx playwright test` - Runs all specs

2. **Test Execution on a specific test
### `npx playwright test specName.ts`

3.Reports will be automatically generated under playwright-report folder
open the 'index.html' file in the browser

## Testing types covered

1. E2E testing
2. Basic performace test
3. Cross browser/Device testing

## Observations

It appears that running tests in parallel is causing issues during payment, specifically when using the same credit card data in multiple browser instances simultaneously. 
This could be leading to errors on the payment page. 

Consider enabling one browser at a time in the playwright.config.ts file
