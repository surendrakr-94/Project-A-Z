const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const blogSchemask = new mongoose.Schema({
    
    title: {type:String, required:true},
    body: {
        type:mongoose.Schema.Types.Mixed, 
        required:true
    },
    authorId: {
        type: ObjectId,
        ref: "Author",
        required:true
    },
    tags:[String],
    category: {
        type: [String],
        required: true
    },
    subCategory:[String],
    publishedAt: {
      type: Date,
      default: Date.now} ,
    isPublished:{
        type:Boolean,
        default:false
    },
    deletedAt: String,
    isDeleted:{
        type: Boolean,
        default:false
    },
}, { timestamps: true });



module.exports = mongoose.model("blogsk", blogSchemask)