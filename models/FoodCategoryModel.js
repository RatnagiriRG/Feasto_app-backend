const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var foodCategorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "category title is requried"],
    },
    imageUrl: {
      type: String,
      default:
        "https://png.pngtree.com/png-vector/20220623/ourmid/pngtree-food-logo-png-image_5297921.png",
    },
  },
  { timestamps: true }
);

//Export the model
module.exports = mongoose.model("FoodCategory", foodCategorySchema);
