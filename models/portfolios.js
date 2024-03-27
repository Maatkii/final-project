const mongoose = require("mongoose");
const portfolioSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  experience: [
    {
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        required: true,
      },
    },
  ],
  skills: [
    {
      name: { type: String, required: true },
      level: {
        type: String,
        required: true,
        enum: ["beginner", "intermediate", "pro"],
      },
    },
  ],
  projects: [
    {
      projectName: { type: String, required: true },
      projectLink: { type: String, required: true },
    },
  ],
  socialMediaLinks: [
    {
      name: { type: String },
      link: { type: String },
    },
  ],
});
module.exports = mongoose.model("Portfolio", portfolioSchema);
