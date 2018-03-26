const express = require('express');
const app = express();
const router = require('./routes/routes');

app.set("view engine", 'ejs');

//allow app to make use of routes, the router is exported from the routes file
app.use('/', router);

app.listen(3000, function(){
    console.log("server start at port 3000");
});
