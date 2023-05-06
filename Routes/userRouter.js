
const express=require("express")
const userRouter=express.Router()
const {RegisterUser}=require("../Controllers/userControler")
const {LoginUser}=require("../Controllers/userControler")

userRouter.post("/register",RegisterUser)
userRouter.post("/login",LoginUser)



module.exports={
    userRouter
}
