const expressAsyncHandler = require("express-async-handler");
const {
  ERROR_RESPONSE,
  RESPONSE_MESSAGE,
} = require("../../config/responseMessage");
const { validateInput } = require("../../validators/validateInputs");

const FoodModel = require("../../models/FoodModel");
const { validateMongodbId } = require("../../validators/validateMongodbId");

exports.adminCreateFoodController = expressAsyncHandler(async (req, res) => {
  try {
    const {
      title,
      description,
      imageUrl,
      price,
      foodTags,
      category,
      foodCategory,
      code,
      isAvailable,
      resturant,
      rating,
      ratingCount,
    } = req.body;

    const missingFields = validateInput({
      title,
      description,
      price,
      resturant,
    });
    if (missingFields.length > 0) {
      return res.status(400).json({
        error: `${ERROR_RESPONSE.MISSING_FIELDS}${missingFields.join(", ")}`,
      });
    }

    const newFood = await FoodModel.create({
      title,
      description,
      imageUrl,
      price,
      foodTags,
      category,
      foodCategory,
      code,
      isAvailable,
      resturant,
      rating,
      ratingCount,
    });

    if (!newFood) {
      return res.status(400).json({ error: ERROR_RESPONSE.FOOD_CREATE });
    }
    res.status(200).json({ msg: RESPONSE_MESSAGE.SUCCESS, data: newFood });
  } catch (error) {
    throw new Error(ERROR_RESPONSE.FOOD_ERROR);
  }
});

exports.adminGetAllFood = expressAsyncHandler(async (req, res) => {
  try {
    const allFood = await FoodModel.find();
    if (!allFood) {
      return res.status(400).json({ error: ERROR_RESPONSE.NO_FOOD });
    }
    res.status(200).json({ msg: RESPONSE_MESSAGE.SUCCESS, data: allFood });
  } catch (error) {
    throw new Error(ERROR_RESPONSE.FOOD_ERROR);
  }
});

exports.adminGetFood = expressAsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateMongodbId(id);
    const food = await FoodModel.findById(id);
    if (!food) {
      return res.status(200).json({ error: ERROR_RESPONSE.NO_FOOD });
    }
    res.status(200).json({ msg: RESPONSE_MESSAGE.SUCCESS, data: food });
  } catch (error) {
    throw new Error(ERROR_RESPONSE.FOOD_ERROR);
  }
});

exports.adminUpdateFood = expressAsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      imageUrl,
      price,
      foodTags,
      category,
      foodCategory,
      code,
      isAvailable,
      resturant,
      rating,
      ratingCount,
    } = req.body;

    validateMongodbId(id);

    const updateFood = await FoodModel.findByIdAndUpdate(
      id,
      {
        title,
        description,
        imageUrl,
        price,
        foodTags,
        category,
        foodCategory,
        code,
        isAvailable,
        resturant,
        rating,
        ratingCount,
      },
      { new: true }
    );

    if (!updateFood) {
      return res.status(400).json({ error: ERROR_RESPONSE.NO_FOOD });
    }
    res.status(200).json({ msg: RESPONSE_MESSAGE.SUCCESS, data: updateFood });
  } catch (error) {
    throw new Error(ERROR_RESPONSE.FOOD_ERROR);
  }
});

exports.adminDeleteFood = expressAsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateMongodbId(id);
    const deleteFood = await FoodModel.findByIdAndDelete(id);
    if (!deleteFood) {
      return res.status(400).json({ error: ERROR_RESPONSE.NO_FOOD });
    }
    res.status(200).json({ msg: `${RESPONSE_MESSAGE.SUCCESS} deleted food` });
  } catch (error) {
    throw new Error(ERROR_RESPONSE.FOOD_ERROR);
  }
});
