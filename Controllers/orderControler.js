

const { OrderModel } = require("../Model/OrderModel")
const { UserModel } = require("../Model/UserModel")


const placeorder = async (req, res) => {
    let data1 = req.body.books
    let n = req.body.books.length
    let totalAmount = 0
    const { books, userID } = req.body
    try {
        for (let i = 0; i < n; i++) {
            console.log(data1[i].price)
            totalAmount += Number(data1[i].price)
        }
        const newBook = await new OrderModel({ books, userID, totalAmount })
        await newBook.save()
        res.status(200).send({ "msg": "Order Placed successfully" })
    } catch (error) {
        res.status(400).send({ "msg": error.message })
    }
}

const getallorders = async (req, res) => {
    const { userID } = req.body

    if (userID) {
        const user = await UserModel.findOne({ _id: userID })
        if (user.isAdmin) {
            try {
                const orders = await OrderModel.find()
                res.status(200).send(orders)
            } catch (error) {
                res.status(400).send({ "msg": error.message })
            }
        } else {
            res.status(400).send("Only Admin Can See The Orders")
        }
    } else {
        res.status(400).send("Please Login First")
    }

}


module.exports = {
    placeorder,
    getallorders
}