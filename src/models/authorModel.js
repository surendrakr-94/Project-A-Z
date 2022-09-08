//Import the mongoose module

const mongoose = require('mongoose'); 
// Define a schema
const authorSchema = new mongoose.Schema({
    fName: {
        type: String,
         required: true},  
    lName: {
        type: String, 
        required: true
    },
    title: {
        type: String,
        required: true,
        enum: ["Mr", "Mrs", "Miss"]     
        },
    email: {
        type: String,  
        required: true,
        unique: true      
    },
    password:{
        type: String,
         required: true
        }}, {timestamps: true});

module.exports = mongoose.model("Authors", authorSchema )