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

  //Resturant
  CREATE_RESTURANT_ERROR: "Error in create_resturant API",
  GET_ALL_RESTURANT: "Error while featching all resturants",
  GET_RESTURANT: "Error while featching the resturant",
  NO_RESTURANT: "No Reasturant found",
};

//response_message
exports.RESPONSE_MESSAGE = {
  //Auth
  SUCCESS: "successfully",
  REGISTER_SUCCESS: "successfully register",
  LOGIN_SUCCESS: "successfully login",
  LOGOUT_SUCCESS: "successfully logout",
  TOKEN_SUCCESS: "successfully token generated",

  //Resturant
  RESTURANT_CREATE_SUCCESS: "successfully created resturant",
  RESTURANT_DELETE_SUCCESS: "successsfully deleted the resturant",
};
