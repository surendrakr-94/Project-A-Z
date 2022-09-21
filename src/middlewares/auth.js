const jwt = require('jsonwebtoken')
const moment = require('moment')
module.exports = {
    authontication: (req, res, next) => {
        try {
            let token = req.headers["x-auth-token"]

            if (!token) res.status(400).send({ status: false, message: "Tokenmust be present" })
            jwt.verify(token, "secret-Hai-ye-batan-mat", (error, decodetoken) => {
                
                if (!error) {
                    req.decodetoken = decodetoken
                    next();
                }
                return res.status(400).send({ status: true, message: error.message })
            })
            

        } catch (error) {
            return res.status(500).send({ status: false, message: error.message })
        }
    }
}