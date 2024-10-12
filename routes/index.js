const clientRouter = require("../routes/client/clientRouter");
const vendorRouter = require("../routes/vendor/vendorRoutes");
const vendorResturantRouter = require("../routes/vendor/resturantRoutes");
const clientResturant = require("../routes/client/resturantRoutes");

exports.setupRoutes = (app) => {
  const _apiClient = "/api/client";
  const _apiVendor = "/api/vendor";
  const _apiAdmin = "/api/admin";
  const _resturant = "/resturant";
  //client
  app.use(`${_apiClient}`, clientRouter);
  app.use(`${_apiClient}${_resturant}`, clientResturant);

  //vendor
  app.use(`${_apiVendor}`, vendorRouter);
  app.use(`${_apiVendor}${_resturant}`, vendorResturantRouter);

  //admin
};
