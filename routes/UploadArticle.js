const express = require("express");
const mongoose = require("mongoose");
const Article = require("../models/Article");
// const passport = require("passport");
const router = express.Router();

// function isLoggedIn(req, res, next) {
//   if (req.isAuthenticated()) {
//     return next();
//   }
//   res.redirect("/login");
// }

// function isAdmin(req, res, next) {
//   if (req.isAuthenticated() && req.user.role === "admin") {
//     return next();
//   }
//   res.redirect("/login");
// }

// Route to display the form for adding a new article

// Route to handle the form submission and create a new article
router.post("/", async (req, res) => {
  const { title, content, imageUrl } = req.body;
  try {
    const newArticle = new Article({
      title,
      content,
      imageUrl,
    });
    await newArticle.save();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
