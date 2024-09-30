const express = require("express");

const todoRouter = express.Router();
const { authenticate } = require("../middleware/auth");

const {
  CreateTodo,
  ReadTodo,
  UpdateTodo,
  DeleteTodo,
  SingleTodo
} = require("../controllers/todo.controller");

todoRouter.post("/create", [authenticate], CreateTodo);
todoRouter.get("/read", ReadTodo);
todoRouter.get("/single/:id", SingleTodo);
todoRouter.put("/update/:id", [authenticate], UpdateTodo);
todoRouter.delete("/delete/:id", [authenticate], DeleteTodo);

module.exports = todoRouter;
