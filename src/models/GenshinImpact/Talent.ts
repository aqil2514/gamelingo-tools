import { genshinConnection } from "@/lib/mongoose";
import { Schema } from "mongoose";

interface SubSchema extends GenshinImpact.ApiTalentCombatData {
  icon: string;
}

const CombatSubSchema: Schema<SubSchema> = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    attributes: {
      labels: { type: [String], required: true },
      parameters: { type: Schema.Types.Mixed, required: true },
    },
  },
  { _id: false }
);

const PassiveSubSchema: Schema<GenshinImpact.BasicInfo> = new Schema(
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

const SubLangSchema = new Schema<GenshinImpact.TalentSubLang>(
  {
    combats: {
      combat1: { type: CombatSubSchema, required: true },
      combat2: { type: CombatSubSchema, required: true },
      combat3: { type: CombatSubSchema, required: true },
      combatsp: { type: CombatSubSchema, required: false },
    },
    passives: {
      passive1: { type: PassiveSubSchema, required: true },
      passive2: { type: PassiveSubSchema, required: true },
      passive3: { type: PassiveSubSchema, required: true },
    },
  },
  { _id: false }
);

const TalentSchema = new Schema<GenshinImpact.Talent>(
  {
    charName: { type: String, required: true },
    en: SubLangSchema,
    id: SubLangSchema,
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
    icon: {
      combat1Icon: { type: String, required: true },
      combat2Icon: { type: String, required: true },
      combat3Icon: { type: String, required: true },
      combatspIcon: { type: String, required: false },
      passive1Icon: { type: String, required: true },
      passive2Icon: { type: String, required: true },
      passive3Icon: { type: String, required: true },
    },
  },
  { timestamps: true }
);

const GenshinTalent = genshinConnection.models.talent_v1 || genshinConnection.model("talent_v1", TalentSchema);

export default GenshinTalent;