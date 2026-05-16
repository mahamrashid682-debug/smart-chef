import mongoose from "mongoose";
import dns from "node:dns";

export async function connectDB() {
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is missing. Add your MongoDB Atlas connection string in backend/.env");
  }

  dns.setServers(["8.8.8.8", "1.1.1.1"]);
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("MongoDB Atlas connected");
}
