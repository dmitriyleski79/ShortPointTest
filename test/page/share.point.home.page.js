const MicrosoftLoginPage = require('../page/microsoft.login.page.js')
const microsoftLoginPage = new MicrosoftLoginPage()

class SharePointHomePage {

    get startButton () { return $('a[data-shortpoint^="%22button"]') }
    get homeButton () { return $('div[name="Home"]') }

    
    async startButtonClick () { 
        await (await this.homeButton).waitForDisplayed({timeot: 5000})
        if (!await (await this.startButton).isDisplayed()) {
            await (await this.homeButton).click()
        }
        await (await this.startButton).waitForDisplayed({timeot: 5000})
        await (await this.startButton).scrollIntoView()
        await (await this.startButton).click()
    }

    async open (username, password) {
        await browser.url('https://antongshortpoint.sharepoint.com/sites/HomeSite');
        await microsoftLoginPage.open(username, password)
    }
}

module.exports = SharePointHomePage