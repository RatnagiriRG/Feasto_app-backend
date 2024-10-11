const asyncHandler = require("express-async-handler");
const {
  ERROR_RESPONSE,
  RESPONSE_MESSAGE,
} = require("../../config/responseMessage");
const { validateInput } = require("../../validators/validateInputs");
const {
  generateRefreshToken,
  generateToken,
} = require("../../utils/authToken");
const userModel = require("../../models/userModel");
const { validateMongodbId } = require("../../validators/validateMongodbId");

exports.vendorloginController = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;

    const missingFields = validateInput({ email, password });
    if (missingFields.length > 0) {
      return res.status(400).json({
        error: `${ERROR_RESPONSE.MISSING_FIELDS}${missingFields.join(", ")}`,
      });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: ERROR_RESPONSE.USER_NOT_EXIST });
    }

    if (user.userDelflag) {
      return res.status(403).json({ error: ERROR_RESPONSE.USER_DELETED });
    }

    const isPasswordCorrect = await user.isPasswordMatched(password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ error: ERROR_RESPONSE.INCORRECT_PASSWORD });
    }

    const refreshToken = generateRefreshToken(user._id);
    await userModel.findByIdAndUpdate(
      user._id,
      { refreshToken },
      { new: true }
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 72 * 60 * 60 * 1000,
      sameSite: "strict",
    });

    res.status(200).json({
      message: RESPONSE_MESSAGE.LOGIN_SUCCESS,
      data: {
        userId: user._id,
        accessToken: generateToken(user._id),
        refreshToken: generateRefreshToken(user._id),
      },
    });
  } catch (error) {
    throw new Error(error);
  }
});

//access_token
exports.vendorRefreshTokenController = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ error: ERROR_RESPONSE.AUTH_TOKEN_MISSING });
  }

  const user = await userModel.findOne({ refreshToken });
  if (!user) {
    return res.status(403).json({ error: ERROR_RESPONSE.AUTH_TOKEN_INVALID });
  }

  const accessToken = generateToken(user._id);
  const newRefreshToken = generateRefreshToken(user._id);

  await userModel.findByIdAndUpdate(
    user._id,
    { refreshToken: newRefreshToken },
    { new: true }
  );

  // Set the new refresh token as an HTTP-only cookie
  res.cookie("refreshToken", newRefreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 72 * 60 * 60 * 1000, // 72 hours
    sameSite: "strict",
  });

  res.status(200).json({
    message: RESPONSE_MESSAGE.TOKEN_SUCCESS,
    accessToken: accessToken,
    refreshToken: newRefreshToken,
  });
});

//update client
exports.updateVendorUser = asyncHandler(async (req, res) => {
  try {
    const { id, username, address, phone } = req.body;
    validateMongodbId(id);
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).json({ error: ERROR_RESPONSE.USER_NOT_EXIST });
    }

    // Update user fields
    const updatedUser = await userModel.findByIdAndUpdate(
      id,
      { username: username, address: address, phone: phone },
      { new: true }
    );

    // Return the updated user information
    res.status(200).json({
      msg: RESPONSE_MESSAGE.SUCCESS,
      data: updatedUser,
    });
  } catch (error) {
    throw new Error(`${ERROR_RESPONSE.CLIENT_ERROR}:${error}`);
  }
});

//update password//updatePassword
exports.updateVendorPassword = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { password } = req.body;
  validateMongodbId(_id);
  const user = await userModel.findById(_id);

  if (password) {
    user.password = password;
    const updatePassword = await user.save();
    res.json(updatePassword);
  } else {
    res.json(user);
  }
});

//delete account
exports.deleteVendorUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongodbId(_id);
  try {
    const getaUser = await userModel.findById(_id);
    if (getaUser) {
      const deleteUser = await userModel.findByIdAndUpdate(
        _id,
        {
          userDelflag: true,
        },
        { new: true }
      );
      res.json({ msg: RESPONSE_MESSAGE.SUCCESS, data: deleteUser });
    } else {
      throw new Error(ERROR_RESPONSE.USER_NOT_EXIST);
    }

    res.json(deleteUser);
  } catch (error) {
    throw new Error(error);
  }
});

//logout

exports.vendorLogout = asyncHandler(async (req, res) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return res.status(400).json({ error: ERROR_RESPONSE.AUTH_TOKEN_EXPIRE });
    }

    const user = await userModel.findOne({ refreshToken });
    res.clearCookie("refreshToken", { httpOnly: true, secure: true });
    if (!user) {
      return res.status(202).json({ message: RESPONSE_MESSAGE.LOGOUT_SUCCESS });
    }
    await userModel.findByIdAndUpdate(user._id, { refreshToken: "" });

    return res.status(200).json({ message: RESPONSE_MESSAGE.LOGOUT_SUCCESS });
  } catch (error) {
    return res
      .status(500)
      .json({ error: `${ERROR_RESPONSE.SERVER_ERROR}: ${error.message}` });
  }
});
