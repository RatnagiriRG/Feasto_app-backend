const express = require("express");
const {
  authMiddleware,
  isVendor,
} = require("../../middlewares/authMiddleware");
const {
  createVendorResturant,
  vendorGetAllResturant,
  vendorGetResturants,
  vendorDeleteResturants,
} = require("../../controller/vendor/resturantController");

const router = express.Router();
//post
router.post(
  "/create_resturant",
  authMiddleware,
  isVendor,
  createVendorResturant
);
router.post(
  "/delete_resturant/:id",
  authMiddleware,
  isVendor,
  vendorDeleteResturants
);

//get
router.get(
  "/getall_resturant",
  authMiddleware,
  isVendor,
  vendorGetAllResturant
);
router.get("/get_resturant/:id", authMiddleware, isVendor, vendorGetResturants);

module.exports = router;
