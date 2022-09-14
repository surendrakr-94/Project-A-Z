const collegeModel = require('../Models/collegeModel')
const internModel = require('../Models/internModel')


const college = async function (req,res){
    let requestbody = req.body

    let newCollege = await collegeModel.create(requestbody)
    res.send({ status : true , msg : "successfully created", data : newCollege})
}


//=============================
const getcollegedetails = async function (req,res){
    let queryName= req.query.name
    // let collegeName =req.query.name

    let collegeDetail = await collegeModel.findOne({name:queryName, isDeleted : false}).select({ fullName:1, logoLink:1,  isDeleted: 1})
    let collegeid = collegeDetail._id
    console.log(collegeid)
    
    let findIntern = await internModel.find({collegeid})
    const allintern = {"fullname":collegeDetail.fullName , "logoLink": collegeDetail.logoLink ,"isDeleted" : collegeDetail.isDeleted , "intern": findIntern}

    res.send({status: true, msg:" find all college", data : allintern})  



}  

  

module.exports.college =college
module.exports. getcollegedetails = getcollegedetails