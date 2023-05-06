const express = require("express")
const bookRouter = express.Router()
const { auth } = require("../Middleware/Auth.middleware")
const { getAllBooks, postBook, getSingleBook, deleteBook,updateBook } = require("../Controllers/bookControler")

bookRouter.get("/", getAllBooks)
bookRouter.get("/:id", getSingleBook)
bookRouter.post("/", auth, postBook)
bookRouter.delete("/:id",auth, deleteBook)
bookRouter.patch("/:id",auth, updateBook)

module.exports = {
    bookRouter
}