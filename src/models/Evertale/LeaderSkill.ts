import { Schema, default as mongoose } from "mongoose";

interface LeaderSkill {
  name: String;
  descEn: String;
  descId: String;
  typeSkill: String;
}

const leaderSkillSchema = new Schema<LeaderSkill>(
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

const LeaderSkill = mongoose.models.LeaderSkill || mongoose.model("LeaderSkill", leaderSkillSchema);

export default LeaderSkill;
