const collegeModel = require('../Models/collegeModel')
const internModel = require('../Models/internModel')
const { default: mongoose } = require('mongoose');



//===========validation========================

const isVaild = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true
}
const isVaildRequestBody = function (request) {
    return (Object.keys(request).length > 0)
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



//----------------------------------------------------Create Colleges ---------------------------------------------------------------

const college = async function (req, res) {
    try {
        let requestbody = req.body
        const { name, fullName, logoLink } = requestbody
        if (!isVaildRequestBody(requestbody)) return res.status(400).send({ status: false, message: "no input by user" })

        if (!isVaild(name)) return res.status(400).send({ status: false, message: "college name is required" })
        if (!isValidname(name)) return res.status(400).send({ status: false, message: "name is required or its should contain character" })
        let duplicateName = await collegeModel.findOne({ name })
        if (duplicateName) return res.status(400).send({ status: false, message: "already exist" })

        if (!isVaild(fullName)) return res.status(400).send({ status: false, message: "college fullname is required" })
        if (!isValidfullname(fullName)) return res.status(400).send({ status: false, message: "college full name is required or its should contain charcter" })

        if (!isValidURL(logoLink)) return res.status(400).send({ status: false, message: "URL is not valid" })
       
        let newCollege = await collegeModel.create(requestbody)
        res.send({ status: true, message: "successfully created", data: newCollege })
    } 
    catch (error)
     { return res.status(500).send({ msg: error.message }) }

}


//--------------------------------------------------- Get Colleges with applicable intern ---------------------------------------------------------


const getcollegedetails = async function (req, res) {
    try {
        let queryName = req.query.name
        if(!(queryName)) {return res.status(400).send({status: false, message:"please enter name in query"})}


        let collegeDetail = await collegeModel.findOne({ name: queryName, isDeleted: false })
        if (!collegeDetail) return res.status(404).send({ status: false, message: "No college found with this name" })
        let collegeid = collegeDetail._id

        let findIntern = await internModel.find({ collegeId: collegeid }).select({ _id: 1, name: 1, email: 1, mobile: 1 })

         if (findIntern.length == 0) {
            const allintern = { "name": collegeDetail.name, "fullname": collegeDetail.fullName, "logoLink": collegeDetail.logoLink, "isDeleted": collegeDetail.isDeleted, "intern": "No intern applicable" }
            res.status(200).send({ status: true, msg: " find all college", data: allintern })
         }

        const allintern = { "name": collegeDetail.name, "fullname": collegeDetail.fullName, "logoLink": collegeDetail.logoLink, "isDeleted": collegeDetail.isDeleted, "intern": findIntern }

        res.status(200).send({ status: true, msg: " find all college", data: allintern })
    } catch (error) { return res.status(500).send({ msg: error.message }) }

}



module.exports.college = college
module.exports.getcollegedetails = getcollegedetails