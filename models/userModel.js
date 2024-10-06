const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "user name is requried"],
    },
    email: {
      type: String,
      required: [true, "user email is requried"],
      unique: true,
    },
    phone: {
      type: String,
      required: [true, "user phone number is requried"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "user password is required"],
    },
    address: {
      type: Array,
    },
    usertype: {
      type: String,
      required: [true, "user type is requried"],
      default: "client",
      enum: ["client", "admin", "vendor", "driver"],
    },
    profile: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/512/17/17004.png",
    },
  },
  { timestamps: true }
);

//Export the model
module.exports = mongoose.model("User", userSchema);
