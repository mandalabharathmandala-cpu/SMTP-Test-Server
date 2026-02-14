const express = require("express");
const router = express.Router();
const controller = require("../controllers/smtpController");

router.post("/test", controller.testConnection);
router.post("/send", controller.sendEmail);
router.get("/history", controller.getHistory);
router.get("/history/:id", controller.getById);
router.delete("/history/:id", controller.deleteById);

module.exports = router;
