const express = require("express");
const offre = require("../models/offre");
const Portfolio = require("../models/portfolios");
const isAuth = require("../middlewares/auth");

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
router.post("/", isAuth, async (req, res) => {
  try {
    const { experience, skills, projects, socialMediaLinks } = req.body;
    const portfolio = new Portfolio({
      user: req.user._id,
      experience,
      skills,
      projects,
      socialMediaLinks,
    });
    const savedPortfolio = await portfolio.save();
    res.status(201).json(savedPortfolio);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get portfolio by ID
router.get("/", isAuth, async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({ user: req.user._id }).populate(
      "user",
      "-password"
    );
    if (!portfolio) {
      return res.status(404).json({ message: "Portfolio not found" });
    }
    res.json(portfolio);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update portfolio entry
router.put("/:portfolioId", isAuth, async (req, res) => {
  try {
    const updatedPortfolio = await Portfolio.findByIdAndUpdate(
      req.params.portfolioId,
      req.body,
      { new: true }
    );
    res.json(updatedPortfolio);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
module.exports = router;
