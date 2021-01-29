const express = require("express");
const images = require("../data/images.json");

const router = express.Router();

router.get("/", (req, res) => {
  res.json(images);
});

module.exports = router;
