const express = require("express");
const carouselImages = require("../data/carouselImages.json");

const router = express.Router();

router.get("/", (req, res) => {
  res.json(carouselImages);
});

module.exports = router;
