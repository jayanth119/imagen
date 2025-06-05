import { Router } from "express";
import {  loginUser , registerUser , logoutUser , resetPassword } from "../controller/authController.js";
const router = Router();
// Register route
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout",logoutUser );
router.post("/reset-password", resetPassword);
export default router;