// error response
exports.ERROR_RESPONSE = {
  CLIENT_ERROR: "Client Error",
  MISSING_FIELDS: "Please provide the following fields: ",
  SERVER_ERROR: "Server Error",
  VALIDATE_MONGO_ID: "This ID is not valid or found",
  AUTH_TOKEN_EXPIRE: "Authorized_token  expired, Please login again",
  AUTH_TOKEN_MISSING: "there is no token attached to header",
  AUTH_TOKEN_INVALID: "Authorized token is invalid or expired",
  AUTH_ADMIN: "You'r not a Admin",
  AUTH_DRIVER: "You'r not a Driver",
  AUTH_CLIENT: "You'r not a Client",
  AUTH_VENDOR: "You'r not a Vendor",

  //Auth
  USER_EXIST: "User Already Exist",
  USER_NOT_EXIST: "User Not Exist",
  USER_DELETED: "This user has been deleted.",
  INCORRECT_PASSWORD: "Incorrect password",
};

//response_message
exports.RESPONSE_MESSAGE = {
  //Auth
  SUCCESS: "successfully",
  REGISTER_SUCCESS: "successfully register",
  LOGIN_SUCCESS: "successfully login",
  
};
