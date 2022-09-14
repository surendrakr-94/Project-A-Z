const express = require("express");
const router = express.Router()
const collegeController = require('../Controllers/collegeController')
const internController = require('../Controllers/internController')



router.get("/test-me", function (req, res) {
    res.send("server is running cool hai")
})







module.exports = router