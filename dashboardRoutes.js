import express from "express";
import {
  addMealPlan,
  addShoppingItem,
  buildShoppingFromRecipe,
  getDashboard,
  removeMealPlan,
  toggleShoppingItem
} from "../controllers/dashboardController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.get("/", protect, getDashboard);
router.post("/meal-plan", protect, addMealPlan);
router.delete("/meal-plan/:id", protect, removeMealPlan);
router.post("/shopping-list", protect, addShoppingItem);
router.patch("/shopping-list/:id", protect, toggleShoppingItem);
router.post("/shopping-list/from-recipe/:id", protect, buildShoppingFromRecipe);

export default router;
