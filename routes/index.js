const clientRouter = require("../routes/client/clientRouter");
const vendorRouter = require("../routes/vendor/vendorRoutes");
const vendorResturantRouter = require("../routes/vendor/resturantRoutes");

exports.setupRoutes = (app) => {
  //client
  app.use("/api/client", clientRouter);

  //vendor
  app.use("/api/vendor", vendorRouter);
  app.use("/api/vendor/resturant", vendorResturantRouter);
};
