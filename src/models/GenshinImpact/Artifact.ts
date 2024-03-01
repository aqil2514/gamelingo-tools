import { genshinConnection } from "@/lib/mongoose";
import { Schema } from "mongoose";

const SubArtifactSchema = new Schema<GenshinImpact.ArtifactSub>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    lore: { type: String, required: true },
    type: { type: String, required: true },
    image: { type: String, required: false },
  },
  {
    _id: false,
  }
);

const ArtifactSchema = new Schema<GenshinImpact.Artifact>(
  {
    name: { type: String, required: true },
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
  {
    timestamps: true,
    strict: false,
  }
);

export const IDArtifact = genshinConnection.models.id_artifact || genshinConnection.model<GenshinImpact.Artifact>("id_artifact", ArtifactSchema);

export const ENArtifact = genshinConnection.models.en_artifact || genshinConnection.model<GenshinImpact.Artifact>("en_artifact", ArtifactSchema);
