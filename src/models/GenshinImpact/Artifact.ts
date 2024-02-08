import { ObjectId } from "mongodb";
import mongoose, { Schema } from "mongoose";

const ArtifactSchema = new Schema<GenshinImpact.Artifact>({
  _id: {
    type: ObjectId,
    required: false,
    default: new mongoose.Types.ObjectId(),
  },
  name: { type: String, required: true },
  type: { type: String, required: true },
  set: { type: String, required: true },
  setBonus: [
    {
      setName: { type: String, required: false },
      setValue: { type: String, required: false },
    },
  ],
  rarity: { type: [String], required: true },
  source: { type: String, required: true },
});

const Artifact =
  mongoose.models.artifacts || mongoose.model("artifacts", ArtifactSchema);

export default Artifact;
