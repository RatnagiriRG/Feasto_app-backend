const express = require("express");
const {
  adminloginController,
  adminRefreshTokenController,
  adminlogout,
  deleteAdminUser,
  updateAdminUser,
  updateAdminPassword,
  getAdmin,
  getUsers,
} = require("../../controller/admin/adminController");
const { authMiddleware, isAdmin } = require("../../middlewares/authMiddleware");
const router = express.Router();

//post
router.post("/admin_login", adminloginController);
router.post("/refresh-token", adminRefreshTokenController);
router.post("/logout", authMiddleware, isAdmin, adminlogout);
router.post("/delete_account", authMiddleware, isAdmin, deleteAdminUser);

//get
router.get("/getadmin", authMiddleware, isAdmin, getAdmin);
router.get("/getUser", authMiddleware, isAdmin, getUsers);

//update
router.put("/update_admin", authMiddleware, isAdmin, updateAdminUser);
router.patch("/update-password", authMiddleware, isAdmin, updateAdminPassword);

module.exports = router;
