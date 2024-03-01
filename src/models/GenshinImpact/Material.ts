import { genshinConnection } from "@/lib/mongoose";
import { Schema } from "mongoose";

const MaterialSchema = new Schema<GenshinImpact.Material>(
  {
    name: { type: String, required: true, unique: true },
    typeMaterial: { type: String, required: true },
    rarity: { type: String, required: false },
    lore: { type: String, rerquired: true },
    gainedFrom: { type: [String], requried: false },
    image: { type: String, required: false },
  },
  { timestamps: true, strict: false }
);

export const IDMaterial = genshinConnection.models.id_material || genshinConnection.model("id_material", MaterialSchema);
export const ENMaterial = genshinConnection.models.en_material || genshinConnection.model("en_material", MaterialSchema);
