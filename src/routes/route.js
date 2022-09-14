const express = require("express");
const router = express.Router()
const collegeController = require('../Controllers/collegeController')
const internController = require('../Controllers/internController')



router.post("/test-me", function (req, res) {
    res.send("server is running cool hai")
})

router.post("/functionup/colleges",collegeController.college)
router.post("/functionup/interns",internController.newIntern)

router.get("/functionup/collegeDetails",collegeController. getcollegedetails)





module.exports = router