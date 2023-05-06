const mongoose = require("mongoose")


const orderSchema = mongoose.Schema({
    userID: {
        type: String,
    },
    books: [{ type: Object }],
    totalAmount: {
        type: Number,
    }

})

const OrderModel = mongoose.model("order", orderSchema)

module.exports = {
    OrderModel
}