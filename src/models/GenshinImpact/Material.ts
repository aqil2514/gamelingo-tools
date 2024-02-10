import { genshinConnection } from "@/lib/mongoose";
import { ObjectId } from "mongodb";
import mongoose, { Schema } from "mongoose";

const MaterialSchema = new Schema<GenshinImpact.Material>({
  name: { type: String, required: true },
  typeMaterial: { type: String, required: true },
  rarity: { type: String, required: true },
  lore: { type: String, rerquired: true },
  gainedFrom: { type: [String], requried: false },
  image: { type: String, required: false },
});

const Material =
  genshinConnection.models.materials || genshinConnection.model("materials", MaterialSchema);

export default Material;
