const collegeModel = require('../Models/collegeModel')
const internModel = require('../Models/internModel')
const { default: mongoose } = require('mongoose');

//===========validation========================
const isVaild = function(value){
    if (typeof value === 'undefined'|| value ===null) return false
    if (typeof value === 'string' && value.trim().length ===0) return false
    return true
}
const isVaildRequestBody =function(request){
    return (Object.keys(request).length>0)
}

const isValidObjectId = function (objectId) {
    return mongoose.Types.ObjectId.isValid(objectId)
};

const isValidfullname = function (value) {
    let regex = /^[a-zA-Z]+([\s][a-zA-Z]+)*$/
    return regex.test(value)
}

const isValidname = function (value) {
    let regex = /^[a-zA-Z]+[\.-]?[a-zA-Z]+$/
    return regex.test(value)
}

const isValidURL = function (value) {
    let URLregex = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/
     return URLregex.test(value)
}
//=============================================
const college = async function (req,res){
   try{ let requestbody = req.body
    const {name, fullName ,logoLink} = requestbody
    if (!isVaildRequestBody(requestbody)) return res.status(400).send({status: false,message:"no input by user"})
    if (!isValidname(name)) return res.status(400).send({status: false,message:"college name is required"})
    if (!isValidfullname(fullName)) return res.status(400).send({status: false,message:"college full name is required"})
    if (!isValidURL(logoLink)) return res.status(400).send({status: false,message:"URL is not valid"})
    let duplicateName = await collegeModel.findOne({name})
    if(duplicateName) return res.status(400).send({ status : false , message : "already exist"})
  

    let newCollege = await collegeModel.create(requestbody)
    res.send({ status : true , message : "successfully created", data : newCollege})
}catch (error) { return res.status(500).send({ msg: error.message })}
    
}


//==============================================
const getcollegedetails = async function (req,res){
   try{ let queryName= req.query.name
    // let collegeName =req.query.name

    let collegeDetail = await collegeModel.findOne({name:queryName, isDeleted : false}).select({ name :1, fullName:1, logoLink:1,  isDeleted: 1})
   if(!collegeDetail) return res.status(404).send({status:false, message: "No college found with this name"})
   
    let collegeid = collegeDetail._id
    console.log(collegeid)
    
    let findIntern = await internModel.find({collegeId:collegeid}).select({ _id: 1, name :1, email:1,  mobile : 1})
    if(findIntern.length ==0) return res.status(404).send({status: false,message : "No Internship applications submitted"})
    const allintern = {"name":collegeDetail.name ,"fullname":collegeDetail.fullName , "logoLink": collegeDetail.logoLink ,"isDeleted" : collegeDetail.isDeleted , "intern": findIntern}
 
    res.send({status: true, msg:" find all college", data : allintern}) 
}catch (error) { return res.status(500).send({ msg: error.message })}

}  

  

module.exports.college =college
module.exports. getcollegedetails = getcollegedetails