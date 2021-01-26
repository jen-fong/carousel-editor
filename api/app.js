const express = require("express");
const cors = require("cors");
const carouselImagesRoutes = require("./routes/carouselImages");

const app = express();

app.use(cors());
app.use("/api/carousel-images", carouselImagesRoutes);

module.exports = app;
