import React from "react";
import { Clock, Heart, Soup } from "lucide-react";

export default function RecipeCard({ recipe, onFavorite, onAdjust, onShopping }) {
  return (
    <article className="recipeCard">
      <img src={recipe.image} alt={recipe.title} />
      <div className="recipeBody">
        <div className="recipeMeta">
          <span><Soup size={15} /> {recipe.category}</span>
          <span><Clock size={15} /> {recipe.prepTime + recipe.cookTime} min</span>
        </div>
        <h3>{recipe.title}</h3>
        <p>{recipe.description}</p>
        <div className="tags">
          <span>{recipe.cuisine}</span>
          <span>{recipe.difficulty}</span>
          <span>{recipe.servings} servings</span>
        </div>
        <div className="cardActions">
          <button onClick={() => onAdjust(recipe)}>Adjust</button>
          <button onClick={() => onFavorite(recipe)}><Heart size={16} /> Save</button>
          {onShopping && <button onClick={() => onShopping(recipe)}>List</button>}
        </div>
      </div>
    </article>
  );
}
