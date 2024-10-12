const expressAsyncHandler = require("express-async-handler");
const {
  ERROR_RESPONSE,
  RESPONSE_MESSAGE,
} = require("../../config/responseMessage");
const resturantModel = require("../../models/ResturantModel");
const { validateMongodbId } = require("../../validators/validateMongodbId");

exports.clientGetAllResturant = expressAsyncHandler(async (req, res) => {
  try {
    const resturant = await resturantModel.find({});

    if (!resturant) {
      res.status(400).json({ error: ERROR_RESPONSE.NO_RESTURANT });
    }
    res.status(200).json({ msg: RESPONSE_MESSAGE.SUCCESS, data: resturant });
  } catch (error) {
    throw new Error(ERROR_RESPONSE.GET_ALL_RESTURANT);
  }
});

exports.clientGetResturant = expressAsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateMongodbId(id);

    const resturant = await resturantModel.findById(id);
    if (!resturant) {
      return res.status(500).json({ error: ERROR_RESPONSE.NO_RESTURANT });
    }
    res.status(200).json({ msg: RESPONSE_MESSAGE.SUCCESS, data: resturant });
  } catch (error) {
    throw new Error(ERROR_RESPONSE.GET_RESTURANT);
  }
});
