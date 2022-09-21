const express = require("express")
const router = express.Router()
const usercontroller = require('../controllers/userController')
const { authontication } = require("../middlewares/auth")
const validationmware = require("../middlewares/validationmware")

//login user
router.post("/login" , validationmware.loginvalidation,usercontroller.login)

//create user
router.post("/register" , validationmware.loginvalidation  ,usercontroller.createUser)

module.exports = router