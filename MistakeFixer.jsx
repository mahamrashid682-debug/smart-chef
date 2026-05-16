import React, { useState } from "react";
import { AlertTriangle, CheckCircle2, Lightbulb } from "lucide-react";
import { api } from "../api/client";
import ChefChat from "../components/ChefChat";

const examples = ["too salty biryani", "curry is too spicy", "rice became mushy", "chicken is dry", "soup is too thick"];
const substitutions = [
  ["Cream", "milk + butter, yogurt, coconut milk"],
  ["Egg", "mashed banana, yogurt, flaxseed gel"],
  ["Lemon", "vinegar, tamarind, yogurt"],
  ["Fresh herbs", "dried herbs, green onion, coriander powder"],
  ["Breadcrumbs", "crushed crackers, oats, toasted flour"]
];

export default function MistakeFixer() {
  const [problem, setProblem] = useState("");
  const [solution, setSolution] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function fix(e) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const data = await api("/mistakes/fix", { method: "POST", body: JSON.stringify({ problem }) });
      setSolution(data.solution);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="workspace">
      <div className="pageHeader">
        <p className="eyebrow"><AlertTriangle size={16} /> Cooking mistake fixer</p>
        <h1>Tell Smart Chef what went wrong</h1>
      </div>
      <div className="twoColumn">
        <section className="panel">
          <form className="form" onSubmit={fix}>
            <label>
              Cooking problem
              <textarea value={problem} onChange={(e) => setProblem(e.target.value)} placeholder="Example: My curry is too salty and spicy..." />
            </label>
            <div className="chips">
              {examples.map((item) => <button type="button" key={item} onClick={() => setProblem(item)}>{item}</button>)}
            </div>
            {error && <p className="errorBox">{error}</p>}
            <button className="primaryButton wide" disabled={busy}>{busy ? "Finding fix..." : "Fix my dish"}</button>
          </form>
        </section>
        <section className="panel resultPanel">
          {solution ? (
            <>
              <div className="panelTitle"><CheckCircle2 size={21} /><h2>{solution.issue}</h2></div>
              <p className="muted">{solution.cause}</p>
              <h3>What to do now</h3>
              <ul className="cleanList">{solution.fixes.map((item) => <li key={item}>{item}</li>)}</ul>
              <h3>Next time</h3>
              <ul className="cleanList">{solution.prevention?.map((item) => <li key={item}>{item}</li>)}</ul>
            </>
          ) : (
            <div className="emptyState"><Lightbulb size={34} /><p>Your rescue plan will appear here.</p></div>
          )}
        </section>
      </div>
      <ChefChat />
      <section className="panel">
        <div className="panelTitle"><Lightbulb size={20} /><h2>Quick substitution ideas</h2></div>
        <div className="ingredientGrid">
          {substitutions.map(([missing, use]) => <span key={missing}><b>{missing}</b>: {use}</span>)}
        </div>
      </section>
    </section>
  );
}
