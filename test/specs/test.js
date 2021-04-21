
const SharePointHomePage = require('../page/share.point.home.page.js');
const SharePointTestPage = require('../page/share.point.test.page.js');
const sharePointHomePage = new SharePointHomePage()
const sharePointTestPage = new SharePointTestPage()
const expect = require('chai').expect;

describe('My test for ShortPoint', () => {

    beforeEach(async () => {
        await sharePointHomePage.open('sptestautomation@antongshortpoint.onmicrosoft.com', '7310413Anton')
        await sharePointHomePage.startButtonClick()
        await browser.switchWindow('https://antongshortpoint.sharepoint.com/sites/HomeSite/internalsite/testtask')
      });
      
    afterEach(async () => {
        await browser.reloadSession()
    })  

    it('login to SharePoint', async () => {
        expect(await browser.getTitle()).to.equal('Test task - Home')  
    });

    it('Slideshow is working', async () => {
        expect(await sharePointTestPage.pictuersDisplayedVerify()).to.equal(4)
    });

    xit('Verify that hover effects for each Tile are animated', async () => {
        expect(await sharePointTestPage.tilesAnimationVerify()).to.equal(true)
    });

});

