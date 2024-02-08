import { ObjectId } from "mongodb";
import mongoose, { Schema } from "mongoose";
import Weapon from "./Weapon";

const CharacterSchema = new Schema<GenshinImpact.Character>({
  _id: {
    type: ObjectId,
    default: new mongoose.Types.ObjectId(),
    required: false,
  },
  name: { type: String, required: true },
  description: { type: String, required: true },
  ascendStatus: { type: String, required: true },
  ascendMaterial: { type: [String], required: false },
  rarity: { type: String, required: true },
  element: { type: String, required: true },
  weapon: { type: String, required: true },
  gender: { type: String, required: true },
  region: { type: String, required: true },
  cv: {
    english: String,
    chinese: String,
    japanese: String,
    korean: String,
  },
  image: { type: String, required: true },
  build: {
    weapon: { type: Schema.Types.ObjectId, required: false, ref: Weapon },
    substitude: { type: [Schema.Types.ObjectId], required: false, ref: Weapon },
    bestArtifact: { type: Schema.Types.ObjectId, required: false },
    artifactStatus: { type: [Schema.Types.ObjectId], required: false },
    prioritySubStat: { type: [Schema.Types.ObjectId], required: false },
    team: { type: [Schema.Types.ObjectId], required: false },
  },
  talent: [
    {
      infoTalent: { type: String, required: true },
      talentName: { type: String, required: true },
      talentImage: { type: String, required: false },
      statsSkill: [
        {
          statName: { type: String, required: false },
          statValue: { type: String, required: false },
        },
      ],
    },
  ],
  constellation: [
    {
      constName: { type: String, required: true },
      constEffect: { type: String, required: true },
    },
  ],
});

const Character =
  mongoose.models.character || mongoose.model("character", CharacterSchema);

export default Character;
