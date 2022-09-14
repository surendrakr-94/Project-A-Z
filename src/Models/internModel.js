const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId

const internSchem = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true
        },
        email: {
            type: String,
            require: true,
            match: [/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/, 'Please enter a valid email'],
            unique: true
        },
        mobile: {
            type: String,
            require: true,
            unique: true  
        },
        collegeId: {
            type: ObjectId,
            ref: 'College',
        },
        isDeleted: { 
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
)
module.exports = mongoose.model('Intern' , internSchem)