const blogModel = require("../models/blogModel")


const createBlog = async function (req, res) {
    let data = req.body
    if (data.author_id) {
        const check = await authormodel.find(data.author_id)
        if (check) {
            let saveData = await Blogmodel.create(data)
            res.status(201).send({ status: true, msg: saveData })
        } else return res.status(400).send({ status: false, msg: "plese enter currect author_id" })
    } else return res.status(400).send({ status: false, msg: "author_id is required" })


}
/*Returns all blogs in the collection that aren't deleted and are published
Return the HTTP status 200 if any documents are found. The response structure should be like this
If no documents are found then return an HTTP status 404 with a response like this blogs list by applyings. Query param can have any combination of belows.
By author Id
By category
List of blogs that have a specific tag
List of blogs that have a specific subcategory example of a query url: blogsnamevalue&f2=fv2

*/
const getBlogsData=async function (req,res)
{
    try {
        let authorId = req.query.authorId
        let category = req.query.category
        let tags = req.query.tags
        let subcategory = req.query.subcategory
       
        if(authorId === undefined && category === undefined && tags === undefined && subcategory === undefined)
         {   let Blogs = await blogModel.find({ isDeleted: false, isPublished: true })

          if (Blogs) 
             {  
                 res.status(200).send({ status: true, data: Blogs }) 
             }
          
          else  
           { 
                return res.status(404).send({ status: false, msg: "Not Found" }) 
            }
        }

        else
         {  let blogsFilter = await blogModel.find({ isDeleted: false, isPublished: true, $or: [{ authorId: authorId }, { category: category }, { tags: tags }, { subcategory: subcategory }] })
            
            if (blogsFilter) {

                res.status(200).send({ status: true, data: blogsFilter })
            }
            else {
               
                res.status(404).send({ status: false, msg: "Not Found" })
            }
          
    }}
    catch (err) {
       
        res.status(500).send({ msg: "Server Error", error: err.message })
 
    }
}

module.exports.createBlog = createBlog

module.exports.getBlogsData=getBlogsData
