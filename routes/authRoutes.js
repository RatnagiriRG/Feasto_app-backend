const express = require("express");
const {
  authController,
  loginController,
  handleRefreshToken,
  loginAdminController,
} = require("../controller/authController");

const router = express.Router();

//post
router.post("/register", authController);
router.post("/login", loginController);
router.post("/admin_login", loginAdminController);

//get
router.get("/refresh_token", handleRefreshToken);

module.exports = router;
