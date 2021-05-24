const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const bcrypt = require('bcrypt');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../model/User');
const Course = require('../model/Course');

const JWT_SECRET = 'mysecret!@#!!@#DFfojqiwjr812i12898alkjqjwas123';
//middleware
router.use(bodyParser.json());

//model


router.post('/signup', async (req, res) => {
    const {role,usercode, email,name, password: plainTextPassword,department} = req.body
    const password = await bcrypt.hash(plainTextPassword, 10) //password hash
    console.log(usercode);
    try {
        const response = await User.create({
            role,usercode,email,name,password,department
        })
        console.log('User created successfully: ', response)
    } catch (error) {
        if (error.code === 11000) {
            // duplicate key
            //email and code are unique value
            return res.json({ status: 'error', error: 'Email already in use' })
        }
        throw error
    }
    return res.json({ status: 'ok' })
})

router.post('/login', async(req,res) => { 
    const {role, email, password} = req.body;
    const user = await User.findOne({email}).lean(); //mongoose method
    if(!user) 
        return res.status(500).json({status:'error', error:"Invalid Email"});
    const pass = await bcrypt.compare(password, user.password);
    if(!pass) 
        return res.status(500).json({status:'error', error:"Wrong Password"});
    if(role !== user.role){
        return res.status(500).json({status:'error', error:"Wrong Role"});
    }
    const token = jwt.sign({
        id:user._id,        
        username: user.name
        }, JWT_SECRET
    ) 
    return res.status(200).json(token);
    } 
);
router.get('/getuserinfo', async(req,res) => { 
    if (!req.headers["x-auth"]) {
        return res.status(401).json({error: "Missing X-Auth header"});
     }
     const token = req.headers['x-auth'];
     try{
         const decoded = jwt.decode(token, JWT_SECRET);
         var _id = decoded.id;
         const user = await User.findOne({_id}).lean();
         console.log(user);
         res.status(200).json(user);
     }catch(err){
         console.log(err);
         res.status(401).json({error:"Invalid JWT"});
     }
    } 
);

module.exports = router;

