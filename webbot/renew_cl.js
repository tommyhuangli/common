const Apify = require('apify');
const fs = require('fs');
const config = require('./config.json');

Apify.main(async () => {
    // const browser = await puppeteer.launch({ headless: true });
    
    const COOKIE_FILE = 'cookies/craigslist.json';
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

    await page.goto('https://accounts.craigslist.org/login/home');

    let password = await page.$('#inputPassword');
    if (password != null) {
        // Login
        console.log('Logging in...');
        await page.type('#inputEmailHandle', config.cl.username);
        await page.type('#inputPassword', config.cl.password);
        await page.click('#login');
        await page.waitForNavigation();

        console.log('Saving cookies...');
        const cookies = await page.cookies();
        await fs.promises.writeFile(COOKIE_FILE, JSON.stringify(cookies, null, 2));
    }

    var alldone = false;
    while (! alldone) {
        const element = await page.$('input[value="renew"]');
        if (element == null) {
            alldone = true;
            console.log('All renewed. ');
        }
        else {
            await page.$$eval('input[value="renew"]', links => links.forEach(link => link.click()))
        }
    }

    await page.close();
    await browser.close();
});