const authorModel = require("../models/authorModel")
const AuthorModel = require("../models/authorModel")
const jwt = require('jsonwebtoken')

const isValid = function (check) {
    if (!check || check == undefined) { return false }
    if (typeof check !== "string" || check.trim().length == 0) { return false }
    return true
}

const createAuthor = async function (req, res) {
    try {
        data = req.body
        const { fName, lName, title, email, password } = data
        if (!isValid(fName)) { return res.status(400).send({ status: false, msg: "fName is required" }) }
        let fNamea = /^[a-zA-Z]{2,9}$/.test(fName.trim())
        if (!fNamea) { return res.status(400).send({ status: false, msg: "enter Valid first name " }) }

        if (!isValid(lName)) { return res.status(400).send({ status: false, msg: "lName is required" }) }
        let LName = /^[a-zA-Z]{2,9}$/.test(lName.trim())
        if (!LName) { return res.status(400).send({ status: false, msg: "enter  Valid last name" }) }

        if (!isValid(title)) { return res.status(400).send({ status: false, msg: "title is required" }) }
        let Title = /^(Mr|Mrs|Miss){0,3}$/.test(title.trim())
        if (!Title) { return res.status(400).send({ status: false, msg: "enter  valid title " }) }

        if (!isValid(email)) { return res.status(400).send({ status: false, msg: "email is required" }) }
        let Email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.trim())
        if (!Email) { return res.status(400).send({ status: false, msg: "enter Valid email " }) }

        if (!isValid(password)) { return res.status(400).send({ status: false, msg: "password is required" }) }
        let Password = /^[a-zA-Z0-9]{6,109}$/.test(password.trim())
        if (!Password) { return res.status(400).send({ status: false, msg: "enter Valid password ( min=6)request" }) }

        let authorCreated = await AuthorModel.create(data)
        res.status(201).send({status: true, data: authorCreated })
    }
    catch (err) {
        console.log(err.message);
        res.status(500).send({ error: err.message });
    }
}


const getAuthorsData = async function (req, res) {
    let authors = await AuthorModel.find()
    res.send({ data: authors })
}

const login = async function (req, res) {
    try {
       
        const {email,password}= req.body
          if (!email)
         { return res.status(400).send({ status: false, msg: "enter Valid email " }) }
        
        
         if (!password) 
        { return res.status(400).send({ status: false, msg: "enter Valid password ( min=6)request" }) }
        
        console.log(email,password)
        let data = await AuthorModel.findOne({ email: email, password: password })
        if (!data) { return res.status(400).send({ msg: "email and password is incorrect" }) }

        let token = await jwt.sign({ id: data._id.toString() }, "functionupiswaywaycoolHariomSemwal")
        console.log(token)
        res.header({ "x-api-key": token })
        res.status(200).send({ status: true, msg: token })
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ error: err.message });
    }

    
}


module.exports.createAuthor = createAuthor
module.exports.getAuthorsData = getAuthorsData
module.exports.login = login