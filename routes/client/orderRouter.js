const express = require("express");
const { authMiddleware, isClient } = require("../../middlewares/authMiddleware");
const { clientPlaceOrder } = require("../../controller/client/orderController");
const router = express.Router();

//post
router.post("/order_payments", authMiddleware, isClient, clientPlaceOrder);

module.exports = router;
