import { evertaleConnection } from "@/lib/mongoose";
import mongoose, { Schema } from "mongoose";

const CharImageSchema = new Schema<Evertale.Character.Image>({
  f1Img: { type: String, required: true },
  f2Img: { type: String, required: false },
  f3Img: { type: String, required: false },
});

const CharacterIntroSchema = new Schema<Evertale.Character.Intro>({
  gachaIntroEn: { type: String, required: false },
  gachaIntroId: { type: String, required: false },
  gachaTextEn: { type: String, required: false },
  gachaTextId: { type: String, required: false },
  loginTextEn: { type: String, required: false },
  loginTextId: { type: String, required: false },
  text1En: { type: String, required: false },
  text1Id: { type: String, required: false },
  text2En: { type: String, required: false },
  text2Id: { type: String, required: false },
  text3En: { type: String, required: false },
  text3Id: { type: String, required: false },
  text4En: { type: String, required: false },
  text4Id: { type: String, required: false },
});

const CharacterStatusSchema = new Schema<Evertale.Character.Status>({
  charName: { type: String, required: true },
  charRank: { type: String, required: true },
  charTeam: { type: [String], required: true },
  charElement: { type: String, required: true },
  charWeapon1: { type: String, required: true },
  charWeapon2: { type: String, required: false },
  charLeaderSkill: { type: String || undefined, required: false },
  charConjure: { type: String || undefined, required: false },
  isConjured: { type: Boolean, required: true },
});

const CharacterProfileSchema = new Schema<Evertale.Character.Profile>({
  part1En: { type: String, required: true },
  part1Id: { type: String, required: true },
  part2En: { type: String || undefined, required: false },
  part2Id: { type: String || undefined, required: false },
  part3En: { type: String || undefined, required: false },
  part3Id: { type: String || undefined, required: false },
});

const CharacterActiveSkillSchema = new Schema<Evertale.Character.ActiveSkill>({
  skillName: { type: String, required: true },
  typeSkill: { type: [String], required: true },
  skillSpirit: { type: Number || String, required: true },
  skillTarget: { type: String || Number, required: true },
  skillTu: { type: Number, required: true },
  skillDescEn: { type: String, required: true },
  skillDescId: { type: String, required: true },
});

const CharacterPassiveSkillSchema = new Schema<Evertale.Character.PassiveSkill>({
  skillName: { type: String, required: true },
  typeSkill: { type: [String], required: true },
  skillDescEn: { type: String, required: true },
  skillDescId: { type: String, required: true },
});

export const CharacterSchema = new Schema(
  {
    charId: { type: mongoose.Types.ObjectId },
    charImage: CharImageSchema,
    charIntro: CharacterIntroSchema,
    charStatus: CharacterStatusSchema,
    charProfile: CharacterProfileSchema,
    charActiveSkill: [CharacterActiveSkillSchema],
    charPassiveSkill: [CharacterPassiveSkillSchema],
  },
  { timestamps: true }
);

const Character = evertaleConnection.models.chars || evertaleConnection.model("chars", CharacterSchema);
export default Character;
