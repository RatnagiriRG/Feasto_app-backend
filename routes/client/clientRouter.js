const express = require("express");
const {
  authMiddleware,
  isClient,
} = require("../../middlewares/authMiddleware");
const {
  clientloginController,
  updateClientUser,
  updateClientPassword,
  clientRefreshTokenController,
  clientlogout,
  deleteClientUser,
  clientRegister,
} = require("../../controller/client/clientController");

const router = express.Router();
router.post("/create_client", clientRegister);
router.post("/login", clientloginController);
router.post("/refresh-token", clientRefreshTokenController);
router.post("/logout", authMiddleware, isClient, clientlogout);
router.post("/delete_account", authMiddleware, isClient, deleteClientUser);
//update
router.put("/updateclient", authMiddleware, isClient, updateClientUser);
router.patch("/updatepassword", authMiddleware, isClient, updateClientPassword);

module.exports = router;
