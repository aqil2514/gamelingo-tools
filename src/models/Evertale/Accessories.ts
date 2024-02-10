import { evertaleConnection } from "@/lib/mongoose";
import { ObjectId } from "mongodb";
import mongoose, { Schema } from "mongoose";

export interface AccessoriesState {
  _id: ObjectId;
  accName: string;
  accImage: {
    webp: string;
    png: string;
  };
  accLore: string;
  accRank: "SSR" | "SR" | "R" | "N";
  accStatus: {
    power: number;
    hp: number;
    atk: number;
    speed: number;
  };
}

const AccessoriesSchema = new Schema<AccessoriesState>({
  _id: Schema.Types.ObjectId,
  accName: { type: String, required: true },
  accImage: {
    webp: { type: String, required: true },
    png: { type: String, required: true },
  },
  accLore: { type: String, required: true },
  accRank: { type: String, enum: ["SSR", "SR", "R", "N"], required: true },
  accStatus: {
    power: { type: Number, required: true },
    hp: { type: Number, required: true },
    atk: { type: Number, required: true },
    speed: { type: Number, required: true },
  },
});

export const Accessory = evertaleConnection.models.Accessories || evertaleConnection.model("Accessories", AccessoriesSchema);
