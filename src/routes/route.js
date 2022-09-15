const express = require("express");
const router = express.Router()
const collegeController = require('../Controllers/collegeController')
const internController = require('../Controllers/internController')



router.post("/test-me", function (req, res) {
    res.send("server is running cool hai")
})

router.post("/functionup/colleges", collegeController.createCollege)
router.post("/functionup/interns", internController.createIntern)

router.get("/functionup/collegeDetails", collegeController.getcollegeDetails)





module.exports = router