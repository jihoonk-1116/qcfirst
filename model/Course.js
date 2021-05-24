const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    subject : {type:String, required:true},
    courseId : {type:String, required:true, unique:true},
    instName : {type:String, required:true},
    instId : {type:String, required:true},
    semester: {type:String, required:true},
    department: {type:String, required:true},
    time: {type:[String], required:true},
    capacity:{type:Number,required:true},
    enrolled:{type:Number, defualt : 0},
    location:{type:String,required:true},
    deadline:{type:Date,required:true},
    desc:{type:String,required:true},
});
const Course = mongoose.model('Course',CourseSchema);

module.exports = Course;