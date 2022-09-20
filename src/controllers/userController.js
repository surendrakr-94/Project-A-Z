const userModel = require("../models/userModel")
const jwt = require("jsonwebtoken")
const emailRegex = /[a-zA-Z0-9_\-\.]+[@][a-z]+[\.][a-z]{2,3}/
const passwordRegex = /^(?=.[0-9])(?=.[a-z])(?=.[A-Z])(?=.[@#$%&])[a-zA-Z0-9@#$%&]{6,20}$/

const login = async (req, res) => {
    try {
        let data = req.body
        let {emailId , password} = data

        if (Object.keys(data)<1) {
            return res.status(400).send({ status: false, message: "plz give input of email and password in request body" })
        }
        if (!emailId) {
            return res.status(400).send({ status: false, message: "emailId is required" })
        }
        if (!emailRegex.test(emailId)) {
            return res.status(400).send({ status: false, message: "emailId should be in valid format" })
        }
        if (!password) {
            return res.status(400).send({ status: false, message: "password is required" })
        }
        if (!password.test(password)) {
            return res.status(400).send({status:false, message: "Password should be min 6 and max 20 character.It contains atleast--> 1 Uppercase letter, 1 Lowercase letter, 1 Number, 1 Special character" })
        }

        let findUser = await userModel.findOne({ email: emailId, password: password });
        if (!findUser) {
            return res.status(404).send({ status: false, message: "emailId or password is incorrect" })
        }

        let token = jwt.sign({
            userId : findUser._id.toString()

        })

    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}