const expressAsyncHandler = require("express-async-handler");
const {
  ERROR_RESPONSE,
  RESPONSE_MESSAGE,
} = require("../../config/responseMessage");
const { validateInput } = require("../../validators/validateInputs");
const CategoryModel = require("../../models/CategoryModel");
const { validateMongodbId } = require("../../validators/validateMongodbId");

exports.adminCreateCategory = expressAsyncHandler(async (req, res) => {
  try {
    const { title, imageUrl } = req.body;

    const missingFields = validateInput({ title });
    if (missingFields.length > 0) {
      return res.status(400).json({
        error: `${ERROR_RESPONSE.MISSING_FIELDS}${missingFields.join(", ")}`,
      });
    }

    const newCategory = new CategoryModel({ title: title, imageUrl: imageUrl });
    await newCategory.save();

    res.status(200).json({
      msg: RESPONSE_MESSAGE.CATEGORY_CREATE_SUCCESS,
      data: newCategory,
    });
  } catch (error) {
    throw new Error(ERROR_RESPONSE.CATEGORY_ERROR);
  }
});

exports.adminGetAllCategory = expressAsyncHandler(async (req, res) => {
  try {
    const allCategory = await CategoryModel.find();
    if (!allCategory) {
      return res.status(400).json({ error: ERROR_RESPONSE.NO_CATEGORIES });
    }
    res.status(200).json({ msg: RESPONSE_MESSAGE.SUCCESS, data: allCategory });
  } catch (error) {
    throw new Error(ERROR_RESPONSE.CATEGORY_ERROR);
  }
});

exports.adminUpdateCategory = expressAsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { title, imageUrl } = req.body;

    validateMongodbId(id);
    const updateCategory = await CategoryModel.findByIdAndUpdate(
      id,
      {
        title: title,
        imageUrl: imageUrl,
      },
      { new: true }
    );
    if (!updateCategory) {
      return res.status(401).json({ error: ERROR_RESPONSE.NO_CATEGORIES });
    }
    res
      .status(200)
      .json({ msg: RESPONSE_MESSAGE.SUCCESS, data: updateCategory });
  } catch (error) {
    throw new Error(ERROR_RESPONSE.CATEGORY_ERROR);
  }
});

exports.adminDeleteCategory = expressAsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const deleteCategory = await CategoryModel.findByIdAndDelete(id);
    if (!deleteCategory) {
      return res.status(400).json({ error: ERROR_RESPONSE.NO_CATEGORIES });
    }
    res
      .status(200)
      .json({ msg: `${RESPONSE_MESSAGE.SUCCESS} delete Category` });
  } catch (error) {
    throw new Error(ERROR_RESPONSE.CATEGORY_ERROR);
  }
});
