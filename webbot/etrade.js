const Apify = require('apify');
const fs = require('fs');
const config = require('./config.json');

Apify.main(async () => {
    // const browser = await puppeteer.launch({ headless: true });
    
    const COOKIE_FILE = 'cookies/etrade.json';
    const browser = await Apify.launchPuppeteer({ headless: true, ignoreHTTPSErrors: true });
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.61 Safari/537.36');


    try {
        if (fs.existsSync(COOKIE_FILE)) {
            console.log('Cookies exists. Loading cookies...');
            const cookiesString = await fs.promises.readFile(COOKIE_FILE);
            const cookies = JSON.parse(cookiesString);
            await page.setCookie(...cookies);
        }
    } catch (err) {
        console.log(err)
    }

    await page.goto('');
    await page.screenshot({ path: 'logs/etrade_login.jpg', type: 'jpeg' });

    let username = await page.$('#user_orig');
    if (username != null) {
        // Login
        console.log('Logging in to E-Trade for ' + config.etrade.username);
        await page.type('#user_orig', config.etrade.username);
        await page.type('input[name="PASSWORD"]', config.etrade.password);
        await page.click('#logon_button');
        await page.waitForNavigation();

        console.log('Saving cookies...');
        const cookies = await page.cookies();
        await fs.promises.writeFile(COOKIE_FILE, JSON.stringify(cookies, null, 2));
    }

    await page.screenshot({ path: 'logs/etrade_agreement.jpg', type: 'jpeg' });

    page.click('input[value="Accept"]');
    await page.waitForNavigation();
    await page.screenshot({ path: 'logs/etrade_accepted.jpg', type: 'jpeg' });

    const extractedValue = await page.$eval('input[type="text"]', el => el.value);
    console.log('OAuth code: ' + extractedValue);


    await page.close();
    await browser.close();
});
