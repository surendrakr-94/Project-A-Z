const collegeModel = require('../Models/collegeModel')
const internModel = require('../Models/internModel')


const isVaild = function(value){
    if (typeof value === 'undefined'|| value ===null) return false
    if (typeof value === 'string' && value.trim().length ===0) return false
    return true
}
const isVaildRequestBody =function(request){
    return (Object.keys(request).length>0)
}

const college = async function (req,res){
    let requestbody = req.body
    const {name, fullName ,logoLink} = requestbody
    if (!isVaildRequestBody(requestbody)) return res.status(400).send({status: false,message:"no input by user"})
    if (!isVaild(name)) return res.status(400).send({status: false,message:"college name is required"})
    if (!isVaild(fullName)) return res.status(400).send({status: false,message:"college full name is required"})
    if (!isVaild(logoLink)) return res.status(400).send({status: false,message:"college logo Link is required"})
    


    let newCollege = await collegeModel.create(requestbody)
    res.send({ status : true , message : "successfully created", data : newCollege})
}


//=============================
const getcollegedetails = async function (req,res){
    let queryName= req.query.name
    // let collegeName =req.query.name

    let collegeDetail = await collegeModel.findOne({name:queryName, isDeleted : false}).select({ fullName:1, logoLink:1,  isDeleted: 1})
   if(!collegeDetail) return res.status(404).send({status:false, message: "No college found with this name"})
   
    let collegeid = collegeDetail._id
    //console.log(collegeid)
    
    let findIntern = await internModel.find({collegeid})
    if(findIntern.length ==0) return res.status(404).send({status: false,message : "No Internship applications submitted"})
    const allintern = {"fullname":collegeDetail.fullName , "logoLink": collegeDetail.logoLink ,"isDeleted" : collegeDetail.isDeleted , "intern": findIntern}
 
    res.send({status: true, msg:" find all college", data : allintern})  



}  

  

module.exports.college =college
module.exports. getcollegedetails = getcollegedetails