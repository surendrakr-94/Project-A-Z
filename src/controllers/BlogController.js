const { time } = require("console")
const blogModel = require("../models/blogModel")
const authormodel = require("../models/authorModel")


const isValid = function (check) {
    if (!check || check == undefined) { return false }
    if (typeof check !== "string" || check.trim().length == 0) { return false }
    return true
}

const createBlog = async function (req, res) {
    try {
        let data = req.body

        const {title,body,tags, category, subCategory} = data
        if (data.authorId) {
            const check = await authormodel.find(data.author_id)
            if (check) {

              if (!isValid(title)) { return res.status(400).send({ status: false, msg: "title is required" }) }
              let ntitle = /^[a-zA-Z]{2,9}$/.test(title.trim())
              if (!ntitle) { return res.status(400).send({ status: false, msg: "enter Valid title name " }) }
                
              if (!isValid(body)) { return res.status(400).send({ status: false, msg: "body is required" }) }
              let nbody = /^[a-zA-Z]{2,9}$/.test(body.trim())
              if (!nbody) { return res.status(400).send({ status: false, msg: "enter Valid body name " }) }

              
              if (!isValid(tags)) { return res.status(400).send({ status: false, msg: "tags is required" }) }
              let ntags = /^[a-zA-Z]{2,9}$/.test(tags.trim())
              if (!ntags) { return res.status(400).send({ status: false, msg: "enter Valid tags name " }) }

              if (!isValid(category)) { return res.status(400).send({ status: false, msg: "category is required" }) }
              let ncategory = /^[a-zA-Z]{2,9}$/.test(category.trim())
              if (!ncategory) { return res.status(400).send({ status: false, msg: "enter Valid category name " }) }

              if (!isValid(subCategory)) { return res.status(400).send({ status: false, msg: "subcategory is required" }) }
              let nsubCategory = /^[a-zA-Z]{2,9}$/.test(subCategory.trim())
              if (!nsubCategory) { return res.status(400).send({ status: false, msg: "enter Valid subcategory name " }) }



                let saveData = await blogModel.create(data)
                res.status(201).send({ status: true, msg: saveData })
            } 
            else return res.status(400).send({ status: false, msg: "plese enter currect author_id" })
        } 
        else return res.status(400).send({ status: false, msg: "author_id is required" })
    } 
    catch (err) {
        console.log(err.message);
        res.status(500).send({ error: err.message });
    }
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
        } else {
            return res.status(404).send({ status: false, msg: "data is not present" })
        }
    } else {
        let blogsFilter = await blogModel.find({ $or: [{ authorId: authorId }, { category: category }, { tags: tags }, { subCategory: subCategory }] }, { isDeleted: false })
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
        let changeBlog = await blogModel.findByIdAndUpdate({ _id: blogId }, { $addToSet: { tags: tags, subCategory: subCategory }, $set: { title: title, body: body, category: category, isPublished: true, publishedAt: Date.now() } }, { new: true })
        return res.status(200).send({ msg: "Blog Updated Successfully", status: true, data: changeBlog });
    }
    catch (err) {
        console.log(err.message);
        res.status(500).send({ error: err.message });
    }
};



const deleteById = async function (req, res) {
    try {
        const blogId = req.params.blogId;

        const blog = await blogModel.findById(blogId);
        if (!blog || blog.isDeleted === true) {
            return res.status(404).send({ status: false, msg: "no such blog exists" })
        }
        const deleteBlog = await blogModel.findByIdAndUpdate({ _id: blogId }, { $set: { isDeleted: true, deletedAt: Date.now() } });
        return res.status(200).send({ status: true, msg: "blog deleted successfully" });

    } catch (error) {
        console.log(error);
        return res.status(500).send({ status: false, msg: error.message })
    }
}



const deleteBlogsquery = async function (req, res) {

    try {

       let data = req.query
       if (Object.keys(data).length == 0) 
       return res.status(400).send({ status: false, message: "Enter a valid input in body" });


       let saveData = await blogModel.findOne(data)
        console.log(saveData)

      
       if (saveData.isDeleted == true)
        { return res.send({ msg: "data is already delete" }) }
       else {
           let updateData = await blogModel.findByIdAndUpdate(saveData, { $set: { isDeleted: true ,deletedAt:Date.now(),isPublished:false,publishedAt:null} },{new:true})

           res.status(201).send({ status: true, msg: updateData })
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
