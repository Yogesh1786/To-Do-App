require('dotenv').config();
const express = require("express")
const Connection = require("./src/database-connection/db")
const userRouter = require("./src/routes/user.routes");
const todoRouter = require("./src/routes/todo.routes");
const authMiddleware = require("./src/middleware/auth");
const cors = require("cors");

const app = express()

app.use(cors());

app.use(express.json());

app.use("/user", userRouter);
app.use("/todo", todoRouter);

const PORT = process.env.port || "8080"

app.listen(PORT,()=>{
    Connection()
    console.log(`Server is running at ${PORT}`)
})