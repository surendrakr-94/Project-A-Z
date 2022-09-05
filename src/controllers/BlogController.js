

const createBlog = async function (req, res) {
    let data = req.body
    if (data.author_id) {
        const check = await authormodel.find(data.author_id)
        if (check) {
            let saveData = await Blogmodel.create(data)
            res.status(201).send({ status: true, msg: saveData })
        } else return res.status(400).send({ status: false, msg: "plese enter currect author_id" })
    } else return res.status(400).send({ status: false, msg: "author_id is required" })


}

module.exports.createBlog = createBlog