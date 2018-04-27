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

//view engine
app.set("view engine", 'ejs');

// Body Parser Middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

//Route files
//allow app to make use of routes, the router is exported from the routes file
const router = require('./routes/routes');
const users = require('./routes/users');
app.use('/', router);
app.use('/users', users);


const PORT = process.env.PORT || 3000;
app.listen(PORT, function(){
    console.log(`Express listening on port ${PORT}`);
});

// connect database using a driver via MongoDB URI
// const mongodb = require('mongodb');
// let uri = 'mongodb://eosdev:info30005@ds259119.mlab.com:59119/eosdb';
// mongodb.MongoClient.connect(uri, function(err, client) {
//     if (err) throw err;
//     let db = client.db('eosdb');
//     let participants = db.collection('participants');
//     let participant_data = [
//         {
//             fullName: 'par',
//             email: 'par@gmail.com',
//             password: 'pass'
//         },
//         {
//             fullName: 'pro',
//             email: 'pro@gmail.com',
//             password: 'pass'
//         }
//     ];
//     //write data
//     participants.insert(participant_data, function (err, result) {
//         if (err) throw err;
//     })
//     //read dara
//     participants.find(
//         {
//             fullName: 'par'
//         }).toArray(function (err, docs) {
//         console.log(docs[0]);
//     })
// })


