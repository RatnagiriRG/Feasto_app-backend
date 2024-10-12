const express = require("express");
const {
  authMiddleware,
  isVendor,
} = require("../../middlewares/authMiddleware");
const {
  createVendorResturant,
} = require("../../controller/vendor/resturantController");

const router = express.Router();

router.post(
  "/create_resturant",
  authMiddleware,
  isVendor,
  createVendorResturant
);

module.exports = router;
