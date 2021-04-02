const dotenv = require("dotenv");
dotenv.config();

const username = process.env.USERNAME;
const password = process.env.PASSWORD;

const ig = require('./instagram');
// instantly instantiating out function protects any information inside from being accessed from the outside
(async () => {
    await ig.initialize();
    await ig.login(username, password);
    // pass in our tags
    await ig.likeTagProcess(['ulzzang', 'korea', 'cute'])
    debugger;
})()