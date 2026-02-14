const SmtpTest = require("../models/SmtpTest");
const { createTransporter } = require("../services/smtpService");

exports.testConnection = async (req, res) => {
  try {
    const transporter = createTransporter(req.body);
    await transporter.verify();

    const record = await SmtpTest.create({
      ...req.body,
      status: "SUCCESS",
      response: "Connection verified",
      error: null
    });

    res.json(record);
  } catch (err) {
    const record = await SmtpTest.create({
      ...req.body,
      status: "FAILED",
      response: null,
      error: err.message
    });

    res.status(500).json(record);
  }
};

exports.sendEmail = async (req, res) => {
  try {
    const transporter = createTransporter(req.body);

    const info = await transporter.sendMail({
      from: req.body.from,
      to: req.body.to,
      subject: req.body.subject,
      text: req.body.message
    });

    const record = await SmtpTest.create({
      ...req.body,
      status: "SUCCESS",
      response: info.response,
      error: null
    });

    res.json(record);
  } catch (err) {
    const record = await SmtpTest.create({
      ...req.body,
      status: "FAILED",
      response: null,
      error: err.message
    });

    res.status(500).json(record);
  }
};

exports.getHistory = async (req, res) => {
  const data = await SmtpTest.find().sort({ createdAt: -1 });
  res.json(data);
};

exports.getById = async (req, res) => {
  const item = await SmtpTest.findById(req.params.id);
  res.json(item);
};

exports.deleteById = async (req, res) => {
  await SmtpTest.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};
