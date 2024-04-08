interface CharRankTypes {
  rank: "SSR" | "SR" | "R" | "N";
  image: string;
}
export const charRank: CharRankTypes[] = [
  {
    rank: "SSR",
    image: "/evertale-asset/Rank/SSR.png",
  },
  {
    rank: "SR",
    image: "/evertale-asset/Rank/SR.png",
  },
  {
    rank: "R",
    image: "/evertale-asset/Rank/R.png",
  },
  {
    rank: "N",
    image: "/evertale-asset/Rank/N.png",
  },
];

interface CharElementTypes {
  element: "Earth" | "Fire" | "Dark" | "Light" | "Water" | "Storm";
  image: string;
}

export const charElement: CharElementTypes[] = [
  {
    element: "Earth",
    image: "/evertale-asset/Element/Earth.png",
  },
  {
    element: "Fire",
    image: "/evertale-asset/Element/Fire.png",
  },
  {
    element: "Dark",
    image: "/evertale-asset/Element/Dark.png",
  },
  {
    element: "Light",
    image: "/evertale-asset/Element/Light.png",
  },
  {
    element: "Water",
    image: "/evertale-asset/Element/Water.png",
  },
  {
    element: "Storm",
    image: "/evertale-asset/Element/Storm.png",
  },
];

interface CharWeaponTypes {
  name: "GreatSword" | "Staff" | "Axe" | "Hammer" | "GreatAxe" | "Sword" | "Mace" | "Spear" | "Katana";
  image: string;
}

export const charWeapon: CharWeaponTypes[] = [
  {
    name: "GreatSword",
    image: "/evertale-asset/Weapon/GreatSword.png",
  },
  {
    name: "Staff",
    image: "/evertale-asset/Weapon/Staff.png",
  },
  {
    name: "Axe",
    image: "/evertale-asset/Weapon/Axe.png",
  },
  {
    name: "Hammer",
    image: "/evertale-asset/Weapon/Hammer.png",
  },
  {
    name: "GreatAxe",
    image: "/evertale-asset/Weapon/GreatAxe.png",
  },
  {
    name: "Sword",
    image: "/evertale-asset/Weapon/Sword.png",
  },
  {
    name: "Mace",
    image: "/evertale-asset/Weapon/Mace.png",
  },
  {
    name: "Spear",
    image: "/evertale-asset/Weapon/Spear.png",
  },
  {
    name: "Katana",
    image: "/evertale-asset/Weapon/Katana.png",
  },
];

export const typeSkillId = "6585933980d28308cec13f2c";