
const sharePointHomePage = require('../page/share.point.home.page.js');
const sharePointTestPage = require('../page/share.point.test.page.js');
const assert = require('assert');
const expect = require('chai').expect;

describe('My test for ShortPoint', () => {

    beforeEach (() => browser.setTimeout({ 'implicit': 1000 }))

    it('login to SharePoint', () => {
        browser.url('https://antongshortpoint.sharepoint.com/sites/HomeSite');
        sharePointHomePage.login()
        sharePointHomePage.startButtonClick()
        browser.switchWindow('https://antongshortpoint.sharepoint.com/sites/HomeSite/internalsite/testtask')
        expect(browser.getTitle()).to.equal('Test task - Home')    
    });

    xit('Slideshow is working', () => {
        expect(sharePointTestPage.pictuersDisplayedVerify(['Picture 1', 'Picture 2', 'Picture 3', 'Picture 4'])).to.equal(true)
    });

    it('Verify that hover effects for each Tile are animated', () => {
        sharePointTestPage.tilesAnimationVerify()
    });

});

