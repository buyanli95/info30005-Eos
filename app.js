const express = require('express');
const app = express();
const router = require('./routes/routes');

// connect database using a driver via MongoDB URI
const mongodb = require('mongodb');
let uri = 'mongodb://eosdev:info30005@ds259119.mlab.com:59119/eosdb';

mongodb.MongoClient.connect(uri, function(err, client){
    if(err) throw err;
    let db = client.db('eosdb');
    db.once('open', function () {
        console.log('connect mongo')
    });
    let participants = db.collection('participants');
    let participant_data = [
        {
            fullName : 'par',
            email: 'par@gmail.com',
            password: 'pass'
        },
        {
            fullName: 'pro',
            email: 'pro@gmail.com',
            password: 'pass'
        }
    ];
    participants.insert(participant_data, function (err, result) {
        if(err) throw err;
    })



    //creat seed data for test
    // let seedData = [
    // {
    //     decades: '1990s',
    //     song: 'you light up my life'
    // }];
    // let songs = db.collection('songs');
    // songs.insert(seedData, function (err, result) {
    //     if(err) throw err;
    // })

    //test insert to exsiting collection 'test'
    // db.collection('test').insertOne(
    //     {
    //         title:'hello'
    //     },
    //     function(err, res){
    //         if(err){
    //             db.close();
    //             return console.log(err);
    //         }
    //     }
    // )
})

//db2
// const MongoClient = require('mongodb').MongoClient;
// const Mongo_URL = 'mongodb://eosdev:info30005@ds259119.mlab.com:59119/eosdb';
// MongoClient.connect(Mongo_URL, (err, db) =>{
//     if(err){
//         return console.log(err);
//     }
//     db.collection('test').insertOne(
//         {
//             title: "hello mongodb",
//             text: 'works?'
//         },
//         function(err, res){
//             if(err){
//                 db.close();
//                 return console.log(err);
//             }
//             db.close();
//         }
//     )
// });


const PORT = process.env.PORT || 3000;

app.set("view engine", 'ejs');
//allow app to make use of routes, the router is exported from the routes file
app.use('/', router);
app.use(express.static(__dirname + '/public'));

app.listen(PORT, function(){
    console.log(`Express listening on port ${PORT}`);
});
