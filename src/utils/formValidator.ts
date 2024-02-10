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
};
