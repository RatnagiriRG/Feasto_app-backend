const asyncHandler = require("express-async-handler");
const { ERROR_RESPONSE, RESPONSE_MESSAGE } = require("../../config/responseMessage");
const ResturantModel = require("../../models/ResturantModel");

exports.createVendorResturant = asyncHandler(async ( req, res) => {
  try {
    const {
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coordinates,
    } = req.body;

    if (!title || !coordinates) {
      return res
        .status(401)
        .json({ error: "Please provide title and address" });
    }

    const newResturant = new ResturantModel({
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coordinates,
    });

    await newResturant.save();

    res.status(200).json({ msg: RESPONSE_MESSAGE.RESTURANT_CREATE_SUCCESS });
  } catch (error) {
    res.status(500).json({
      error: ERROR_RESPONSE.CREATE_RESTURANT_ERROR,
    });
  }
});
