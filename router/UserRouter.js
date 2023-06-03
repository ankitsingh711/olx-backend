const express = require("express");
const UserRouter = express.Router();
const { UserModel } = require("../model/UserModel");
const { Authentication } = require("../middlewares/Authentication");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcrypt");

UserRouter.post("/signup", async (req, res) => {
  const { email, password, confirm_password } = req.body;
  try {
    if (password === confirm_password) {
      bcrypt.hash(password, 5, (err, hashPass) => {
        if (err) {
          res.status(401).json({
            msg: "Password not hashed",
          });
        } else if (hashPass) {
          const User = new UserModel({
            email,
            password: hashPass,
            confirm_password: hashPass,
          });
          User.save();
          res.status(200).json({
            msg: "User Registered",
          });
        }
      });
    } else {
      res.status(400).json({
        msg: "Password not matched",
      });
    }
  } catch (error) {
    console.log(error);
  }
});

UserRouter.post("/login", Authentication, async (req, res) => {
  const { email, password } = req.body;
  try {
    jwt.sign({ email }, process.env.secretKey, (err, token) => {
      if (err) {
        res.status(401).json({
          msg: "Error Occured",
        });
      } else {
        res.status(201).json({
          msg: "Login Success",
          token: token,
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = { UserRouter };
