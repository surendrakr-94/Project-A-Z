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


//----------------------------------------------------Create Interns ---------------------------------------------------------------


const createIntern = async function (req, res) {
    try {
        let internData = req.body
        const { name, email, mobile, collegeName } = internData
        if (!isValidRequestBody(internData)) return res.status(400).send({ status: false, message: "No input by user.." })

        if (!isValid(name)) return res.status(400).send({ status: false, message: "Intern's name is required." })
        if (!isValidname(name)) return res.status(400).send({ status: false, message: "name is required or its should contain character" })

        if (!isValid(email)) return res.status(400).send({ status: false, message: "Intern's email id is required." })
        if (!isValidEmail(email)) return res.status(400).send({ status: false, message: "Enter a valid email address....." })

        let useEmail = await internModel.findOne({ email })
        if (useEmail) return res.status(400).send({ status: false, message: "emailId is already exist" })

        if (!isValid(mobile)) return res.status(400).send({ status: false, message: "Intern's mobile no is required." })
        if (!isValidNumber(mobile)) return res.status(400).send({ status: false, message: "mobile no is required" })

        let usemobile = await internModel.findOne({ mobile })
        if (usemobile) return res.status(400).send({ status: false, message: "mobile number is already exist" })

        if (!isValid(collegeName)) return res.status(400).send({ status: false, message: "Intern's college Id is required." })
        if (!isValidname(collegeName)) return res.status(400).send({ status: false, message: "id is not valid" })

        let getcollegeid = await collegeModel.findOne({ name: collegeName, isDeleted: false })
        if (!getcollegeid) return res.status(404).send({ status: false, message: "college not found" })

        let collegeId = getcollegeid._id
        let newIntern = { name, email, mobile, collegeId }


        let newInterndata = await internModel.create(newIntern)
        res.status(201).send({ status: true, message: "successfully created", data: newInterndata })
    }
    catch (error) { return res.status(500).send({ message: error.message }) }
}



module.exports.createIntern = createIntern