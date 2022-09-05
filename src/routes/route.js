const express = require('express');
const router = express.Router();
const Blog= require("../controllers/BlogController")
const Author= require("../controllers/authorController")



router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})


router.get("/GetAuthor", Author.getAuthorsData)
router.get("/GetBlogs", Blog.getBlogsData)


module.exports = router;
