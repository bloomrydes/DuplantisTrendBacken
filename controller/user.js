const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const  User  = require("../model/user");


const sendEmail = require('../utils/email')
//Register Endpoint


const registerAndFillData = async (req, res, next) => {
  try {
    const { name, email, password, level, course } = req.body;

    // Check if user already exists
    let user = await User.findOne({ email: email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Create new user
    user = new User({
      name,
      email,
      password,
      level,
      course,
    });

    // Generate JWT token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    // Save user to database
    await user.save();

    // Data object to pass to sendEmail function
    const emailData = {
      to: email, // Use 'email' instead of 'userEmail'
      subject: "Registration Confirmation",
      text: "Thank you for registering with School Direction Platform.",
      html: "<p>Thank you for registering with School Direction Platform.</p>",
    };

    // Send email to user
    await sendEmail(emailData);

    res.status(201).json({
      success: true,
      message: "User registered successfully.",
      data: {
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          course: user.course,
          level: user.level,
          role: user.role,
          token: token,
        },
      },
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check if the password matches
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password",
      });
    }

    // Generate JWT token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      success: true,
      message: "User logged in successfully.",
      data: {
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          level: user.level,
          course: user.course,
          role: user.role,
          token: token,
        },
        isLogged: true,
      },
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};



module.exports = {
  registerAndFillData,
  login,
 
};
