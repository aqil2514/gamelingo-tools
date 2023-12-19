import mongoose, { Schema } from "mongoose";

const PostSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  tags: {
    type: [String],
  },
  comments: [
    {
      text: String,
      user: String,
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

const Post = mongoose.models.Post || mongoose.model("Post", PostSchema);
export default Post;
