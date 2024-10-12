const express = require("express");
const {
  authMiddleware,
  isVendor,
} = require("../../middlewares/authMiddleware");
const {
  createVendorResturant,
  vendorGetAllResturant,
} = require("../../controller/vendor/resturantController");

const router = express.Router();

router.post(
  "/create_resturant",
  authMiddleware,
  isVendor,
  createVendorResturant
);
router.get(
  "/getall_resturant",
  authMiddleware,
  isVendor,
  vendorGetAllResturant
);

module.exports = router;
