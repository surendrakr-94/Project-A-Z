const validation = require('../validations/validator')

module.exports = {

    uservalidation : (req,res,next) => {
        const error= validation.UserModel.validate(req.body)
        if(error)
        {
            res.status(400).send({
                message : error.message
            })
        } else next()
    },

    bookvalidation : (req,res,next) => {
        const error = validation.BooksModel.validate(req.body)
        if(error)
        {
            res.status(400).send({
                message : error.message
            })
        }else next()
    },

    reviewvalidation : (req,res,next) => {
        const error = validation.ReviewModel.validate(req.body)
        if(error)
        {
            res.status(400).send(
                {message : error.message}
            )
        }else next()
    }
}