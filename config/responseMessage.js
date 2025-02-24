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
  NO_DATA:"No Data",

  //Auth
  USER_EXIST: "User Already Exist",
  USER_NOT_EXIST: "User Not Exist",
  USER_DELETED: "This user has been deleted.",
  INCORRECT_PASSWORD: "Incorrect password",
  ADMIN_NOT_EXIST:"No Admin found",
  ADMIN_ERROR:"Error in Admin api",

  //Resturant
  CREATE_RESTURANT_ERROR: "Error in create_resturant API",
  GET_ALL_RESTURANT: "Error while featching all resturants",
  GET_RESTURANT: "Error while featching the resturant",
  NO_RESTURANT: "No Reasturant found",

  //Category
  CATEGORY_ERROR: "Error in Category API",
  NO_CATEGORIES: "No Categories",

  //Food
  FOOD_ERROR: "Error in food API",
  FOOD_CREATE: "Cant able to add food",
  NO_FOOD: "No Food Found",

  //payment
  PAYMENT_ERROR: "Error in Payment Api",
  PAYMENT_ORDER: "Cant able to place order",
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

  //Category
  CATEGORY_CREATE_SUCCESS: "successfully created category",
  CATEGORY_UPDATE_SUCCESS: "successfully update category",

  //Payment
  PAYEMENT_SUCCESS: "Successfully placed order",
};
