const express = require("express");
const { authMiddleware, isAdmin } = require("../../middlewares/authMiddleware");
const {
  adminCreateFoodController,
  adminGetAllFood,
  adminGetFood,
  adminUpdateFood,
  adminDeleteFood,
} = require("../../controller/admin/foodController");

const router = express.Router();

router.post("/add_food", authMiddleware, isAdmin, adminCreateFoodController);

//get
router.get("/all_food", authMiddleware, isAdmin, adminGetAllFood);
router.get("/getfood/:id", authMiddleware, isAdmin, adminGetFood);

//put
router.put("/update_food/:id", authMiddleware, isAdmin, adminUpdateFood);

//delete
router.delete("/delete_food/:id", authMiddleware, isAdmin, adminDeleteFood);

module.exports = router;
