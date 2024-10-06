const mongoose = require("mongoose");
const { ERROR_RESPONSE } = require("../config/responseMessage");

const validateMongodbId = (id) => {
  console.log("Validating ID:", id);
  const isValid = mongoose.Types.ObjectId.isValid(id);

  if (!isValid) {
    throw new Error(ERROR_RESPONSE.VALIDATE_MONGO_ID);
  }
};

module.exports = validateMongodbId;
