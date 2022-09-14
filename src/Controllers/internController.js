const collegeModel = require('../Models/collegeModel')
const internModel = require('../Models/internModel')


const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true
}

const isValidRequestBody = function (request) {
    return (Object.keys(request).length > 0)
}


const newIntern = async function (req,res){
    let requestbody = req.body

    const { name, email, mobile, collegeName } = requestbody

    if (!isValidRequestBody(requestbody)) return res.status(400).send({ status: false, message: "No input by user.." })

    if (!isValid(name)) return res.status(400).send({ status: false, message: "Intern's name is required." })
    if (!isValid(email)) return res.status(400).send({ status: false, message: "Intern's email id is required." })
    if (!isValid(mobile)) return res.status(400).send({ status: false, message: "Intern's mobile no is required." })
    if (!isValid(collegeName)) return res.status(400).send({ status: false, message: "Intern's college name is required." })

    let newInterndata = await internModel.create(requestbody)
    res.status(201).send({ status : true , msg : "successfully created", data : newInterndata})
}



module.exports.newIntern =newIntern