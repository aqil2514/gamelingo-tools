import mongoose, { Model, Schema } from "mongoose";
import Character from "../Evertale/Characters";
import { Weapon } from "../Evertale/Weapons";
import { Accessory } from "../Evertale/Accessories";
import { generalConnection } from "@/lib/mongoose";
import { CommentSchema } from "./Comment";
import { User } from "./User";
import GenshinCharacter from "../GenshinImpact/Character";
import GenshinWeapon from "../GenshinImpact/Weapon";
import GenshinArtifact from "../GenshinImpact/Artifact";
import GenshinMaterial from "../GenshinImpact/Material";

const PostSchema = new Schema<General.PostDocument>(
  {
    title: {
      type: String,
      required: true,
    },
    lang: {
      type: String,
      enum: ["Indonesian", "English", "English & Indonesian"],
      required: true,
    },
    game: {
      name: {
        type: String,
        enum: ["Evertale", "Genshin Impact", "Mobile Legends"],
        required: true,
      },
      topic: { type: String, required: true },
    },
    content: {
      type: Schema.Types.Mixed,
      required: true,
      ref: function (this: General.PostDocument) {
        if (this.game.name === "Evertale") {
          if (this.game.topic === "Character") return Character;
          else if (this.game.topic === "Weapon") return Weapon;
          else if (this.game.topic === "Accessory") return Accessory;
        } else if (this.game.name === "Genshin Impact") {
          if (this.game.topic === "Character") return GenshinCharacter;
          else if (this.game.topic === "Weapon") return GenshinWeapon;
          else if (this.game.topic === "Artifact") return GenshinArtifact;
          else if (this.game.topic === "Material") return GenshinMaterial;
        }

        return "Belum disetting";
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
    comment: [CommentSchema],
  },
  { timestamps: true }
);

interface PostModel extends Model<General.PostDocument> {}

export const Post =
  generalConnection.models.post || generalConnection.model("post", PostSchema);

const GeneralPost =
  generalConnection.models.post_v1 ||
  generalConnection.model("post_v1", PostSchema);
export default GeneralPost;
