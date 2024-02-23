import mongoose, { Schema } from "mongoose";
import { Post } from "./Post";
import { generalConnection } from "@/lib/mongoose";

const UserSchema = new Schema<General.User>(
  {
    userId: { type: String, required: true },
    username: { type: String, required: true },
    name: { type: String, required: true },
    avatar: { type: String, required: false },
    email: { type: String, required: true },
    post: { type: [mongoose.Schema.ObjectId], ref: Post },
  },
  { timestamps: true }
);

export const User = generalConnection.models.user || generalConnection.model("user", UserSchema);
