import mongoose, { Schema } from "mongoose";
import { genshinConnection } from "@/lib/mongoose";
import Talentfrom from "./Talent";
import GenshinWeapon from "./Weapon";
import GenshinArtifact from "./Artifact";
import GenshinTalent from "./Talent";
import GenshinConstellation from "./Constellation";

const SubSchema = new Schema(
  {
    description: { type: String, required: true },
    ascendStatus: { type: String, required: true },
    ascendMaterial: { type: Object, required: false },
    rarity: { type: String, required: true },
    element: {
      type: String,
      enum: ["Cryo", "Pyro", "Dendro", "Geo", "Hydro", "Anemo", "Electro"],
      required: true,
    },
    weapon: {
      type: String,
      enum: ["Sword", "Polearm", "Claymore", "Bow", "Catalyst"],
      required: true,
    },
    gender: { type: String, required: true },
    region: { type: String, required: true },
    cv: {
      english: String,
      chinese: String,
      japanese: String,
      korean: String,
    },
    build: {
      weapon: {
        type: String,
        required: false,
        ref: GenshinWeapon,
      },
      substitude: {
        type: [String],
        required: false,
        ref: GenshinWeapon,
      },
      bestArtifact: {
        type: String,
        required: false,
        ref: GenshinArtifact,
      },
    },
    artifactStatus: { type: [String], required: false },
    prioritySubStat: { type: [String], required: false },
    team: {
      type: [String],
      required: false,
    },
    talent: {
      type: String,
      ref: GenshinTalent,
    },
    constellation: {
      type: String,
      required: false,
      ref: GenshinConstellation,
    },
  },
  { _id: false }
);

const CharacterSchema = new Schema<GenshinImpact.Character>(
  {
    name: { type: String, required: true, unique: true },
    en: {type: SubSchema, required:false},
    id: {type: SubSchema, required:false},
    image: {
      cover: { type: String, required: true },
      portrait: { type: String, required: true },
    },
  },
  { timestamps: true, strict: false }
);

const GenshinCharacter =
  genshinConnection.models.character_v1 ||
  genshinConnection.model("character_v1", CharacterSchema);

export default GenshinCharacter;
