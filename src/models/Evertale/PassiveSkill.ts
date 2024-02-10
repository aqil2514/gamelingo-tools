import { evertaleConnection } from "@/lib/mongoose";
import mongoose, { Schema } from "mongoose";

const PassiveSkillSchema = new Schema<Evertale.Misc.PassiveSkill>({
  skillName: String,
  typeSkill: String,
  skillDescEn: String,
  skillDescId: String,
});

const PassiveSkill = evertaleConnection.models.Passives || evertaleConnection.model("Passives", PassiveSkillSchema);

export default PassiveSkill;
