// models/PigProduct.js
const mongoose = require("mongoose");

// Define the Pig Product schema
const pigProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: String, required: true },
  image: { type: String },
  ageCategory: { type: String, required: true }, // Single value for age category
  stock: { type: Number, required: true },
  selected: { type: Boolean, default: false },
  quantity: { type: Number, default: 1 },
});


// Create and export the PigProduct model
module.exports = mongoose.model("PigProduct", pigProductSchema);
