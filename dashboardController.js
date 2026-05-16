import Recipe from "../models/Recipe.js";

export async function getDashboard(req, res) {
  const user = await req.user.populate("favorites");
  res.json({
    user,
    favorites: user.favorites,
    history: user.history.slice(0, 20),
    mealPlan: user.mealPlan,
    shoppingList: user.shoppingList
  });
}

export async function addMealPlan(req, res) {
  const { day, meal, recipeTitle, notes } = req.body;
  req.user.mealPlan.push({ day, meal, recipeTitle, notes });
  await req.user.save();
  res.json({ mealPlan: req.user.mealPlan });
}

export async function removeMealPlan(req, res) {
  req.user.mealPlan = req.user.mealPlan.filter((item) => String(item._id) !== req.params.id);
  await req.user.save();
  res.json({ mealPlan: req.user.mealPlan });
}

export async function addShoppingItem(req, res) {
  const { name, quantity } = req.body;
  req.user.shoppingList.push({ name, quantity });
  await req.user.save();
  res.json({ shoppingList: req.user.shoppingList });
}

export async function toggleShoppingItem(req, res) {
  const item = req.user.shoppingList.id(req.params.id);
  if (!item) return res.status(404).json({ message: "Shopping item not found." });
  item.checked = !item.checked;
  await req.user.save();
  res.json({ shoppingList: req.user.shoppingList });
}

export async function buildShoppingFromRecipe(req, res) {
  const recipe = await Recipe.findById(req.params.id);
  if (!recipe) return res.status(404).json({ message: "Recipe not found." });

  recipe.ingredients.forEach((item) => {
    req.user.shoppingList.push({
      name: item.name,
      quantity: `${item.quantity} ${item.unit}`.trim()
    });
  });
  await req.user.save();
  res.json({ shoppingList: req.user.shoppingList });
}
