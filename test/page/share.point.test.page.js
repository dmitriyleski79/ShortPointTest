class SharePointTestPage {

    get nextButton() {
        return $('div[aria-live="polite"]+button')
    }

    get logo () {
        return $('#spSiteHeader')
    }

    get slideshow() {
        return $$('div[data-shortpoint-type="image-carousel"]')
    }

    get slideshowLogo () {
        return $$('span.shortpoint-panel-title-text')
    }

    get visibleElem () {
        return $$('div[aria-hidden="false"]')
    }


    pictuersDisplayedVerify(needCheck) {
        let result = []
        browser.waitUntil(() => this.slideshowLogo[0].isDisplayed())
        for (let elem of this.visibleElem) {
            if (elem.isDisplayed()) {
                result.push(elem.getText())
                needCheck.splice(needCheck.indexOf(elem.getText()), 1) 
            } else continue
        }
        if (needCheck.length > 0) {
            for (let text of needCheck) {
                browser.waitUntil(() => {
                    let elem = this.slideshow.find(elem => elem.getText() == text && elem.isDisplayed())
                    if(elem) {
                        result.push(elem.getText())
                        needCheck.splice(needCheck.indexOf(elem.getText()), 1)
                    } 
                    return elem   
                })
            }
        } 
        console.log(`>> ,${needCheck}`)
        console.log(`>> ,${result}`) 
        if (needCheck.length == 0) return true
        else return false
    }

    get tiles () {
        return $$('div[data-shortpoint-type="tile"]')
    }

    get imageInsideTile () {
        return $('.shortpoint-tile-bg i')
    }

}   

// div[aria-hidden="false"]

module.exports = new SharePointTestPage()