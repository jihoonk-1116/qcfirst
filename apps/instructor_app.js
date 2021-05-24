const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../model/User');
const Course = require('../model/Course');
const Enrolled_Course = require('../model/Enrolled_Course');


const JWT_SECRET = 'mysecret!@#!!@#DFfojqiwjr812i12898alkjqjwas123';
router.use(bodyParser.urlencoded({extended: true}));

router.get('/editprofile', async(req,res) => {

    console.log('auth');
    const token = req.headers['x-auth'];
    try{
        const decoded = jwt.decode(token, JWT_SECRET);
        console.log(decoded);
        var _id = decoded.id;
        const user = await User.findOne({_id}).lean();
        console.log(user);
        res.status(200).json(user);
    }catch(err){
        console.log(err);
        res.status(401).json({error:"Invalid JWT"});
    }
});

router.post('/saveprofile', async(req,res) => {
    const {name, dept,phone,prof,intro} = req.body;
    console.log('save req');
    const token = req.headers['x-auth'];
    try{
        const decoded = jwt.decode(token, JWT_SECRET);
        var _id = decoded.id;
        const user = await User.findOneAndUpdate(
            { '_id' : _id},
            {
                'name': name,
                'department': dept,
                'phone': phone,
                'profession': prof,
                'introduction': intro
            }).lean()
        console.log(user);
        return res.status(200).json(user);
    }catch(err){
        console.log(err);
        res.status(401).json({error:"Invalid JWT"});
    }
    throw error
});

router.post('/newclass', async(req,res) => {
    const {subject, courseId,semester,department,time,capacity,deadline,location,desc} = req.body;
    const token = req.headers['x-auth'];
    console.log(req.body);
    try{
        const decoded = jwt.decode(token, JWT_SECRET);
        //var _id = decoded.id;
        const instName = decoded.username
        const instId = decoded.id;
        const enrolled = 0;
        const course = await Course.create(
            {
                subject, courseId, instName, instId, 
                semester, department, time, capacity, enrolled,location,
                deadline,desc
            })
        console.log("save new class")
        console.log(course);
        return res.status(200).json(course);
    }catch(err){
        if(err.code === 11000){
            console.log(err);
            return res.json({ status: 'error', error: 'Course is already registered' })
        }
     console.log(err);     
    }
});

router.post('/removeclass', async(req,res) => {
    const {code} = req.body;
    const token = req.headers['x-auth'];
    try{
        const decoded = jwt.decode(token, JWT_SECRET);
        const instId = decoded.id;
        const course = await Course.findOneAndDelete(
            {
                'courseId':{
                    $regex: code,
                    $options:'i'
                }
            })
        console.log("Delete this class")
        console.log(course);
        return res.status(200).json(course);
    }catch(err){
     console.log(err);
     return res.status(400).json({ status: 'error', error: 'Course is already deleted or re-type the code' })     
    }
});

router.get('/updatecourse', async(req,res)=>{
    console.log('course')
    const token = req.headers['x-auth'];
    try{
        const decoded = jwt.decode(token, JWT_SECRET);
        console.log(decoded);
        var _id = decoded.id;
        const course = await Course.find({'instId':_id}).lean();
        console.log(course);
        res.status(200).json(course);
    }catch(err){
        console.log(err);
        res.status(401).json({status:'error' ,error:"Invalid JWT"});
    }
    
})


router.post('/getroster', async(req,res)=>{
    console.log('roster')
    const {code} = req.body;
    console.log(code);

    try{
        const students = await Enrolled_Course.find({'courseId':code}).lean();
        console.log(students);
        var stu_arr=[];
        for(student of students){
            console.log(student);
            var student = await User.findOne({'_id':student.studentId}).lean();
            stu_arr.push(student);
        }
        console.log(stu_arr);
        res.status(200).json(stu_arr);
    }catch(err){
        console.log(err);
        res.status(401).json({status:'error' ,error:"Invalid JWT"});
    }
    
})

router.get('/searchclassbycode', async(req,res)=>{
    const {section} = req.body;
    console.log('class Searching by code  ' + req.body.code)
    try{
        const course = await Course.find({'section':section}).lean();
        console.log(course);
        res.status(200).json(course);
    }catch(err){
        console.log(err);
        res.status(401).json({status:'error' ,error:"Invalid JWT"});
    }
    
})

module.exports = router;
