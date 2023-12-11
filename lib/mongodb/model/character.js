import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const model = new Schema({
  _id: ObjectId,
  name: String,
  descEN: String,
  descID: String,
});

let Characters = mongoose.model("characters");

if (mongoose.models["model"]) {
  Characters = mongoose.model("characters");
} else {
  Characters = mongoose.model("characters", model);
}

export default Characters;
