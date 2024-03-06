namespace General {
  export type AdminQuery = AdminQueryUser | AdminQueryGameEvertale | AdminQueryGameGenshin;

  interface AdminQueryGameEvertale {
    field: "evertale";
    subfield: "chars" | "leaderskills" | "passives" | "typeskills" | "weapons";
  }

  interface AdminQueryGameGenshin {
    field: "genshin-impact";
    subfield: GameGenshinImpact["category"];
  }

  interface AdminQueryUser {
    field: "account";
    subfield: "userslogin" | "password_purify" | "verificationcode";
  }

  export type ContentTemplate = "Write" | "Edit";

  export interface Comment {
    author: ObjectId;
    postId: ObjectId;
    text: string;
    likes: number;
    replies: Reply[];
    createdAt: Date;
    updatedAt: Date;
  }

  export type Game = GameEvertale | GameGenshinImpact;

  export interface GameEvertale {
    game: "Evertale";
    category: "Weapon" | "Character" | "Accessory";
  }

  export interface GameGenshinImpact {
    game: "Genshin Impact";
    category: "Artifact" | "Character" | "Material" | "Weapon" | "Talent" | "Constellations";
  }

  export interface MongoDBDocument {
    readonly _id?: string;
    readonly createdAt?: string;
    readonly updatedAt?: string;
  }

  export interface Post {
    id: string;
    name: string;
    image: string;
  }

  export interface PostDocument {
    _id?: string;
    title: string;
    lang: "English" | "Indonesian" | "English & Indonesian";
    game: {
      name: "Evertale" | "Genshin Impact" | "Mobile Legends";
      topic: "Character" | "Weapon" | "Accessory" | "Artifact" | "Material" | "Constellations";
    };
    content: ObjectId;
    author: string;
    tags: string[];
    comment?: Comment[];
    createdAt?: Date;
    updatedAt?: Date;
  }

  export interface Reply {
    author: ObjectId;
    text: string;
    likes: number;
    createdAt: Date;
    updatedAt: Date;
  }

  export interface User {
    _id?: ObjectId;
    userId: string;
    username: string;
    email: string;
    name: string;
    avatar: string;
    post: ObjectId;
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
  }
}
