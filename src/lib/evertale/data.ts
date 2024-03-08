interface CharRankTypes {
  rank: "SSR" | "SR" | "R" | "N";
  image: string;
}
export const charRank: CharRankTypes[] = [
  {
    rank: "SSR",
    image: "/Evertale/Rank/SSR.png",
  },
  {
    rank: "SR",
    image: "/Evertale/Rank/SR.png",
  },
  {
    rank: "R",
    image: "/Evertale/Rank/R.png",
  },
  {
    rank: "N",
    image: "/Evertale/Rank/N.png",
  },
];

interface CharElementTypes {
  element: "Earth" | "Fire" | "Dark" | "Light" | "Water" | "Storm";
  image: string;
}

export const charElement: CharElementTypes[] = [
  {
    element: "Earth",
    image: "/Evertale/Element/Earth.png",
  },
  {
    element: "Fire",
    image: "/Evertale/Element/Fire.png",
  },
  {
    element: "Dark",
    image: "/Evertale/Element/Dark.png",
  },
  {
    element: "Light",
    image: "/Evertale/Element/Light.png",
  },
  {
    element: "Water",
    image: "/Evertale/Element/Water.png",
  },
  {
    element: "Storm",
    image: "/Evertale/Element/Storm.png",
  },
];

interface CharWeaponTypes {
  name: "GreatSword" | "Staff" | "Axe" | "Hammer" | "GreatAxe" | "Sword" | "Mace" | "Spear" | "Katana";
  image: string;
}

export const charWeapon: CharWeaponTypes[] = [
  {
    name: "GreatSword",
    image: "/Evertale/Weapon/GreatSword.png",
  },
  {
    name: "Staff",
    image: "/Evertale/Weapon/Staff.png",
  },
  {
    name: "Axe",
    image: "/Evertale/Weapon/Axe.png",
  },
  {
    name: "Hammer",
    image: "/Evertale/Weapon/Hammer.png",
  },
  {
    name: "GreatAxe",
    image: "/Evertale/Weapon/GreatAxe.png",
  },
  {
    name: "Sword",
    image: "/Evertale/Weapon/Sword.png",
  },
  {
    name: "Mace",
    image: "/Evertale/Weapon/Mace.png",
  },
  {
    name: "Spear",
    image: "/Evertale/Weapon/Spear.png",
  },
  {
    name: "Katana",
    image: "/Evertale/Weapon/Katana.png",
  },
];

export const typeSkillId = "6585933980d28308cec13f2c";