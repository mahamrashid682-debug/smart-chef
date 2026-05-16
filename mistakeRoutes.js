import express from "express";
import { fixMistake } from "../controllers/mistakeController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/fix", protect, fixMistake);

export default router;
