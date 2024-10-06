const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
  try {
    await mongoose
      .connect(process.env.MONGODB_URL)
      .then(console.log(`mongo connection established ${mongoose.connection.host}`));
  } catch (error) {
    console.log(`DB connection Error ${error}`.white.bgRed);
  }
};

module.exports = connectDB;
