import express from "express";
import {
  adjustRecipe,
  getRecipe,
  getRecipes,
  pantryRecipes,
  toggleFavorite
} from "../controllers/recipeController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getRecipes);
router.get("/:id", getRecipe);
router.post("/:id/adjust", adjustRecipe);
router.post("/smart/pantry", protect, pantryRecipes);
router.post("/:id/favorite", protect, toggleFavorite);

export default router;
