import { ObjectId } from "mongodb";
import mongoose, { Schema, SchemaType } from "mongoose";

export interface WeaponState {
  _id: ObjectId;
  weapImage: { png: string; webp: string };
  weapName: string;
  weapLore: string;
  weapRank: "SSR" | "SR" | "R" | "N";
  weapType: "Sword" | "Axe" | "Staff" | "Mace" | "GreatSword" | "GreatAxe" | "Spear" | "Hammer" | "Katana";
  weapSkill: {
    asc1: string;
    asc2?: string;
    asc3?: string;
  };
}

const WeaponModels = new Schema<WeaponState>({
  _id: Schema.Types.ObjectId,
  weapImage: {
    png: { type: String, required: true },
    webp: { type: String, required: true },
  },
  weapName: { type: String, required: true },
  weapLore: { type: String, required: true },
  weapRank: { type: String, enum: ["SSR" || "SR" || "R" || "N"], required: true },
  weapType: { type: String, enum: ["Sword" || "Axe" || "Staff" || "Mace" || "GreatSword" || "GreatAxe" || "Spear" || "Hammer" || "Katana"], required: true },
  weapSkill: {
    asc1: { type: String, required: true },
    asc2: { type: String, required: false },
    asc3: { type: String, required: false },
  },
});

export const Weapon = mongoose.models.Weapon || mongoose.model("Weapon", WeaponModels);
