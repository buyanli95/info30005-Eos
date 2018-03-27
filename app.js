const express = require('express');
const app = express();
const router = require('./routes/routes');

const PORT = process.env.PORT || 3000;

app.set("view engine", 'ejs');
//allow app to make use of routes, the router is exported from the routes file
app.use('/', router);
app.use(express.static(__dirname + '/public'));

// app.listen(3000, function(){
//     console.log("server start at port 3000");
// });

app.listen(PORT, function(){
    console.log(`Express listening on port ${PORT}`);
});
