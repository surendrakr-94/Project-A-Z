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
        let subcategory = req.query.subcategory
        if (authorId === undefined && category === undefined && tags === undefined && subcategory === undefined) {
            let Blogs = await blogModel.findOne({ isDeleted: false, isPublished: true})

            if (Blogs) {
                res.status(200).send({ status: true, data: Blogs })
            }

            else {
                return res.status(404).send({ status: false, msg: "data is not present" })
            }
        }

        else {
            let blogsFilter = await blogModel.find({ isDeleted: false, isPublished: true, $or: [{ authorId: authorId }, { category: category }, { tags: tags }, { subCategory: subCategory }] })

            if (blogsFilter) {

                res.status(200).send({ status: true, data: blogsFilter })
            }
            else {

                res.status(404).send({ status: false, msg: "Not Found" })
            }

        }
    }


//          if (authorId === undefined && category ===undefined && tags === undefined && subcategory === undefined) {
//             let Blogs = await blogModel.findOne({ isDeleted:false, isPublished:true })
//               return res.send({data:Blogs})
            
//          } if(Blogs){return res.send({msg:"no one here"})}

//         else{    let blogsFilter = await blogModel.find({ isDeleted: false, isPublished: true, $or: [{ authorId: authorId }, { category: category }, { tags: tags }, { subcategory: subcategory }] })

//             if (blogsFilter) {

//                 res.status(200).send({ status: true, data: blogsFilter })
//             }
//             else {

//                 res.status(404).send({ status: false, msg: "Not Found" })
//             }

//         }
//     }
//     catch (err) {

//         res.status(500).send({ msg: "Server Error", error: err.message })

//     }
// }




const updateBlog = async (req, res) => {
    try {
        let blogId = req.params.blogId;
        let data = await blogModel.findById(blogId);
        // console.log(data);
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
        const blogId = req.params.blogId;
        const blog = await blogModel.findById(blogId);
        if (!blog || blog.isDeleted === true) {
            return res.status(404).send({ status: false, msg: "no such blog exists" })
        }//validation1
        const deleteBlog = await blogModel.findByIdAndUpdate({ _id: blogId }, { $set: { isDeleted: true, deletedAt: Date.now() } });
        return res.status(200).send({ status: true, msg: "blog deleted successfully" });

    } catch (error) {
        console.log(error);
        return res.status(500).send({ status: false, error: error.name, msg: error.message })
    }
}

const deleteBlogsquery = async function (req, res) {


        let data=req.query
        // console.log(data.length==0)
        console.log(!(data.length==0))
        if(!(data.length==0)){return res.send({msg:"plz enter valid request"})}
        let savedata=await blogModel.findOne(data)
        console.log(!(data.length==0))
        if(!savedata){return res.status(404).send({status:false,msg:"not a valid request"})}

        if(savedata.isDeleted==true){return res.status(400).send({status:false,msg:"this document is already deleted"})}

        let final=await blogModel.findOneAndUpdate(savedata,{$set:{isDeleted:true,deletedAt:Date.now()}},{new:true})
    res.status(200).send({status:true,msg:final})}

module.exports.createBlog = createBlog
module.exports.getBlogsData = getBlogsData
module.exports.updateBlog = updateBlog
module.exports.deleteById = deleteById
module.exports.deleteBlogsquery = deleteBlogsquery
