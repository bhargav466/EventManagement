const mongoose = require("mongoose");

const venueSchema = mongoose.Schema({
  venueName: {
    type: String,
    required: true,
  },
  venueOwnerName: {
    type: String,
    required: true,
  },
  venueOwnerEmail: {
    type: String,
    required: true,
    unique: true,
  },
  venueArea: {
    type: String,
    required: true,
  },
  venueZipcode: {
    type: String,
    required: true,
  },
  venueState: {
    type: String,
    required: true,
  },
  venueCity: {
    type: String,
    required: true,
  },
  venueDescription: {
    type: String,
    required: true,
  },
});

const Venue = mongoose.model("Venue", venueSchema);
module.exports = Venue;
