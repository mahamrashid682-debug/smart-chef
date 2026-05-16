import express from "express";
import { chatWithChef } from "../controllers/assistantController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/chat", protect, chatWithChef);

export default router;
