import express from "express";
import { generateStyledImage } from "../controller/aiController.js";

const router = express.Router();

// No multer needed — receiving base64 JSON directly
router.post("/generate", generateStyledImage);

export default router;