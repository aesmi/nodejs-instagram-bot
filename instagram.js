const puppeteer = require("puppeteer");

const BASE_URL = "https://instagram.com/";

// new way of organizing functions
const instagram = {
    browser: null,
    page: null,
    initialize: async () => {
        // https://devdocs.io/puppeteer/index#class-browser
        // we pass in our headless option to run it in non-headless mode
        instagram.browser = await puppeteer.launch({ headless: false });
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
        // let loginButton = await instagram.page.$x('//a[contains(text(), "Log in")')
        // click login button
        // await loginButton[0].click();
        await instagram.page.waitFor(1000);

        // add in login info
        await instagram.page.type('input[name="username"]', username, { delay: 25 });
        await instagram.page.type('input[name="password"]', password, { delay: 25 });
        debugger;

        // click on login button
        await instagram.page.click('button[type="submit"]');
        // loginButton = await instagram.page.$x('//button[contains(text(), "Log In")]');
        // // await click
        // await loginButton[0].click();
        // wait one second
        await instagram.page.waitFor(1000);
        await instagram.page.waitFor('a > span[aria-label=["Profile"]');
        debugger;
    },

    likeTagProcess: async (tags = []) => {
        for (let tag of tags) {
            // go to tag
            await instagram.page.goto(TAG_URL(url), { waitUntil: "networkidle2" })
            await instagram.page.waitFor(1000);

            let posts = await instagram.page.$$('article > div:nth-child(3) img[decoding="auto"]')
        }
        // because we have 3 posts per row on ig
        for (let i = 0; i < 3; i++) {
            let post = posts[i];
            // click on the post
            await post.click();
            // wait for modal to appear
            await instagram.page.waitFor('span[id="react-root"][aria-hidden="false"]')
            await instagram.page.waitFor(1000);

            // check to see if the like button exist
            let isLikeable = await post.$('span]aria-label="Like"]')
            // if exist click on it
            if (isLikeable) {
                await post.click('span[aria-label="Like"]');
            }
            await instagram.page.waitFor(3000);
            // we close the modal regardless
            let closeModalButton = await instagram.page.click('//button[containers(text(), "Close")]');
            await closeModalButton[0].click;
            await instagram.page.waitFor(1000);
        }

        await instagram.page.waitFor(60000);
    }

}

module.exports = instagram;