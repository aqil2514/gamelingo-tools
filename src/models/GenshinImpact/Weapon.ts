import { genshinConnection } from "@/lib/mongoose";
import { Schema } from "mongoose";

const PassiveSchema = new Schema<GenshinImpact.Weapon["passive"]>(
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

const WeaponSchema = new Schema<GenshinImpact.Weapon>(
  {
    name: { type: String, required: true, unique: true },
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
    image: { type: String, required: false },
  },
  { timestamps: true, strict: false }
);

export const IDWeapon = genshinConnection.models.id_weapon || genshinConnection.model("id_weapon", WeaponSchema);
export const ENWeapon = genshinConnection.models.en_weapon || genshinConnection.model("en_weapon", WeaponSchema);
