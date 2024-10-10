const asyncHandler = require("express-async-handler");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");

const { validateInput } = require("../validators/validateInputs");
const {
  ERROR_RESPONSE,
  RESPONSE_MESSAGE,
} = require("../config/responseMessage");
const { generateRefreshToken, generateToken } = require("../utils/authToken");

//Auth Register
exports.authController = asyncHandler(async (req, res) => {
  try {
    const { username, password, phone, email, address } = req.body;

    const missingFields = validateInput({
      username,
      password,
      phone,
      email,
    });

    if (missingFields.length > 0) {
      return res.status(400).json({
        error: ERROR_RESPONSE.MISSING_FIELDS + missingFields.join(", "),
      });
    }

    const existingUser = await userModel.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({
        error: ERROR_RESPONSE.USER_EXIST,
      });
    }

    const user = await userModel.create({
      name: username,
      email: email,
      phone: phone,
      password: password,
    });
    if (user) {
      return res.status(201).json({
        msg: RESPONSE_MESSAGE.REGISTER_SUCCESS,
        data: {
          username: user.name,
          email: user.email,
          phone: user.phone,
        },
      });
    }
  } catch (error) {
    throw new Error(error);
  }
});

//Login

//admin login
exports.loginAdminController = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const findAdmin = await userModel.findOne({ email });

  if (findAdmin.usertype !== "admin") {
    throw new Error(ERROR_RESPONSE.AUTH_ADMIN);
  }

  if (findAdmin && (await findAdmin.isPasswordMatched(password))) {
    const refreshtoken = await generateRefreshToken(findAdmin?.id);
    const updateUser = await userModel.findByIdAndUpdate(
      findAdmin?.id,
      {
        refreshToken: refreshtoken,
      },
      {
        new: true,
      }
    );
    res.cookie("refreshToken", refreshtoken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });
    res.json({
      _id: findAdmin?._id,
      firstname: findAdmin?.firstname,
      lastname: findAdmin?.lastname,
      email: findAdmin?.email,
      mobile: findAdmin?.email,
      token: generateToken(findAdmin?._id),
    });
  } else {
    res.status(400);
    throw new Error(ERROR_RESPONSE.CLIENT_ERROR);
  }
});

//handle refresh token
exports.handleRefreshToken = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  console.log(cookie);
  if (!cookie.refreshToken) {
    throw new Error(ERROR_RESPONSE.AUTH_TOKEN_MISSING);
  }
  const refreshToken = cookie.refreshToken;
  console.log(refreshToken);

  const user = await userModel.findOne({ refreshToken });
  if (!user) {
    throw new Error(ERROR_RESPONSE.AUTH_TOKEN_INVALID);
  }
  jwt.verify(refreshToken, process.env.JWT_SECRECT_KEY, (err, decoded) => {
    if (err || user.id !== decoded.id) {
      throw new Error(ERROR_RESPONSE.CLIENT_ERROR + err);
    } else {
      const accessToken = generateRefreshToken(user?.id);
      res.json({ accessToken });
    }
  });
});
