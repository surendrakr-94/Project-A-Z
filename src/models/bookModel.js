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

    createdAt: { type: String, default: moment().format("DD-MM-YYYY  h:mm:ss a") },
    updatedAt: { type: String, default: moment().format("DD-MM-YYYY  h:mm:ss a") }
});

module.exports = mongoose.model('Book', bookSchema)