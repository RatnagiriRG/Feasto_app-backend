const asyncHandler = require("express-async-handler");
const userModel = require("../models/userModel");
const { validateInput } = require("../validators/validateInputs");
const { ERROR_MESSAGES } = require("../config/errorMessage");

exports.authController = asyncHandler(async (req, res) => {
  try {
    const { username, password, phone, email, address } = req.body;

    const missingFields = validateInput({
      username,
      password,
      phone,
      email,
      address,
    });

    // If there are any missing fields, return an error response
    if (missingFields.length > 0) {
      return res.status(400).json({
        error: ERROR_MESSAGES.MISSING_FIELDS + missingFields.join(", "),
      });
    }

    //check user
    const existingUser = await userModel.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({
        error: ERROR_MESSAGES.USER_EXIST,
      });
    } else {
    }

    //creat new user
    const user = await userModel.create({
      name: username,
      email: email,
      phone: phone,

      address: address,
      password: password,
    });
    if (user) {
      return res
        .status(201)
        .json({ msg: "user created successfully", data: user });
    }
  } catch (error) {
    throw new Error(`error is registerAPI : ${error}`);
  }
});
