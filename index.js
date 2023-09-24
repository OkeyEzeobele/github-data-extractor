const githubController = require('./controller.js');

(async function() {
    await githubController.generateCSVs();
    console.log('CSV generation complete.');
})();
