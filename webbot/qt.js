const Apify = require('apify');
const fs = require('fs');
const config = require('./config.json');

Apify.main(async () => {
    // const browser = await puppeteer.launch({ headless: true });
    const COOKIE_FILE = 'cookies/qt.json';
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
    
    await page.goto("https://www.quantopian.com/algorithms/5f7909a37fedf2000ef9eec2");
    //await page.goto("https://www.quantopian.com/signin?return_to=/algorithms");

    let password = await page.$('#user_password');
    if (password != null) {
        // Login
        console.log('Logging in...');
        await page.type('#user_email', config.qt.username);
        await page.type('#user_password', config.qt.password);
        await page.click('#remember-checkbox');
        await page.click('#login-button');
        await page.waitForNavigation();

        console.log('Saving cookies...');
        const cookies = await page.cookies();
        await fs.promises.writeFile(COOKIE_FILE, JSON.stringify(cookies, null, 2));

        await page.goto("https://www.quantopian.com/algorithms/5f7909a37fedf2000ef9eec2");
    }
    await page.screenshot({ path: 'logs/qt_logged_in.jpg', type: 'jpeg' });

    // const extractedValue = await page.$eval('#element-id', el => el.innerHTML);
    // console.log('extracted value: ' + extractedValue);
    

    await page.close();
    await browser.close();
});