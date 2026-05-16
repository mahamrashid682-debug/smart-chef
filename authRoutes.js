import express from "express";
import { googleLogin, login, me, register } from "../controllers/authController.js";
import { protect } from "../middleware/auth.js";
import { validateLogin, validateSignup } from "../middleware/validate.js";

const router = express.Router();

router.post("/register", validateSignup, register);
router.post("/login", validateLogin, login);
router.post("/google", googleLogin);
router.get("/me", protect, me);

export default router;
