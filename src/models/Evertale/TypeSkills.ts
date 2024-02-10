import { evertaleConnection } from "@/lib/mongoose";
import mongoose, { Schema } from "mongoose";

interface TypeSkill {
  typeLeaderSkill: String[];
  typePassiveSkill: String[];
  typeActiveSkill: String[];
  typeCharTeam: String[];
}

const TypeSkillSchema = new Schema<TypeSkill>({
  typeActiveSkill: [String],
  typePassiveSkill: [String],
  typeCharTeam: [String],
  typeLeaderSkill: [String],
});

export const TypeSkill = evertaleConnection.models.TypeSkill || evertaleConnection.model("TypeSkill", TypeSkillSchema);
