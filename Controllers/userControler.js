const bcrypt = require("bcrypt")
const { UserModel } = require("../Model/UserModel")
const jwt = require("jsonwebtoken")
require("dotenv").config()

const RegisterUser = async (req, res) => {

    const { name, email, password, isAdmin } = req.body

    try {
        bcrypt.hash(password, 5, async (err, hash) => {
            const newUser = await new UserModel({ name, email, password: hash, isAdmin })
            await newUser.save()
            res.status(200).send({ "msg": "User Has Been Registered" })
        })
    } catch (error) {
        res.status(500).send("error.message")
    }
}

const LoginUser = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await UserModel.findOne({ email })
        if (user) {
            bcrypt.compare(password, user.password, (err, result) => {
                if (result) {
                    res.status(200).send({ "msg": "Login Successfull", "token": jwt.sign({ "userID": user._id }, process.env.SECRET) })
                } else {
                    res.status(400).send({ "msg": "Wrong Credential" })
                }
            })
        }

    } catch (error) {
        res.status(400).send({ "msg": error.message })
    }
}

module.exports = {
    RegisterUser,
    LoginUser
}