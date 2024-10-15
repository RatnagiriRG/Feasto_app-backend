const express = require("express");
const { authMiddleware, isAdmin } = require("../../middlewares/authMiddleware");
const {
  adminCreateCategory,
  adminGetAllCategory,
  adminUpdateCategory,
  adminDeleteCategory,
} = require("../../controller/admin/categoryController");

const router = express.Router();

//post
router.post("/create_category", authMiddleware, isAdmin, adminCreateCategory);

//get
router.get("/get_all_categories", authMiddleware, isAdmin, adminGetAllCategory);

//patch
router.patch(
  "/update_category/:id",
  authMiddleware,
  isAdmin,
  adminUpdateCategory
);

//delete
router.delete(
  "/delete_category/:id",
  authMiddleware,
  isAdmin,
  adminDeleteCategory
);

module.exports = router;
