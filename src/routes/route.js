const express = require("express")
const router = express.Router()
const { authontication, authorise } = require("../middlewares/auth")
const userController = require('../controllers/userController')
const validationmware = require("../middlewares/validationmware")
const bookController = require("../controllers/bookController")
const { reviewbookbybookid, updatereviewbookbybookid, deletereviewbyid } = require("../controllers/reviewController")
const userModel = require("../validations/validator")
// const validator = require('express-joi-validation').createValidator({})


router.post("/register",validationmware.uservalidation  ,userController.createUser)//create user
router.post("/login" , validationmware.loginvalidation,userController.login)//login user

router.post("/books", authontication ,validationmware.bookvalidation,authorise ,bookController.createBook)//create book
router.get("/books", validationmware.filterbookvalidation, bookController.getBooks1)//get books by query
router.get("/books/:bookId",  bookController.getBookbyparms)//get books by params
router.put("/books/:bookId", authontication, authorise, bookController.updateBook)//update books
router.delete("/books/:bookId", authontication, authorise , bookController.deleteBook)//delete book by id

router.post("/books/:bookId/review", validationmware.reviewvalidation, reviewbookbybookid) //create review 
router.put("/books/:bookId/review/:reviewId", validationmware.updatereviewvalidation, updatereviewbookbybookid) //update review
router.delete("/books/:bookId/review/:reviewId", deletereviewbyid) //delete review

router.all("/*", (req,res)=>{  return res.status(400).send({status: false , msg : "Endpoint is not valid"})})

module.exports = router