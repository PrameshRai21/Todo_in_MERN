import express from "express";
import { addTask, deleteTask, editTask, getTasks } from "../controllers/task.controller.js";

const taskRouter = express.Router();

taskRouter.route("/addTodo").post(addTask)
taskRouter.route("/update/:id").post(editTask)
taskRouter.route("/delete/:id").delete(deleteTask)
taskRouter.route("/getTask/:id").get(getTasks)

export { taskRouter }