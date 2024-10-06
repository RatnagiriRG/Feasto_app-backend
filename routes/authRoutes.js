const express = require("express");
const {
  authController,
  loginController,
} = require("../controller/authController");

const router = express.Router();

//post
router.post("/register", authController);
router.post("/login", loginController);

module.exports = router;
