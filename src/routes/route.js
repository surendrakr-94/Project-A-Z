const express = require("express")
const router = express.Router()
const usercontroller = require('../controllers/userController')
const { authontication } = require("../middlewares/auth")
const userController = require('../controllers/userController')
const validationmware = require("../middlewares/validationmware")
const bookController = require("../controllers/bookController")

//login user
router.post("/login" , validationmware.loginvalidation,userController.login)

//create user
router.post("/register" , validationmware.loginvalidation  ,usercontroller.createUser)
router.post("/register" , validationmware.uservalidation ,userController.createUser)

//create book
router.post("/books",bookController.createBook)

//get books by query
router.get("/books",bookController.getBooks1)


module.exports = router