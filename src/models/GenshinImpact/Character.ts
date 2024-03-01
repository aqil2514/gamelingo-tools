import mongoose, { Schema } from "mongoose";
import { genshinConnection } from "@/lib/mongoose";
import { TalentEN, TalentID } from "./Talent";
import { ConstellationEN, ConstellationID } from "./Constellation";
import { ENWeapon, IDWeapon } from "./Weapon";
import { ENArtifact, IDArtifact } from "./Artifact";

const CharacterSchema = new Schema<GenshinImpact.Character>(
  {
    lang: { type: String, enum: ["Indonesian", "English"], required: true },
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    ascendStatus: { type: String, required: true },
    ascendMaterial: { type: Object, required: false },
    rarity: { type: String, required: true },
    element: { type: String, enum: ["Cryo", "Pyro", "Dendro", "Geo", "Hydro", "Anemo"], required: true },
    weapon: { type: String, enum: ["Sword", "Polearm", "Claymore", "Bow", "Catalyst"], required: true },
    gender: { type: String, enum: ["Female", "Male", "Perempuan", "Pria"], required: true },
    region: { type: String, enum: ["Mondstadt", "Liyue", "Inazuma", "Sumeru", "Fontain"], required: true },
    cv: {
      english: String,
      chinese: String,
      japanese: String,
      korean: String,
    },
    image: { type: String, required: true },
    build: {
      weapon: {
        type: mongoose.Schema.ObjectId,
        required: false,
        ref: function (this: GenshinImpact.Character) {
          if (this.lang === "Indonesian") return IDWeapon;
          return ENWeapon;
        },
      },
      substitude: {
        type: [mongoose.Schema.ObjectId],
        required: false,
        ref: function (this: GenshinImpact.Character) {
          if (this.lang === "Indonesian") return IDWeapon;
          return ENWeapon;
        },
      },
      bestArtifact: {
        type: mongoose.Schema.ObjectId,
        required: false,
        ref: function (this: GenshinImpact.Character) {
          if (this.lang === "Indonesian") return IDArtifact;
          return ENArtifact;
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
  { timestamps: true, strict: false }
);

export const CharacterID = genshinConnection.models.id_character || genshinConnection.model("id_character", CharacterSchema);
export const CharacterEN = genshinConnection.models.en_character || genshinConnection.model("en_character", CharacterSchema);
