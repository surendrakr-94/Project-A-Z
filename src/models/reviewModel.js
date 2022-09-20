const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId
const reviewSchema = new mongoose.Schema(
    {
        userId: {
            type: ObjectId,
            ref: "User",
            required: true
        },
        reviewedBy: {
            type: String, 
            default: 'Guest',
            value: reviewer
        },
        reviewedAt: {
            type: Date,
        },

        rating: {
             type: Number 
            },
        review: { 
            type: String 
         },
         isDeleted: {
            type: Boolean,
            default: false
        },
    }, { timestamps: true });

 

module.exports = mongoose.model('Review', reviewSchema)




