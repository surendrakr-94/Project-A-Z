const jwt = require('jsonwebtoken')
const blogModel = require('../models/blogModel')


const authentication = async function (req, res, next) {
    try {
        let token = req.headers["x-powered-by"]
        if (!token) { return res.status(404).send({ status: false, msg: "token must be present" }) }

        let decodeToken = jwt.verify(token, "functionupiswaywaycoolHariomSemwal")
        if (!decodeToken) {
            return res.status(401).send({ status: false, msg: "invalid token" })
        }
        if (decodeToken) {


            next()
        }
    } catch (error) { res.status(500).send(error.message) }
}



const blogAuthorisation= async function (req, res, next) {
    try {
        let token = req.headers["x-powered-by"]
        if (!token) { return res.status(401).send({ status: false, msg: "token must be present" }) }
        let decodeToken = jwt.verify(token, "functionupiswaywaycoolHariomSemwal")
        console.log(decodeToken)
        if (!decodeToken) {
            return res.status(401).send({ status: false, msg: " invalid token" })
        }

        let rahul = req.params.blogId
        
        let blogId1 = await blogModel.findById(rahul)
       
        if (!blogId1) { return res.status(404).send({ status:false,msg: "blog not found this id" }) }
        
        if (decodeToken.id == blogId1.authorId) {
            next()
        }
        else { return res.status(403).send({ status: false, msg: "you not access this id " }) }
    }
     catch (error) { res.status(500).send(error.message) }
 }



const AuthorisationDeleteQuery = async function (req, res, next) {
    try {
        let token = req.headers["x-powered-by"]
        if(!token) { return res.status(401).send({ status: false, msg: "token must be present" }) }

        let decodeToken =jwt.verify(token,"functionupiswaywaycoolHariomSemwal")
   
        if(decodeToken.id===req.query.authorId) {

             next()
        } else{res.status(401).send({msg:"query id is incorrect "})}
    } catch (error) { res.status(500).send(error.message) }
}




const  authorAuthorisationBody= async function (req, res, next) {
    try {  
        
           let token = req.headers["x-powered-by"]
           authorId=req.body.authorId
           if(!authorId)       
           { return res.status(401).send({msg:"id is required"})} 
           
           
       
        if(!token) { return res.status(401).send({ status: false, msg: "token must be present" }) }
     
        let decodeToken =jwt.verify(token,"functionupiswaywaycoolHariomSemwal")


        if(decodeToken.id===req.body.authorId) {

             next()
        } else{ return res.status(401).send({msg:"id is incorrect"})}
    } catch (error) { return  res.status(500).send(error.message) }
}

   
    module.exports = { authentication, blogAuthorisation, AuthorisationDeleteQuery,authorAuthorisationBody }
