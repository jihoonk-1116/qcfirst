const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../model/User');
const Course = require('../model/Course');
const Enrolled_Course = require('../model/Enrolled_Course');
const Log = require('../model/Log');

const JWT_SECRET = 'mysecret!@#!!@#DFfojqiwjr812i12898alkjqjwas123';
router.use(bodyParser.urlencoded({extended: true}));

router.get('/:keyword', async(req,res)=>{
    const token = req.headers['x-auth'];
    const decoded = jwt.decode(token, JWT_SECRET);
    var _id = decoded.id;
    const user = await User.findOne({_id}).lean();
    //term
    var {keyword} = req.params;
    console.log('Searching');
    console.log(keyword);
    var filter, result="";
    //course or course code

    if(keyword == "class" || keyword =="classes" || keyword == "course" || keyword == "Course"){
        try{
            result = await Course.find();
            console.log(result);
            const log = await Log.create({
                'query':keyword,
                'userId':user.usercode,
                'username':user.name,
                'result':result
            })
            console.log(log);
            return res.status(200).json(result);
        }catch(err){
            console.log(err);
            res.status(401).json({status:'error' ,error:"Invalid key"});
        }
    }
    if(keyword == "instructor" || keyword =="instructors"){
        try{
            result = await User.find(
                {'usercode': 
                    { 
                        $regex: '^i', 
                        $options:'i'
                    }
                });
            const log = await Log.create({
                'query':keyword,
                'userId':user.usercode,
                'username':user.name,
                'result':result
            })
            console.log(log);    
            console.log(result);
            return res.status(200).json(result);
        }catch(err){
            console.log(err);
            res.status(401).json({status:'error' ,error:"Invalid key"});
        }
    }
    if(keyword == "student" || keyword =="students"){
        try{
            result = await User.find(
                {'usercode': 
                    { 
                        $regex: '^s', 
                        $options:'i'
                    }
                });
            const log = await Log.create({
                'query':keyword,
                'userId':user.usercode,
                'username':user.name,
                'result':result
            })
            console.log(log);       
            console.log(result);
            return res.status(200).json(result);
        }catch(err){
            console.log(err);
            res.status(401).json({status:'error' ,error:"Invalid key"});
        }
    }
    if(keyword.charAt(0) === 'c' || keyword.charAt(0) === 'C'){
        if(!isNaN(keyword.charAt(1))){
            try{
                result = await Course.find(
                    {'courseId': 
                        { 
                            $regex: keyword, 
                            $options:'i'
                        }
                    });
                const log = await Log.create({
                    'query':keyword,
                    'userId':user.usercode,
                    'username':user.name,
                    'result':result
                })
                console.log(log); 
                console.log(result);
                return res.status(200).json(result);
            }catch(err){
                console.log(err);
                res.status(401).json({status:'error' ,error:"Invalid key"});
            }
        }
    }
    if(keyword.charAt(0) === 'I' || keyword.charAt(0) === 'S' || 
        keyword.charAt(0) === 's' || keyword.charAt(0) === 'i'){
        if(!isNaN(keyword.charAt(1))){
            try{
                result = await User.find(
                    {'usercode': 
                        { 
                            $regex: keyword
                        }
                    });
                const log = await Log.create({
                    'query':keyword,
                    'userId':user.usercode,
                    'username':user.name,
                    'result':result
                })
                console.log(log);     
                console.log(result);
                return res.status(200).json(result);
            }catch(err){
                console.log(err);
                res.status(401).json({status:'error' ,error:"Invalid key"});
            }
        }
    }
    //if the keyword was not about course 
    //find user
    if(result == ""){
        try{
            result = await User.find(
                {'name': 
                    { 
                        $regex: keyword, 
                        $options:'i'
                    }
                });
            console.log("User: " + result);
            if(result != ""){
                const log = await Log.create({
                    'query':keyword,
                    'userId':user.usercode,
                    'username':user.name,
                    'result':result
                })
                console.log(log); 
                return res.status(200).json(result);
            }
        }catch(err){
            console.log(err);
            res.status(401).json({status:'error' ,error:"Invalid key"});
        }
    }
    //course name
    if(result == ""){
        try{
            result = await Course.find(
                {'subject': 
                    { 
                        $regex: keyword, 
                        $options:'i'
                    }
                }
            );
            console.log("course name: " + result);
            if(result != ""){
                const log = await Log.create({
                    'query':keyword,
                    'userId':user.usercode,
                    'username':user.name,
                    'result':result
                })
                console.log(log); 
                return res.status(200).json(result);
            }
        }catch(err){
            console.log(err);
            res.status(401).json({status:'error' ,error:"Invalid key"});
        }
    }
    //was not user
    //find department
    console.log("dept : " + keyword);
    try{
        result = await Course.find(
            {'department': 
                { 
                    $regex: keyword, 
                    $options:'i'
                }
            }
        );
        if(result != ""){
            const log = await Log.create({
                'query':keyword,
                'userId':user.usercode,
                'username':user.name,
                'result':result
            })
            console.log(log); 
            return res.status(200).json(result);
        }
    }catch(err){
        console.log(err);
        res.status(401).json({status:'error' ,error:"Invalid key"});
    }
    console.log("term");
    try{
        result = await Course.find(
            {'semester': 
                { 
                    $regex: keyword, 
                    $options:'i'
                }
            });
        console.log("term try: " + result);
        if(result != ""){
            const log = await Log.create({
                'query':keyword,
                'userId':user.usercode,
                'username':user.name,
                'result':result
            })
            console.log(log); 
            return res.status(200).json(result);
        }
    }catch(err){
        console.log(err);
        res.status(401).json({status:'error' ,error:"Invalid key"});
    }
    res.status(200).json(result);
})

module.exports = router;