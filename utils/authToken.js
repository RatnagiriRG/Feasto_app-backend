const jwt = require("jsonwebtoken");

exports.generateRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRECT_KEY, { expiresIn: "7d" });
};

exports.generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_ACCESS_KEY, { expiresIn: "1d" });
};
