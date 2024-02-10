//Genshin Validator API Utils

import { file } from "./api";

export const genshinValidator: ApiUtils.GenshinValidatorApi = {
  async material({ name, image, lore, gainedFrom, rarity, typeMaterial }) {
    const allowedType: GenshinImpact.Material["typeMaterial"][] = [
      "Character Ascension",
      "Talent Material",
      "Weapon Ascension",
      "Weapon and Character Material",
    ];

    if (!name) return { status: false, msg: "Nama material belum diisi" };
    if (!typeMaterial)
      return { status: false, msg: "Tipe material belum diisi" };
    if (!allowedType.includes(typeMaterial))
      return { status: false, msg: "Tipe material tidak dikenal" };
    if (!lore) return { status: false, msg: "Lore material belum diisi" };
    if (!rarity) return { status: false, msg: "Rarity material belum diisi" };

    const data: GenshinImpact.Material = {
      name,
      typeMaterial,
      lore,
      rarity,
      image,
      gainedFrom:
        typeof gainedFrom === "string" ? gainedFrom.split(",") : gainedFrom,
    };

    return { status: true, data };
  },
  async artifact(data) {
    const allowedType: string[] = [
      "Circlet of Logos",
      "Flower of Life",
      "Goblet of Eonothem",
      "Plume of Death",
      "Sands of Eon",
    ];

    if (!data.name) return { msg: "Nama Artifact belum diisi", status: false };
    if (!data.type) return { msg: "Tipe Artifact belum diisi", status: false };
    if (!allowedType.includes(data.type))
      return { msg: "Tipe Artifact tidak diizinkan", status: false };
    if (!data.set)
      return { msg: "Nama set Artifact belum diisi", status: false };
    if (!data["setName-1"])
      return { msg: "Nama set 1 Artifact belum diisi", status: false };
    if (!data["setValue-1"])
      return { msg: "Value set Artifact belum diisi", status: false };
    if (!data.rarity)
      return { msg: "Rarity Artifact belum diisi", status: false };
    if (!data.source)
      return { msg: "Sumber Artifact belum diisi", status: false };

    if (data?.image?.name) {
      const imageValidation = file.validationImage(data.image);
      if (!imageValidation.status)
        return { msg: imageValidation.msg, status: false };
    } else if(!data?.image?.name){
        data.image = undefined;
    }

    return { status: true, data };
  },
  async weapon(data) {
    const allowedType:string[] = ["Bow", "Catalyst", "Claymore", "Polearm", "Sword"]
    if(!data.name) return {status:false, msg:"Nama Weapon belum diisi"};
    if(!data.type) return {status:false, msg:"Tipe Weapon belum diisi"};
    if(!allowedType.includes(data.type)) return {status:false, msg:"Tipe weapon tidak diizinkan"}
    if(!data.subStatus) return {status:false, msg:"Sub status weapon belum diisi"};
    if(!data["weap-ref-1"]) return {status:false, msg:"Weapon ref 1 belum diisi"};
    if(!data["weap-ref-1-effect"]) return {status:false, msg:"Deskripsi Weapon ref 1 belum diisi"};
    if(!data["weap-ref-2"]) return {status:false, msg:"Weapon ref 2 belum diisi"};
    if(!data["weap-ref-2-effect"]) return {status:false, msg:"Deskripsi Weapon ref 2 belum diisi"};
    if(!data["weap-ref-3"]) return {status:false, msg:"Weapon ref 3 belum diisi"};
    if(!data["weap-ref-3-effect"]) return {status:false, msg:"Deskripsi Weapon ref 3 belum diisi"};
    if(!data["weap-ref-4"]) return {status:false, msg:"Weapon ref 4 belum diisi"};
    if(!data["weap-ref-4-effect"]) return {status:false, msg:"Deskripsi Weapon ref 4 belum diisi"};
    if(!data["weap-ref-5"]) return {status:false, msg:"Weapon ref 5 belum diisi"};
    if(!data["weap-ref-5-effect"]) return {status:false, msg:"Deskripsi Weapon ref 5 belum diisi"};
    if(!data.lore) return {status:false, msg:"Lore weapon belum diisi"};
    if(!data.rarity) return {status:false, msg:"Rarity weapon belum diisi"};

    if (data.image?.name) {
      const imageValidation = file.validationImage(data.image);
      if (!imageValidation.status)
        return { msg: imageValidation.msg, status: false };
    } else if(!data?.image?.name){
        data.image = undefined;
    }
    
    return {status:true, data}
  },
};
