import { evertaleConnection } from "@/lib/mongoose";
import mongoose, { Schema } from "mongoose";

const TypeSkillSchema = new Schema<Evertale.Misc.TypeSkill>({
  typeActiveSkill: [String],
  typePassiveSkill: [String],
  typeCharTeam: [String],
  typeLeaderSkill: [String],
});

export const TypeSkill = evertaleConnection.models.TypeSkill || evertaleConnection.model("TypeSkill", TypeSkillSchema);
