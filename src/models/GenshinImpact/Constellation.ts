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

const SubLangSchema = new Schema<GenshinImpact.ConstellationSubLang>(
  {
    constellation: {
      c1: BasicInfo,
      c2: BasicInfo,
      c3: BasicInfo,
      c4: BasicInfo,
      c5: BasicInfo,
      c6: BasicInfo,
    },
  },
  { _id: false }
);

const ConstellationSchema = new Schema<GenshinImpact.Constellation>(
  {
    charName: { type: String, required: false, unique: true, trim: true },
    en: { type: SubLangSchema, required: false },
    id: { type: SubLangSchema, required: false },
    icon: {
      c1Icon: String,
      c2Icon: String,
      c3Icon: String,
      c4Icon: String,
      c5Icon: String,
      c6Icon: String,
    },
  },
  { timestamps: true, strict: false }
);

const GenshinConstellation =
  genshinConnection.models.constellation_v1 ||
  genshinConnection.model("constellation_v1", ConstellationSchema);

export default GenshinConstellation