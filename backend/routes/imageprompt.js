import express from "express";
import getImagesbyCloudinary from "../controller/getImagesbyCloudinary.js";

const router = express.Router();

router.get("/images",getImagesbyCloudinary );

export default router;
