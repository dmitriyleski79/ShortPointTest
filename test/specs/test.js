
const SharePointHomePage = require('../page/share.point.home.page.js');
const sharePointHomePage = new SharePointHomePage()
const SharePointTestPage = require('../page/share.point.test.page.js');
const sharePointTestPage = new SharePointTestPage()
// const assert = require('assert');
const expect = require('chai').expect;

describe('My test for ShortPoint', () => {

    it('login to SharePoint', async () => {
        
        await sharePointHomePage.open('sptestautomation@antongshortpoint.onmicrosoft.com', '7310413Anton')
        await sharePointHomePage.startButtonClick()
        await browser.switchWindow('https://antongshortpoint.sharepoint.com/sites/HomeSite/internalsite/testtask')
        expect(await browser.getTitle()).to.equal('Test task - Home')    
    });

    it('Slideshow is working', async () => {
        expect(await sharePointTestPage.pictuersDisplayedVerify(['Picture 1', 'Picture 2', 'Picture 3', 'Picture 4'])).to.equal(true)
    });

    it('Verify that hover effects for each Tile are animated', async () => {
        expect(await sharePointTestPage.tilesAnimationVerify()).to.equal(true)
    });

});

