const Apify = require('apify');
const fs = require('fs');
const config = require('./config.json');

Apify.main(async () => {
    // const browser = await puppeteer.launch({ headless: true });
    const COOKIE_FILE = 'cookies/nextdoor.json';
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
    
    await page.goto("https://nextdoor.com/for_sale_and_free/?init_source=more_menu&is_free=true&query=imac");

    let password = await page.$('#id_password');
    if (password != null) {
        // Login
        console.log('Logging in...');
        await page.type('#id_email', config.nextdoor.username);
        await page.type('#id_password', config.nextdoor.password);
        await page.click('#signin_button');
        await page.waitForNavigation();

        const cookies = await page.cookies();
        await fs.promises.writeFile(COOKIE_FILE, JSON.stringify(cookies, null, 2));
    }
    
    await page.screenshot({ path: 'logs/nextdoor_logged_in.jpg', type: 'jpeg' });

    await page.close();
    await browser.close();
});