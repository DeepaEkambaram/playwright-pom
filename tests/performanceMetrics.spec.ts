import { test} from "@playwright/test";
import HomePage from "../page-objects/homePage"


test.describe('Performance check', () => {
    let homePage: HomePage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page)
    });

    test('Basic performance test', async ({ page, browser }) => {
        //New connection to an existing CDP session to enable performance Metrics
        const session = await page.context().newCDPSession(page)
        //Record performance metrics.
        await session.send("Performance.enable")
        await page.goto('/');
        await homePage.clickacceptCookiesBtn(); // Replace with your actual method to navigate to the details page
        await homePage.clickamountTenBtn();
        await homePage.clickownMoneyBtn();
        await homePage.selectReason();
        await homePage.clickContinueBtn();
        console.log("====Chrome Devtool Protocol Performance Metrics====")
        let performanceMetrics = await session.send("Performance.getMetrics")
        console.log(performanceMetrics.metrics)
    });

});