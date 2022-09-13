const { time } = require("console")
const blogModel = require("../models/blogModel")
const authormodel = require("../models/authorModel")
const { default: mongoose, isValidObjectId } = require("mongoose")
const { AuthorisationDeleteQuery } = require("../middleware/midd")


const isValid = function (check) {
    if (!check || check == undefined) { return false }
    if (typeof check !== "string" || check.trim().length == 0) { return false }
    return true
}
 
const isvalidateBody = function(body)
{
    return Object.keys(req).length>0
}

const isvalidObjectId = function(objectId)
{
return mongoose.Types.ObjectId.isValid(objectId)
}

const createBlog = async function (req, res) {
    try {
        let data = req.body
        
        if(isvalidateBody(data))
        {
            res.status(400).send({status:false,message:"Invalid parameters"})
        }
        const {title,body,authorId,tags,category,subCategory,isPublished} = data

        if (!isValidauthorId) {
            const check = await authormodel.find(data.author_id)
            if (check) {

              if (!isValid(title)) { return res.status(400).send({ status: false, msg: "title is required" }) }
                
              if (!isValid(body)) { return res.status(400).send({ status: false, msg: "body is required" }) }
                           
              if (!isValidObjectId(authorId)) { return res.status(400).send({ status: false, msg: "authorId is not valid" }) }
               
              if (!isValid(category)) { return res.status(400).send({ status: false, msg: "category is required" }) }
               
              const author= await authormodel.findById(authorId)
             if(!author)
             {
                return res.status(400).send({status:false,msg:"Author Id is not exist"})
             }
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

    const {authorId,category,tags,subCategory}  = req.query
      
        let Blogs = await blogModel.find({ isDeleted: false, isPublished: true })

        if (Blogs) {
            res.status(200).send({ status: true, data: Blogs })
        } else {
            return res.status(404).send({ status: false, msg: "Not Found" })
        }
   
        let blogsFilter = await blogModel.find({ $or: [{ authorId: authorId ,  category: category , tags: tags , subCategory: subCategory}] }, { isDeleted: false })
        if (blogsFilter) 
        {
            res.status(200).send({ status: true, data: blogsFilter })
        }
        else {
            res.status(404).send({ status: false, msg: "Not Found" })
        }
   
    }

const updateBlog = async function(req, res) 
 {
    try {
        const { tags, category, title, body, subCategory,isPublished } = req.body
        const blogId = req.params.blogId
        const params =req.params
        const authorid = req.authorId


        if (blogId.length < 24 && blogId.length > 24) { return res.status(404).send({ status: false, msg: "plz enter correct blogId" }) }

        let data = await blogModel.findById(blogId);

        if (data.isDeleted == true) { return res.status(400).send({ status: false, msg: "this is already deleted" }) }

        if (!data) {
            return res.status(400).send({ status: false, msg: "blogId is incorrect" })
        }
       
        if (!isValid(title)) { return res.status(400).send({ status: false, msg: "title is required" }) }
                
        if (!isValid(body)) { return res.status(400).send({ status: false, msg: "body is required" }) }              
     
        if (!isValid(category)) { return res.status(400).send({ status: false, msg: "category is required" }) }
        
        if (!isValid(subcategory)) { return res.status(400).send({ status: false, msg: "category is required" }) }
      
        

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
        
        if(!isValidObjectId(blogId))
        {
           return res.status().send({status:false,msg:"Invalid Blog Id"})
        }
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
       const { authorId,category,subCategory,tags,isPublished }= data
       if (Object.keys(data).length == 0) 
       return res.status(400).send({ status: false, message: "Enter a valid input in body" });


       let saveData = await blogModel.findOne(data)
        console.log(saveData)

      
       if (saveData.isDeleted == true)
        { return res.send({ msg: "data is already delete" }) }

       else {  
           let blog = await blogModel.find({$or:[{authorId,category,subCategory,tags,isPublished}]})  
           let updateData = await blogModel.updateMany(blog, { $set: { isDeleted: true ,deletedAt:Date.now(),isPublished:false,publishedAt:null} },{new:true})

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
