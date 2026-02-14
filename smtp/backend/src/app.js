const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
require("dotenv").config({
  path: "../.env"
});

const smtpRoutes = require("./routes/smtpRoutes");

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 50
  })
);

app.use("/api/smtp", smtpRoutes);

module.exports = app;
