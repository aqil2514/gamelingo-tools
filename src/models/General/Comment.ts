import mongoose, { Schema } from "mongoose";
import { Post } from "./Post";

const ReplySchema = new Schema<General.Reply>(
  {
    author: { type: mongoose.Schema.ObjectId, ref: "user" },
    text: { type: String, required: true },
    likes: { type: Number, required: true, default: 0 },
  },
  { timestamps: true, _id: false }
);

export const CommentSchema = new Schema<General.Comment>(
  {
    author: { type: mongoose.Schema.ObjectId, ref: "user" },
    text: { type: String, required: true },
    likes: { type: Number, required: true, default: 0 },
    replies: ReplySchema,
  },
  { timestamps: true, _id: false }
);
