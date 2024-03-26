import express from "express"
import { registerUser, signupUser } from "../controllers/user.controller.js"

const userRouter = express.Router()

userRouter.route("/registerUser").post(registerUser)
userRouter.route("/signup").post(signupUser)

export { userRouter }