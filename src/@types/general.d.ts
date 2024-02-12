namespace General {
  export interface Post {
    id: string;
    name: string;
    image: string;
  }

  export type Game = Evertale | GenshinImpact;
  
  interface Evertale{
    game:"Evertale",
    category:"Weapon" | "Character" | "Accessory";
  }
  
  interface GenshinImpact{
    game :"Genshin Impact",
    category:"Artifact" | "Character" | "Material" | "Weapon" | "Talent"
  }
}
