const express = require("express");
const {
  authMiddleware,
  isClient,
} = require("../../middlewares/authMiddleware");
const {
  clientloginController,
  updateClientUser,
  updatePassword,
} = require("../../controller/client/clientController");

const router = express.Router();
router.post("/login", clientloginController);

//update
router.put("/updateclient", authMiddleware, isClient, updateClientUser);
router.patch("/updatepassword", authMiddleware, isClient, updatePassword);


module.exports = router;
