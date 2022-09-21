const validation = require('../validations/validator')

module.exports = {

    uservalidation: (req, res, next) => {
        const { error } = validation.UserModel.validate(req.body)
        if (error) {
           return res.status(400).send({ status: false, message: error.message })
        } else next()
    },

    bookvalidation: (req, res, next) => {
        const { error } = validation.BooksModel.validate(req.body)
        if (error) {
           return res.status(400).send({ status: false, message: error.message })
        } else next()
    },

    reviewvalidation: (req, res, next) => {
        const { error } = validation.ReviewModel.validate(req.body)
        if (error) {
          return  res.status(400).send({ status: false, message: error.message })
        } else next()
    },
    loginvalidation: (req, res, next) => {
        const { error } = validation.loginvalidation.validate(req.body)
        if (error) {
           return res.status(400).send({ status: false, message: error.message })
        } else next()
    },
    filterbookvalidation: (req, res, next) => {
        const { error } = validation.getbookbyfiltervalidation.validate(req.body)
        if (error) {
           return res.status(400).send({ status: false, message: error.message })
        } else next()
    },

}