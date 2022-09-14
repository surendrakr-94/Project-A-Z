const collegeModel = require('../Models/collegeModel')
const internModel = require('../Models/internModel')


const newIntern = async function (req,res){
    let requestbody = req.body

    let newInterndata = await internModel.create(requestbody)
    res.send({ status : true , msg : "successfully created", data : newInterndata})
}



module.exports.newIntern =newIntern