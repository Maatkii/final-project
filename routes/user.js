const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const isAuth = require("../middlewares/auth");
const User = require("../models/user");
const offre = require("../models/offre");
require("dotenv").config();
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const nodemailer = require("nodemailer");
const portfolios = require("../models/portfolios");
const Notification = require("../models/Notification");

cloudinary.config({
  cloud_name: "",
  api_key: "",
  api_secret: "",
});
// Multer configuration for file upload
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "/", // Specify the folder name in your Cloudinary account
    allowed_formats: ["jpg", "png", "gif", "webp"], // Specify the allowed image formats
    public_id: (req, file) => Math.random(), // Generate a unique public ID for each uploaded file
  },
});

const upload = multer({ storage: storage });

router.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, phoneNumber, role, email, password } =
      req.body;
    const findUser = await User.findOne({ email });
    if (findUser) {
      res.status(409).json({ message: "Email Already Exist ! " });
    }
    bcrypt.hash(password, 12, async (err, hash) => {
      if (err) {
        res.status(500).json({ status: false, message: err });
      } else if (hash) {
        if (role == "admin") {
          const user = await User.create({
            firstName,
            lastName,
            role: "admin",
            email,
            password: hash,
          });
          res.status(201).json({
            status: true,
            message: "admin created",
            data: user,
          });
        } else if (role == "client") {
          const user = await User.create({
            firstName,
            lastName,
            role: "client",
            email,
            phoneNumber,
            password: hash,
            balance: 0,
          });
          res.status(201).json({
            status: true,
            message: "Account Created Successfully",
            data: user,
          });
        } else if (role == "freelancer") {
          const user = await User.create({
            firstName,
            lastName,
            role: "freelancer",
            email,
            phoneNumber,
            password: hash,
            balance: 0,
          });
          await portfolios.create({
            user: user._id,
          });
          res.status(201).json({
            status: true,
            message: "Account Created Successfully",
            data: user,
          });
        }
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: false, message: err });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const findUser = await User.findOne({ email: email });
    if (findUser) {
      bcrypt.compare(password, findUser.password).then(function (result) {
        if (result == true) {
          jwt.sign(
            {
              firstName: findUser.firstName,
              lastName: findUser.lastName,
              balance: findUser.balance,
              avatar: findUser.avatar,
              phoneNumber: findUser.phoneNumber,
              email: findUser.email,
              role: findUser.role,
              _id: findUser._id,
            },
            process.env.SECRETKEY,
            {
              expiresIn: "7d",
            },
            (err, token) => {
              if (err) {
                console.log(err);
              } else if (token) {
                res
                  .status(200)
                  .json({ message: "Logged Successfully", data: token });
              }
            }
          );
        } else {
          res.status(404).json({ message: "password wrong ! " });
        }
      });
    } else {
      res.status(404).json({ message: "Email not Found ! " });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});
router.get("/offers", async (req, res) => {
  try {
    const offers = await offre.find({});
    res.status(200).json({ message: "offers List  ! ", data: offers });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server Error", error });
  }
});
router.get("/offer/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const offer = await offre
      .findById(id)
      .populate("client", "-password")
      .populate("proposals.freelancer", "-password");
    res.status(200).json({ message: "offer details  ! ", data: offer });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server Error", error });
  }
});
router.get("/current", isAuth, async (req, res) => {
  if (req.user) {
    const findUser = await User.findById(req.user._id);
    res.send({ status: true, msg: "authorized", user: findUser });
  } else {
    res.send({ status: false, msg: "unauthorised" });
  }
});
router.get("/notifications", isAuth, async (req, res) => {
  try {
    const notifications = await Notification.find({
      notificationFor: req.user._id,
    }).populate("notificationFrom", "-password");
    res.status(200).json({ data: notifications });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
});

router.put("/make-notification-readed", isAuth, async (req, res) => {
  try {
    const result = await Notification.updateMany(
      { notificationFor: req.user._id },
      { $set: { Readed: true } }
    );

    // Return a success response
    res.status(200).json({ message: "Notifications marked as read." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error." });
  }
});
module.exports = router;
