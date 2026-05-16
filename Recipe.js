import mongoose from "mongoose";

const ingredientSchema = new mongoose.Schema(
  {
    name: String,
    quantity: Number,
    unit: String
  },
  { _id: false }
);

const recipeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, index: true },
    description: String,
    category: String,
    cuisine: String,
    prepTime: Number,
    cookTime: Number,
    difficulty: String,
    servings: Number,
    image: String,
    ingredients: [ingredientSchema],
    steps: [String],
    tags: [String],
    nutrition: {
      calories: Number,
      protein: String,
      carbs: String,
      fat: String
    }
  },
  { timestamps: true }
);

recipeSchema.index({ title: "text", description: "text", tags: "text", cuisine: "text", category: "text" });

export default mongoose.model("Recipe", recipeSchema);
