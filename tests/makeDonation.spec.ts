import { test} from "@playwright/test";
import HomePage from "../page-objects/homePage"
import DetailsPage from "../page-objects/detailsPage";
import PaymentPage from "../page-objects/paymentPage";
import ThanksPage from "../page-objects/thanksPage";
import donorData from "../fixtures/donorData.json";

test.describe('Donation E2E flow', () => {
    let homePage: HomePage;
    let detailsPage: DetailsPage;
    let paymentPage: PaymentPage;
    let thanksPage: ThanksPage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        detailsPage = new DetailsPage(page);
        paymentPage = new PaymentPage(page);
        thanksPage = new ThanksPage(page);
        await page.goto('/');
    });

    test('Make a Donation', async () => {
        //Initiate Donation
        await homePage.clickacceptCookiesBtn(); // Replace with your actual method to navigate to the details page
        await homePage.clickamountTenBtn();
        await homePage.clickownMoneyBtn();
        await homePage.selectReason();
        await homePage.clickContinueBtn();
    
        // Enter Donor details
        await detailsPage.selectTitle();
        await detailsPage.enterFirstName(donorData.firstname)
        await detailsPage.enterLastName(donorData.lastname)
        await detailsPage.enterEmail(donorData.email)
        await detailsPage.enterphoneNumber(donorData.phone)
        await detailsPage.enterpostCode(donorData.homeAddress.postcode)
        await detailsPage.enterAddressManually()
        await detailsPage.enterAddressLineOne(donorData.homeAddress.address1)
        await detailsPage.enterCity(donorData.homeAddress.town)
        await detailsPage.clickContinueBtn()

        // Fill payment details
        await paymentPage.chooseCreditCard()
        await paymentPage.enterName(donorData.firstname)
        await paymentPage.fillPaymentDetails(donorData)
        await paymentPage.chooseGiftAid()
        await paymentPage.clickCompleteBtn();

        // Capture transaction call response body
        const response = await thanksPage.page.waitForResponse(response => response.url().includes('https://api.pws.int.cruk.org/transaction'));
        const responseBody = await response.json();
        // Capture the reference ID text from API
        const apiReferenceID = responseBody.id;
        const uiReferenceIDText = await thanksPage.getUIreferenceID()
        // Compare API reference ID with UI reference ID
        if (verifReferenceIds(apiReferenceID, uiReferenceIDText)) {
            console.log(`Donation reference ID ${uiReferenceIDText} matches with the API response ID ${apiReferenceID}`);
        } else {
            console.log(`Donation reference ID ${uiReferenceIDText} does not matches with the API response ID ${apiReferenceID}`);
        }
    });

});
// Function to check if two reference IDs are equal
function verifReferenceIds(apiReferenceID: string, uiReferenceID: string): boolean {
    return apiReferenceID === uiReferenceID;
}