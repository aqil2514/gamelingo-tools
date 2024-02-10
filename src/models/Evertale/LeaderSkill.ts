import { evertaleConnection } from "@/lib/mongoose";
import { Schema, default as mongoose } from "mongoose";

const leaderSkillSchema = new Schema<Evertale.Misc.LeaderSkill>(
  {
    name: { type: String, required: true },
    descEn: { type: String, required: true },
    descId: { type: String, required: true },
    typeSkill: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const LeaderSkill = evertaleConnection.models.LeaderSkill || evertaleConnection.model("LeaderSkill", leaderSkillSchema);

export default LeaderSkill;
