const express = require("express");
const {
  authController,
  handleRefreshToken,
  loginAdminController,
} = require("../controller/authController");

const router = express.Router();

//post
router.post("/register", authController);
router.post("/admin_login", loginAdminController);

//get
router.get("/refresh_token", handleRefreshToken);

module.exports = router;
