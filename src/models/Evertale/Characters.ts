import mongoose, { Schema } from "mongoose";

export interface CharacterImage {
  f1Img: String;
  f2Img: String;
  f3Img: String;
}

export interface CharacterIntro {
  gachaIntroEn: String;
  gachaIntroId: String;
  gachaTextEn: String;
  gachaTextId: String;
  loginTextEn: String;
  loginTextId: String;
  text1En: String;
  text1Id: String;
  text2En: String;
  text2Id: String;
  text3En: String;
  text3Id: String;
  text4En: String;
  text4Id: String;
}

export interface CharacterStatus {
  charName: String;
  charRank: "SSR" | "SR" | "R" | "N";
  charElement: "Dark" | "Light" | "Earth" | "Fire" | "Storm" | "Water";
  charTeam: String[];
  charWeapon1: "Sword" | "Axe" | "Staff" | "Mace" | "GreatSword" | "GreatAxe" | "Spear" | "Hammer" | "Katana";
  charWeapon2: "Sword" | "Axe" | "Staff" | "Mace" | "GreatSword" | "GreatAxe" | "Spear" | "Hammer" | "Katana";
  charLeaderSkill: String | undefined;
  isConjured: Boolean;
  charConjure: String | undefined;
}

export interface CharacterProfile {
  part1En: String;
  part1Id: String;
  part2En: String | undefined;
  part2Id: String | undefined;
  part3En: String | undefined;
  part3Id: String | undefined;
}

export interface CharacterActiveSkill {
  skillName: String;
  typeSkill: String[];
  skillSpirit: Number;
  skillTarget: String | Number;
  skillTu: Number;
  skillDescEn: String;
  skillDescId: String;
}
export interface CharacterPassiveSkill {
  skillName: String;
  typeSkill: String[];
  skillDescEn: String;
  skillDescId: String;
}

const CharImageSchema = new Schema<CharacterImage>({
  f1Img: { type: String, required: true },
  f2Img: { type: String, required: false },
  f3Img: { type: String, required: false },
});

const CharacterIntroSchema = new Schema<CharacterIntro>({
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

const CharacterStatusSchema = new Schema<CharacterStatus>({
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

const CharacterProfileSchema = new Schema<CharacterProfile>({
  part1En: { type: String, required: true },
  part1Id: { type: String, required: true },
  part2En: { type: String || undefined, required: false },
  part2Id: { type: String || undefined, required: false },
  part3En: { type: String || undefined, required: false },
  part3Id: { type: String || undefined, required: false },
});

const CharacterActiveSkillSchema = new Schema<CharacterActiveSkill>({
  skillName: { type: String, required: true },
  typeSkill: { type: [String], required: true },
  skillSpirit: { type: Number || String, required: true },
  skillTarget: { type: String || Number, required: true },
  skillTu: { type: String, required: true },
  skillDescEn: { type: String, required: true },
  skillDescId: { type: String, required: true },
});

const CharacterPassiveSkillSchema = new Schema<CharacterPassiveSkill>({
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

const Character = mongoose.models.chars || mongoose.model("chars", CharacterSchema);
export default Character;
