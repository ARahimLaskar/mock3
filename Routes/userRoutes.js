const { Router } = require("express");

const { UserModel } = require("../Model/UserModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const userController = Router();

userController.post("/signup", (req, res) => {
  const { email, password, confirm_password } = req.body;
  bcrypt.hash(password, 8, async function (err, hash) {
    if (err) {
      res.send("Something went wrong");
    }
    const user = new UserModel({
      email,
      password: hash,
      confirm_password: hash,
    });
    // console.log(user.password);
    // console.log(user.confirm_password);
    if (user.password === user.confirm_password) {
      await user.save();
    } else {
      res.send("please check password");
    }

    res.send("signup Successful");
  });
});

userController.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  const hash = user.password;
  bcrypt.compare(password, hash, function (err, result) {
    if (err) {
      res.send("something went wrong");
    }
    if (result) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
      res.send({ msg: "login successful", token });
    } else {
      res.send("invalid credentials");
    }
  });
});

module.exports = { userController };
