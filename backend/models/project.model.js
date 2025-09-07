import mongoose from "mongoose"

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 200 },
    description: { type: String, trim: true, default: "" },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    sources: {
      type: [
        {
          name: { type: String, required: true },
          type: { type: String, enum: ["pdf", "docx"], required: true },
          size: { type: Number, required: true },
        },
      ],
      default: [],
      validate: {
        validator: (arr) => Array.isArray(arr) && arr.length <= 4,
        message: "A project can have at most 4 sources",
      },
    },
    summary: { type: String, default: "" },
    status: {
      type: String,
      enum: ["pending", "processing", "completed", "failed"],
      default: "pending",
      required: true,
      index: true,
    },
  },
  { timestamps: true }
)

projectSchema.virtual("sourceCount").get(function () {
  return this.sources?.length || 0
})

projectSchema.virtual("completedSources").get(function () {
  return this.sources?.filter((s) => s.status === "done").length || 0
})

const Project = mongoose.model("Project", projectSchema)

export default Project
