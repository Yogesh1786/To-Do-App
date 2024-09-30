const User = require("../models/user.models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SignUp =
  ("",
  async (req, res) => {
    const { name, email, password } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      await User.create({ name, email, password: hashedPassword });

      res.status(200).json({ message: "User Created Sucessfull" });
    } catch (error) {
      console.log("Signup Error", error.message);
      res.status(500).json({ status: false, message: "Something went wrong." });
    }
  });

const Login =
  ("/login",
  async (req, res) => {
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });

      if (!user)
        return res.status(404).json({ status: false, message: "Invalid user" });

      console.log("user", user);

      const token = jwt.sign({ userId: user._id }, "yogesh123");

      return res.status(201).json({ status: true, token: token, data: user });
    } catch (error) {
      console.log("Login Error", error.message);
      res.status(500).json({ status: false, message: "Something went wrong." });
    }
  });

module.exports = {
  SignUp,
  Login,
};
