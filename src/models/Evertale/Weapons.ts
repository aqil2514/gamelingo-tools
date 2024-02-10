import { evertaleConnection } from "@/lib/mongoose";
import mongoose, { Schema, SchemaType } from "mongoose";

const WeaponModels = new Schema<Evertale.Weapon.State>(
  {
    weapImage: {
      png: { type: String, required: true },
      webp: { type: String, required: true },
    },
    weapName: { type: String, required: true },
    weapLore: {
      loreEn: { type: String, required: true },
      loreId: { type: String, required: true },
    },
    weapRank: { type: String, enum: ["SSR", "SR", "R", "N"], required: true },
    weapType: { type: String, enum: ["Sword", "Axe", "Staff", "Mace", "GreatSword", "GreatAxe", "Spear", "Hammer", "Katana"], required: true },
    weapAscend: {
      noAscend: {
        weapSkill: {
          skillEn: { type: String, required: false },
          skillId: { type: String, required: false },
        },
        status: {
          power: { type: Number, required: false },
          hp: { type: Number, required: false },
          atk: { type: Number, required: false },
          level: { type: Number, required: false },
          boost: { type: Number, required: false },
          potential: { type: Number, required: false },
          cost: { type: Number, required: false },
        },
      },
      ascend1: {
        weapSkill: {
          skillEn: { type: String, required: false },
          skillId: { type: String, required: false },
        },
        status: {
          power: { type: Number, required: false },
          hp: { type: Number, required: false },
          atk: { type: Number, required: false },
          level: { type: Number, required: false },
          boost: { type: Number, required: false },
          potential: { type: Number, required: false },
          cost: { type: Number, required: false },
        },
      },
      fullAscend: {
        weapSkill: {
          skillEn: { type: String, required: false },
          skillId: { type: String, required: false },
        },
        status: {
          power: { type: Number, required: false },
          hp: { type: Number, required: false },
          atk: { type: Number, required: false },
          level: { type: Number, required: false },
          boost: { type: Number, required: false },
          potential: { type: Number, required: false },
          cost: { type: Number, required: false },
        },
      },
    },

    weapMax: {
      status: {
        power: { type: Number, required: false },
        hp: { type: Number, required: false },
        atk: { type: Number, required: false },
        level: { type: Number, required: false },
        boost: { type: Number, required: false },
        potential: { type: Number, required: false },
      },
    },
  },
  { timestamps: true }
);

export const Weapon = evertaleConnection.models.Weapon || evertaleConnection.model("Weapon", WeaponModels);
