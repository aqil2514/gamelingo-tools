namespace General {
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
      topic: "Character" | "Weapon" | "Accessory" | "Artifact" | "Material";
    };
    content: ObjectId;
    author: string;
    tags: string[];
    comment?: Comment[];
    createdAt?: Date;
    updatedAt?: Date;
  }

  export interface Comment {
    author: ObjectId;
    postId: ObjectId;
    text: string;
    likes: number;
    replies: Reply[];
    createdAt: Date;
    updatedAt: Date;
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

  export type Game = Evertale | GenshinImpact;

  export interface Evertale {
    game: "Evertale";
    category: "Weapon" | "Character" | "Accessory";
  }

  export interface GenshinImpact {
    game: "Genshin Impact";
    category: "Artifact" | "Character" | "Material" | "Weapon" | "Talent" | "Constellations";
  }

  export type AdminQuery = UserAdminQuery | GameEvertaleQuery;

  interface UserAdminQuery {
    field: "account";
    subfield: "userslogin" | "password_purify" | "verificationcode";
  }

  interface GameEvertaleQuery {
    field: "evertale";
    subfield: "chars" | "leaderskills" | "passives" | "typeskills" | "weapons";
  }
}
