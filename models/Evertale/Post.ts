import mongoose, { Schema } from "mongoose";

const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    charId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    author: {
      type: String,
      required: true,
      ref: "User",
    },
    tags: {
      type: [String],
      default: "unsetting",
    },
    comment: [
      {
        author: { type: String, ref: "User", required: true },
        avatar: { type: String, ref: "User", default: "/no-profile.png" },
        commentText: { type: String, required: true },
        createdAt: { type: Date, required: true, default: new Date() },
        updateAt: { type: Date, required: true, default: new Date() },
      },
    ],
  },
  { timestamps: true }
);

const Post = mongoose.models.Post || mongoose.model("Post", PostSchema);
export default Post;
