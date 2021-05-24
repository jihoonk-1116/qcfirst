const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const User = require('../model/User');
const Course = require('../model/Course');
const Enrolled_Course = require('../model/Enrolled_Course');
const Log = require('../model/Log');

const JWT_SECRET = 'mysecret!@#!!@#DFfojqiwjr812i12898alkjqjwas123';
router.use(bodyParser.urlencoded({extended: true}));


router.get('/getlogs', async(req,res)=>{
    console.log('Logs')
    try{
        const logs = await Log.find({});
        console.log(logs);
        res.status(200).json(logs);
    }catch(err){
        console.log(err);
        res.status(401).json({status:'error' ,error:"Fail to get logs"});
    }
})

router.get('/getclasses', async(req,res)=>{
    console.log('Classes')
    try{
        const course = await Course.find({});
        console.log(course);
        res.status(200).json(course);
    }catch(err){
        console.log(err);
        res.status(401).json({status:'error' ,error:"Fail to get classes"});
    }
})

router.get('/getenrolledclasses', async(req,res)=>{
    console.log('Enrolled Classes')
    try{
        const course = await Enrolled_Course.find({});
        console.log(course);
        res.status(200).json(course);
    }catch(err){
        console.log(err);
        res.status(401).json({status:'error' ,error:"Fail to get enrolled classes"});
    }
})

router.get('/getusers', async(req,res)=>{
    console.log('Users')
    try{
        const users = await User.find({});
        console.log(users);
        res.status(200).json(users);
    }catch(err){
        console.log(err);
        res.status(401).json({status:'error' ,error:"Fail to get users"});
    }
    
})

module.exports = router;
