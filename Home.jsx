import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChefHat, Sparkles } from "lucide-react";
import FeatureGrid from "../components/FeatureGrid";

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="heroContent">
          <p className="eyebrow"><Sparkles size={16} /> Cooking rescue assistant</p>
          <h1>SMART CHEF - COOKING MISTAKE FIXER & RECIPE ASSISTANT</h1>
          <p>
            Fix salty, spicy, burnt, dry, or confusing dishes, search recipes, adjust servings,
            save favorites, plan meals, and ask the chef chatbot when cooking gets tricky.
          </p>
          <div className="heroActions">
            <Link className="primaryButton" to="/auth">Start Cooking <ArrowRight size={18} /></Link>
            <Link className="secondaryButton" to="/#features">View Features</Link>
          </div>
        </div>
        <div className="heroImage" aria-hidden="true">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWBsgXnKgyyRYTn3WAx7bzoMqCrkgXvt18YA&s" alt="" />
          <div className="rescueNote">
            <ChefHat size={22} />
            <span>Too salty? Add potato, cream, or unsalted liquid slowly.</span>
          </div>
        </div>
      </section>
      <FeatureGrid />
    </>
  );
}
