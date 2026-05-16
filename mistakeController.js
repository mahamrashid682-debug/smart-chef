import MistakeSolution from "../models/MistakeSolution.js";

const fallbackSolutions = [
  {
    issue: "Too salty",
    keywords: ["salty", "salt", "too much salt"],
    cause: "Salt level became higher than the liquid, starch, or fat can balance.",
    urgency: "high",
    fixes: [
      "Add unsalted liquid such as water, milk, stock, or coconut milk in small amounts.",
      "Add potatoes, rice, pasta, or lentils to absorb and dilute salt.",
      "Balance with cream, yogurt, butter, or a little acid if the recipe allows it."
    ],
    prevention: ["Add salt slowly.", "Taste before adding salty sauces or stock cubes."]
  },
  {
    issue: "Too spicy",
    keywords: ["spicy", "chilli", "chili", "hot", "mirchi"],
    cause: "The dish has too much heat from chilli, pepper, or spicy masala.",
    urgency: "medium",
    fixes: [
      "Add dairy such as yogurt, cream, milk, or cheese.",
      "Add sweetness with a small amount of sugar, honey, or tomato paste.",
      "Increase the base with more vegetables, rice, pasta, or plain gravy."
    ],
    prevention: ["Start with half the chilli.", "Keep seeds out when using fresh chillies."]
  }
];

function scoreSolution(solution, text) {
  const words = text.toLowerCase();
  return solution.keywords.reduce((score, key) => score + (words.includes(key) ? 1 : 0), 0);
}

export async function fixMistake(req, res) {
  const { problem = "" } = req.body;
  if (problem.trim().length < 3) {
    return res.status(400).json({ message: "Describe the cooking problem in at least 3 characters." });
  }

  const dbSolutions = await MistakeSolution.find({});
  const pool = dbSolutions.length ? dbSolutions : fallbackSolutions;
  const ranked = pool
    .map((solution) => ({ solution, score: scoreSolution(solution, problem) }))
    .sort((a, b) => b.score - a.score);

  const best = ranked[0]?.score > 0 ? ranked[0].solution : {
    issue: "General cooking rescue",
    cause: "The issue needs balancing through dilution, texture control, or flavor correction.",
    urgency: "medium",
    fixes: [
      "Lower the heat and stop cooking for a minute so the dish does not get worse.",
      "Taste a small spoon and decide if it needs dilution, fat, acid, sweetness, or freshness.",
      "Add corrective ingredients slowly, then taste again before adding more."
    ],
    prevention: ["Measure strong ingredients.", "Taste at each major cooking step."]
  };

  if (req.user) {
    req.user.history.unshift({ type: "mistake", query: problem, result: best });
    req.user.history = req.user.history.slice(0, 30);
    await req.user.save();
  }

  res.json({ solution: best });
}
