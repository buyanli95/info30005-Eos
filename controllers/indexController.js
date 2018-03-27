timeCounter = require('../public/js/timeCounter')

module.exports.homePage = function (req, res) {
    //res.send('this is the home page!');
    res.render('home_template', {TimeCounter: timeCounter});
};