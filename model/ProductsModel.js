const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: String,
  description: String,
  category: String,
  image_url: String,
  location: String,
  date: Date,
  price: Number,
});

const ProdcutModel = mongoose.model("products", productSchema);

module.exports = { ProdcutModel };
