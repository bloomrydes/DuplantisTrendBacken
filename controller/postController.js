const Post = require("../model/postModal"); // Adjust the path as per your project structure

// Create a new post
const createPost = async (req, res) => {
  const { title, description, content } = req.body;

  // Validate required fields
  if (!title || !content) {
    return res.status(400).json({ error: "Title and content are required" });
  }

  try {
    const newPost = new Post({
      title,
      description,
      content,
    });

    // Save the post to the database
    await newPost.save();

    res
      .status(201)
      .json({ message: "Post created successfully", post: newPost });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to create post", details: error.message });
  }
};

// Get all posts
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }); // Fetch all posts, sorted by newest first
    res.status(200).json({ posts });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch posts", details: error.message });
  }
};

// Get a single post by ID
const getPostById = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.status(200).json({ post });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch the post", details: error.message });
  }
};

// Update a post by ID
const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, description, content } = req.body;

  try {
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { title, description, content },
      { new: true, runValidators: true } // Return the updated document and validate fields
    );

    if (!updatedPost) {
      return res.status(404).json({ error: "Post not found" });
    }

    res
      .status(200)
      .json({ message: "Post updated successfully", post: updatedPost });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to update the post", details: error.message });
  }
};

// Delete a post by ID
const deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedPost = await Post.findByIdAndDelete(id);

    if (!deletedPost) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to delete the post", details: error.message });
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
};

// const Post = require("../model/postModal");
// const cloudinary = require("../utils/cloudinary"); // Assuming cloudinary config is here
// const upload = require("../utils/multer"); // Assuming multer config is here

// // Create a new blog post with optional image upload
// exports.createPost = async (req, res) => {
//   try {
//     console.log("Request Body:", req.body);
//     console.log("Uploaded File:", req.file);

//     const { title, content, author } = req.body;

//     // Check if required fields are present
//     if (!title || !content || !author) {
//       return res.status(400).json({ message: "Missing required fields" });
//     }

//     // Initialize imageUrl to null
//     let imageUrl = null;

//     // If a file is uploaded, process the image with Cloudinary
//     if (req.file) {
//       const base64Image = `data:${
//         req.file.mimetype
//       };base64,${req.file.buffer.toString("base64")}`;

//       // Upload image to Cloudinary
//       const result = await cloudinary.uploader.upload(base64Image, {
//         folder: "blog-posts", // Optional: Store images in the 'blog-posts' folder on Cloudinary
//       });

//       // Set the image URL returned by Cloudinary
//       imageUrl = result.secure_url; // Cloudinary returns the URL in `secure_url`
//     }

//     // Create a new post document with the data
//     const newPost = new Post({
//       title,
//       content,
//       author,
//       imageUrl, // Store the image URL if an image is uploaded
//     });

//     // Save the new post to the database
//     await newPost.save();

//     // Send a success response
//     res.status(201).json({
//       message: "Blog post created successfully!",
//       post: newPost,
//     });
//   } catch (error) {
//     console.error("Error creating post:", error);
//     res.status(500).json({ message: "Server error, please try again later" });
//   }
// };
