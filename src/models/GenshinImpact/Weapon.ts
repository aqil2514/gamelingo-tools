import { ObjectId } from "mongodb";
import mongoose, { Schema } from "mongoose";

const WeaponSchema = new Schema<GenshinImpact.Weapon>({
  _id: {
    type: ObjectId,
    default: new mongoose.Types.ObjectId(),
    required: false,
  },
  name: { type: String, required: true },
  subStatus: { type: String, required: true },
  refinement: [
    {
      nameRef: { type: String, required: true },
      effectRef: { type: String, required: true },
    },
  ],
  lore: { type: String, required: true },
  rarity: { type: String, required: true },
});

const Weapon =
  mongoose.models.weapons || mongoose.model("weapons", WeaponSchema);

export default Weapon;
