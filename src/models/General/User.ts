import mongoose, { Schema } from "mongoose";
import { Post } from "./Post";
import { generalConnection } from "@/lib/mongoose";

const UserSchema = new Schema<General.User>(
  {
    username: { type: String, required: true },
    name: { type: String, required: true },
    avatar: { type: String, required: false },
    post: { type: [mongoose.Schema.ObjectId], ref: Post },
  },
  { timestamps: true }
);

export const User = generalConnection.models.user || generalConnection.model("user", UserSchema);
