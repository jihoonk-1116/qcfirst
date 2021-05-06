const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const bcrypt = require('bcrypt');
const router = express.Router();
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'mysecret!@#!!@#DFfojqiwjr812i12898alkjqjwas123';
//middleware
router.use(bodyParser.json());

//model
const Schema = mongoose.Schema;
var CodeSchema = new Schema({
    code : {type:String, required:true, unique:true, trim: true}
});
var Code = mongoose.model('Code', CodeSchema);
var UserSchema = new Schema({
    role : {type:String, required:true},
    email : {type:String, required: true, index:{unique:true}, unique:true, trim:true},
    name : {type:String, required: true, trim:true},
    password :{type:String, required:true},
    code: {type:String,required:true, unique:true, trim:true},
    department : {type:String, required:true},
    avatar : {type:String},
    phone: {type:String,default:"Update your phone"},
    profession:{type:String, default:"Update your profession"},
    introduction:{type:String ,default:"Update your introduction"}
});
var User = mongoose.model('User',UserSchema);

router.post('/signup', async (req, res) => {
    const {role, email,name, password: plainTextPassword, code,department} = req.body
    const password = await bcrypt.hash(plainTextPassword, 10) //password hash
    const codecheck = await Code.findOne({code}).lean();
    if(!codecheck){
        console.log("Invaild code");
        return res.json({ status: 'error', error: 'Invalid Code' })
    }
    try {
        const response = await User.create({
            role,email,name,password,code,department
        })
        console.log('User created successfully: ', response)
    } catch (error) {
        if (error.code === 11000) {
            // duplicate key
            //email and code are unique value
            return res.json({ status: 'error', error: 'Email or code already in use' })
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
        username: user.email
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
         console.log(decoded);
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

