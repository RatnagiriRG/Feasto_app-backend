const asyncHandler = require("express-async-handler");
const {
  ERROR_RESPONSE,
  RESPONSE_MESSAGE,
} = require("../../config/responseMessage");
const ResturantModel = require("../../models/ResturantModel");
const { validateMongodbId } = require("../../validators/validateMongodbId");
const { compareSync } = require("bcrypt");

exports.createAdminResturant = asyncHandler(async (req, res) => {
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

//get all resturants
exports.adminGetAllResturant = asyncHandler(async (req, res) => {
  try {
    const { _id } = req.user;
    validateMongodbId(_id);
    const resturants = await ResturantModel.find();
    if (resturants.length === 0) {
      return res.status(404).json({ error: ERROR_RESPONSE.NO_RESTURANT });
    }
    res.status(200).json({ msg: RESPONSE_MESSAGE.SUCCESS, data: resturants });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: ERROR_RESPONSE.GET_ALL_RESTURANT });
  }
});

//get single resturants
exports.adminGetResturants = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateMongodbId(id);

    const resturant = await ResturantModel.findById(id);
    if (!resturant) {
      return res.status(500).json({ error: ERROR_RESPONSE.NO_RESTURANT });
    }
    res.status(200).json({ msg: RESPONSE_MESSAGE.SUCCESS, data: resturant });
  } catch (error) {
    throw new Error(ERROR_RESPONSE.GET_RESTURANT);
  }
});

//delete  account
exports.adminDeleteResturants = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateMongodbId(id);
    const resturant = await ResturantModel.findByIdAndDelete(id);
    if (!resturant) {
      return res.status(500).json({ error: ERROR_RESPONSE.NO_RESTURANT });
    }
    res.status(200).json({ msg: RESPONSE_MESSAGE.RESTURANT_DELETE_SUCCESS });
  } catch (error) {
    throw new Error(ERROR_RESPONSE.GET_RESTURANT);
  }
});

exports.adminDelflagResturant = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const resturant = await ResturantModel.findByIdAndUpdate(id, {
      delfalg: true,
    });
    if (!resturant) {
      return res.status(401).json({ error: ERROR_RESPONSE.NO_RESTURANT });
    }
    res.status(200).json({ msg: RESPONSE_MESSAGE.RESTURANT_DELETE_SUCCESS });
  } catch (error) {
    throw new Error(ERROR_RESPONSE.GET_RESTURANT);
  }
});
