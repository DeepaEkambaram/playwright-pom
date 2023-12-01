import { Page, Locator } from "@playwright/test"
export default class PaymentPage {
    readonly page: Page
    readonly giftAidLbl: Locator
    readonly completeBtn: Locator
    readonly creditCardRdo: Locator
    readonly cHolderNameTxt: Locator
    readonly cNumberTxt: Locator
    readonly expDateTxt: Locator
    readonly sCodeTxt: Locator

    constructor(page: Page) {
        this.page = page
        this.giftAidLbl = this.page.locator("//label[@for='giftAid1']")
        this.completeBtn = this.page.locator("//button[span[text() ='Complete my donation']]");
        this.creditCardRdo = this.page.locator('label').filter({ hasText: 'Credit / Debit card' }).locator('div').first()
        this.cHolderNameTxt = this.page.locator("//input[@id='cardholderName']");
        this.cNumberTxt = this.page.locator("//input[@name='credit-card-number']");
        this.expDateTxt = this.page.locator("//input[@id='expiration']");
        this.sCodeTxt = this.page.locator("//input[@id='cvv']");

    }
   
    async clickCompleteBtn() {
        await this.completeBtn.click()
    }
    async chooseCreditCard() {
        await this.creditCardRdo.click()
    }

    async enterName(strName: string) {
        await this.cHolderNameTxt.fill(strName)
    }

    async chooseGiftAid() {
        await this.giftAidLbl.click()
    }
    
  async fillPaymentDetails(donorData: any) {
    const cardNumberFrame = this.page.frame('braintree-hosted-field-number');
    await cardNumberFrame?.fill("input[name='credit-card-number']", donorData.cardNumber);
    const expirationDateFrame = this.page.frame('braintree-hosted-field-expirationDate');
    await expirationDateFrame?.fill("input[id='expiration']", donorData.cardExpiry);
    const cvvFrame = this.page.frame('braintree-hosted-field-cvv');
    await cvvFrame?.fill("input[id='cvv']", donorData.cvv);
  }
   
}
