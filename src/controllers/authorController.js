
const AuthorModel = require("../models/authorModel")
const jwt = require('jsonwebtoken')

const isValid = function (check) 
{
    if (!check || check == undefined) { return false }
    if (typeof check !== "string" || check.trim().length == 0) { return false }
    return true
}

const isValidTitle = function(title)
    {
         ['Mr','Mrs','Miss'].indexOf(title)!==-1
         return title
    }

//const isvalidateBody = function(body)
 //   {

       // return Object.keys(body).length>0
 //   }

const createAuthor = async function (req, res) {
    try {
        data = req.body

     //   if(isvalidateBody(data))
     //   {
      //      res.status(400).send({status:false,message:"Invalid parameters"})
      //  }

        const { fName, lName, title, email, password } = data
        if (!isValid(fName)) { return res.status(400).send({ status: false, msg: "fName is required" }) }
       
        if (!isValid(lName)) { return res.status(400).send({ status: false, msg: "lName is required" }) }
        
        if (!isValid(title)) { return res.status(400).send({ status: false, msg: "title is required" }) }
          
        if(isValidTitle(title)){ return res.status(400).send({ status: false, msg: "title should be Mr,Mrs,Miss"}) }


        if (!isValid(email)) { return res.status(400).send({ status: false, msg: "email is required" }) }
        let Email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.trim())
        if (!Email) { return res.status(400).send({ status: false, msg: "enter Valid email " }) }

        if (!isValid(password)) { return res.status(400).send({ status: false, msg: "password is required" }) }


       const emailalready= await AuthorModel.findOne({email})
       if(emailalready)
       {
        res.status(400).send({status:false, message:`${email} email is already registered`})
       }

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
         { return res.status(400).send({ status: false, msg: "Email is required"}) }
        
        
         if (!password) 
        { return res.status(400).send({ status: false, msg: "Password is required" }) }
        
        console.log(email,password)
        let data = await AuthorModel.findOne({ email: email, password: password })

        if (!data) { return res.status(400).send({ msg: "email and password is incorrect" }) }

        let token = await jwt.sign({ id: data._id.toString() }, "functionupiswaywaycoolHariomSemwal")
        console.log(token)
        res.header({ "x-api-key": token })
        res.status(200).send({ status: true, msg:"Login Successfull", data: token })
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ error: err.message });
    }

    
}


module.exports.createAuthor = createAuthor
module.exports.getAuthorsData = getAuthorsData
module.exports.login = login