const express = require("express");
const user = require("../models/user");
const portfolios = require("../models/portfolios");
const offre = require("../models/offre");
const Process = require("../models/Process");

const router = express.Router();

router.get("/list-users/:type", async (req, res) => {
  try {
    const { type } = req.params;
    const usersList = await user.find({ role: type });
    res.status(200).json({ message: "Users List ! ", data: usersList });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server Error", error });
  }
});
router.get("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const userPortfolio = await portfolios.find({ user: id });
    res
      .status(200)
      .json({ message: "user Portfolio  ! ", data: userPortfolio });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server Error", error });
  }
});

router.get("/process-list", async (req, res) => {
  try {
    const processList = await Process.find({});
    res.status(200).json({ message: "process list   ! ", data: processList });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server Error", error });
  }
});

module.exports = router;
