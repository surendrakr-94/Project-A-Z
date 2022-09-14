const collegeModel = require('../Models/collegeModel')
const internModel = require('../Models/internModel')


const college = async function (req,res){
    let requestbody = req.body

    let newCollege = await collegeModel.create(requestbody)
    res.send({ status : true , msg : "successfully created", data : newCollege})
}


//=============================
const getcollegedetails = async function (req,res){
    let queryName= req.query
    let collegeName =req.query.name

    let collegeDetail = await collegeModel.findOne({name:collegeName, isDeleted : false})
    res.send({status: true, msg:" find all college", data : collegeDetail})

}



module.exports.college =college
module.exports. getcollegedetails = getcollegedetails