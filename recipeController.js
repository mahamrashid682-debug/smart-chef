import Recipe from "../models/Recipe.js";

export async function getRecipes(req, res) {
  const { q = "", category = "", cuisine = "", difficulty = "" } = req.query;
  const filter = {};

  if (q) filter.$text = { $search: q };
  if (category) filter.category = category;
  if (cuisine) filter.cuisine = cuisine;
  if (difficulty) filter.difficulty = difficulty;

  const recipes = await Recipe.find(filter).sort(q ? { score: { $meta: "textScore" } } : { createdAt: -1 }).limit(40);

  if (req.user && q) {
    req.user.history.unshift({ type: "recipe", query: q, result: { count: recipes.length } });
    req.user.history = req.user.history.slice(0, 30);
    await req.user.save();
  }

  res.json({ recipes });
}

export async function getRecipe(req, res) {
  const recipe = await Recipe.findById(req.params.id);
  if (!recipe) return res.status(404).json({ message: "Recipe not found." });
  res.json({ recipe });
}

export async function adjustRecipe(req, res) {
  const { servings } = req.body;
  const recipe = await Recipe.findById(req.params.id);

  if (!recipe) return res.status(404).json({ message: "Recipe not found." });
  if (!servings || servings < 1) return res.status(400).json({ message: "Servings must be at least 1." });

  const factor = servings / recipe.servings;
  const adjusted = recipe.ingredients.map((item) => ({
    name: item.name,
    quantity: Number((item.quantity * factor).toFixed(2)),
    unit: item.unit
  }));

  res.json({ originalServings: recipe.servings, requestedServings: servings, ingredients: adjusted });
}

export async function pantryRecipes(req, res) {
  const { ingredients = [] } = req.body;
  const normalized = ingredients.map((item) => String(item).toLowerCase().trim()).filter(Boolean);

  const recipes = await Recipe.find({});
  const scored = recipes
    .map((recipe) => {
      const recipeIngredients = recipe.ingredients.map((item) => item.name.toLowerCase());
      const matched = recipeIngredients.filter((item) => normalized.some((owned) => item.includes(owned) || owned.includes(item)));
      const missing = recipeIngredients.filter((item) => !matched.includes(item));
      return { recipe, matched, missing, score: matched.length / Math.max(recipeIngredients.length, 1) };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 8);

  if (req.user) {
    req.user.history.unshift({ type: "pantry", query: normalized.join(", "), result: { count: scored.length } });
    req.user.history = req.user.history.slice(0, 30);
    await req.user.save();
  }

  res.json({ matches: scored });
}

export async function toggleFavorite(req, res) {
  const recipe = await Recipe.findById(req.params.id);
  if (!recipe) return res.status(404).json({ message: "Recipe not found." });

  const exists = req.user.favorites.some((id) => String(id) === String(recipe._id));
  req.user.favorites = exists
    ? req.user.favorites.filter((id) => String(id) !== String(recipe._id))
    : [...req.user.favorites, recipe._id];
  await req.user.save();

  res.json({ favorite: !exists, favorites: req.user.favorites });
}
