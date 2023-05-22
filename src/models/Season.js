import mongoose from "mongoose"

const seasonSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }
  },
  {
    timestamps: true
  }
)

const Season = mongoose.models?.Season || mongoose.model("Season", seasonSchema)
export default Season
