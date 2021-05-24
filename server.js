const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

app.use(express.static(path.join(__dirname,'view')));

mongoose.connect("mongodb+srv://JihoonDB:6581139a@firstdb.irfsc.mongodb.net/firstDB?retryWrites=true&w=majority",{
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: true
    },
    (err)=>{console.log("DB connected",err)});

var userapp = require('./apps/user_app.js');
app.use('/user',userapp);
var instapp = require('./apps/instructor_app.js');
app.use('/inst',instapp);
var stuapp = require('./apps/student_app.js');
app.use('/stu',stuapp);
var adminapp = require('./apps/admin_app.js');
app.use('/admin',adminapp);
var searchapp = require('./apps/search_app.js');
app.use('/search',searchapp);

app.listen(3000, ()=>{
    console.log("Listening on port 3000");
})

