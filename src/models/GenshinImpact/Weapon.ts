import { genshinConnection } from "@/lib/mongoose";
import { Schema } from "mongoose";

const PassiveSchema = new Schema<GenshinImpact.WeaponSub["passive"]>(
  {
    passiveName: { type: String, required: true },
    r1: { type: String, required: true },
    r2: { type: String, required: true },
    r3: { type: String, required: true },
    r4: { type: String, required: true },
    r5: { type: String, required: true },
  },
  { _id: false }
);

const AscendSchema = new Schema<GenshinImpact.UpgradeMaterialItem>(
  {
    name: { type: String, required: true },
    count: { type: Number, required: true },
  },
  { _id: false }
);

const WeaponSubSchema = new Schema<GenshinImpact.WeaponSub>(
  {
    type: { type: String, required: true },
    baseAtk: { type: String, required: true },
    baseStat: { type: String, required: true },
    subStatus: { type: String, required: true },
    lore: { type: String, required: true },
    passive: PassiveSchema,
    ascend1: [AscendSchema],
    ascend2: [AscendSchema],
    ascend3: [AscendSchema],
    ascend4: [AscendSchema],
    ascend5: [AscendSchema],
    ascend6: [AscendSchema],
    rarity: { type: String, required: true },
  },
  { _id: false }
);

const WeaponSchema = new Schema<GenshinImpact.Weapon>(
  {
    name: { type: String, required: true, unique: true },
    en: WeaponSubSchema,
    id: WeaponSubSchema,
    image: { type: String, required: false },
  },
  { timestamps: true, strict: false }
);

export const GenshinWeapon =
  genshinConnection.models.weapon_v1 ||
  genshinConnection.model("weapon_v1", WeaponSchema);

export default GenshinWeapon;
