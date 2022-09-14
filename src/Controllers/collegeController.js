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
//=============================================// Create College
const createCollege = async function (req, res) {
    try {
        let collegeData = req.body
        let { name, fullName, logoLink } = collegeData
        if (!isVaildRequestBody(collegeData)) return res.status(400).send({ status: false, message: "no input by user" })
        if (!isValidname(name)) return res.status(400).send({ status: false, message: "college name is required" })
        if (!isValidfullname(fullName)) return res.status(400).send({ status: false, message: "college full name is required" })
        if (!isValidURL(logoLink)) return res.status(400).send({ status: false, message: "URL is not valid" })


        let duplicateName = await collegeModel.findOne({ name })
        if (duplicateName) return res.status(400).send({ status: false, message: "already exist" })

        let newCollege = await collegeModel.create(collegeData)
        res.send({ status: true, message: "successfully created", data: newCollege })

    } catch (error) { return res.status(500).send({ message: error.message }) }

}


//==============================================// Get College Details
const getcollegedetails = async function (req, res) {
    try {


        let queryName = req.query.name

        let collegeDetail = await collegeModel.findOne({ name: queryName, isDeleted: false }).select({ name: 1, fullName: 1, logoLink: 1, isDeleted: 1 })
        if (!collegeDetail) return res.status(404).send({ status: false, message: "No college found with this name" })

        let collegeid = collegeDetail._id

        let findIntern = await internModel.find({ collegeId: collegeid }).select({ _id: 1, name: 1, email: 1, mobile: 1 })
        if (findIntern.length == 0) return res.status(404).send({ status: false, message: "No Internship applications submitted" })

        const allinterns = {
            "name": collegeDetail.name,
            "fullname": collegeDetail.fullName,
            "logoLink": collegeDetail.logoLink,
            "isDeleted": collegeDetail.isDeleted,
            "intern": findIntern
        }
        res.status(200).send({ status: true, message: " find all college", data: allinterns })

    } catch (error) { return res.status(500).send({ message: error.message }) }

}



module.exports.createCollege = createCollege
module.exports.getcollegedetails = getcollegedetails