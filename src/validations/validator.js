const { number } = require('joi')
const joi = require('joi')

module.exports = {
    //SCHEMA VALIDATION FOR USERMODEL
    UserModel: joi.object({
        title: joi.string().required().valid("Mr", "Mrs", "Miss").messages({ 'any.only': 'Title should be among Mr, Mrs, Miss' }),
        name: joi.string().required(),
        phone: joi.string().required().min(10). message({ 'any.only': 'Please enter a valid number' }).max(10).message("Please enter a valid number"),
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
        title: joi.string().trim().required(),
        excerpt: joi.string().trim().required(),
        userId : joi.required(),
        ISBN: joi.string().trim().required(),
        category : joi.string().trim().required(),
        subcategory : joi.string().trim().required(),
        releasedAt : joi.required(),
        reviews : joi.number(),
    }),
    //SCHEMA VALIDATION FOR REVIEWMODEL
    ReviewModel: joi.object({
         bookId : joi.required(),
        reviewedBy : joi.string(),
        reviewedAt : joi.date().required(),
        rating : joi.number().min(1).messages({ 'any.only': 'rating should be greater than 1 ' }).max(5).messages({ 'any.only': 'rating should be less than 5' }).required(),
        review : joi.string(),
    }),

    //LOGIN VALIDATION
    loginvalidation : joi.object({
        email: joi.string().required().email(),
        password: joi.string().min(8).max(15).required(),
    }),

    //GET BOOK VALIDATION
    getbookbyfiltervalidation : joi.object({
        category : joi.string(),
        subcategory : joi.string()
    }),
    updatereviewvalidation : joi.object({
        review: joi.string(),
    rating: joi.number(),
    reviewedBy: joi.string(),
        rating : joi.number().min(1).messages({ 'any.only': 'rating should be greater than 1 ' }).max(5).messages({ 'any.only': 'rating should be less than 5' }).required(),
    })

}

