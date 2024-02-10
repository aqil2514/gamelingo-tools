import { evertaleConnection } from "@/lib/mongoose";
import mongoose, { Schema } from "mongoose";

const CommentSchema = new Schema(
  {
    postId: { type: String, ref: "Posts", required: true },
    comment: [{ author: { type: String, ref: "Users", required: true }, commentText: { type: String, required: true } }],
  },
  { timestamps: true }
);

const Comment = evertaleConnection.models.Comment || evertaleConnection.model("Comment", CommentSchema);
export default Comment;
