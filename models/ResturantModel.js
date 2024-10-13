const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var resturantSchema = new mongoose.Schema(
  {
    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Vendor ID required"],
    },
    title: {
      type: String,
      required: [true, "Resturant title required"],
    },

    imageUrl: {
      type: String,
    },
    foods: { type: Array },
    time: {
      type: String,
    },
    pickup: {
      type: Boolean,
      default: true,
    },
    delivery: {
      type: Boolean,
      default: true,
    },
    isOpen: {
      type: Boolean,
      default: true,
    },
    logoUrl: {
      type: String,
    },
    rating: {
      type: Number,
      default: 1,
      min: 1,
      max: 5,
    },
    ratingCount: {
      type: String,
    },
    code: {
      type: String,
    },
    coordinates: {
      id: {
        type: String,
      },
      latitude: {
        type: Number,
      },
      latitudeDelta: {
        type: Number,
      },
      longitude: {
        type: Number,
      },
      longitudeDelta: {
        type: Number,
      },
      address: {
        type: String,
      },
      title: {
        type: String,
      },
    },
    delfalg: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model("Resturant", resturantSchema);
