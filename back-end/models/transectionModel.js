const mongoose = require('mongoose');

const transectionSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:[true,"amount is Required"]
    },
    type:{
        type:String,
        required:[true,"type is required"]
    },
    category:{
        type:String,
        required:[true,"category is Required"]
    },
    refrence:{
        type:String,
    },
    description:{
        type:String,
        required:[true,"desc is Required"]
    },
    date:{
        type:String,
        required:[true,"date is required"]
    }
},{timestamps:true});

const transectionModel = mongoose.model("transection",transectionSchema);
module.exports = transectionModel;