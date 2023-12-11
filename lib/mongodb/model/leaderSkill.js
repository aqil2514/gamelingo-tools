import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const model = new Schema({
  _id: ObjectId,
  name: String,
  descEN: String,
  descID: String,
});

let LeaderSkills = mongoose.model("leaderskills");

if (mongoose.models["model"]) {
  LeaderSkills = mongoose.model("leaderskills");
} else {
  LeaderSkills = mongoose.model("leaderskills", model);
}

export default LeaderSkills;
