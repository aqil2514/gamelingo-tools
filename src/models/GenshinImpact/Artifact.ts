import { genshinConnection } from "@/lib/mongoose";
import { Schema } from "mongoose";

const SubArtifactSchema = new Schema<GenshinImpact.ArtifactSub>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    lore: { type: String, required: true },
    type: { type: String, required: true },
  },
  {
    _id: false,
  }
);

const ArtifactSubField = new Schema<GenshinImpact.ArtifactSubField>(
  {
    rarityList: { type: [String], required: true },
    effect2pc: { type: String, required: true },
    effect4pc: { type: String, required: true },
    effectOther: { type: String, required: false },
    flower: SubArtifactSchema,
    plume: SubArtifactSchema,
    sands: SubArtifactSchema,
    goblet: SubArtifactSchema,
    circlet: SubArtifactSchema,
  },
  { _id: false }
);

const ArtifactSchema = new Schema<GenshinImpact.Artifact>(
  {
    name: { type: String, required: true },
    image: { type: [String], required: false },
    en: { type: ArtifactSubField, required: false },
    id: { type: ArtifactSubField, required: false },
  },
  {
    timestamps: true,
    strict: false,
  }
);

const GenshinArtifact =
  genshinConnection.models.gensihartaifact ||
  genshinConnection.model<GenshinImpact.Artifact>(
    "genshinartifacts",
    ArtifactSchema
  );

export default GenshinArtifact;
