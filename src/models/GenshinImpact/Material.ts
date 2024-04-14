import { genshinConnection } from "@/lib/mongoose";
import { Schema } from "mongoose";

const MaterialSubLangSchema = new Schema<GenshinImpact.MaterialSubLang>({
  typeMaterial: { type: String, required: true },
  rarity: { type: String, required: false },
  lore: { type: String, rerquired: true },
  gainedFrom: { type: [String], requried: false },
});

const MaterialSchema = new Schema<GenshinImpact.Material>(
  {
    name: { type: String, required: true, unique: true },
    en: { type: MaterialSubLangSchema, required: false },
    id: { type: MaterialSubLangSchema, required: false },
    image: { type: String, required: false },
  },
  { timestamps: true, strict: false }
);

const GenshinMaterial =
  genshinConnection.models.material_v1 ||
  genshinConnection.model("material_v1", MaterialSchema);

export default GenshinMaterial;
