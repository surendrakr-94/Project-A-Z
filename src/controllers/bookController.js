const bookModel = require("../models/bookModel")
const mongoose = require("mongoose")

const createBook = async (req, res) => {
    try {
        let data = req.body
        let {title, excerpt, userId, ISBN, category, subcategory, reviews} = data

        let saveData = await bookModel.create(data)
        return res.status(201).send({status : true, message : "data created successfully", data : saveData})



    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}
//[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[( GET BOOK BY QUERY FILTER )]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]//
const getBooks1 = async (req, res) => {
    try {
        let data = req.query
        let {userId, category, subcategory}=data
        let findData = await bookModel.find({ $and: [{ isDeleted: false}, data] }).select({title: 1,excerpt: 1,userId: 1,category: 1,releasedAt: 1,reviews: 1})

    
        if (! findData) {
            return res.status(404).send({ status: false, msg: " No Such Book found " })
        } else
            return res.status(200).send({status : true, data : findData})
    } catch (err) {
        res.status(500).send({status: false, msg: err.message })
    }
}
//[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[( GET BOOK BY QUERY FILTER )]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]//

const getBook2 = async (req, res) => {
    try {
        let data = req.param.bookId

        let findData = await bookModel.findOne({isDeleted: false,_id:data}).populate("")

        let 
    } catch (err) {
        
    }
}


module.exports = {createBook, getBooks1}

