import { Page, Locator } from "@playwright/test"
export default class HomePage {
    readonly page: Page
    readonly amountTenBtn: Locator
    readonly ownMoneyRadioBtn: Locator
    readonly memoryOfSomeoneSelect: Locator
    readonly continueBtn: Locator
    readonly acceptCookiesBtn: Locator

    constructor(page: Page) {
        this.page = page
        this.amountTenBtn = this.page.locator('#amount10')
        this.ownMoneyRadioBtn = this.page.locator('label').filter({ hasText: 'I am donating my own money' }).locator('div').first()
        this.memoryOfSomeoneSelect = this.page.locator('select[data-testid="selectMotivation"]');
        this.continueBtn = this.page.locator("//button[span[text() = 'Continue']]");
        this.acceptCookiesBtn = this.page.locator("//button[@id='onetrust-accept-btn-handler']")
    }

    async clickacceptCookiesBtn() {
        await this.acceptCookiesBtn.click()
    }
    async clickamountTenBtn() {
        await this.amountTenBtn.click()
    }
    async clickownMoneyBtn() {
        await this.ownMoneyRadioBtn.click()
    }
    async selectReason() {
        await this.memoryOfSomeoneSelect.selectOption({ label: 'In memory of someone' });
    }
    async clickContinueBtn() {
        await this.continueBtn.click()
    }

}