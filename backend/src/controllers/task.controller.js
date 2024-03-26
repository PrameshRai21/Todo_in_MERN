import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { Task } from "../models/task.model.js"
import { User } from "../models/user.model.js"

//adding new task
const addTask = asyncHandler(async(req, res) => {

        const {title, content, id} = req.body;
        if(
            [title, content, id].some((field)=>field?.trim() == "")
        ){
            throw new ApiError(400, "All fields are required.")
        }

        const userExist = await User.findById(id)
        if(!userExist){
            throw new ApiError(402, "Login to add task.")
        }

        const task = await Task.create({title, content, user:userExist})
        // userExist.task.push(task)
        // await userExist.save()

        return res
        .status(200)
        .json(new ApiResponse(200, task, "Todo added successfully."))

})

//edit task
const editTask = asyncHandler(async(req, res) => {

    const {title, content, id} = req.body;
    if(
        [title, content, id].some((field)=>field?.trim() == "")
    ){
        throw new ApiError(400, "All fields are required.")
    }

    const userExist = await User.findById(id)
    if(!userExist){
        throw new ApiError(409, "User not found.")
    }

    const task_id = req.params.id
    const updatedTask = await Task.findByIdAndUpdate(
        task_id,
        {
            $set: {
                title : title,
                content: content
            }
        },
        {new: true}
    )

    return res
    .status(200)
    .json(new ApiResponse(200, updatedTask, "Todo updated successfully."))
})

//delete task
const deleteTask = asyncHandler(async(req, res) => {

    const {id} = req.body;
    if(!id){
        throw new ApiError(403, "You're not logged in")
    }
    const userExist = await User.findById(id)
    if(!userExist){
        throw new ApiError(403, "You're not logged in")
    }

    await Task.findByIdAndDelete(req.params?.id)

    return res
    .status(200)
    .json(new ApiResponse(200, {}, "Todo deleted."))
})

//get all task using user object id
const getTasks = asyncHandler(async(req, res) => {

    const task = await Task.find({user: req.params.id}).sort({ createdAt : -1})
    if(!task){
        throw new ApiError(405, "You don't have any task. Add task.")
    }

    return res
    .status(200)
    .json(new ApiResponse(200, task, "All task fetched"))
})

export {
    addTask,
    editTask,
    deleteTask,
    getTasks
}