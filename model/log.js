const mongoose = require('mongoose');

const LogSchema = new mongoose.Schema({
    query:{type:String, required:true},
    date:{
        type:Date, 
        default: new Date()
    },
    userId:{type:String},
    username:{type:String},
    result:{type:Object}
});
const Log = mongoose.model('Log',LogSchema);

module.exports = Log;