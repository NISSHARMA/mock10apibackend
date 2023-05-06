
require("dotenv").config()
const jwt = require("jsonwebtoken")
const {BookModel}=require("../Model/BookModel")


const auth = async (req, res, next) => {
    const token = req.headers.authorization

    if (token) {
        const decoded = jwt.verify(token, process.env.SECRET)
        if (decoded) {
            const body1 = req.body
            body1.userID = decoded.userID
            req.body = body1           
            next()
        } else {
            res.status(400).send("Please Login First")
        }
    } else {
        res.status(400).send("Please Loin First")
    }
}

module.exports = {
    auth
}