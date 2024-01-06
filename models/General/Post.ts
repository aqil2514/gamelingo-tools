import mongoose, { Schema } from "mongoose";
import Character from "../Evertale/Characters";
import { Document, ObjectId } from "mongodb";
import { Weapon } from "../Evertale/Weapons";
import { Accessory } from "../Evertale/Accessories";

interface PostDocument extends Document {
  title: string;
  game: {
    name: "Evertale" | "Genshin Impact" | "Mobile Legends";
    topic: string;
  };
  content: ObjectId;
  author: string;
  tags: string[];
  comment: Comment[];
}

interface Comment {
  author: string;
  avatar: string;
  text: string;
  likes: number;
  replies: Reply[];
  createdAt: Date;
  updatedAt: Date;
}

interface Reply {
  author: string;
  avatar: string;
  text: string;
  likes: number;
  createdAt: Date;
  updatedAt: Date;
}

const PostSchema = new Schema<PostDocument>(
  {
    title: {
      type: String,
      required: true,
    },
    game: {
      name: { type: String, enum: ["Evertale", "Genshin Impact", "Mobile Legends"], required: true },
      topic: { type: String, required: true },
    },
    content: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: function () {
        if (this.game.name === "Evertale") {
          if (this.game.topic === "Character") return Character;
          if (this.game.topic === "Weapon") return Weapon;
          if (this.game.topic === "Accessory") return Accessory;
        }
        return "nothing";
      },
    },
    author: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    comment: [
      {
        author: { type: String, ref: "User", required: true },
        avatar: { type: String, ref: "User", default: "/no-profile.png" },
        text: { type: String, required: true },
        likes: { type: Number, default: 0 },
        replies: [
          {
            author: { type: String, ref: "User", required: true },
            avatar: { type: String, ref: "User", default: "/no-profile.png" },
            text: { type: String, required: true },
            likes: { type: Number, default: 0 },
            createdAt: { type: Date, required: true, default: new Date() },
            updateAt: { type: Date, required: true, default: new Date() },
          },
        ],
        createdAt: { type: Date, required: true, default: new Date() },
        updatedAt: { type: Date, required: true, default: new Date() },
      },
    ],
  },
  { timestamps: true }
);

const Post = mongoose.models.Post2 || mongoose.model("Post2", PostSchema);
export default Post;
