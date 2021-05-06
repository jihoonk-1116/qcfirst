const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

app.use(express.static(path.join(__dirname,'view')));

mongoose.connect("mongodb+srv://JihoonDB:6581139a@firstdb.irfsc.mongodb.net/firstDB?retryWrites=true&w=majority",{
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    },
    (err)=>{console.log("DB connected",err)});

var userapp = require('./apps/user_app.js');
app.use('/user',userapp);
// var imgapp = require('./apps/img_app.js');
// app.use('/img',imgapp);

app.listen(3000, ()=>{
    console.log("Listening on port 3000");
})