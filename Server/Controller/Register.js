import { UserModel } from "../Models/DB.js";

export const Register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // 1️⃣ Basic validation
    if (!username || !email || !password) {
      return res.status(400).json({
        message: "Username, email, and password are required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters long",
      });
    }

    // 2️⃣ Check if user already exists
    const existingUser = await UserModel.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return res.status(409).json({
        message: "User with this email or username already exists",
      });
    }

    // 3️⃣ Create owner account
    const user = await UserModel.create({
      username,
      email,
      password, // hashed automatically by pre-save hook
    });

    // 4️⃣ Respond (NO password)
    res.status(201).json({
      message: "Owner registered successfully",
      owner: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Registration failed",
      error: error.message,
    });
  }
};
