//client
const clientRouter = require("../routes/client/clientRouter");
const clientResturant = require("../routes/client/resturantRoutes");
const clientOrderRouter = require("../routes/client/orderRouter");
//vendor
const vendorRouter = require("../routes/vendor/vendorRoutes");
const vendorResturantRouter = require("../routes/vendor/resturantRoutes");
//admin
const adminRouter = require("../routes/admin/adminRouter");
const adminResturant = require("../routes/admin/resturantRouter");
const adminCategory = require("../routes/admin/categoryRouter");
const adminFoodCategoryRouter = require("../routes/admin/foodCategoryRouter");
const adminFoodRouter = require("../routes/admin/foodRouter");

exports.setupRoutes = (app) => {
  const _apiClient = "/api/client";
  const _apiVendor = "/api/vendor";
  const _apiAdmin = "/api/admin";
  const _resturant = "/resturant";
  const _category = "/category";
  const _foodCategory = "/foodCategory";
  const _food = "/food";
  const _order = "/order";

  //client
  app.use(`${_apiClient}`, clientRouter);
  app.use(`${_apiClient}${_resturant}`, clientResturant);
  app.use(`${_apiClient}${_order}`, clientOrderRouter);

  //vendor
  app.use(`${_apiVendor}`, vendorRouter);
  app.use(`${_apiVendor}${_resturant}`, vendorResturantRouter);

  //admin
  app.use(`${_apiAdmin}`, adminRouter);
  app.use(`${_apiAdmin}${_resturant}`, adminResturant);
  app.use(`${_apiAdmin}${_category}`, adminCategory);
  app.use(`${_apiAdmin}${_foodCategory}`, adminFoodCategoryRouter);
  app.use(`${_apiAdmin}${_food}`, adminFoodRouter);
};
