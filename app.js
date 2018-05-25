const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const config = require('./config/database');



//check connection
// mongoose.connect('mongodb://eosdev:info30005@ds259119.mlab.com:59119/eosdb');
mongoose.connect(config.database);
let db = mongoose.connection;
db.once('open', function(){
	console.log('Connect to MongoDB');
})
//check db errors
db.on('error', function(err){
	console.log(err);
});
module.exports = db;

//init app
const app = express();

//public files
app.use(express.static(__dirname + '/public'));

//view engine
app.set("view engine", 'ejs');
app.use(flash());

// Body Parser Middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());


// Express Session Middleware
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));

// Express Messages Middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

// Express Validator Middleware
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// Passport Config
require('./config/passport')(passport);
// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());



//Route files
//allow app to make use of routes, the router is exported from the routes file
const router = require('./routes/routes');
const users = require('./routes/users');
const posts = require('./routes/posts');
app.use('/', router);
app.use('/users', users);
app.use('/posts', posts);


const PORT = process.env.PORT || 3000;
app.listen(PORT, function(){
    console.log(`Express listening on port ${PORT}`);
});



