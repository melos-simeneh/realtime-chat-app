const express = require("express");
const router = express.Router();

const authRoutes = require("./auth.route");
const messageRoutes = require("./message.route");

router.use("/auth", authRoutes);
router.use("/messages", messageRoutes);

module.exports = router;
