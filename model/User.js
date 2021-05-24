const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    role : {type:String, required:true},
    email : {type:String, required: true, unique:true, trim:true},
    usercode : {type:String, required: true, unique:true},
    name : {type:String, required: true, trim:true},
    password :{type:String, required:true},
    department : {type:String, required:true},
    avatar : {type:String},
    phone: {type:String,default:"Update your phone"},
    profession:{type:String, default:"Update your profession"},
    introduction:{type:String ,default:"Update your introduction"},
    
});
const User = mongoose.model('User',UserSchema);

module.exports = User;