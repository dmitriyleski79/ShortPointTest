class MicrosoftLoginPage {

    get loginField () { return $('input#i0116') }
    get passwordField () { return $('#i0118') }
    get submitButton () { return $('#idSIButton9') }
    get signedInLogo () { return $('//div[.="Stay signed in?"]') }
    get askWindow () { return $('.inner.fade-in-lightbox') }
        
    
    async setUserLoginAndClick(value) {
        await (await this.loginField).waitForDisplayed({timeot: 5000})
        await (await this.loginField).addValue(value)
        await (await this.submitButton).click()
    }

    async setUserPasswordAndClick(value) {
        await (await this.passwordField).waitForDisplayed({timeot: 5000})
        await (await this.passwordField).addValue(value)
        await (await this.submitButton).click()
    }

    async open (username, password) {
        await this.setUserLoginAndClick(username)
        await this.setUserPasswordAndClick(password)
        await (await this.submitButton).waitForDisplayed({timeot: 5000})
        await (await this.submitButton).click()    
    }
} 
module.exports = MicrosoftLoginPage