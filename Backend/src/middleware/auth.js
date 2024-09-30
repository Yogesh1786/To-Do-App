const jwt = require("jsonwebtoken");
const User = require("../models/user.models");

const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    const decoded = jwt.verify(token, "yogesh123");
    if (!decoded)
      return res.status(404).json({ status: false, message: "Invalid Token" });
    let user = await User.findOne({ _id: decoded.userId });

    if (user) {
      next();
    } else {
      res.status(404).json({ status: false, message: "Unauthorized" });
    }
  } catch (error) {
    console.log("Authentication Error", error.message);
    return res.status(500).send("Something went wrong.");
  }
};

const authorize = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    const decoded = jwt.verify(token, "yogesh123");
    if (!decoded)
      return res.status(404).json({ status: false, message: "Invalid Token" });
    let user = await User.findOne({ _id: decoded.userId });

    if (user.roles === "admin") {
      next();
    } else {
      res.status(404).json({ status: false, message: "Unauthorized" });
    }
  } catch (error) {
    console.log("Authentication Error", error.message);
    return res.status(500).send("Something went wrong.");
  }
};

module.exports = { authenticate, authorize };
