const reviewmodel = require('../models/reviewModel')
const bookmodel = require('../models/bookModel')
module.exports = {

    reviewbookbybookid: async (req, res) => {

        let bookId = req.params.bookId
        let findbook = await bookmodel.findOneAndUpdate({ bookId: bookId, isDeleted: false }, { $inc: { reviews: 1 } })
        if (!findbook) return res.status(404).send({ status: false, msg: "Book might be deleted or its not present" })
        let createreviews = await reviewmodel.create(req.body)
        res.status(200).send({ status: true, message: "Reviewed book Successfully", Data: createreviews })
    },
    updatereviewbookbybookid: async (req, res) => {

        let bookId = req.params.bookId
        let reviewId = req.params.reviewId
        let { review, rating, reviewedBy } = req.body

        let findbook = await bookmodel.findOne({ bookId: bookId, isDeleted: false })
        if (!findbook) return res.status(404).send({ status: false, msg: "Book might be deleted or its not present" })
        let findreview = await reviewmodel.findOne({ _id: reviewId, isDeleted: false })
        if (!findreview) return res.status(404).send({ status: false, msg: "Review is not present" })

        let findreviewandupdate = await reviewmodel.findOneAndUpdate({ _id: reviewId, bookId: bookId, isDeleted: false },{reviewedBy :reviewedBy,rating:rating,review:review},{new:true})
   
        res.status(200).send({ status: true, message: "Data updated Successfully", Data: findreviewandupdate })
    },
    deletereviewbyid: async (req, res) => {

        let bookId = req.params.bookId
        let reviewId = req.params.reviewId

        let findreview = await reviewmodel.findOne({ _id: reviewId, isDeleted: false },)
        if (!findreview) return res.status(404).send({ status: false, msg: "Review is not present" })
     
        let findbook = await bookmodel.findOneAndUpdate({ bookId: bookId, isDeleted: false },{ $inc: { reviews: -1 } })
        if (!findbook) return res.status(404).send({ status: false, msg: "Book might be deleted or its not present" })

        await reviewmodel.findOneAndUpdate({ _id: reviewId, bookId: bookId, isDeleted: false },{isDeleted: true},{new:true})
   
        res.status(200).send({ status: true, message: "Data Deleted Successfully"})
    },
}