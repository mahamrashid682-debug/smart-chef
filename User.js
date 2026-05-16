import mongoose from "mongoose";

const historySchema = new mongoose.Schema(
  {
    type: { type: String, enum: ["mistake", "recipe", "chat", "pantry"], required: true },
    query: String,
    result: mongoose.Schema.Types.Mixed
  },
  { timestamps: true }
);

const mealPlanSchema = new mongoose.Schema(
  {
    day: String,
    meal: String,
    recipeTitle: String,
    notes: String
  },
  { timestamps: true }
);

const shoppingItemSchema = new mongoose.Schema(
  {
    name: String,
    quantity: String,
    checked: { type: Boolean, default: false }
  },
  { timestamps: true }
);

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: String,
    avatar: String,
    provider: { type: String, enum: ["local", "google"], default: "local" },
    googleId: String,
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Recipe" }],
    history: [historySchema],
    mealPlan: [mealPlanSchema],
    shoppingList: [shoppingItemSchema]
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
