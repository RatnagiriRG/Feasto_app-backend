const asyncHandler = require("express-async-handler");
const {
  ERROR_RESPONSE,
  RESPONSE_MESSAGE,
} = require("../../config/responseMessage");
const ResturantModel = require("../../models/ResturantModel");
const { validateMongodbId } = require("../../validators/validateMongodbId");

exports.createVendorResturant = asyncHandler(async (req, res) => {
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

    const { _id } = req.user;

    validateMongodbId(_id);

    if (!title || !coordinates) {
      return res
        .status(401)
        .json({ error: "Please provide title and address" });
    }

    const newResturant = new ResturantModel({
      vendorId: _id,
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
    console.error(error);
    res.status(500).json({
      error: ERROR_RESPONSE.CREATE_RESTURANT_ERROR,
    });
  }
});
exports.vendorGetAllResturant = asyncHandler(async (req, res) => {
  try {
    const { _id } = req.user;
    validateMongodbId(_id);
    const resturants = await ResturantModel.find({ vendorId: _id });
    if (resturants.length === 0) {
      return res.status(404).json({ error: ERROR_RESPONSE.NO_RESTURANT });
    }
    res.status(200).json({ msg: RESPONSE_MESSAGE.SUCCESS, data: resturants });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: ERROR_RESPONSE.GET_ALL_RESTURANT });
  }
});

