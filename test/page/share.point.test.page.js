class SharePointTestPage {

    get slideshow () { return $$('div[data-shortpoint-type="image-carousel"]') }
    get pictureOnPage () { return $$('div.sp-type-column') }
    get visibleElem () { return $$('div[aria-hidden="false"]') }
    get tilesWithData () { return $$('div[data-shortpoint-type="tile"] [class*=transition]') }
    get tiles () { return $$('div[data-shortpoint-type="tile"]')}

    
    async pictuersDisplayedVerify(needCheck) {
        await (await this.pictureOnPage)[0].waitForDisplayed({timeot: 5000})
        for (let elem of await (await this.visibleElem)) {
            if (await elem.isDisplayed()) {
                needCheck.splice(needCheck.indexOf(await (await elem).getText()), 1) 
            } else continue  
        }
        if (needCheck.length > 0) {
            for (let text of needCheck) {
                await browser.waitUntil(async () => {
                    let elem = await this.slideshow.find(elem => elem.getText() == text && elem.isDisplayed())
                    if(elem) {
                        needCheck.splice(needCheck.indexOf(await (await elem).getText()), 1)
                    } 
                    return elem   
                })
            }
        }
        if (needCheck.length == 0) return true
        else return false
    }

    async tilesAnimationVerify() {
        await (await this.pictureOnPage)[1].waitForDisplayed({timeot: 5000})
        await (await this.pictureOnPage)[1].scrollIntoView()
        const before = []
        const after = []
        const dataOfTile = async (elem) => {
            return {
                size: await (await elem).getSize(),
                location: await (await elem).getLocation(),
                backgroundColor: await (await elem).getCSSProperty('backgroundColor')
            }
        }

        for (let picture of await (await this.tilesWithData)) {
            let count = 0
            await (await picture).waitForDisplayed({timeot: 5000})
            before.push(await dataOfTile(picture))
            await (await this.tiles)[count].moveTo()
            after.push(before[count] != await dataOfTile(picture))
            ++count
        } 
        return after.includes(false)  
    }    
}   

module.exports = SharePointTestPage