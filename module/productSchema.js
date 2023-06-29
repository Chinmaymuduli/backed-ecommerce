const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  rating: Number,
  stock: Number,
  brand: String,
  category: String,
  thumbnail: String,
});

const ProductModel = mongoose.model("Product", productSchema);
module.exports = ProductModel;
