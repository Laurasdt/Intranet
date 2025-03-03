const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  gender: String,
  firstname: String,
  lastname: String,
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  phone: String,
  birthdate: Date,
  city: String,
  country: String,
  photo: String,
  category: String,
  isAdmin: { type: Boolean, default: false },
});

module.exports = mongoose.model("User", UserSchema);
