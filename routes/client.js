const express = require("express");
const isAuth = require("../middlewares/auth");
const offre = require("../models/offre");
const user = require("../models/user");
const Process = require("../models/Process");

const router = express.Router();

router.get("/my-offer", isAuth, async (req, res) => {
  try {
    const offerList = await offre.find({
      _id: req.user._id,
    });
    res.status(201).json({ message: "my  Offers ! ", data: offerList });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server Error !", error });
  }
});
router.post("/add-offer", isAuth, async (req, res) => {
  try {
    const { title, description, salary, duration } = req.body;
    const newOffer = await offre.create({
      client: req.user._id,

      title,
      description,
      salary,
      duration,
    });
    res.status(201).json({ message: "new Offer created ! ", data: newOffer });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server Error !", error });
  }
});
router.put("/update-offer/:id", isAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const offerUpdated = await offre.findByIdAndUpdate(id, {
      ...req.body,
    });
    res.status(200).json({ message: " Offer updated ! " });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server Error !", error });
  }
});

// Route for updating proposal status
router.put("/offer/:offerId/proposal/:proposalId", isAuth, async (req, res) => {
  const { offerId, proposalId } = req.params;
  const { status } = req.body; // Assuming the status is provided in the request body

  try {
    // Find the offer by ID
    const offer = await offre.findById(offerId);
    if (!offer) {
      return res.status(404).json({ message: "Offer not found" });
    }

    // Find the proposal within the offer
    const proposalIndex = offer.proposals.findIndex(
      (proposal) => proposal._id.toString() === proposalId
    );
    if (proposalIndex === -1) {
      return res.status(404).json({ message: "Proposal not found" });
    }
    offer.findByIdAndUpdate(offerId, { offerSituation: "closed" });
    // Update the proposal status
    offer.proposals[proposalIndex].situation = status;
    await offer.save();
    const createProcess = await Process.create({
      client: req.user._id,
      freelancer: offer.proposals[proposalIndex].freelancer,
      offre: offerId,
    });

    res.status(200).json({
      message: "Proposal status updated and Process Created ! ",
      createProcess,
    });
  } catch (error) {
    console.error("Error updating proposal status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
router.delete("/delete-offer/:id", isAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const offerDeleted = await offre.findByIdAndDelete(id);
    res.status(200).json({ message: " Offer deleted ! " });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server Error !", error });
  }
});

// Route for updating user profile
router.put("/profile/:userId", isAuth, async (req, res) => {
  const userId = req.params.userId;

  try {
    // Check if the user exists and has the role 'client'
    const user = await user.findOne({ _id: userId, role: "client" });
    if (!user) {
      return res.status(404).json({
        message: "User not found or not authorized to update profile.",
      });
    }

    const userProfileUpdated = await user.findByIdAndUpdate(userId, {
      ...req.body,
    });

    res
      .status(200)
      .json({ message: "Profile updated successfully", userProfileUpdated });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
