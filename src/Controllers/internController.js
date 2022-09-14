const collegeModel = require('../Models/collegeModel')
const internModel = require('../Models/internModel')
const { default: mongoose } = require('mongoose');

//================validation==============
const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true
}

const isValidObjectId = function (objectId) {
    return mongoose.Types.ObjectId.isValid(objectId)
};

const isValidRequestBody = function (request) {
    return (Object.keys(request).length > 0)
}

const isValidEmail = function (value) {
    const regexForEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    return regexForEmail.test(value)
  }

  const isValidNumber = function (value) {
    const regexForNumber = /^([+]\d{2})?\d{10}$/              ///^[0-9]\d{0-9}$/ 
    return regexForNumber.test(value)
  }

const isValidname = function (value) {
    let regex = /^[a-zA-Z]+([\s][a-zA-Z]+)*$/
    return regex.test(value)
}
//============================================
const newIntern = async function (req,res){  
  try  {let requestbody = req.body

    const { name, email, mobile,  collegeId } = requestbody

    if (!isValidRequestBody(requestbody)) return res.status(400).send({ status: false, message: "No input by user.." })
    if (!isValid(name)) return res.status(400).send({ status: false, message: "Intern's name is required." })
    if (!isValid(email)) return res.status(400).send({ status: false, message: "Intern's email id is required." })
    if (!isValid(mobile)) return res.status(400).send({ status: false, message: "Intern's mobile no is required." })
    if (!isValid(collegeId)) return res.status(400).send({ status: false, message: "Intern's college Id is required." })
    if (!isValidObjectId(collegeId)) return res.status(400).send({ status: false, message: "id is not valid" })
    if (!isValidEmail(email)) return res.status(400).send({ status: false, message: "Enter a valid email address....." })
    if (!isValidname(name)) return res.status(400).send({ status: false, message: "name is required or its should contain character" })
    if (!isValidNumber(mobile)) return res.status(400).send({ status: false, message: "mobile no is required" })

    let useEmail = await internModel.findOne({email})
    if(useEmail)  return res.status(400).send({ status: false, message: "emailId is already exist" })

    let usemobile = await internModel.findOne({mobile})
    if(usemobile)  return res.status(400).send({ status: false, message: "mobile number is already exist" })

    let collegeid= await collegeModel.findOne({name: collegeId, isDeleted: false})
    if(!collegeid) return res.status(404).send({ status: false, message: "college not found" })

    let newInterndata = await internModel.create(requestbody)
    res.status(201).send({ status : true , msg : "successfully created", data : newInterndata})
}
catch (error) { return res.status(500).send({ msg: error.message })}
}



module.exports.newIntern =newIntern