namespace General {
  export interface Post {
    id: string;
    name: string;
    image: string;
  }

  export interface PostDocument extends Document {
    title: string;
    lang: "English" | "Indonesian";
    game: {
      name: "Evertale" | "Genshin Impact" | "Mobile Legends";
      topic: "Character" | "Weapon" | "Accessory" | "Artifact" | "Material";
    };
    content: ObjectId;
    author: string;
    tags: string[];
    comment: Comment[];
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
    username: string;
    name: string;
    avatar: string;
    post: ObjectId;
  }

  export type Game = Evertale | GenshinImpact;

  interface Evertale {
    game: "Evertale";
    category: "Weapon" | "Character" | "Accessory";
  }

  interface GenshinImpact {
    game: "Genshin Impact";
    category: "Artifact" | "Character" | "Material" | "Weapon" | "Talent" | "Constellations";
  }
}
