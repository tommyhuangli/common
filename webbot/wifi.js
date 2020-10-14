const Apify = require('apify');
const fs = require('fs');
const config = require('./config.json');

Apify.main(async () => {
    // const browser = await puppeteer.launch({ headless: true });
    
    const mac = 'b0:ca:68:bc:47:39'; //iPad 

    const browser = await Apify.launchPuppeteer({ headless: true, ignoreHTTPSErrors: true });
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.61 Safari/537.36');
    await page.goto(config.wifi.att_base + '/cgi-bin/wmacauth.ha');
    await page.screenshot({ path: 'logs/wifi_login.jpg', type: 'jpeg' });

    let password = await page.$('#password');
    if (password != null) {
        // Login
        console.log('Logging in...');
        await page.type('#username', config.wifi.username);
        await page.type('#password', config.wifi.password);
        await page.click('[name="Continue"]');
        await page.waitForNavigation();
        await page.screenshot({ path: 'logs/wifi_auth.jpg', type: 'jpeg' });
    }

    hasMacAdded = false;

    if (! hasMacAdded) {        
        
        // add to black list
        console.log('Adding ' + mac + ' to black list');
        await page.type('#macaddress', mac);
        await page.click('[name="Add"]');
        await page.screenshot({ path: 'logs/wifi_auth-added.jpg', type: 'jpeg' });
    }

    let macDelBtn = await page.$('[name="	Remove_' + mac + '	"]');
    if (macDelBtn == null) {
        console.log('del button not found')
    }

    if (hasMacAdded) {
        // remove from black list
        console.log('Removing ' + mac + ' from black list');
        await page.click('[name="	Remove_' + mac + '	"]');
        await page.waitForNavigation();
        await page.screenshot({ path: 'logs/wifi_auth-removed.jpg', type: 'jpeg' });
    }

    await page.close();
    await browser.close();
});