const { auth } = require("../Middleware/Auth.middleware")
const express = require("express")
const orderRouter = express.Router()
const { placeorder, getallorders } = require("../Controllers/orderControler")


orderRouter.post("/", auth, placeorder)
orderRouter.get("/", auth, getallorders)

module.exports = {
    orderRouter
}
