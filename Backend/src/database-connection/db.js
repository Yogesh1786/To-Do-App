const mongoose = require("mongoose");

const Connection = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/To-Do-App");
    console.log("Connected to mongoDB");
  } catch (error) {
    console.log("Connection Error :", error.message);
  }
};

module.exports = Connection;
