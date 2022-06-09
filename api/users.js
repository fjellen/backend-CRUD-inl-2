const express = require("express");
const userRouter = express.Router();
const User = require("../models/User");


//development env vars
require("dotenv").config();

//Endpoints

//get users
userRouter.get("/getuser", (req, res) => {
  User.find({}, (err, documents) => {
    if (err) {
      res.status(500).json({
        msg: {
          msgBody: "An error occured  while getting user",
          msgError: true,
        },
      });
    } else {
      res.status(200).json({ users: documents });
    }
  });
});

//add user
userRouter.post("/newuser", (req, res) => {
  console.log("User to add: ", req.body);

  const newUser = new User({
    name: req.body.name,
    address: req.body.address,
    zipcode: req.body.zipcode,
    city: req.body.city,
    phone: req.body.phone,
    email: req.body.email,
    password: req.body.password,
  });
  newUser.save((err) => {
    if (err) {
      res.status(500).json({
        msg: {
          msgBody: "An error occured while saving user",
          msgError: true,
        },
      });
    } else {
      res.status(201).json({
        msg: {
          msgBody: "User was saved successfully",
          msgError: false,
        },
      });
    }
  });
});

//update user
userRouter.put("/updateuser/:id", (req, res) => {
  User.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      address: req.body.address,
      zipcode: req.body.zipcode,
      city: req.body.city,
      phone: req.body.phone,
      email: req.body.email,
      password: req.body.password,
    },
    (err) => {
      if (err) {
        res.status(500).json({
          msg: {
            msgBody: "An error occured  while updating user",
            msgError: true,
          },
        });
      } else {
        res.status(201).json({
          msg: {
            msgBody: "User was updated successfully",
            msgError: false,
          },
        });
      }
    }
  );
});

// Delete user
userRouter.delete("/deleteuser/:id", (req, res) => {
  User.findByIdAndDelete(req.params.id, (err) => {
    if (err) {
      res.status(500).json({
        msg: {
          msgBody: "An error occured  while deleting user",
          msgError: true,
        },
      });
    } else {
      res.status(201).json({
        msg: {
          msgBody: "User was deleted successfully",
          msgError: false,
        },
      });
    }
  });
});

module.exports = userRouter;