const mongoose = require("mongoose");

let image = "";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please Provide a Username"],
    trim: true,
    minlength: 4,
  },
  email: {
    type: String,
    required: [true, "please provide a email"],
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Please Provide Password"],
    minlength: 8,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);
