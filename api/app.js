const express = require("express");
const cors = require("cors");
const carouselImagesRoutes = require("./routes/images");

const app = express();

app.use(cors());
app.use("/api/images", carouselImagesRoutes);

module.exports = app;
