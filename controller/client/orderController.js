const expressAsyncHandler = require("express-async-handler");
const {
  ERROR_RESPONSE,
  RESPONSE_MESSAGE,
} = require("../../config/responseMessage");
const { validateInput } = require("../../validators/validateInputs");
const { validateMongodbId } = require("../../validators/validateMongodbId");
const OrderModel = require("../../models/OrderModel");

exports.clientPlaceOrder = expressAsyncHandler(async (req, res) => {
  try {
    const { cart, payment } = req.body;
    const { _id } = req.user;
    validateMongodbId(_id);

    const missingFields = validateInput({
      cart,
      payment,
    });

    if (missingFields.length > 0) {
      return res.status(400).json({
        error: ERROR_RESPONSE.MISSING_FIELDS + missingFields.join(", "),
      });
    }

    let total = 0;

    cart.map((i) => {
      total += i. price;
    });

    const newOrder = new OrderModel({
      buyer: _id,
      foods: cart,
      payment: payment,
    });

    await newOrder.save();

    if (!newOrder) {
      return res.status(400).json({ error: ERROR_RESPONSE.PAYMENT_ORDER });
    }
    res
      .status(200)
      .json({ msg: RESPONSE_MESSAGE.PAYEMENT_SUCCESS, data: newOrder });
  } catch (error) {
    throw new Error(error);
  }
});
