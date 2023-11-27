const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  eventName: { type: String, required: true },
  eventOrganizerName: { type: String, required: true },
  eventOrganizerEmail: { type: String, required: true,unique: true },
  area: { type: String, required: true },
  city: { type: String, required: true },
  zipcode: { type: Number, required: true },
  state: { type: String, required: true },
  eventDate: { type: Date },
  eventDescription: { type: String, required: true },
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
