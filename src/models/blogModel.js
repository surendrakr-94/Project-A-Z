const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const blogSchema = new mongoose.Schema({

    title: { type: String, required: true },
    body: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    },
    authorId: {
        type: ObjectId,
        ref: "Authors",
        required: true
    },
    tags: [String],
    category: {
        type: [String],
        required: true
    },
    subCategory: [String],
    publishedAt: {
        type: Date,
        default: null
    },
    isPublished: {
        type: Boolean,
        default: false
    },
    deletedAt: {
        type: Date,
        default: null
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
}, { timestamps: true });



module.exports = mongoose.model("blogs", blogSchema)