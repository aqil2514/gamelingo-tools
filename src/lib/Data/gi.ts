interface GeneralDataState{
id: string;
name: string;
img: string;
}

interface ElementState extends GeneralDataState{}
interface WeaponState extends GeneralDataState{}

export const element:ElementState[]= [
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

export const weapon:WeaponState[]=[
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