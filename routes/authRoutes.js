const express = require("express");
const { authController } = require("../controller/authController");

const router = express.Router();

//post
router.post("/register", authController);

module.exports = router;
