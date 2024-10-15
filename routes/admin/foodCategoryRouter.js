const express = require("express");
const { authMiddleware, isAdmin } = require("../../middlewares/authMiddleware");
const {
  adminFoodCategoryCreate,
  adminGetAllFoodCategory,
  adminUpdateFoodCategory,
  adminDeleteFoodCategory,
} = require("../../controller/admin/foodCategoryController");

const router = express.Router();

//post
router.post(
  "/create_foodcategory",
  authMiddleware,
  isAdmin,
  adminFoodCategoryCreate
);

//get
router.get(
  "/getall_foodcategories",
  authMiddleware,
  isAdmin,
  adminGetAllFoodCategory
);

//patch
router.patch(
  "/update_foodcategory/:id",
  authMiddleware,
  isAdmin,
  adminUpdateFoodCategory
);

//delete
router.delete(
  "/delete_foodcategory/:id",
  authMiddleware,
  isAdmin,
  adminDeleteFoodCategory
);

module.exports = router;
