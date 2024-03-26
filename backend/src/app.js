import "dotenv/config"
import express from "express";
import cors from "cors"

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
app.use(express.json({limit : "16kb"}))
app.use(express.urlencoded({extended : true, limit: "16kb"}))
app.use(express.static("public"))

//routes import
import { userRouter } from "./routes/user.route.js";
import { taskRouter } from "./routes/task.route.js";

app.use("/api/v1/users", userRouter)
app.use("/api/v1/tasks", taskRouter)

export { app }