export const downloadLink: Record<
  General.DownloadProvider,
  General.DownloadLink
> = {
  appstore: {
    imageAlt: "Download in AppStore",
    imageSrc: "/btn_ap_en.webp",
    link: "https://apps.apple.com/us/app/genshin-impact-lantern-rite/id1517783697",
  },
  epicstore: {
    imageAlt: "Download in Epic Store",
    imageSrc: "/btn_epicstore_en.png",
    link: "https://store.epicgames.com/en-US/p/genshin-impact",
  },
  playstore: {
    imageAlt: "Download in Play Store",
    imageSrc: "/btn_gp_en.webp",
    link: "https://play.google.com/store/apps/details?id=com.miHoYo.GenshinImpact&pli=1",
  },
  psp: {
    imageAlt: "Download in Playstation",
    imageSrc: "/btn_ps4_en.png",
    link: "https://www.playstation.com/en-id/games/genshin-impact",
  },
};

export const element:General.DataState[]= [
  {
      id: "el-Anemo",
      name:"Anemo",
      img: "/Genshin-Impact/assets/Element_Anemo.svg"
  },
  {
      id: "el-Cryo",
      name:"Cryo",
      img: "/Genshin-Impact/assets/Element_Cryo.svg"
  },
  {
      id: "el-Dendro",
      name:"Dendro",
      img: "/Genshin-Impact/assets/Element_Dendro.svg"
  },
  {
      id: "el-Electro",
      name:"Electro",
      img: "/Genshin-Impact/assets/Element_Electro.svg"
  },
  {
      id: "el-Geo",
      name:"Geo",
      img: "/Genshin-Impact/assets/Element_Geo.svg"
  },
  {
      id: "el-Hydro",
      name:"Hydro",
      img: "/Genshin-Impact/assets/Element_Hydro.svg"
  },
  {
      id: "el-Pyro",
      name:"Pyro",
      img: "/Genshin-Impact/assets/Element_Pyro.svg"
  },
]

export const weapon:General.DataState[]=[
  {
      id:"wc-bow",
      name:"Bow",
      img: "/Genshin-Impact/assets/Weapon-class-bow-icon.webp"
  },
  {
      id:"wc-catalyst",
      name:"Catalyst",
      img: "/Genshin-Impact/assets/Weapon-class-catalyst-icon.webp"
  },
  {
      id:"wc-claymore",
      name:"Claymore",
      img: "/Genshin-Impact/assets/Weapon-class-claymore-icon.webp"
  },
  {
      id:"wc-polearm",
      name:"Polearm",
      img: "/Genshin-Impact/assets/Weapon-class-polearm-icon.webp"
  },
  {
      id:"wc-sword",
      name:"Sword",
      img: "/Genshin-Impact/assets/Weapon-class-sword-icon.webp"
  },
]