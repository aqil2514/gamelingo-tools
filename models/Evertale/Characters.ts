import mongoose, { Schema } from "mongoose";

interface CharacterImage {
  f1Img: String;
  f2Img: String;
  f3Img: String;
}

interface CharacterIntro {
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
  text4En: String;
  text4Id: String;
}
interface CharacterStatus {
  charName: String;
  charRank: "SSR" | "SR" | "R" | "N";
  statusElement: "Dark" | "Light" | "Earth" | "Fire" | "Storm" | "Water";
  firstWeapon: "Sword" | "Axe" | "Staff" | "Mace" | "GreatSword" | "GreatAxe" | "Spear" | "Hammer" | "Katana";
  secondWeapon: "Sword" | "Axe" | "Staff" | "Mace" | "GreatSword" | "GreatAxe" | "Spear" | "Hammer" | "Katana";
  leaderSkill: String | null;
  conjures: String | null;
}
interface CharacterProfile {
  part1En: String;
  part1Id: String;
  part2En: String;
  part2Id: String;
  part3En: String;
  part3Id: String;
}
interface CharacterActiveSkill {
  name: String;
  typeSkill: String;
  spirit: Number;
  target: String | Number;
  TU: Number;
  descEn: String;
  descId: String;
}
interface CharacterPassiveSkill {
  name: String;
  typeSkill: String;
  descEn: String;
  descId: String;
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
  text4En: { type: String, required: false },
  text4Id: { type: String, required: false },
});

const CharacterStatusSchema = new Schema<CharacterStatus>({
  charName: { type: String, required: true },
  charRank: { type: String, required: true },
  statusElement: { type: String, required: true },
  firstWeapon: { type: String, required: true },
  secondWeapon: { type: String, required: false },
  leaderSkill: { type: String, required: false },
  conjures: { type: String, required: false },
});

const CharacterProfileSchema = new Schema<CharacterProfile>({
  part1En: { type: String, required: true },
  part1Id: { type: String, required: true },
  part2En: { type: String, required: false },
  part2Id: { type: String, required: false },
  part3En: { type: String, required: false },
  part3Id: { type: String, required: false },
});

const CharacterActiveSkillSchema = new Schema<CharacterActiveSkill>({
  name: { type: String, required: true },
  typeSkill: { type: String, required: true },
  spirit: { type: Number || String, required: true },
  target: { type: String || Number, required: true },
  TU: { type: String, required: true },
  descEn: { type: String, required: true },
  descId: { type: String, required: true },
});

const CharacterPassiveSkillSchema = new Schema<CharacterPassiveSkill>({
  name: { type: String, required: true },
  typeSkill: { type: String, required: true },
  descEn: { type: String, required: true },
  descId: { type: String, required: true },
});

export const CharacterSchema = new Schema(
  {
    char_id: { type: mongoose.Types.ObjectId },
    charImage: CharImageSchema,
    charIntro: CharacterIntroSchema,
    charStatus: CharacterStatusSchema,
    charProfile: CharacterProfileSchema,
    charActiveSkill: [CharacterActiveSkillSchema],
    charPassiveSkill: [CharacterPassiveSkillSchema],
  },
  { timestamps: true }
);

const Character = mongoose.models.newchars || mongoose.model("newchars", CharacterSchema);
export default Character;
