const cloudinary = require("cloudinary").v2;

// Configure cloudinary
cloudinary.config({
  cloud_name: "diemc336d",
  api_key: "938934753695362",
  api_secret: "QHx2KvrSgI8OOcFPUMqxZ8MbwMA",
});

module.exports = cloudinary;
