
const mongoose=require ("mongoose")
require("dotenv").config()


const connection=mongoose.connect("mongodb+srv://nishasharma:nishasharma@cluster0.xemlmgg.mongodb.net/mock10?retryWrites=true&w=majority")

module.exports={
    connection
}