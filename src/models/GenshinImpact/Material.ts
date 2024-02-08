import { ObjectId } from "mongodb";
import mongoose, { Schema } from "mongoose";

const MaterialSchema = new Schema<GenshinImpact.Material>({
  _id: {
    type: ObjectId,
    required: false,
    default: new mongoose.Types.ObjectId(),
  },
  name: { type: String, required: true },
  typeMaterial: { type: String, required: true },
  rarity: { type: String, required: true },
  lore: { type: String, rerquired: true },
  gainedFrom: { type: [String], requried: false },
  image: { type: String, required: false },
});

const Material =
  mongoose.models.materials || mongoose.model("materials", MaterialSchema);

export default Material;
