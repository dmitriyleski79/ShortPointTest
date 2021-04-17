class SharePointTestPage {

    get slideshow () { return $$('div[data-shortpoint-type="image-carousel"]') }
    get pictureOnPage () { return $$('div.sp-type-column') }
    get visibleElem () { return $$('div[aria-hidden="false"]') }
    get tiles () { return $$('div[data-shortpoint-type="tile"]') }

    async pictuersDisplayedVerify(needCheck) {
        let result = []
        await (await this.pictureOnPage)[0].waitForDisplayed({timeot: 5000})
        for (let elem of await (await this.visibleElem)) {
            if (await elem.isDisplayed()) {
                result.push(await elem.getText())
                needCheck.splice(needCheck.indexOf(await elem.getText()), 1) 
            } else continue  
        }
        if (needCheck.length > 0) {
            for (let text of needCheck) {
                await browser.waitUntil(async () => {
                    let elem = await this.slideshow.find(elem => elem.getText() == text && elem.isDisplayed())
                    if(elem) {
                        result.push(await (await elem).getText())
                        needCheck.splice(needCheck.indexOf(await (await elem).getText()), 1)
                    } 
                    return elem   
                })
            }
        }
        if (needCheck.length == 0) return true
        else return false
    }


    get imageInsideTile () { return $$('div.shortpoint-tile-bg i') }

        // return $$('div.shortpoint-tile-bg i')  //clik//IMAGES BEFORE: false,true,true,false
                                                     //IMAGES AFTER: false,true,true,false
        // return $$('div.shortpoint-tile-description')  //clik//IMAGES BEFORE: false,true,true,false
                                                            //IMAGES AFTER: false,true,true,false

        // return $$('div.shortpoint-tile-bg-color')
        // return $$('div.shortpoint-resize-keep-transition')  //click//IMAGES BEFORE: true,true,false,false
                                                                    //IMAGES AFTER: true,true,false,false
        // return $$('div.shortpoint-tile-title-inner') //click//IMAGES BEFORE: true,true,false,false
                                                            //IMAGES AFTER: true,true,false,false
        // return $$('div.shortpoint-tile-bg') //clik//IMAGES BEFORE: false,true,true,false
                                                //IMAGES AFTER: false,true,true,false
        // return $$('div.shortpoint-tile-content')  //click//IMAGES BEFORE: true,true,false,false
                                                        //IMAGES AFTER: true,true,false,false
        // return $$('div.shortpoint-tile-title')
        // return $$('shortpoint-tile-description-wrap')   //----
        // return $$('shortpoint-tile-description')   //----
    

    async tilesAnimationVerify() {
        let flag = false
        let before = []
        let after = []
        await (await this.pictureOnPage[1]).scrollIntoView()
        for(let image of await (await this.imageInsideTile)) {
            let count = await (await this.imageInsideTile).length-1
            before.push(await image.isDisplayed())
            await (await this.tiles[count]).moveTo()
            after.push(await image.isDisplayed())
            --count
        }
    console.log(`IMAGES BEFORE: ${before}`) 
    console.log(`IMAGES AFTER: ${after}`)    

    }

}   

module.exports = SharePointTestPage