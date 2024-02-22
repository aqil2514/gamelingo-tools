namespace General {
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
    author: string;
    avatar: string;
    text: string;
    likes: number;
    replies: Reply[];
    createdAt: Date;
    updatedAt: Date;
  }

  export interface Reply {
    author: string;
    avatar: string;
    text: string;
    likes: number;
    createdAt: Date;
    updatedAt: Date;
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
