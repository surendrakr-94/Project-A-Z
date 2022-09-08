const express = require('express');
const router = express.Router();
const Blog = require("../controllers/BlogController")
const Author = require("../controllers/authorController")
const middle = require("../middleware/midd.js")


router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/createAuthor", Author.createAuthor)
router.get("/GetAuthor", Author.getAuthorsData)
router.post("/createblog",  middle.mid1,Blog.createBlog)
router.get("/GetBlogs", middle.mid1,  Blog.getBlogsData)
router.put("/updateBlog/:blogId", middle.mid1, middle.mid2, Blog.updateBlog,)
router.delete("/deleteById/:blogId", middle.mid1, Blog.deleteById)
router.delete("/deleteBlogsquery", Blog.deleteBlogsquery)
router.get("/login", Author.login)
module.exports = router;
