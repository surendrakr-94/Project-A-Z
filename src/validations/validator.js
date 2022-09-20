const joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)
module.exports = {
    //SCHEMA VALIDATION FOR USERMODEL
    UserModel: joi.object({
        title: joi.string().required().valid(Mr, Mrs, Miss).message("Title should be among Mr, Mrs, Miss"),
        name: joi.string().required(),
        phone: joi.string().required().min(1000000000).message("Please enter a valid number").max(9999999999).message("Please enter a valid number"),
        email: joi.string().required().email(),
        password: joi.string().min(8).max(15).required(),
        address: {
            street: joi.string(),
            city: joi.string(),
            pincode: joi.string(),
        }
    }),
    //SCHEMA VALIDATION FOR BOOKMODEL
    BooksModel: joi.object({
        title: joi.string().required(),
        excerpt: joi.string().required(),
        // userId : joi.objectId().required(),
        ISBN: joi.string().required(),
        category : joi.string().required(),
        subcategory : joi.string().required(),
        reviews : joi.number(),
    }),
    //SCHEMA VALIDATION FOR REVIEWMODEL
    ReviewModel: joi.object({
        //  bookId : joi.objectId().required(),
        reviewedBy : joi.string().required(),
        reviewedAt : joi.date().required(),
        rating : joi.number().min(1).message("rating should be between 1 to 5").max(5).message("rating should be between 1 to 5").required(),
        review : joi.string(),
    }),
}