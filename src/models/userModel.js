const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        enum: ["Mr", "Mrs", "Miss"]
    },
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        require: true,
        unique: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },

    address: {
        street: string,
        city: string,
        pincode: string
    },

}, { timestamps: true });

module.exports = mongoose.model('User', userSchema) //users



