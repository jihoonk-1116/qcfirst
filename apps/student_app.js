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
router.use(bodyParser.json());

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

router.post('/enrollclass', async(req,res) => {
    const {code} = req.body;
    const token = req.headers['x-auth'];
    console.log("Enroll " + code);
    try{
        const decoded = jwt.decode(token, JWT_SECRET);
        const stuName = decoded.username
        const stuId = decoded.id;
        const check_course = await Enrolled_Course.findOne(
            {'courseId':code, 'studentId':stuId}
        );
        console.log(check_course);
        if(check_course){
            return res.status(401).json({error:"Already registered class!"})
        }
        const course = await Course.findOneAndUpdate(
            {'courseId':code},
            {$inc:{"enrolled" : 1}}
        );
        if(!course){
            return res.status(401).json({error:"Class is Not Found. Please Check the code!"})
        }
        const enrolled_course = await Enrolled_Course.create({
            'studentId':stuId,
            'subject' : course.subject,
            'courseId' : course.courseId,
            'instName' : course.instName,
            'semester': course.semester,
            'department': course.department,
            'time': course.time,
            'location':course.location,
            'desc':course.desc
        });
        console.log(enrolled_course);

        return res.status(200).json(enrolled_course);
    }catch(err){
        if(err.code === 11000){
            console.log(err);
            return res.json({ status: 'error', error: 'Course is already registered' })
        }
     console.log(err);     
    }
});

router.post('/dropclass', async(req,res) => {
    const {code} = req.body;
    const token = req.headers['x-auth'];
    try{
        const decoded = jwt.decode(token, JWT_SECRET);
        const _id = decoded.id;
        const course = await Enrolled_Course.findOneAndDelete(
            {'courseId':code , 'studentId':_id}
        )
        const updated_course = await Course.findOneAndUpdate(
                    {'courseId':code},
                    {$inc:{"enrolled" : -1}}
        )
        console.log("Dropped this class")
        console.log(updated_course);
        return res.status(200).json(updated_course);
    }catch(err){
     console.log(err);
     return res.status(400).json({ status: 'error', error: 'Course is already deleted or re-type the code' })     
    }
});

router.post('/searchclass', async(req,res)=>{
    const {semester, department} = req.body;
    console.log('class Searching')
    console.log(semester);
    console.log(department);
    try{
        const course = await Course.find({'semester':semester, 'department':department}).lean();
        res.status(200).json(course);
        console.log(course);
    }catch(err){
        console.log(err);
        res.status(401).json({status:'error' ,error:"Invalid key"});
    }
    
})
router.post('/searchbycode', async(req,res)=>{
    const {code} = req.body;
    console.log('class Searching by code stu ' + code)
    console.log(req.body)
    try{
        const course = await Course.findOne({'courseId':code}).lean();
        console.log(course);
        res.status(200).json(course);
    }catch(err){
        console.log(err);
        res.status(401).json({status:'error' ,error:"Invalid JWT"});
    }
    
})

router.get('/getmyclass', async(req,res)=>{
    console.log('get')
    const token = req.headers['x-auth'];
    try{
        const decoded = jwt.decode(token, JWT_SECRET);
        console.log(decoded);
        var _id = decoded.id;
        const Enrolled_course = await Enrolled_Course.find({'studentId':_id}).lean();
        console.log(Enrolled_course);
        res.status(200).json(Enrolled_course);
    }catch(err){
        console.log(err);
        res.status(401).json({status:'error' ,error:"Invalid JWT"});
    }
    
})

module.exports = router;