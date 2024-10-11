const express = require("express");

const router = express.Router();

const {
  authMiddleware,
  isVendor,
} = require("../../middlewares/authMiddleware");
const {
  vendorloginController,
  vendorRefreshTokenController,
  updateVendorUser,
  updateVendorPassword,
  vendorLogout,
} = require("../../controller/vendor/vendorController");

//post
router.post("/login", vendorloginController);
router.post("/refresh-token", vendorRefreshTokenController);
router.post("/logout", authMiddleware, isVendor, vendorLogout);

//update
router.put("/updatevendor", authMiddleware, isVendor, updateVendorUser);
router.patch("/updatepassword", authMiddleware, isVendor, updateVendorPassword);

module.exports = router;
