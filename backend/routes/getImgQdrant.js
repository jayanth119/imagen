import express from "express";
const router = express.Router();
import  fetchAllQdrant from "../controller/getImagesbyQdrant.js";

router.get("/images", fetchAllQdrant);

export default router;