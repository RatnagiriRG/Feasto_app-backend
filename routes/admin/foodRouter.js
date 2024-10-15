const express = require("express");
const { authMiddleware, isAdmin } = require("../../middlewares/authMiddleware");
const {
  adminCreateFoodController,
  adminGetAllFood,
  adminGetFood,
} = require("../../controller/admin/foodController");

const router = express.Router();

router.post("/add_food", authMiddleware, isAdmin, adminCreateFoodController);

//get
router.get("/all_food", authMiddleware, isAdmin, adminGetAllFood);
router.get("/getfood/:id", authMiddleware, isAdmin, adminGetFood);

//put


module.exports = router;
