import React, { useEffect, useMemo, useState } from "react";
import { CalendarDays, Check, Clock3, Heart, ListChecks, Plus } from "lucide-react";
import { api } from "../api/client";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();
  const [dashboard, setDashboard] = useState(null);
  const [meal, setMeal] = useState({ day: "Monday", meal: "Dinner", recipeTitle: "", notes: "" });
  const [item, setItem] = useState({ name: "", quantity: "" });
  const [minutes, setMinutes] = useState(10);
  const [secondsLeft, setSecondsLeft] = useState(0);

  async function load() {
    const data = await api("/dashboard");
    setDashboard(data);
  }

  useEffect(() => {
    load().catch(() => {});
  }, []);

  useEffect(() => {
    if (!secondsLeft) return;
    const timer = setTimeout(() => setSecondsLeft((value) => Math.max(value - 1, 0)), 1000);
    return () => clearTimeout(timer);
  }, [secondsLeft]);

  const timerText = useMemo(() => {
    const mins = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
    const secs = String(secondsLeft % 60).padStart(2, "0");
    return `${mins}:${secs}`;
  }, [secondsLeft]);

  async function addMeal(e) {
    e.preventDefault();
    await api("/dashboard/meal-plan", { method: "POST", body: JSON.stringify(meal) });
    setMeal({ ...meal, recipeTitle: "", notes: "" });
    load();
  }

  async function addItem(e) {
    e.preventDefault();
    await api("/dashboard/shopping-list", { method: "POST", body: JSON.stringify(item) });
    setItem({ name: "", quantity: "" });
    load();
  }

  async function toggleItem(id) {
    await api(`/dashboard/shopping-list/${id}`, { method: "PATCH" });
    load();
  }

  return (
    <section className="workspace">
      <div className="pageHeader">
        <p className="eyebrow"><ListChecks size={16} /> Personal dashboard</p>
        <h1>Hello, {user?.name || "Chef"}</h1>
      </div>
      <div className="dashboardGrid">
        <section className="panel">
          <div className="panelTitle"><Heart size={20} /><h2>Favorite recipes</h2></div>
          <div className="compactList">
            {dashboard?.favorites?.length ? dashboard.favorites.map((recipe) => <p key={recipe._id}>{recipe.title}</p>) : <p className="muted">No favorites yet.</p>}
          </div>
        </section>
        <section className="panel">
          <div className="panelTitle"><Clock3 size={20} /><h2>Recent activity</h2></div>
          <div className="compactList">
            {dashboard?.history?.length ? dashboard.history.map((entry) => <p key={entry._id}><b>{entry.type}</b>: {entry.query}</p>) : <p className="muted">No history yet.</p>}
          </div>
        </section>
        <section className="panel">
          <div className="panelTitle"><CalendarDays size={20} /><h2>Meal planner</h2></div>
          <form className="miniForm" onSubmit={addMeal}>
            <input value={meal.day} onChange={(e) => setMeal({ ...meal, day: e.target.value })} placeholder="Day" />
            <input value={meal.meal} onChange={(e) => setMeal({ ...meal, meal: e.target.value })} placeholder="Meal" />
            <input value={meal.recipeTitle} onChange={(e) => setMeal({ ...meal, recipeTitle: e.target.value })} placeholder="Recipe title" />
            <button><Plus size={16} /> Add</button>
          </form>
          <div className="compactList">{dashboard?.mealPlan?.map((plan) => <p key={plan._id}>{plan.day} {plan.meal}: {plan.recipeTitle}</p>)}</div>
        </section>
        <section className="panel">
          <div className="panelTitle"><ListChecks size={20} /><h2>Shopping list</h2></div>
          <form className="miniForm" onSubmit={addItem}>
            <input value={item.name} onChange={(e) => setItem({ ...item, name: e.target.value })} placeholder="Ingredient" />
            <input value={item.quantity} onChange={(e) => setItem({ ...item, quantity: e.target.value })} placeholder="Quantity" />
            <button><Plus size={16} /> Add</button>
          </form>
          <div className="compactList">
            {dashboard?.shoppingList?.map((listItem) => (
              <button className={listItem.checked ? "checkedItem" : "listItem"} key={listItem._id} onClick={() => toggleItem(listItem._id)}>
                <Check size={15} /> {listItem.quantity} {listItem.name}
              </button>
            ))}
          </div>
        </section>
        <section className="panel timerPanel">
          <div className="panelTitle"><Clock3 size={20} /><h2>Kitchen timer</h2></div>
          <strong>{timerText}</strong>
          <div className="timerControls">
            <input type="number" min="1" value={minutes} onChange={(e) => setMinutes(e.target.value)} />
            <button onClick={() => setSecondsLeft(Number(minutes) * 60)}>Start</button>
            <button onClick={() => setSecondsLeft(0)}>Reset</button>
          </div>
        </section>
      </div>
    </section>
  );
}
