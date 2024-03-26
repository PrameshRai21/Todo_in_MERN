import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { User } from "../models/user.model.js"

//user registration
const registerUser = asyncHandler( async(req, res) => {

        const {email, username, password} = req.body;
        if(
            [email, username, password].some((field)=>field?.trim() == "")
        ){
            throw new ApiError(400, "All fields are required to register")
        }

        //checking existing user
        const existingUser = await User.findOne({
            $or: [{email}, {username}]
        })
        if(existingUser){
            throw new ApiError(409, "User with given username or password already exist");
        }

        //creating user
        const user = await User.create({
            email,
            username: username.toLowerCase(),
            password
        })

        const createdUser = await User.findById(user._id).select("-password")
        if(!createdUser){
            throw new ApiError(402, "Something went wrong while registering user")
        }

        return res
        .status(200)
        .json(new ApiResponse(200, createdUser, "User registered successfully."))
})

//user sign up
const signupUser = asyncHandler( async(req, res) => {
    try {
        const {email, password} = req.body;
        if(!email){
            throw new ApiError(400, "Email field can't be empty.")
        }

        const user = await User.findOne({email})
        if(!user){
            throw new ApiError(402, "User not found!!!")
        }

        const passwordCheck = await user.checkPassword(password)
        if(!passwordCheck){
            throw new ApiError(405, "Incorrect Password!!!")
        }

        const validUser = await User.findById(user._id).select("-password")

        return res
        .status(200)
        .json(new ApiResponse(200, validUser._id, "User logged in."))

    } catch (error) {
        throw new ApiError(402, "User not found.")
    }
})


export {
    registerUser,
    signupUser,

}