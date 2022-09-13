

const mongoose = require('mongoose'); 

const authorSchema = new mongoose.Schema({
    fName: {
        type: String,
         required: true,
         trim:true},  
    lName: {
        type: String, 
        required: true,
        trim:true
    },
    title: {
        type: String,
        required: true,
        enum: ["Mr", "Mrs", "Miss"]     
        },
    email: {
        type: String,  
        required: true,
        unique: true,
        trim:true,
        lowercase:true
            
    },
    password:{
         type: String,
         trim:true,
         required: true
        }}, {timestamps: true});



module.exports = mongoose.model("Authors", authorSchema )