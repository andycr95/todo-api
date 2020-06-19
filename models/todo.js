const mongoose = require('mongoose')
var Schema = mongoose.Schema;

const todoSchema = new mongoose.Schema
({
    title : String,
    description : String,
    user_id : {type: Schema.Types.ObjectId, ref:'user'},
    time_worked: Number,
    estimated_time: Number,
    state: Boolean
})
module.exports = mongoose.model('todo', todoSchema );