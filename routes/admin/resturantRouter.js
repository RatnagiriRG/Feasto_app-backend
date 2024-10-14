const express = require("express");
const { authMiddleware, isAdmin } = require("../../middlewares/authMiddleware");
const {
  adminGetAllResturant,
  adminGetResturants,
  adminDeleteResturants,
  adminDelflagResturant,
  createAdminResturant,
} = require("../../controller/admin/resturantController");

const router = express.Router();

//post

router.post("/create_resturant", authMiddleware, isAdmin, createAdminResturant);
router.post(
  "/delete_resturant/:id",
  authMiddleware,
  isAdmin,
  adminDelflagResturant
);
//get
router.get("/getall_resturant", authMiddleware, isAdmin, adminGetAllResturant);
router.get("/get_resturant/:id", authMiddleware, isAdmin, adminGetResturants);

//delete
router.delete(
  "/delete_resturant/:id",
  authMiddleware,
  isAdmin,
  adminDeleteResturants
);

module.exports = router;
