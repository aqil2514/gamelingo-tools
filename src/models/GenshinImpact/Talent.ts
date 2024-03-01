import { genshinConnection } from "@/lib/mongoose";
import { Schema } from "mongoose";

const TalentSubSchema = new Schema<GenshinImpact.BasicInfo>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, required: false },
  },
  { _id: false }
);

const LvlSchema = new Schema<GenshinImpact.UpgradeMaterialItem>(
  {
    name: { type: String, required: true },
    count: { type: Number, required: true },
  },
  { _id: false }
);

const TalentSchema = new Schema<GenshinImpact.Talent>(
  {
    charName: { type: String, required: true },
    combats: {
      combat1: { type: TalentSubSchema, required: true },
      combat2: { type: TalentSubSchema, required: true },
      combat3: { type: TalentSubSchema, required: true },
      combatsp: { type: TalentSubSchema, required: false },
    },
    passives: {
      passive1: { type: TalentSubSchema, required: true },
      passive2: { type: TalentSubSchema, required: true },
      passive3: { type: TalentSubSchema, required: true },
    },
    costs: {
      lvl2: { type: [LvlSchema], required: true },
      lvl3: { type: [LvlSchema], required: true },
      lvl4: { type: [LvlSchema], required: true },
      lvl5: { type: [LvlSchema], required: true },
      lvl6: { type: [LvlSchema], required: true },
      lvl7: { type: [LvlSchema], required: true },
      lvl8: { type: [LvlSchema], required: true },
      lvl9: { type: [LvlSchema], required: true },
      lvl10: { type: [LvlSchema], required: true },
    },
  },
  { timestamps: true }
);

export const TalentID = genshinConnection.models.id_talent || genshinConnection.model("id_talent", TalentSchema);
export const TalentEN = genshinConnection.models.en_talent || genshinConnection.model("en_talent", TalentSchema);
