import mongoose, { Schema } from "mongoose";

const PassiveSkillSchema = new Schema<Evertale.Misc.PassiveSkill>({
  skillName: String,
  typeSkill: String,
  skillDescEn: String,
  skillDescId: String,
});

const PassiveSkill = mongoose.models.Passives || mongoose.model("Passives", PassiveSkillSchema);

export default PassiveSkill;
