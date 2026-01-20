import { UserModel } from "../Models/DB.js";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET environment variable is required");
}

// Validation helper
const validateRegistrationInput = (username, email, password) => {
  const errors = [];

  // Username validation
  if (!username || username.trim().length < 3 || username.trim().length > 30) {
    errors.push("Username must be between 3 and 30 characters");
  } else if (!/^[a-zA-Z0-9_]+$/.test(username.trim())) {
    errors.push("Username can only contain letters, numbers, and underscores");
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    errors.push("Invalid email format");
  }

  // Password validation
  if (!password || password.length < 8) {
    errors.push("Password must be at least 8 characters long");
  }

  return errors;
};

export const Register = async (req, res) => {
  try {
    const { username, email, password } = req.body || {};

    // Validate input
    const validationErrors = validateRegistrationInput(username, email, password);
    if (validationErrors.length > 0) {
      return res.status(400).json({
        success: false,
        message: validationErrors[0],
        errors: validationErrors,
      });
    }

    const trimmedUsername = username.trim();
    const trimmedEmail = email.toLowerCase().trim();

    // Check if user already exists - FIXED
    const existingUser = await UserModel.findOne({
      $or: [
        { email: { $regex: new RegExp(`^${trimmedEmail}$`, "i") } },
        { username: { $regex: new RegExp(`^${trimmedUsername}$`, "i") } },
      ],
    });

    if (existingUser) {
      const field = existingUser.email.toLowerCase() === trimmedEmail ? "Email" : "Username";
      return res.status(409).json({
        success: false,
        message: `${field} already exists`,
      });
    }

    // Create new user (password will be hashed by schema pre-save hook)
    const newUser = new UserModel({
      username: trimmedUsername,
      email: trimmedEmail,
      password,
    });

    await newUser.save();

    // Generate JWT token
    const token = jwt.sign(
      { 
        id: newUser._id, 
        email: newUser.email,
        username: newUser.username 
      },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Exclude password from response
    const { password: _, ...userWithoutPassword } = newUser.toObject();

    return res.status(201).json({
      success: true,
      message: "Account created successfully",
      token,
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error("Registration error:", {
      message: error.message,
      code: error.code,
    });

    // Handle MongoDB duplicate key errors
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Username or email already taken",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};