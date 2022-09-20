const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId
const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    excerpt: {
        type: String,
        required: true
    },
    userId: {
        type: ObjectId,
        ref: "user",
        required: true
    },
    ISBN: {
        type: String,
        unique: true
    },
    category: {
        type: String,
        required: true
    },
    subcategory: {
        type: [String]
    },
    reviews: {
        type: number,
        default: 0,
        comment: Holds
    },
    deletedAt: {
        type: Date
    },

    isDeleted: {
        type: Boolean,
        default: false
    },

    releasedAt: {
        type: Date,
    },


}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema)