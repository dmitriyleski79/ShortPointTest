class SharePointTestPage {

    get pictureOnPage () { return $$('div.sp-type-column') }
    get visibleElem () { return $$('div[aria-hidden="false"]') }
    get tilesWithData () { return $$('div[data-shortpoint-type="tile"] [class*=transition]') }
    get tiles () { return $$('div[data-shortpoint-type="tile"]')}
    get nextButton () {return $('.slick-next')}

    async getData () {
        const result = []
        for (let elem of await (await this.visibleElem)) {
            if (await elem.isDisplayed()) { 
                result.push(await (await elem).getText())
            } else continue  
        }    
    return result    
    }

    async pictuersDisplayedVerify() {
        await (await this.pictureOnPage)[0].waitForDisplayed({timeot: 5000})
        const allresult = []
        let result = []
        do {
            result = await this.getData()
            for (let text of result){
                if (allresult.includes(text)) continue
                else {
                    allresult.push(text)
                    result.splice(result.indexOf(text), 1)
                }    
            }
            await(await this.nextButton).click()
            await browser.pause(600)
        } while (result.length != 3)
        return allresult.length
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
        return (!after.includes(false))  
    }    
}   

module.exports = SharePointTestPage