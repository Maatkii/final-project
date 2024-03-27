const express = require("express");
const offre = require("../models/offre");

const router = express.Router();
// Route for adding a new proposal to an offer
router.post("/offer/:offerId/proposals", async (req, res) => {
  const offerId = req.params.offerId;
  const { freelancerId, description } = req.body; // Assuming freelancerId and description are provided in the request body

  try {
    // Find the offer by ID
    const offer = await offre.findById(offerId);
    if (!offer) {
      return res.status(404).json({ message: "Offer not found" });
    }

    // Create a new proposal
    const newProposal = {
      freelancer: freelancerId,
      description: description,
      situation: "Pending",
    };

    // Add the new proposal to the offer's proposals array
    offer.proposals.push(newProposal);
    await offer.save();

    res.status(201).json({ message: "Proposal added successfully", offer });
  } catch (error) {
    console.error("Error adding proposal:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
module.exports = router;
