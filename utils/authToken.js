const jwt = require("jsonwebtoken");

exports.generateRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRECT_KEY, { expiresIn: "1d" });
};

exports.generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRECT_KEY, { expiresIn: "1d" });
};
