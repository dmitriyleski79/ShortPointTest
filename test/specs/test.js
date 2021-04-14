
const sharePointHomePage = require('../page/share.point.home.page.js');
const sharePointTestPage = require('../page/share.point.test.page.js');
const assert = require('assert');
const expect = require('chai').expect;

describe('My test for ShortPoint', () => {
    it('login to SharePoint', () => {
        browser.url('https://antongshortpoint.sharepoint.com/sites/HomeSite');
        browser.setTimeout({ 'implicit': 700 })
        sharePointHomePage.login()
        sharePointHomePage.startButtonClick()
        browser.switchWindow('https://antongshortpoint.sharepoint.com/sites/HomeSite/internalsite/testtask')
        expect(browser.getTitle()).to.equal('Test task - Home')    
    });

    it('Slideshow is working', () => {
        expect(sharePointTestPage.pictuersDisplayedVerify(['Picture 1', 'Picture 2', 'Picture 3', 'Picture 4'])).to.equal(true)
    });

    xit('Verify that hover effects for each Tile are animated', () => {

    });

});

