const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');

const mongoose = require("mongoose");
const cors = require("cors");

const cookieParser = require("cookie-parser");

const URL='mongodb+srv://m001-student:m001-mongodb-basics@sandbox.xwpvdy5.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
   
}).then(()=>{
    console.log('MongoDB Connected successfully');
}).catch(error=>{
    console.log(error.message)
});

const app = express();


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

require('./app/routes')(app, {});

 //Enabling CORS
 

const port = 8080;

app.listen(port, () => {  console.log('We are live on ' + port);});

module.exports = app;