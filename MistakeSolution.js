import mongoose from "mongoose";

const mistakeSolutionSchema = new mongoose.Schema(
  {
    issue: { type: String, required: true },
    keywords: [{ type: String, lowercase: true }],
    cause: String,
    urgency: { type: String, enum: ["low", "medium", "high"], default: "medium" },
    fixes: [String],
    prevention: [String]
  },
  { timestamps: true }
);

mistakeSolutionSchema.index({ issue: "text", keywords: "text", cause: "text" });

export default mongoose.model("MistakeSolution", mistakeSolutionSchema);
