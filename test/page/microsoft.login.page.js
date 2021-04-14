class MicrosoftLoginPage {

    get loginField () {
        return $('input#i0116')
    }

    setUserLoginAndClick(value) {
        browser.waitUntil(() => this.loginField.isDisplayed())
        this.loginField.addValue(value)
        this.submitButton.click()
    }

    get passwordField () {
        return $('#i0118')
    }


    setUserPasswordAndClick(value) {
        browser.waitUntil(() => this.passwordField.isDisplayed())
        this.passwordField.addValue(value)
        this.submitButton.click()
    }

    get submitButton () {
        return $('#idSIButton9')
    }

    get signedInLogo () {
        return $('//div[.="Stay signed in?"]')
    }

    get askWindow () {
        return $('.inner.fade-in-lightbox')
    }

    get backButton () {
        return $('#idBtn_Back')
    }

    login () {
        
        this.setUserLoginAndClick('sptestautomation@antongshortpoint.onmicrosoft.com')
        this.setUserPasswordAndClick('7310413Anton')
        if(this.askWindow.isDisplayed()) {
            this.backButton.click()
        }    
        
    }

}

module.exports = new MicrosoftLoginPage()