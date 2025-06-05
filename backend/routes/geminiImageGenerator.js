import express from "express";
const router = express.Router();
import generateImageController from "../controller/geminiController.js";
router.post("/generate",  generateImageController );

export default router;
