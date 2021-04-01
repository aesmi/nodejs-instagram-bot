const ig = require('./instagram');
// instantly instantiating out function protects any information inside from being accessed from the outside
(async () => {
    await ig.initialize();
    await ig.login('username', 'password');
    debugger;
})()