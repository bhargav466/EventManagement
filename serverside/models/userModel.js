const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  userDob: { type: String },
  userEmail: { type: String, required: true, unique: true },
  userMobile: { type: String, required: true },
  userAddress: { type: String },
  eventId: { type: String },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
