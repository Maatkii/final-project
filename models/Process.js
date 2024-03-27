const mongoose = require("mongoose");

const processSchema = new mongoose.Schema({
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  freelancer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  offre: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Offer",
  },
  projectLink: {
    type: String,
  },
  projectProcess: {
    type: String,
    enum: ["ongoing", "Finished"],
  },
});

module.exports = mongoose.model("process", processSchema);
