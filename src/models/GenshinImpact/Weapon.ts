import { genshinConnection } from "@/lib/mongoose";
import { ObjectId } from "mongodb";
import mongoose, { Schema } from "mongoose";

const WeaponSchema = new Schema<GenshinImpact.Weapon>({
  name: { type: String, required: true },
  type: { type: String, required: true },
  subStatus: { type: String, required: true },
  refinement: [
    {
      nameRef: { type: String, required: true },
      effectRef: { type: String, required: true },
    },
  ],
  lore: { type: String, required: true },
  rarity: { type: String, required: true },
  image: { type: String, required: false },
});

const Weapon =
  genshinConnection.models.weapons || genshinConnection.model("weapons", WeaponSchema);

export default Weapon;
