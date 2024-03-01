import { genshinConnection } from "@/lib/mongoose";
import { Schema } from "mongoose";

const BasicInfo = new Schema<GenshinImpact.BasicInfo>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, required: false },
  },
  { _id: false }
);

const ConstellationSchema = new Schema<GenshinImpact.Constellation>(
  {
    charName: { type: String, required: false, unique: true, trim: true },
    constellation: {
      c1: BasicInfo,
      c2: BasicInfo,
      c3: BasicInfo,
      c4: BasicInfo,
      c5: BasicInfo,
      c6: BasicInfo,
    },
  },
  { timestamps: true, strict: false }
);

export const ConstellationID = genshinConnection.models.id_constellation || genshinConnection.model("id_constellation", ConstellationSchema);
export const ConstellationEN = genshinConnection.models.en_constellation || genshinConnection.model("en_constellation", ConstellationSchema);
