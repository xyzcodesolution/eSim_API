const express = require("express");
const UserRoutes  = require("./userModel.js");
const eSimRoutes = require("./eSimRoutes.js");
const emailCheck = require("./emailCheck.js");

const router = express.Router();

router.use("/auth", UserRoutes);
router.use("/esim", eSimRoutes);
router.use("/payment", eSimRoutes);
router.use("/emailCheck", emailCheck);

module.exports =  router;
