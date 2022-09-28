const bookModel = require("../models/bookModel")
const mongoose = require("mongoose")
const moment = require('moment')
const reviewModel = require("../models/reviewModel")
const aws= require("aws-sdk")

let uploadFile = async (file) => {
    return new Promise(function (resolve, reject) {
       
        let s3 = new aws.S3({ apiVersion: '2006-03-01' });

        var uploadParams = {
            ACL: "public-read",
            Bucket: "classroom-training-bucket",  
            Key: "abc/" + file.originalname,  
            Body: file.buffer
        }

        s3.upload(uploadParams, function (err, data) {
            if (err) {
                return reject({ "error": err })
            }
            
            console.log("file uploaded succesfully")
            return resolve(data.Location)
        })

    })
}

const createBook = async (req, res) => {
    try {
        let photolink 
        let files= req.files
        if(files && files.length>0)
        {
             photolink =  await uploadFile( files[0] )
            
        }
        if(files.length == 0)
        return res.status(400).send({ status: false, message: "File is mandatery" })
        let data = req.body
        let { ISBN, releasedAt, title } = req.body
        let uniqueisbn = await bookModel.findOne({ ISBN: ISBN, isDeleted: false })
        if (uniqueisbn) return res.status(400).send({ status: false, message: "ISBN should be unique" })
        let uniquetitle = await bookModel.findOne({ title: title, isDeleted: false })
        if (uniquetitle) return res.status(400).send({ status: false, message: "Title should be unique" })
        // if (! /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/.test(releasedAt))
        //     return res.status(400).send({ status: false, message: "date is not in correct format" })

         data.bookcover = photolink
        let saveData = await bookModel.create(data)
       
        
        return res.status(201).send({ status: true, message: "data created successfully", data: saveData })

    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}
//  GET BOOK BY QUERY FILTER
const getBooks1 = async (req, res) => {
    try {

        let { userId, category, subcategory } = req.query
        let obj = { isDeleted: false }

        if (userId) obj.userId = userId
        if (category) obj.category = category
        if (subcategory) obj.subcategory = subcategory

        let findData = await bookModel.find(obj).select({ title: 1, excerpt: 1, userId: 1, category: 1, releasedAt: 1, reviews: 1 }).sort({ title: 1 })
        if (findData.length == 0) return res.status(404).send({ status: false, msg: " No Such Book found " })

        return res.status(200).send({ status: true, data: findData })
    } catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }
}
// GET BOOK BY params

const getBookbyparms = async (req, res) => {
    try {
        let { bookId } = req.params
        if (!mongoose.Types.ObjectId.isValid(bookId)) return res.status(400).send({ status: false, msg: "Bookid is not valid" })
        let bookData = await bookModel.findOne({ isDeleted: false, _id: bookId })
        if (!bookData) return res.status(404).send({ status: false, msg: "Book not found" })

        let reviewsData = await reviewModel.find({ isDeleted: false, bookId: bookId }).select({ isDeleted: 0, createdAt: 0, updatedAt: 0 })
        let finalData = {
            title: bookData.title, excerpt: bookData.excerpt, userId: bookData.userId,
            category: bookData.category, subcategory: bookData.subcategory, isDeleted: false, reviews: bookData.reviews,
            createdAt: bookData.createdAt, updatedAt: bookData.updatedAt, reviewsData: reviewsData
        }
        return res.status(200).send(finalData)

    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}
const updateBook = async (req, res) => {
    try {
        let bookId = req.params.bookId
        let data = req.body
        let { title, ISBN } = data

        if (title)
            if (await bookModel.findOne({ title: title }))
                return res.status(400).send({ status: false, message: "title is already exist...plz try another title" })

        if (ISBN)
            if (await bookModel.findOne({ ISBN: ISBN }))
                return res.status(400).send({ status: false, message: "ISBN is already exist...plz try another ISBN" })

        let updateData = await bookModel.findOneAndUpdate({ _id: bookId, isDeleted: false }, { $set: data, updatedAt: moment().format("DD-MM-YYYY  h:mm:ss a") }, { new: true })
        if (!updateData) return res.status(404).send({ status: false, message: "Data Not Found because you did some chutiyapa", })

        return res.status(200).send({ status: true, message: "Data successfully updated", data: updateData })

    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}
const deleteBook = async (req, res) => {
    try {
        let bookId = req.params.bookId

        let deleteBook = await bookModel.findOneAndUpdate({ _id: bookId, isDeleted: false },
            { isDeleted: true, deletedAt: moment().format("DD-MM-YYYY  h:mm:ss a") })
        if (!deleteBook) {
            return res.status(404).send({ status: false, message: "Book not found" })
        }
        return res.status(200).send({ status: true, message: "Data deleted successfully" })
    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}

module.exports = { createBook, getBooks1, getBookbyparms, updateBook, deleteBook }


