const mongoose = require("mongoose");

const smtpTestSchema = new mongoose.Schema(
  {
    host: String,
    port: Number,
    encryption: String,
    from: String,
    to: String,
    status: String,
    response: String,
    error: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("SmtpTest", smtpTestSchema);
