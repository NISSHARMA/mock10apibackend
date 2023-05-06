
const { BookModel } = require("../Model/BookModel")
const { UserModel } = require("../Model/UserModel")


const getAllBooks = async (req, res) => {
    let query
    if (req.query) {
        query = req.query
    } else {
        query = {}
    }

    try {
        const books = await BookModel.find(query)
        res.status(200).send(books)

    } catch (error) {
        res.status(400).send({ "msg": "error.message" })
    }

}

const postBook = async (req, res) => {
    const { title, author, category, price, quantity, userID } = req.body
    console.log(userID)
    if (userID) {
        const user = await UserModel.findOne({ _id: userID })
        if (user.isAdmin) {
            try {
                const newBook = await new BookModel({ title, author, category, price, quantity, userID })
                await newBook.save()
                res.status(200).send({ "msg": "Book added sucessfully" })
            } catch (error) {
                res.status(400).send({ "msg": "error.message" })
            }
        } else {
            res.status(400).send("Only Admin Can Post The Book")
        }
    } else {
        res.status(400).send("Please Login First")
    }
}

const getSingleBook = async (req, res) => {

    const { id } = req.params
    try {
        const book = await BookModel.find({ _id: id })
        res.status(200).send(book)

    } catch (error) {
        res.status(400).send({ "msg": error.message })
    }
}

const deleteBook = async (req, res) => {

    const { userID } = req.body
    const { id } = req.params
    console.log(userID, id)
    if (userID) {
        const user = await UserModel.findOne({ _id: userID })
        if (user.isAdmin) {
            try {
                await BookModel.findOneAndDelete({ _id: id })
                res.status(200).send({ "msg": "Post has been deleted" })
            } catch (error) {
                res.status(400).send({ "msg": error.message })
            }
        } else {
            res.status(400).send({ "msg": "Only Admin Can Delete The Post" })
        }
    } else {
        res.status(400).send({ "msg": "Please Login First" })
    }
}

const updateBook = async (req, res) => {
    const payload = req.body
    const { userID } = req.body
    if (userID) {
        const user = await UserModel.findOne({ _id: userID })
        if (user.isAdmin) {
            try {
                await BookModel.findByIdAndUpdate(payload)
                res.status(200).send({ "msg": "Post has been updated" })
            } catch (error) {
                res.status(400).send({ "msg": error.message })
            }
        } else {
            res.status(400).send({ "msg": "Only Admin Can Updated The Post" })
        }
    } else {
        res.status(400).send({ "msg": "Please Login First" })
    }

}


module.exports = {
    getAllBooks,
    postBook,
    getSingleBook,
    deleteBook,
    updateBook
}