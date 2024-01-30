interface homeIconsType {
  id: string;
  name: string;
  imgLoc: string;
  url: string;
}

export const homeIcon: homeIconsType[] = [
  {
    id: "hi-genshin-impact",
    name: "Genshin Impact",
    imgLoc: "/icon/genshin-impact.jpg",
    url: "/genshin-impact",
  },
  {
    id: "hi-evertale",
    name: "Evertale",
    imgLoc: "/icon/evertale.jpg",
    url: "/evertale",
  },
  {
    id: "hi-mlbb",
    name: "Mobile Legends",
    imgLoc: "/icon/mlbb.jpg",
    url: "/mlbb",
  },
];
