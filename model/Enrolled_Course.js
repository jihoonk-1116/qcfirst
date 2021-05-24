const { json } = require('body-parser');
const { JsonWebTokenError } = require('jsonwebtoken');
const mongoose = require('mongoose');

const EnrollSchema = new mongoose.Schema({
    studentId : {type:String, required:true},
    subject : {type:String, required:true},
    courseId : {type:String, required: true},
    instName : {type:String, required:true},
    semester: {type:String, required:true},
    department: {type:String, required:true},
    time: {type:[String], required:true},
    location:{type:String,required:true},
    desc:{type:String,required:true},
});
const Enrolled_Course = mongoose.model('Enrolled_Course',EnrollSchema);

module.exports = Enrolled_Course;