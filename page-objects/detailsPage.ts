import { Page, Locator } from "@playwright/test"
export default class DetailsPage {
    readonly page: Page
    readonly titleSelect: Locator
    readonly firstNameTxt: Locator
    readonly lastNameTxt: Locator
    readonly emailAddressTxt: Locator
    readonly phoneNumberTxt: Locator
    readonly postCodeTxt: Locator
    readonly enterAddressManuallyLnk: Locator
    readonly enterAddressLineOneTxt: Locator
    readonly enterCityTxt: Locator
    readonly emailOptOutRadio: Locator
    readonly textOptOutRadio: Locator
    readonly continueBtn: Locator

    constructor(page: Page) {
        this.page = page
        this.titleSelect = this.page.locator("//select[@data-testid='title']")
        this.firstNameTxt = this.page.locator("//input[@id='forename']")
        this.lastNameTxt = this.page.locator("//input[@id='surname']")
        this.emailAddressTxt =this.page.locator("//input[@id='emailAddress']")
        this.phoneNumberTxt = this.page.locator("//input[@id='phoneNumber']")
        this.postCodeTxt = this.page.locator("//input[@id='postalCode']")
        this.enterAddressLineOneTxt = this.page.locator("//input[@id='forename']")
        this.enterAddressManuallyLnk = this.page.locator("//button[text()='Enter address manually']")
        this.enterAddressLineOneTxt = this.page.locator("//input[@name='addressLine1']")
        this.enterCityTxt = this.page.locator("//input[@name='city']")
        this.emailOptOutRadio = this.page.locator("//input[@name='emailOptIn' and @value='no']")
        this.textOptOutRadio = this.page.locator("//input[@name='textOptIn' and @value='no']")
        this.continueBtn = this.page.locator("//button[span[text() = 'Continue']]");
    }
   
    async clickContinueBtn() {
        await this.continueBtn.click()
    }
    async selectTitle() {
        await this.titleSelect.selectOption({ label: 'Mr' });
    }
    async enterFirstName(strFname: string) {
        await this.firstNameTxt.fill(strFname)
    }
    async enterLastName(strLname: string) {
        await this.lastNameTxt.fill(strLname)
    }
    async enterEmail(strEmail: string) {
        await this.emailAddressTxt.fill(strEmail)
    }
    async enterphoneNumber(strPhone: string) {
        await this.phoneNumberTxt.fill(strPhone)
    }
    async enterpostCode(strPostCode: string) {
        await this.postCodeTxt.fill(strPostCode)
    }
    async enterAddressManually() {
        await this.enterAddressManuallyLnk.click()
    }
    async enterAddressLineOne(strAdLineOne: string) {
        await this.enterAddressLineOneTxt.fill(strAdLineOne)
    }
    async enterCity(strCity: string) {
        await this.enterCityTxt.fill(strCity)
    }
    
}
