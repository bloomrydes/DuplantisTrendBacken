const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true, // Removes extra spaces
  },
  description: {
    type: String,
    trim: true, // Optional field
  },
  content: {
    type: String,
    required: true, // Matches the UI where content is mandatory
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically adds a timestamp for record creation
  },
});

module.exports = mongoose.model("Post", PostSchema);
