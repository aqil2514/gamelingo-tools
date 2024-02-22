import { Schema } from "mongoose";
import Character from "../Evertale/Characters";
import { Weapon } from "../Evertale/Weapons";
import { Accessory } from "../Evertale/Accessories";
import { evertaleConnection, generalConnection } from "@/lib/mongoose";
import { CharacterEN, CharacterID } from "../GenshinImpact/Character";
import { ENWeapon, IDWeapon } from "../GenshinImpact/Weapon";
import { ENArtifact, IDArtifact } from "../GenshinImpact/Artifact";
import { ENMaterial, IDMaterial } from "../GenshinImpact/Material";

const PostSchema = new Schema<General.PostDocument>(
  {
    title: {
      type: String,
      required: true,
    },
    lang: { type: String, enum: ["Indonesian", "English"], required: true },
    game: {
      name: { type: String, enum: ["Evertale", "Genshin Impact", "Mobile Legends"], required: true },
      topic: { type: String, required: true },
    },
    content: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: function (this: General.PostDocument) {
        if (this.game.name === "Evertale") {
          if (this.game.topic === "Character") return Character;
          else if (this.game.topic === "Weapon") return Weapon;
          else if (this.game.topic === "Accessory") return Accessory;
        } else if (this.game.name === "Genshin Impact") {
          if (this.lang === "Indonesian") {
            if (this.game.topic === "Character") return CharacterID;
            else if (this.game.topic === "Weapon") return IDWeapon;
            else if (this.game.topic === "Artifact") return IDArtifact;
            else if (this.game.topic === "Material") return IDMaterial;
          } else if (this.lang === "English") {
            if (this.game.topic === "Character") return CharacterEN;
            else if (this.game.topic === "Weapon") return ENWeapon;
            else if (this.game.topic === "Artifact") return ENArtifact;
            else if (this.game.topic === "Material") return ENMaterial;
          }
        }
        return null;
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
      },
    ],
  },
  { timestamps: true }
);

export const Post = generalConnection.models.post || generalConnection.model("post", PostSchema);
