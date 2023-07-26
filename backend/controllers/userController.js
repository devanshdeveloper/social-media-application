import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

// @desc    Auth user/set token
// route    POST /api/users/auth
// @access  Public
export async function authUser(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400).json({ error: "Invalid Email or Password" });
  }
}

// @desc    Register a new user
// route    POST /api/users
// @access  Public
export async function registerUser(req, res) {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User Already Exists");
  }
  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid User Data");
  }
}

// @desc    Logout User
// route    POST /api/users/logout
// @access  Public
export async function logoutUser(req, res) {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "User Logged Out" });
}

// @desc    Get user profile
// route    Get /api/users/profile
// @access  Private
export async function getUserProfile(req, res) {
  res.status(200).json(req.user);
}

// @desc    Update User Profile
// route    PUT /api/users/profile
// @access  Private
export async function updateUserProfile(req, res) {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
}
