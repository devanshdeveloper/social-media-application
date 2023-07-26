import { Router } from "express";
import {
  authUser,
  getUserProfile,
  logoutUser,
  registerUser,
  updateUserProfile,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const userRoutes = Router();

userRoutes.post("/auth", authUser);
userRoutes.post("/", registerUser);
userRoutes.post("/logout", logoutUser);
userRoutes
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

export default userRoutes;
