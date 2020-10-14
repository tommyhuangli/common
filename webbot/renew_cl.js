const Apify = require('apify');
const fs = require('fs');
const config = require('./config.json');

Apify.main(async () => {
    // const browser = await puppeteer.launch({ headless: true });
    
   
    const browser = await Apify.launchPuppeteer({ headless: true, ignoreHTTPSErrors: true });
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.61 Safari/537.36');
    await page.goto('https://accounts.craigslist.org/login');
    await page.screenshot({ path: 'logs/cl_login.jpg', type: 'jpeg' });

    let password = await page.$('#inputPassword');
    if (password != null) {
        // Login
        console.log('Logging in...');
        await page.type('#inputEmailHandle', config.cl.username);
        await page.type('#inputPassword', config.cl.password);
        await page.click('#login');
        await page.waitForNavigation();
        await page.screenshot({ path: 'logs/cl_account.jpg', type: 'jpeg' });
    }

    await page.$$eval('input[value="renew"]', links => links.forEach(link => link.click()))

    await page.close();
    await browser.close();
});