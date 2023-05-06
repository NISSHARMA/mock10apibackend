

const express = require("express")
const { connection } = require("./connection")
const cors = require("cors")
const { userRouter } = require("./Routes/userRouter")
const { bookRouter } = require("./Routes/bookRouter")
const { orderRouter } = require("./Routes/orderRouter")


const app = express()
require("dotenv").config()
app.use(cors())
app.use(express.json())

app.use("/user", userRouter)
app.use("/books", bookRouter)
app.use("/order", orderRouter)
app.use("/orders", orderRouter)



app.listen(process.env.PORT, async () => {
    try {
        await connection
        console.log("Connected to database")

    } catch (err) {
        console.log(err)
    }
    console.log("Running server")
})


/*
{
  "title": "To good",
  "author": "Piyush",
  "category": "Comedy",
  "price": 800,
  "quantity": 5
}
*/