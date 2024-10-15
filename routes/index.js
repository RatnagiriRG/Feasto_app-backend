//client
const clientRouter = require("../routes/client/clientRouter");
const clientResturant = require("../routes/client/resturantRoutes");
//vendor
const vendorRouter = require("../routes/vendor/vendorRoutes");
const vendorResturantRouter = require("../routes/vendor/resturantRoutes");
//admin
const adminRouter = require("../routes/admin/adminRouter");
const adminResturant = require("../routes/admin/resturantRouter");
const adminCategory = require("../routes/admin/categoryRouter");

exports.setupRoutes = (app) => {
  const _apiClient = "/api/client";
  const _apiVendor = "/api/vendor";
  const _apiAdmin = "/api/admin";
  const _resturant = "/resturant";
  const _category = "/category";

  //client
  app.use(`${_apiClient}`, clientRouter);
  app.use(`${_apiClient}${_resturant}`, clientResturant);

  //vendor
  app.use(`${_apiVendor}`, vendorRouter);
  app.use(`${_apiVendor}${_resturant}`, vendorResturantRouter);

  //admin
  app.use(`${_apiAdmin}`, adminRouter);
  app.use(`${_apiAdmin}${_resturant}`, adminResturant);
  app.use(`${_apiAdmin}${_category}`, adminCategory);
};
