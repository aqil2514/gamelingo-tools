import { ObjectId } from "mongodb";
import mongoose, { Schema } from "mongoose";

const ArtifactSchema = new Schema<GenshinImpact.Artifact>({
  name: { type: String, required: true },
  type: { type: String, required: true },
  set: { type: String, required: true },
  setBonus: [
    {
      setName: { type: String, required: false },
      setValue: { type: String, required: false },
    },
  ],
  rarity: { type: String, required: true },
  source: { type: [String], required: true },
  image: { type: String, required: false },
});

const Artifact =
  mongoose.models.artifacts || mongoose.model("artifacts", ArtifactSchema);

export default Artifact;
