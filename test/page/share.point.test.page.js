class SharePointTestPage {

    // get nextButton() {
    //     return $('div[aria-live="polite"]+button')
    // }

    // get logo () {
    //     return $('#spSiteHeader')
    // }

    get slideshow() {
        return $$('div[data-shortpoint-type="image-carousel"]')
    }

    get pictureOnPage () {
        return $$('div.sp-type-column')
    }

    get visibleElem () {
        return $$('div[aria-hidden="false"]')
    }


    pictuersDisplayedVerify(needCheck) {
        let result = []
        browser.waitUntil(() => this.pictureOnPage[0].isDisplayed())
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
        if (needCheck.length == 0) return true
        else return false
    }

    get tiles () {
        return $$('div[data-shortpoint-type="tile"]')
    }

    get imageInsideTile () {
        // return $$('div.shortpoint-tile-description')
        // return $$('div.shortpoint-tile-bg-color')
        // return $$('.shortpoint-tile-bg i')
        // return $$('div.shortpoint-resize-keep-transition')
        // return $$('div.shortpoint-tile-title-inner')
        // return $$('div.shortpoint-tile-title-inner')
    }

    tilesAnimationVerify() {
        let flag = false
        let before = []
        let after = []
        this.pictureOnPage[1].scrollIntoView()
        for(let image of this.imageInsideTile) {
            let count = this.imageInsideTile.length-1
            before.push(image.isDisplayed())
            this.tiles[count].moveTo()
            after.push(image.isDisplayed())
            --count
            // for(let image of this.imageInsideTile) {
            //     elem.moveTo()
            //     if(image.isClickable()) {
            //         flag = true
            //     }
            // }
        }
    console.log(`IMAGES BEFORE: ${before}`) 
    console.log(`IMAGES AFTER: ${after}`)    

    }

}   

// div[aria-hidden="false"]

module.exports = new SharePointTestPage()