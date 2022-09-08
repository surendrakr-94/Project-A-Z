const jwt = require('jsonwebtoken')
const blogModel = require('../models/blogModel')


const mid1 = async function (req, res, next) {
    try {
        let token = req.headers["x-powered-by"]
        if (!token) { return res.status(400).send({ status: false, msg: "token must be present" }) }

        let decodeToken = jwt.verify(token, "functionupiswaywaycoolHariomSemwal")
        if (!decodeToken) {
            return res.status(401).send({ status: false, msg: "invalid token" })
        }
        if (decodeToken) {


            next()
        }
    } catch (error) { res.status(500).send(error.message) }
}

const mid2 = async function (req, res, next) {
    try {
        let token = req.headers["x-powered-by"]
        if (!token) { return res.status(401).send({ status: false, msg: "token must be present" }) }
        let decodeToken = jwt.verify(token, "functionupiswaywaycoolHariomSemwal")
        if (!decodeToken) {
            return res.status(404).send({ status: false, msg: " invalid token" })
        }

        let rahul = req.params.blogId
        let blogId1 = await blogModel.findById(rahul)
        if (!blogId1) { return res.send({ msg: "blog not found this id" }) }
        // console.log(authorId)
        // console.log(decodeToken.id)
        if (decodeToken.id == blogId1.rahul) {
            next()
        }
        else { return res.status(403).send({ status: false, msg: "you not access this id " }) }
    }
    catch (error) { res.status(500).send(error.message) }
}



const mid3 = async function (req, res, next) {
    try {
        let token = req.headers["x-powered-by"]
        if(!token) { return res.status(400).send({ status: false, msg: "token must be present" }) }

        let decodeToken = await jwt.verify(token,"functionupiswaywaycoolHariomSemwal")
       
        if(decodeToken.id===req.params.authorId) {
             next()
        } else{res.send({msg:"wrong author id"})}
    } catch (error) { res.status(500).send(error.message) }
}

   
    module.exports = { mid1, mid2, mid3 }
