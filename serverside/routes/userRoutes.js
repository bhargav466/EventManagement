const express = require("express");

const router = express.Router();

const userModel = require("../models/userModel");

router.post("/", async (req, res) => {
  const userDetails = await userModel.findOne({ userEmail: req.body.email });
  if (userDetails) {
    console.log("User already exist with this email use another email");
    res.send({ status: 404 });
  } else {
    const userData = new userModel({
      userName: req.body.userName,
      userDob: req.body.userDob,
      userEmail: req.body.userEmail,
      userMobile: req.body.userMobile,
      userAddress: req.body.userAddress,
    });
    userData
      .save()
      .then((data) => {
        console.log("success fully posted data", data);
        res.json(data);
      })
      .catch((err) => {
        console.log("error while posting user data :", err);
        res.json({ message: err });
      });
  }
});

router.patch("/:userEmail", async (req, res) => {
  try {
    const userEmail = req.params.userEmail;
    const updatedUser = await userModel.findOneAndUpdate(
      { userEmail }, // Find the user by email
      { $set: req.body }, // Use $set to update only the fields provided in the request
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(updatedUser);
  } catch (err) {
    console.log("Error while updating user data:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const allUsers = await userModel.find();
    res.json(allUsers);
  } catch (err) {
    console.log("Error while fetching all user data:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/:userEmail", async (req, res) => {
  
  try {
    const deletedUser = await userModel.findOneAndRemove({
      userEmail: req.params.userEmail,
    });
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.log("Error while deleting user data:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
