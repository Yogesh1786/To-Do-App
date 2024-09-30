const Todo = require("../models/todo.models");

const CreateTodo = async (req, res) => {
  const { userId, title } = req.body;

  try {
    await Todo.create({ userId, title });
    res.status(200).json({ message: "Creating Todo Sucessful" });
  } catch (error) {
    console.log("Creating Error", error.message);
    res.status(500).json({ status: false, message: "Something Went Wrong" });
  }
};

const ReadTodo = async (req, res) => {
  try {
    const readTodo = await Todo.find();
    return res.status(201).json({ status: true, data: readTodo });
  } catch (error) {
    console.log("error", error.message);
    return res
      .status(500)
      .json({ status: false, message: "Something Went Wrong" });
  }
};

const SingleTodo = async (req, res) => {
  const { id } = req.params;
  try {
    const readTodo = await Todo.findOne({_id : id});
    return res.status(201).json({ status: true, data: readTodo });
  } catch (error) {
    console.log("error", error.message);
    return res
      .status(500)
      .json({ status: false, message: "Something Went Wrong" });
  }
};


const UpdateTodo = async (req, res) => {
  const { id, title } = req.body;

  try {
    const updateData = await Todo.findByIdAndUpdate(id, { title }, {
      new: true,
    });

    if (!updateData) {
      return res.status(404).json({ status: false, message: "Todo Not Found" });
    }
    return res.status(200).json({ status: true, message: "Data updated successfully." });
  } catch (error) {
    console.log("error", error.message);
    return res
      .status(500)
      .json({ status: false, message: "Something Went Wrong" });
  }
};

const DeleteTodo = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTodo = await Todo.findByIdAndDelete({ _id: id });
    if (!deletedTodo) {
      return res.status(404).json({ status: false, message: "Todo Not Found" });
    }
    return res
      .status(200)
      .json({ status: true, message: "Todo Deleted Sucessfully" });
  } catch (error) {
    console.log("error", error.message);
    return res
      .status(500)
      .json({ status: false, message: "Something Went Wrong" });
  }
};

module.exports = { CreateTodo, ReadTodo, UpdateTodo, DeleteTodo, SingleTodo };
