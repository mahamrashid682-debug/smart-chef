import React, { useEffect, useState } from "react";
import { Search, ShoppingBasket, SlidersHorizontal, Utensils } from "lucide-react";
import { api } from "../api/client";
import RecipeCard from "../components/RecipeCard";

export default function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [query, setQuery] = useState("");
  const [adjusted, setAdjusted] = useState(null);
  const [servings, setServings] = useState(4);
  const [selected, setSelected] = useState(null);
  const [pantry, setPantry] = useState("");
  const [matches, setMatches] = useState([]);
  const [notice, setNotice] = useState("");

  async function loadRecipes(search = "") {
    const data = await api(`/recipes${search ? `?q=${encodeURIComponent(search)}` : ""}`);
    setRecipes(data.recipes);
  }

  useEffect(() => {
    loadRecipes().catch((error) => setNotice(error.message));
  }, []);

  async function searchRecipes(e) {
    e.preventDefault();
    await loadRecipes(query);
  }

  async function openAdjust(recipe) {
    setSelected(recipe);
    setServings(recipe.servings);
    const data = await api(`/recipes/${recipe._id}/adjust`, {
      method: "POST",
      body: JSON.stringify({ servings: recipe.servings })
    });
    setAdjusted(data);
  }

  async function recalculate(value) {
    setServings(value);
    if (!selected) return;
    const data = await api(`/recipes/${selected._id}/adjust`, {
      method: "POST",
      body: JSON.stringify({ servings: Number(value) })
    });
    setAdjusted(data);
  }

  async function save(recipe) {
    const data = await api(`/recipes/${recipe._id}/favorite`, { method: "POST" });
    setNotice(data.favorite ? "Recipe saved to favorites." : "Recipe removed from favorites.");
  }

  async function addShopping(recipe) {
    await api(`/dashboard/shopping-list/from-recipe/${recipe._id}`, { method: "POST" });
    setNotice("Ingredients added to shopping list.");
  }

  async function findPantry(e) {
    e.preventDefault();
    const ingredients = pantry.split(",").map((item) => item.trim()).filter(Boolean);
    const data = await api("/recipes/smart/pantry", { method: "POST", body: JSON.stringify({ ingredients }) });
    setMatches(data.matches);
  }

  return (
    <section className="workspace">
      <div className="pageHeader">
        <p className="eyebrow"><Utensils size={16} /> Recipe assistant</p>
        <h1>Search, save, adjust, and cook smarter</h1>
      </div>
      {notice && <p className="notice">{notice}</p>}
      <div className="toolsRow">
        <form className="inlineForm" onSubmit={searchRecipes}>
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search pasta, rice, soup..." />
          <button><Search size={17} /> Search</button>
        </form>
        <form className="inlineForm" onSubmit={findPantry}>
          <input value={pantry} onChange={(e) => setPantry(e.target.value)} placeholder="Pantry: rice, chicken, tomato" />
          <button><ShoppingBasket size={17} /> Match</button>
        </form>
      </div>
      <div className="recipeGrid">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe._id} recipe={recipe} onAdjust={openAdjust} onFavorite={save} onShopping={addShopping} />
        ))}
      </div>
      {adjusted && (
        <section className="panel">
          <div className="panelTitle"><SlidersHorizontal size={20} /><h2>Adjusted ingredients for {selected.title}</h2></div>
          <label className="servingControl">
            Servings
            <input type="number" min="1" value={servings} onChange={(e) => recalculate(e.target.value)} />
          </label>
          <div className="ingredientGrid">
            {adjusted.ingredients.map((item) => (
              <span key={item.name}>{item.quantity} {item.unit} {item.name}</span>
            ))}
          </div>
        </section>
      )}
      {matches.length > 0 && (
        <section className="panel">
          <div className="panelTitle"><ShoppingBasket size={20} /><h2>Pantry matches</h2></div>
          <div className="matchList">
            {matches.map((item) => (
              <article key={item.recipe._id}>
                <h3>{item.recipe.title}</h3>
                <p>{Math.round(item.score * 100)}% match</p>
                <small>Missing: {item.missing.join(", ") || "nothing major"}</small>
              </article>
            ))}
          </div>
        </section>
      )}
    </section>
  );
}
