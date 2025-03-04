const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

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

// hache le mdp avant de le stocker
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// compare le mdp avec celui enregistré
UserSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);
