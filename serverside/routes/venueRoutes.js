const express = require("express");

const venueRouter = express.Router();

const venueModel = require("../models/venueModel");
const { default: axios } = require("axios");

venueRouter.post("/", async (req, res) => {
  const venueData = new venueModel({
    venueName: req.body.venueName,
    venueOwnerName: req.body.venueOwnerName,
    venueOwnerEmail: req.body.venueOwnerEmail,
    venueArea: req.body.venueArea,
    venueCity: req.body.venueCity,
    venueZipcode: req.body.venueZipcode,
    venueState: req.body.venueState,
    venueDescription: req.body.venueDescription,
  });

  venueData
    .save()
    .then((data) => {
      console.log("Venue Registered successfully");
      res.json(data);
    })
    .catch((err) => {
      console.log("Error while creating venue", err);
      console.log(venueData, "this is data");
      res.status(500).json({ message: "Internal server error" });
    });
});

venueRouter.patch("/:venueOwnerEmail", async (req, res) => {
  try {
    const venueOwnerEmail = req.params.venueOwnerEmail;
    console.log(req.body, venueOwnerEmail);
    const updateVenue = await venueModel.findOneAndUpdate(
      { venueOwnerEmail },
      { $set: req.body },
      { new: true }
    );
    if (!venueOwnerEmail) {
      return res.status(404).json({ message: "Venue owner not found" });
    }
    res.json(venueOwnerEmail);
  } catch (err) {
    console.log("Error while updating Venue", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

venueRouter.get("/", async (req, res) => {
  try {
    const allVenues = await venueModel.find();
    res.json(allVenues);
  } catch (err) {
    console.log("Error while fetching all the venues", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

venueRouter.delete("/:venueOwnerEmail", async (req, res) => {
  try {
    const venueNeedToDelete = await venueModel.findOneAndRemove({
      venueOwnerEmail: req.params.venueOwnerEmail,
    });
    if (!venueNeedToDelete) {
      return res.status(404).json({ message: "Venue not found" });
    }
    res.json({ message: "Venue deleted successfully" });
  } catch (err) {
    console.log("Error while deleting venue", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = venueRouter;
