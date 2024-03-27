const mongoose = require("mongoose");
const offerSchema = new mongoose.Schema({
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  postedDate: {
    type: Date,
    default: Date.now,
  },
  proposals: [
    {
      freelancer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
      description: { type: String, required: true },
      situation: {
        type: String,
        default: "Pending",
        enum: ["Pending", "Accepted", "Refused"],
      },
    },
  ],
});
module.exports = mongoose.model("Offer", offerSchema);
