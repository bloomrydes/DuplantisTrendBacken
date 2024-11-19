const express = require("express");
const {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
} = require("../controller/postController");
const router = express.Router();

router.post("/post", createPost);
router.get("/posts", getAllPosts);
router.get("/posts/:id", getPostById);
router.put("/posts/:id", updatePost);
router.delete("/posts/:id", deletePost);

module.exports = router;

// const express = require("express");
// const router = express.Router();
// const postController = require("../controller/postController");
// const upload = require("../utils/multer");
// const cloudinary = require("../utils/cloudinary");

// // Route to create a new blog post
// router.post("/create", upload.single("image"), postController.createPost);

// module.exports = router;
