const express = require('express');
const router = express.Router();
const Blog= require("../controllers/BlogController")
const Author= require("../controllers/authorController")



router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})


router.get("/GetAuthor", Author.getAuthorsData)
router.post("/createblog",Blog.createBlog)
router.get("/GetBlogs", Blog.getBlogsData)
router.put("/updateBlog/:blogId",Blog.updateBlog,)
router.delete("/deleteById/:blogId",Blog.deleteById)
router.delete("/deleteBlogsquery",Blog.deleteBlogsquery)

module.exports = router;
