const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    userId: String,
    title: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("todo", todoSchema);
