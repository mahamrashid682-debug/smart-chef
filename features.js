import {
  Bot,
  CalendarDays,
  ChefHat,
  Heart,
  ListChecks,
  LogIn,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Timer,
  Utensils
} from "lucide-react";

export const features = [
  { icon: ChefHat, title: "Cooking Mistake Fixer", text: "Instant fixes for too salty, too spicy, burnt, dry, mushy, and overcooked food." },
  { icon: Search, title: "Recipe Search", text: "Search recipes by name, category, cuisine, tags, and difficulty." },
  { icon: SlidersHorizontal, title: "Serving Adjustment", text: "Automatically recalculates ingredient quantities for any serving size." },
  { icon: Bot, title: "OpenAI Chef Chatbot", text: "Ask cooking questions and get practical step-by-step help." },
  { icon: LogIn, title: "Login, Signup, Google Sign-In", text: "Secure account flow with JWT, Google login, and regex validation." },
  { icon: ShieldCheck, title: "Regex Form Validation", text: "Name, email, and password are checked clearly before submission." },
  { icon: Heart, title: "Favorites", text: "Save recipes to your dashboard for quick access later." },
  { icon: ListChecks, title: "Cooking History", text: "Stores previous searches, mistake fixes, pantry checks, and chat questions." },
  { icon: Utensils, title: "Pantry Suggestions", text: "Enter available ingredients and find recipes you can cook now." },
  { icon: Sparkles, title: "Smart Substitution Ideas", text: "Offers rescue-style alternatives for missing ingredients and taste balancing." },
  { icon: CalendarDays, title: "Meal Planner", text: "Plan breakfast, lunch, dinner, or snacks by day." },
  { icon: Timer, title: "Kitchen Timers", text: "Use quick timers while cooking to avoid overcooking." }
];
