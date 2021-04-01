const puppeteer = require("puppeteer");

// new way of organizing functions
const instagram = {
    browser: null,
    page: null,
    initialize: async () => {
        // https://devdocs.io/puppeteer/index#class-browser
        // we pass in our headless option to run it in headless mode
        instagram.browser = await puppeteerlaunch({ headless: false });
        // create new page
        instagram.page = await instagram.browser.newPage();
        // https://devdocs.io/puppeteer/index#pagegotourl-options
        // https://devdocs.io/puppeteer/index#framegotourl-options

    },
    login: async (username, password) => {
        // go to page
        await instagram.page.goto(BASE_URL, { waitUntil: 'networkidle2' });
        // https://devdocs.io/puppeteer/index#pagexexpression
        // returns an array of all elements that contain the text "Log in!"
        let loginButton = await instagram.page.$x('//a[contains(text(), "Log in!")')
        //click login button
        await loginButton[0].click();
        await instagram.page.waitForNavigation({ waitUntil: "networkidle2" });
        await instagram.page.waitFor(1000);

        // add in login info
        await instagram.page.type('input[name="username"]', username, {delay:50});
        await instagram.page.type('input[name="password"]', password, {delay:50});
        debugger;
    }
}