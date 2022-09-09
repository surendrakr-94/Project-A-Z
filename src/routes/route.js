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
router.get("/login", Author.login)
router.post("/blogs", middle.authorAuthorisationBody, Blog.createBlog)
router.get("/blogs", middle.authentication, Blog.getBlogsData)
router.put("/blogs/:blogId", middle.authentication, middle.blogAuthorisation, Blog.updateBlog,)
router.delete("/blogs/:blogId", middle.authentication, Blog.deleteById)
router.delete("/blogsqueryParams", middle.AuthorisationDeleteQuery, Blog.deleteBlogsquery)

module.exports = router;
