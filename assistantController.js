function hasRealOpenAIKey() {
  const key = process.env.OPENAI_API_KEY || "";
  return key.startsWith("sk-") && !key.includes("your_openai_api_key");
}

function localChefReply(message) {
  const text = message.toLowerCase();

  if (text.includes("pizza") && (text.includes("cheese") || text.includes("without"))) {
    return [
      "Yes, you can make pizza without cheese. Try this:",
      "1. Spread pizza sauce or ketchup mixed with oregano/chilli flakes on the base.",
      "2. Add vegetables like onion, capsicum, tomato, sweet corn, olives, or mushrooms.",
      "3. For creaminess, use white sauce, mayonnaise, garlic sauce, yogurt sauce, or a little cream.",
      "4. For protein, add chicken tikka pieces, sausages, paneer, or boiled egg if you have them.",
      "5. Bake until the base is crisp and toppings are cooked. Finish with oregano and chilli flakes.",
      "Best no-cheese option: sauce + chicken/vegetables + white sauce drizzle."
    ].join("\n");
  }

  if (text.includes("salty") || text.includes("salt")) {
    return "If food is too salty, add unsalted liquid, potato, rice, pasta, lentils, cream, or yogurt slowly. Taste after every small addition.";
  }

  if (text.includes("spicy") || text.includes("chilli") || text.includes("mirchi")) {
    return "If food is too spicy, add yogurt, cream, coconut milk, tomato, potato, rice, or a little sugar. Serve with raita or bread.";
  }

  if (text.includes("burn") || text.includes("burnt")) {
    return "For burnt food, stop cooking, move the unburnt top part to a clean pan, and do not scrape the bottom. Add fresh sauce, cream, or herbs to balance the flavor.";
  }

  if (text.includes("dry")) {
    return "For dry food, add sauce, stock, cream, yogurt, butter, or a little oil. Cover and heat gently so it becomes moist again.";
  }

  if (text.includes("missing") || text.includes("substitute") || text.includes("replace")) {
    return "Tell me the missing ingredient and recipe name. Common swaps: cream = milk + butter, lemon = vinegar/yogurt, breadcrumbs = crushed crackers/oats, cheese = white sauce or mayo drizzle.";
  }

  return "Smart Chef tip: tell me the dish name and problem, such as 'too salty pasta', 'no cheese for pizza', or 'dry chicken', and I will give a quick rescue plan.";
}

export async function chatWithChef(req, res) {
  const { message } = req.body;

  if (!message || message.trim().length < 2) {
    return res.status(400).json({ message: "Ask Smart Chef a cooking question." });
  }

  if (!hasRealOpenAIKey()) {
    const reply = localChefReply(message);
    if (req.user) {
      req.user.history.unshift({ type: "chat", query: message, result: { reply } });
      req.user.history = req.user.history.slice(0, 30);
      await req.user.save();
    }
    return res.json({ reply, source: "smart-chef-local" });
  }

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are Smart Chef, a friendly cooking mistake fixer and recipe assistant. Give practical, safe, beginner-friendly kitchen advice in short steps."
        },
        { role: "user", content: message }
      ],
      temperature: 0.7
    })
  });

  if (!response.ok) {
    const reply = localChefReply(message);
    if (req.user) {
      req.user.history.unshift({ type: "chat", query: message, result: { reply } });
      req.user.history = req.user.history.slice(0, 30);
      await req.user.save();
    }
    return res.json({ reply, source: "smart-chef-local" });
  }

  const data = await response.json();
  const reply = data.choices?.[0]?.message?.content || "I could not prepare an answer right now.";

  if (req.user) {
    req.user.history.unshift({ type: "chat", query: message, result: { reply } });
    req.user.history = req.user.history.slice(0, 30);
    await req.user.save();
  }

  res.json({ reply });
}
