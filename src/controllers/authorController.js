const authorModel = require("../models/authorModel")
const AuthorModel = require("../models/authorModel")
const jwt = require('jsonwebtoken')
const createAuthor = async function (req, res) {
    let author = req.body
    let authorCreated = await AuthorModel.create(author)
    res.send({ data: authorCreated })
}
// hii hlo
const getAuthorsData = async function (req, res) {
    let authors = await AuthorModel.find()
    res.send({ data: authors })
}

const login = async function (req, res) {
    let Email = req.body.email
    let Password = req.body.password
    let data = await AuthorModel.findOne({ email: Email, password: Password })
    if (!data) { return res.status(400).send({ msg: "email and password is incorrect" }) }

    let token = await jwt.sign({ id: data._id.toString() }, "functionupiswaywaycoolHariomSemwal")
    console.log(token)
    res.header({ "x-powered-by": token })
    res.status(200).send({ status: true, msg: token })

    // const verifiy = await jwt.verify(token, "functionupiswaywaycoolHariomSemwal")
    // if (!token) { return res.status(404).send({ status: false.valueOf, msg: "token is in valid" }) }
    // console.log(verifiy)
}


module.exports.createAuthor = createAuthor
module.exports.getAuthorsData = getAuthorsData
module.exports.login = login