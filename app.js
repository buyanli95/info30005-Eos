const express = require('express');
const router = require('./routes/routes');
const bodyParser = require('body-parser');


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

//init app
const app = express();

//allow app to make use of routes, the router is exported from the routes file
app.use('/', router);
app.use(express.static(__dirname + '/public'));

//view engine
app.set("view engine", 'ejs');

const PORT = process.env.PORT || 3000;
app.listen(PORT, function(){
    console.log(`Express listening on port ${PORT}`);
});
