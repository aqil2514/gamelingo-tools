import mongoose, { Schema } from "mongoose";
import { genshinConnection } from "@/lib/mongoose";
import { TalentEN, TalentID } from "./Talent";
import { ConstellationEN, ConstellationID } from "./Constellation";
import GenshinWeapon from "./Weapon";

const SubSchema = new Schema<GenshinImpact.SubCharacter>(
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
        type: mongoose.Schema.ObjectId,
        required: false,
        ref: GenshinWeapon,
      },
      substitude: {
        type: [mongoose.Schema.ObjectId],
        required: false,
        ref: GenshinWeapon,
      },
      bestArtifact: {
        type: mongoose.Schema.ObjectId,
        required: false,
        ref: GenshinArtifact
        },
      },
      artifactStatus: { type: [mongoose.Schema.ObjectId], required: false },
      prioritySubStat: { type: [mongoose.Schema.ObjectId], required: false },
      team: {
        type: [mongoose.Schema.ObjectId],
        required: false,
      },
    },
    talent: {
      type: mongoose.Schema.ObjectId,
      required: false,
      ref: function () {
        if (this.lang === "Indonesian") return TalentID;
        else if (this.lang === "English") return TalentEN;

        return TalentEN;
      },
    },
    constellation: {
      type: mongoose.Schema.ObjectId,
      required: false,
      ref: function () {
        if (this.lang === "Indonesian") return ConstellationID;
        else if (this.lang === "English") return ConstellationEN;

        return ConstellationEN;
      },
    },
  },
  { _id: false }
);

const CharacterSchema = new Schema<GenshinImpact.Character>(
  {
    name: { type: String, required: true, unique: true },
    en: SubSchema,
    id: SubSchema,
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
