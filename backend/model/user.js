const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the User schema
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true, 
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"], 
  },
  password: {
    type: String,
    required: true,
    minlength: 6, 
  },
  
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});


userSchema.pre("save", function (next) {
  this.updated_at = Date.now();
  next();
});

// Create the model
const User = mongoose.model("User", userSchema);

module.exports = User;
