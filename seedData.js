import "dotenv/config";
import { connectDB } from "../config/db.js";
import Recipe from "../models/Recipe.js";
import MistakeSolution from "../models/MistakeSolution.js";

const recipes = [
  {
    title: "Creamy Tomato Pasta",
    description: "A quick beginner-friendly pasta with tomato, cream, and herbs.",
    category: "Main Course",
    cuisine: "Italian",
    prepTime: 10,
    cookTime: 20,
    difficulty: "Easy",
    servings: 2,
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=1200&q=80",
    ingredients: [
      { name: "pasta", quantity: 200, unit: "g" },
      { name: "tomato puree", quantity: 1, unit: "cup" },
      { name: "cream", quantity: 0.5, unit: "cup" },
      { name: "garlic", quantity: 2, unit: "cloves" },
      { name: "olive oil", quantity: 1, unit: "tbsp" }
    ],
    steps: ["Boil pasta until almost done.", "Cook garlic in oil.", "Add tomato puree and simmer.", "Add cream and pasta.", "Season and serve."],
    tags: ["quick", "vegetarian", "comfort"],
    nutrition: { calories: 520, protein: "14g", carbs: "76g", fat: "18g" }
  },
  {
    title: "Chicken Vegetable Rice",
    description: "Balanced rice with chicken, vegetables, and gentle spices.",
    category: "Main Course",
    cuisine: "Pakistani",
    prepTime: 15,
    cookTime: 30,
    difficulty: "Medium",
    servings: 4,
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=1200&q=80",
    ingredients: [
      { name: "rice", quantity: 2, unit: "cups" },
      { name: "chicken", quantity: 500, unit: "g" },
      { name: "mixed vegetables", quantity: 1.5, unit: "cups" },
      { name: "onion", quantity: 1, unit: "large" },
      { name: "yogurt", quantity: 0.5, unit: "cup" }
    ],
    steps: ["Soak rice.", "Cook onion and chicken.", "Add vegetables and yogurt.", "Add rice and water.", "Steam until fluffy."],
    tags: ["rice", "family", "meal prep"],
    nutrition: { calories: 610, protein: "32g", carbs: "84g", fat: "14g" }
  },
  {
    title: "Spiced Lentil Soup",
    description: "Soft, warm soup that is easy to rescue if too thick or too salty.",
    category: "Appetizer",
    cuisine: "Desi",
    prepTime: 8,
    cookTime: 25,
    difficulty: "Easy",
    servings: 3,
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=80",
    ingredients: [
      { name: "red lentils", quantity: 1, unit: "cup" },
      { name: "water", quantity: 4, unit: "cups" },
      { name: "tomato", quantity: 1, unit: "medium" },
      { name: "cumin", quantity: 1, unit: "tsp" },
      { name: "lemon", quantity: 0.5, unit: "piece" }
    ],
    steps: ["Wash lentils.", "Boil with tomato and spices.", "Blend lightly.", "Adjust thickness.", "Finish with lemon."],
    tags: ["healthy", "budget", "beginner"],
    nutrition: { calories: 280, protein: "16g", carbs: "44g", fat: "4g" }
  },
  {
    title: "Loaded Garlic Bread Bites",
    description: "Crispy appetizer bites with garlic butter, herbs, and vegetables.",
    category: "Appetizer",
    cuisine: "Italian",
    prepTime: 8,
    cookTime: 10,
    difficulty: "Easy",
    servings: 4,
    image: "https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?auto=format&fit=crop&w=1200&q=80",
    ingredients: [
      { name: "bread slices", quantity: 6, unit: "pieces" },
      { name: "butter", quantity: 3, unit: "tbsp" },
      { name: "garlic", quantity: 3, unit: "cloves" },
      { name: "capsicum", quantity: 0.5, unit: "cup" },
      { name: "oregano", quantity: 1, unit: "tsp" }
    ],
    steps: ["Mix butter, garlic, and oregano.", "Spread on bread.", "Top with capsicum.", "Bake until crisp.", "Serve hot."],
    tags: ["starter", "quick", "party"],
    nutrition: { calories: 220, protein: "5g", carbs: "28g", fat: "10g" }
  },
  {
    title: "Chicken Corn Soup",
    description: "Comforting soup with shredded chicken, corn, egg, and black pepper.",
    category: "Appetizer",
    cuisine: "Chinese",
    prepTime: 10,
    cookTime: 22,
    difficulty: "Easy",
    servings: 4,
    image: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=1200&q=80",
    ingredients: [
      { name: "chicken", quantity: 250, unit: "g" },
      { name: "sweet corn", quantity: 1, unit: "cup" },
      { name: "egg", quantity: 1, unit: "piece" },
      { name: "corn flour", quantity: 2, unit: "tbsp" },
      { name: "black pepper", quantity: 1, unit: "tsp" }
    ],
    steps: ["Boil chicken and shred it.", "Add corn to stock.", "Thicken with corn flour slurry.", "Pour beaten egg slowly.", "Season and serve."],
    tags: ["soup", "winter", "starter"],
    nutrition: { calories: 260, protein: "21g", carbs: "22g", fat: "8g" }
  },
  {
    title: "Crispy Potato Cutlets",
    description: "Golden potato cutlets with spices, breadcrumbs, and chutney.",
    category: "Appetizer",
    cuisine: "Pakistani",
    prepTime: 18,
    cookTime: 15,
    difficulty: "Medium",
    servings: 5,
    image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=1200&q=80",
    ingredients: [
      { name: "potatoes", quantity: 4, unit: "medium" },
      { name: "breadcrumbs", quantity: 1, unit: "cup" },
      { name: "egg", quantity: 1, unit: "piece" },
      { name: "green chilli", quantity: 2, unit: "pieces" },
      { name: "coriander", quantity: 0.25, unit: "cup" }
    ],
    steps: ["Mash boiled potatoes.", "Mix spices and herbs.", "Shape cutlets.", "Coat with egg and breadcrumbs.", "Fry until golden."],
    tags: ["snack", "tea time", "fried"],
    nutrition: { calories: 310, protein: "7g", carbs: "46g", fat: "11g" }
  },
  {
    title: "Fresh Chickpea Salad",
    description: "A bright appetizer with chickpeas, cucumber, tomato, lemon, and herbs.",
    category: "Appetizer",
    cuisine: "Mediterranean",
    prepTime: 12,
    cookTime: 0,
    difficulty: "Easy",
    servings: 3,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=80",
    ingredients: [
      { name: "chickpeas", quantity: 1.5, unit: "cups" },
      { name: "cucumber", quantity: 1, unit: "medium" },
      { name: "tomato", quantity: 1, unit: "medium" },
      { name: "lemon juice", quantity: 2, unit: "tbsp" },
      { name: "olive oil", quantity: 1, unit: "tbsp" }
    ],
    steps: ["Chop vegetables.", "Mix with chickpeas.", "Add lemon and oil.", "Season with salt and pepper.", "Chill before serving."],
    tags: ["healthy", "fresh", "no cook"],
    nutrition: { calories: 240, protein: "10g", carbs: "32g", fat: "8g" }
  },
  {
    title: "No Cheese Veggie Pizza",
    description: "Pizza with tomato sauce, vegetables, and creamy white sauce instead of cheese.",
    category: "Main Course",
    cuisine: "Italian",
    prepTime: 20,
    cookTime: 18,
    difficulty: "Medium",
    servings: 2,
    image: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=1200&q=80",
    ingredients: [
      { name: "pizza base", quantity: 1, unit: "piece" },
      { name: "pizza sauce", quantity: 0.5, unit: "cup" },
      { name: "capsicum", quantity: 0.5, unit: "cup" },
      { name: "onion", quantity: 0.5, unit: "cup" },
      { name: "white sauce", quantity: 0.33, unit: "cup" }
    ],
    steps: ["Spread sauce on base.", "Add vegetables.", "Drizzle white sauce.", "Bake until crisp.", "Sprinkle oregano."],
    tags: ["pizza", "no cheese", "vegetarian"],
    nutrition: { calories: 430, protein: "11g", carbs: "62g", fat: "15g" }
  },
  {
    title: "Chicken Tikka Wrap",
    description: "Soft wrap filled with spicy chicken, salad, and garlic sauce.",
    category: "Main Course",
    cuisine: "Pakistani",
    prepTime: 15,
    cookTime: 20,
    difficulty: "Medium",
    servings: 3,
    image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=1200&q=80",
    ingredients: [
      { name: "chicken", quantity: 450, unit: "g" },
      { name: "tortilla", quantity: 3, unit: "pieces" },
      { name: "yogurt", quantity: 0.5, unit: "cup" },
      { name: "lettuce", quantity: 1, unit: "cup" },
      { name: "garlic sauce", quantity: 3, unit: "tbsp" }
    ],
    steps: ["Marinate chicken.", "Cook until tender.", "Warm tortillas.", "Fill with salad and chicken.", "Roll tightly."],
    tags: ["wrap", "lunch", "spicy"],
    nutrition: { calories: 540, protein: "35g", carbs: "52g", fat: "19g" }
  },
  {
    title: "Vegetable Fried Rice",
    description: "Quick rice with vegetables, egg, soy sauce, and pepper.",
    category: "Main Course",
    cuisine: "Chinese",
    prepTime: 12,
    cookTime: 15,
    difficulty: "Easy",
    servings: 3,
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=1200&q=80",
    ingredients: [
      { name: "cooked rice", quantity: 3, unit: "cups" },
      { name: "mixed vegetables", quantity: 1, unit: "cup" },
      { name: "egg", quantity: 2, unit: "pieces" },
      { name: "soy sauce", quantity: 2, unit: "tbsp" },
      { name: "spring onion", quantity: 0.25, unit: "cup" }
    ],
    steps: ["Scramble eggs.", "Stir fry vegetables.", "Add rice and soy sauce.", "Mix on high heat.", "Finish with spring onion."],
    tags: ["rice", "quick", "budget"],
    nutrition: { calories: 480, protein: "16g", carbs: "72g", fat: "13g" }
  },
  {
    title: "Chocolate Mug Cake",
    description: "Fast dessert cake made in a mug with cocoa and milk.",
    category: "Dessert",
    cuisine: "American",
    prepTime: 5,
    cookTime: 2,
    difficulty: "Easy",
    servings: 1,
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=1200&q=80",
    ingredients: [
      { name: "flour", quantity: 4, unit: "tbsp" },
      { name: "cocoa powder", quantity: 2, unit: "tbsp" },
      { name: "sugar", quantity: 2, unit: "tbsp" },
      { name: "milk", quantity: 4, unit: "tbsp" },
      { name: "oil", quantity: 1, unit: "tbsp" }
    ],
    steps: ["Mix dry ingredients in a mug.", "Add milk and oil.", "Stir until smooth.", "Microwave until set.", "Rest for one minute."],
    tags: ["dessert", "quick", "chocolate"],
    nutrition: { calories: 390, protein: "6g", carbs: "58g", fat: "15g" }
  },
  {
    title: "Classic Kheer",
    description: "Creamy rice pudding with milk, sugar, cardamom, and nuts.",
    category: "Dessert",
    cuisine: "Pakistani",
    prepTime: 10,
    cookTime: 45,
    difficulty: "Medium",
    servings: 5,
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=1200&q=80",
    ingredients: [
      { name: "milk", quantity: 1, unit: "liter" },
      { name: "rice", quantity: 0.25, unit: "cup" },
      { name: "sugar", quantity: 0.5, unit: "cup" },
      { name: "cardamom", quantity: 3, unit: "pieces" },
      { name: "almonds", quantity: 2, unit: "tbsp" }
    ],
    steps: ["Wash rice.", "Simmer milk and rice.", "Stir often.", "Add sugar and cardamom.", "Garnish with nuts."],
    tags: ["traditional", "milk", "sweet"],
    nutrition: { calories: 330, protein: "10g", carbs: "49g", fat: "10g" }
  },
  {
    title: "Fruit Custard",
    description: "Chilled custard mixed with seasonal fruits.",
    category: "Dessert",
    cuisine: "Continental",
    prepTime: 15,
    cookTime: 8,
    difficulty: "Easy",
    servings: 4,
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=1200&q=80",
    ingredients: [
      { name: "milk", quantity: 3, unit: "cups" },
      { name: "custard powder", quantity: 3, unit: "tbsp" },
      { name: "sugar", quantity: 4, unit: "tbsp" },
      { name: "banana", quantity: 2, unit: "pieces" },
      { name: "apple", quantity: 1, unit: "piece" }
    ],
    steps: ["Cook milk with custard powder.", "Add sugar.", "Cool completely.", "Add chopped fruits.", "Chill before serving."],
    tags: ["fruit", "chilled", "easy"],
    nutrition: { calories: 280, protein: "8g", carbs: "50g", fat: "5g" }
  },
  {
    title: "Caramel Bread Pudding",
    description: "Soft baked pudding using bread, milk, eggs, and caramel.",
    category: "Dessert",
    cuisine: "British",
    prepTime: 15,
    cookTime: 35,
    difficulty: "Medium",
    servings: 6,
    image: "https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81?auto=format&fit=crop&w=1200&q=80",
    ingredients: [
      { name: "bread slices", quantity: 6, unit: "pieces" },
      { name: "milk", quantity: 2, unit: "cups" },
      { name: "eggs", quantity: 2, unit: "pieces" },
      { name: "sugar", quantity: 0.75, unit: "cup" },
      { name: "vanilla essence", quantity: 1, unit: "tsp" }
    ],
    steps: ["Make caramel with sugar.", "Blend bread, milk, eggs, and vanilla.", "Pour over caramel.", "Bake in water bath.", "Cool and unmold."],
    tags: ["baked", "sweet", "comfort"],
    nutrition: { calories: 360, protein: "9g", carbs: "58g", fat: "10g" }
  },
  {
    title: "Mango Cream Cups",
    description: "No-bake mango dessert with cream, biscuits, and fresh mango.",
    category: "Dessert",
    cuisine: "Pakistani",
    prepTime: 12,
    cookTime: 0,
    difficulty: "Easy",
    servings: 4,
    image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=1200&q=80",
    ingredients: [
      { name: "mango", quantity: 2, unit: "cups" },
      { name: "cream", quantity: 1, unit: "cup" },
      { name: "condensed milk", quantity: 0.25, unit: "cup" },
      { name: "biscuits", quantity: 8, unit: "pieces" },
      { name: "almonds", quantity: 2, unit: "tbsp" }
    ],
    steps: ["Crush biscuits.", "Mix cream and condensed milk.", "Layer biscuits, mango, and cream.", "Top with almonds.", "Chill before serving."],
    tags: ["no bake", "mango", "summer"],
    nutrition: { calories: 410, protein: "6g", carbs: "52g", fat: "20g" }
  }
];

const mistakes = [
  {
    issue: "Too salty",
    keywords: ["salty", "salt", "namak", "too much salt"],
    cause: "Salt was added too early, measured incorrectly, or concentrated while cooking.",
    urgency: "high",
    fixes: ["Dilute with unsalted liquid.", "Add potato, rice, pasta, or lentils.", "Add cream, yogurt, or butter if it suits the dish."],
    prevention: ["Taste before adding more salt.", "Use low-salt stock and sauces."]
  },
  {
    issue: "Too spicy",
    keywords: ["spicy", "chilli", "chili", "hot", "mirchi"],
    cause: "Chilli quantity is stronger than the base of the dish.",
    urgency: "medium",
    fixes: ["Add dairy such as yogurt or cream.", "Add tomato, coconut milk, or more gravy.", "Serve with rice, bread, or cucumber raita."],
    prevention: ["Add chilli gradually.", "Remove chilli seeds for less heat."]
  },
  {
    issue: "Overcooked",
    keywords: ["overcooked", "burnt", "dry", "mushy"],
    cause: "The food cooked too long or at too high a temperature.",
    urgency: "high",
    fixes: ["Remove from heat immediately.", "For dry meat, slice and coat with sauce.", "For mushy vegetables, turn them into soup, mash, or filling."],
    prevention: ["Use timers.", "Check texture before the final cooking time."]
  }
];

await connectDB();
await Recipe.deleteMany({});
await MistakeSolution.deleteMany({});
await Recipe.insertMany(recipes);
await MistakeSolution.insertMany(mistakes);
console.log("SMART CHEF sample recipes and mistake fixes inserted.");
process.exit(0);
