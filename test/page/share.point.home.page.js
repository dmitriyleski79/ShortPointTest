const microsoftLoginPage = require('../page/microsoft.login.page.js')

class SharePointHomePage {


    get startButton () {
        return $('a[data-shortpoint^="%22button"]')
    }

    get homeButton () {
        return $('div[name="Home"]')
    }


    
    startButtonClick () { 
        browser.waitUntil(() => this.homeButton.isDisplayed())
        if (!this.startButton.isDisplayed()) {
            this.homeButton.click()
        }
        browser.waitUntil(() => this.startButton.isDisplayed())
        this.startButton.scrollIntoView()
        this.startButton.click()
    }


    login () {
        microsoftLoginPage.login()
    }

}

module.exports = new SharePointHomePage()