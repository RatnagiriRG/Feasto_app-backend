const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const { ERROR_RESPONSE } = require("../config/responseMessage");

exports.authMiddleware = asyncHandler(async (req, res, next) => {
  let token;
  if (req?.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
    try {
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRECT_KEY);
        const user = await User.findById(decoded?.id);
        req.user = user;
        next();
      }
    } catch (error) {
      throw new Error(ERROR_RESPONSE.AUTH_TOKEN_EXPIRE);
    }
  } else {
    throw new Error(ERROR_RESPONSE.AUTH_TOKEN_MISSING);
  }
});

//isAdmin
exports.isAdmin = asyncHandler(async (req, res, next) => {
  const { email } = req.user;
  const user = await User.findOne({ email });
  if (user.usertype !== "admin") {
    throw new Error(ERROR_RESPONSE.AUTH_ADMIN);
  } else {
    next();
  }
});

//isVendor
exports.isVendor = asyncHandler(async (req, res, next) => {
  const { email } = req.user;
  const user = await User.findOne({ email });
  if (user.usertype !== "vendor") {
    throw new Error(ERROR_RESPONSE.AUTH_VENDOR);
  } else {
    next();
  }
});

//isDriver
exports.isDriver = asyncHandler(async (req, res, next) => {
  const { email } = req.user;
  const user = await User.findOne({ email });
  if (user.usertype !== "driver") {
    throw new Error(ERROR_RESPONSE.AUTH_DRIVER);
  } else {
    next();
  }
});

//isClient
exports.isClient = asyncHandler(async (req, res, next) => {
  const { email } = req.user;
  const user = await User.findOne({ email });
  if (user.usertype !== "client") {
    throw new Error(ERROR_RESPONSE.AUTH_CLIENT);
  } else {
    next();
  }
});
