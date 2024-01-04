import { ObjectId } from "mongodb";
import mongoose, { Schema, SchemaType } from "mongoose";

export interface WeaponState {
  _id: ObjectId;
  weapImage: { png: string; webp: string };
  weapName: string;
  weapLore: string;
  weapRank: "SSR" | "SR" | "R" | "N";
  weapType: "Sword" | "Axe" | "Staff" | "Mace" | "GreatSword" | "GreatAxe" | "Spear" | "Hammer" | "Katana";
  weapAscend: [
    {
      noAscend: {
        weapSkill: string;
        status?: {
          power?: number;
          hp?: number;
          atk?: number;
          level?: number;
          boost?: number;
          potential?: number;
        };
      };
    },
    {
      ascend1?: {
        weapSkill?: string;
        status?: {
          power?: number;
          hp?: number;
          atk?: number;
          level?: number;
          boost?: number;
          potential?: number;
        };
      };
    },
    {
      fullAscend?: {
        weapSkill?: string;
        status?: {
          power?: number;
          hp?: number;
          atk?: number;
          level?: number;
          boost?: number;
          potential?: number;
        };
      };
    },
  ];
  weapMax?: {
    status?: {
      power?: number;
      hp?: number;
      atk?: number;
      level?: number;
      boost?: number;
      potential?: number;
    };
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
  weapAscend: [
    {
      noAscend: {
        weapSkill: { type: String, required: false },
        status: {
          power: { type: Number, required: false },
          hp: { type: Number, required: false },
          atk: { type: Number, required: false },
          level: { type: Number, required: false, default: 60 },
          boost: { type: Number, required: false, default: 0 },
          potential: { type: Number, required: false, default: 0 },
        },
      },
    },
    {
      ascend1: {
        weapSkill: { type: String, required: false },
        status: {
          power: { type: Number, required: false },
          hp: { type: Number, required: false },
          atk: { type: Number, required: false },
          level: { type: Number, required: false, default: 60 },
          boost: { type: Number, required: false, default: 0 },
          potential: { type: Number, required: false, default: 0 },
        },
      },
    },
    {
      fullAscend: {
        weapSkill: { type: String, required: false },
        status: {
          power: { type: Number, required: false },
          hp: { type: Number, required: false },
          atk: { type: Number, required: false },
          level: { type: Number, required: false, default: 60 },
          boost: { type: Number, required: false, default: 0 },
          potential: { type: Number, required: false, default: 0 },
        },
      },
    },
  ],
  weapMax: {
    status: {
      power: { type: Number, required: false },
      hp: { type: Number, required: false },
      atk: { type: Number, required: false },
      level: { type: Number, required: false, default: 200 },
      boost: { type: Number, required: false, default: 300 },
      potential: { type: Number, required: false, default: 100 },
    },
  },
});

export const Weapon = mongoose.models.Weapon || mongoose.model("Weapon", WeaponModels);
