const bookModel = require("../models/bookModel")
const mongoose = require("mongoose")
const { findOne } = require("../models/bookModel")
const reviewModel = require("../models/reviewModel")


const createBook = async (req, res) => {
    try {
        let data = req.body
        let { ISBN, reviewedAt, } = data

        let uniqueisbn = await bookModel.findOne({ ISBN: ISBN })
        // if (! /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/.test(reviewedAt))
        //     return res.status(201).send({ status: false, message: "date is not in correct format" })
        if (uniqueisbn) return res.status(201).send({ status: false, message: "ISBN is already present" })
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
    
        if (subcategory) 
        subcategory = subcategory.split(",")
        obj.subcategory =  subcategory

        let findData = await bookModel.find(obj).select({ title: 1, excerpt: 1, userId: 1, category: 1, releasedAt: 1, reviews: 1 }).sort({ title: 1 })
        if (findData.length == 0)
            return res.status(404).send({ status: false, msg: " No Such Book found " })
        return res.status(200).send({ status: true, data: findData })
    } catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }
}
//[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[( GET BOOK BY QUERY FILTER )]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]//

const getBook2 = async (req, res) => {
    try {
        let { bookId } = req.params

        let bookData = await bookModel.findOne({ isDeleted: false, id: bookId })
        if (!bookData) return res.status(404).send({ status: false, msg: "Book not found" })

        let reviewsData = await reviewModel.find({ isDeleted: false, _id: bookId }).select({ isDeleted: 0, createdAt: 0, updatedAt: 0 })
        let finalData = {
            title: bookData.title, excerpt: bookData.excerpt, userId: bookData.userId,
            category: bookData.category, subcategory: bookData.subcategory, isDeleted: false, reviews: bookData.reviews,
            createdAt: bookData.createdAt, updatedAt: bookData.updatedAt, reviewsData: reviewsData
        }
        // releasedAt : bookData.releasedAt
        return res.status(200).send(finalData)

    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}

module.exports = { createBook, getBooks1, getBook2 }

