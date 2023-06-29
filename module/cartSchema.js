const mongoose = require("mongoose");

const cartProductSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  rating: Number,
  stock: Number,
  brand: String,
  category: String,
  thumbnail: String,
  productId: {
    type: String,
    ref: "Product",
  },
  userId: String,
});

const ProductCartModel = mongoose.model("Cart", cartProductSchema);
module.exports = ProductCartModel;
