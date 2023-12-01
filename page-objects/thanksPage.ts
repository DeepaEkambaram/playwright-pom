import { Page, Locator } from "@playwright/test"
export default class ThanksPage {
    readonly page: Page
    readonly referenceIDTxt: Locator

    constructor(page: Page) {
        this.page = page
        this.referenceIDTxt = this.page.locator("//p/strong")
    }

    async getUIreferenceID(): Promise<string> {
        await this.referenceIDTxt.waitFor({ state: 'visible' });
        const referenceID = await this.referenceIDTxt.innerText()
        return referenceID.trim()
    }
 
}