const express = require("express");

const eventRouter = express.Router();

const eventModel = require("../models/eventModel");
const { default: axios } = require("axios");

eventRouter.post("/", async (req, res) => {
  const eventData = new eventModel({
    eventName: req.body.eventName,
    eventOrganizerName: req.body.eventOrganizerName,
    eventOrganizerEmail: req.body.eventOrganizerEmail,
    area: req.body.area,
    city: req.body.city,
    zipcode: req.body.zipcode,
    state: req.body.state,
    eventDate: req.body.eventDate,
    eventDescription: req.body.eventDescription,
  });

  eventData
    .save()
    .then((data) => {
      console.log("Event Registered successfully");
      res.json(data);
    })
    .catch((err) => {
      console.log("Error while creating event", err);
    });
});

eventRouter.patch("/:eventOrganizerEmail", async (req, res) => {
  try {
    const eventOrganizerEmail = req.params.eventOrganizerEmail;
   
  
    const updateEvent = await eventModel.findOneAndUpdate(
      { eventOrganizerEmail },  
      { $set: req.body },
      { new: true }
    );
    console.log(req.body, eventOrganizerEmail);
    console.log("---------------------------------------");
    console.log(updateEvent);

    if (!eventOrganizerEmail) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json(updateEvent);
  } catch (err) {
    console.log("Error While updating Event", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

eventRouter.get("/", async (req, res) => {
  try {
    const allEvents = await eventModel.find();
    res.json(allEvents);
  } catch (err) {
    console.log("Error while fetching all the users", err);
  }
});

eventRouter.delete("/:eventOrganizerEmail", async (req, res) => {
  try {
    const eventNeedtoDelete = await eventModel.findOneAndRemove({
      eventOrganizerEmail: req.params.eventOrganizerEmail,
    });
    if (!eventNeedtoDelete) {
      return res.status(404).json({ message: "event already expired" });
    }
    res.json({ message: "Event deleted successfully" });
  } catch (err) {
    console.log("error while deleting event", err);
  }
  console.log(req.params.eventOrganizerEmail);
  // try {}
});

module.exports = eventRouter;
