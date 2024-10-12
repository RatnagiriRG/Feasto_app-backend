const express = require("express");
const {
  authMiddleware,
  isClient,
  isVendor,
} = require("../../middlewares/authMiddleware");
const {
  clientGetAllResturant,
  clientGetResturant,
} = require("../../controller/client/resturantContoller");

const router = express.Router();

//get
router.get(
  "/getall_resturant",
  authMiddleware,
  isClient,
  clientGetAllResturant
);
router.get("/get_resturant/:id", authMiddleware, isClient, clientGetResturant);

module.exports = router;
