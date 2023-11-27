const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: { type: String, required: false },
  userDob: { type: String },
  userEmail: { type: String, required: true, unique: true },
  userMobile: { type: String },
  userAddress: { type: String },
  eventId: { type: String },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
