const { time } = require("console")
const blogModel = require("../models/blogModel")
const authormodel = require("../models/authorModel")

const createBlog = async function (req, res) {
    let data = req.body
    if (data.authorId) {
        const check = await authormodel.find(data.author_id)
        if (check) {
            let saveData = await blogModel.create(data)
            res.status(201).send({ status: true, msg: saveData })
        } else return res.status(400).send({ status: false, msg: "plese enter currect author_id" })
    } else return res.status(400).send({ status: false, msg: "author_id is required" })


}

const getBlogsData = async function (req, res) {

    let authorId = req.query.authorId
    let category = req.query.category
    let tags = req.query.tags
    let subCategory = req.query.subCategory
    if (authorId === undefined && category === undefined && tags === undefined && subCategory === undefined) {
        let Blogs = await blogModel.find({ isDeleted: false, isPublished: true })

        if (Blogs) {
            res.status(200).send({ status: true, data: Blogs })
        }

        else {
            return res.status(404).send({ status: false, msg: "data is not present" })
        }
    }

    else {
        let blogsFilter = await blogModel.find({ $or: [{ authorId: authorId }, { category: category }, { tags: tags }, { subCategory: subCategory }]} , {isDeleted: false, isPublished: true})
        if (blogsFilter) {

            res.status(200).send({ status: true, data: blogsFilter })
        }
        else {

            res.status(404).send({ status: false, msg: "Not Found" })
        }
    }
}
const updateBlog = async (req, res) => {
    try {
        let blogId = req.params.blogId;
        if (blogId.length < 24 && blogId.length > 24) { return res.status(404).send({ status: false, msg: "plz enter correct blogId" }) }


        let data = await blogModel.findById(blogId);

        if (data.isDeleted == true) { return res.status(400).send({ status: false, msg: "this is already deleted" }) }

        if (!data) {
            return res.status(400).send({ status: false, msg: "blogId is incorrect" })
        }
        const { tags, category, title, body, subCategory } = req.body
        let changeBlog = await blogModel.findByIdAndUpdate({ _id: blogId }, { $addToSet: { tags: tags, subCategory: subCategory }, $set: { title: title, body: body, category: category } }, { new: true })
        return res.status(200).send({ msg: "Blog Updated Successfully", status: true, data: changeBlog });
    }
    catch (err) {
        console.log(err.message);
        res.status(500).send({ error: err.message });
    }
};



const deleteById = async function (req, res) {
    try {
        // const blogId = req.params.blogId;
        // if (blogId < 24 && blogId > 24) { return res.status(404).send({ status: false, msg: "plz enter correct blogId" }) }

        const blog = await blogModel.findById(blogId);
        if (!blog || blog.isDeleted === true) {
            return res.status(404).send({ status: false, msg: "no such blog exists" })
        }//validation1
        const deleteBlog = await blogModel.findByIdAndUpdate({ _id: blogId }, { $set: { isDeleted: true, deletedAt: Date.now() } });
        return res.status(200).send({ status: true, msg: "blog deleted successfully" });

    } catch (error) {
        console.log(error);
        return res.status(500).send({ status: false, msg: error.message })
    }
}

const deleteBlogsquery = async function (req, res) {
    
        try {
    
            let authorid = req.query.authorId;
            let Category = req.query.category;
            let Subcategory = req.query.subcategory;
            let tag = req.query.tags;
            let unpublished = req.query.isPublished
           
    
            let deletedData = await blogModel.findOneAndUpdate({ $or: [{ authorId: authorid }, { isPublished: unpublished }, { category: Category }, { tags: tag }, { subcategory: Subcategory }] },{$set:{ isDeleted: true }}, { new: true })
            if (!deletedData) {
                return res.status(404).send("No such blog exists")
            }
            else {
                deletedData.deletedAt=Date.now()
                res.status(200).send({ status: true, msg: "Data deleted now",deletedAt:deletedData.deletedAt })
            }
        }
        catch (err) {
            res.status(500).send({ error: err.message })
        }
    }



module.exports.createBlog = createBlog
module.exports.getBlogsData = getBlogsData
module.exports.updateBlog = updateBlog
module.exports.deleteById = deleteById
module.exports.deleteBlogsquery = deleteBlogsquery
