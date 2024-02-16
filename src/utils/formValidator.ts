//Genshin Validator API Utils

import { file } from "./api";

export const genshinValidator: ApiUtils.GenshinValidatorApi = {
  async material({ name, image, lore, gainedFrom, rarity, typeMaterial }) {
    const allowedType: GenshinImpact.Material["typeMaterial"][] = ["Character Ascension", "Talent Material", "Weapon Ascension", "Weapon and Character Material"];

    if (!name) return { status: false, msg: "Nama material belum diisi" };
    if (!typeMaterial) return { status: false, msg: "Tipe material belum diisi" };
    if (!allowedType.includes(typeMaterial)) return { status: false, msg: "Tipe material tidak dikenal" };
    if (!lore) return { status: false, msg: "Lore material belum diisi" };
    if (!rarity) return { status: false, msg: "Rarity material belum diisi" };

    const data: GenshinImpact.Material = {
      name,
      typeMaterial,
      lore,
      rarity,
      image,
      gainedFrom: typeof gainedFrom === "string" ? gainedFrom.split(",") : gainedFrom,
    };

    return { status: true, data };
  },
  async artifact(data) {
    const allowedType: string[] = ["Circlet of Logos", "Flower of Life", "Goblet of Eonothem", "Plume of Death", "Sands of Eon"];

    if (!data.name) return { msg: "Nama Artifact belum diisi", status: false };
    if (!data.type) return { msg: "Tipe Artifact belum diisi", status: false };
    if (!allowedType.includes(data.type)) return { msg: "Tipe Artifact tidak diizinkan", status: false };
    if (!data.set) return { msg: "Nama set Artifact belum diisi", status: false };
    if (!data["setName-1"]) return { msg: "Nama set 1 Artifact belum diisi", status: false };
    if (!data["setValue-1"]) return { msg: "Value set Artifact belum diisi", status: false };
    if (!data.rarity) return { msg: "Rarity Artifact belum diisi", status: false };
    if (!data.source) return { msg: "Sumber Artifact belum diisi", status: false };

    if (data?.image?.name) {
      const imageValidation = file.validationImage(data.image);
      if (!imageValidation.status) return { msg: imageValidation.msg, status: false };
    } else if (!data?.image?.name) {
      data.image = undefined;
    }

    return { status: true, data };
  },
  async weapon(data) {
    const allowedType: string[] = ["Bow", "Catalyst", "Claymore", "Polearm", "Sword"];
    if (!data.name) return { status: false, msg: "Nama Weapon belum diisi" };
    if (!data.type) return { status: false, msg: "Tipe Weapon belum diisi" };
    if (!allowedType.includes(data.type)) return { status: false, msg: "Tipe weapon tidak diizinkan" };
    if (!data.subStatus) return { status: false, msg: "Sub status weapon belum diisi" };
    if (!data["weap-ref-1"]) return { status: false, msg: "Weapon ref 1 belum diisi" };
    if (!data["weap-ref-1-effect"]) return { status: false, msg: "Deskripsi Weapon ref 1 belum diisi" };
    if (!data["weap-ref-2"]) return { status: false, msg: "Weapon ref 2 belum diisi" };
    if (!data["weap-ref-2-effect"]) return { status: false, msg: "Deskripsi Weapon ref 2 belum diisi" };
    if (!data["weap-ref-3"]) return { status: false, msg: "Weapon ref 3 belum diisi" };
    if (!data["weap-ref-3-effect"]) return { status: false, msg: "Deskripsi Weapon ref 3 belum diisi" };
    if (!data["weap-ref-4"]) return { status: false, msg: "Weapon ref 4 belum diisi" };
    if (!data["weap-ref-4-effect"]) return { status: false, msg: "Deskripsi Weapon ref 4 belum diisi" };
    if (!data["weap-ref-5"]) return { status: false, msg: "Weapon ref 5 belum diisi" };
    if (!data["weap-ref-5-effect"]) return { status: false, msg: "Deskripsi Weapon ref 5 belum diisi" };
    if (!data.lore) return { status: false, msg: "Lore weapon belum diisi" };
    if (!data.rarity) return { status: false, msg: "Rarity weapon belum diisi" };

    if (data.image?.name) {
      const imageValidation = file.validationImage(data.image);
      if (!imageValidation.status) return { msg: imageValidation.msg, status: false };
    } else if (!data?.image?.name) {
      data.image = undefined;
    }

    return { status: true, data };
  },
  async character(data) {
    if (!data.name) return { status: false, msg: "Nama karakter belum ada" };
    if (!data.description) return { status: false, msg: "Deskripsi karakter belum ada" };
    if (!data.ascendStatus) return { status: false, msg: "Ascend status karakter belum ada" };

    if (!data["ascend-1-material-1"]) return { status: false, msg: "Ascend 1 Material 1  belum ada" };
    if (!data["ascend-1-count-1"]) return { status: false, msg: "Ascend 1 Count 1  belum ada" };
    if (!data["ascend-1-material-2"]) return { status: false, msg: "Ascend 1 Material 2  belum ada" };
    if (!data["ascend-1-count-2"]) return { status: false, msg: "Ascend 1 Count 2  belum ada" };
    if (!data["ascend-1-material-3"]) return { status: false, msg: "Ascend 1 Material 3  belum ada" };
    if (!data["ascend-1-count-3"]) return { status: false, msg: "Ascend 1 Count 3  belum ada" };
    if (!data["ascend-1-material-4"]) return { status: false, msg: "Ascend 1 Material 4  belum ada" };
    if (!data["ascend-1-count-4"]) return { status: false, msg: "Ascend 1 Count 4  belum ada" };

    if (!data["ascend-2-material-1"]) return { status: false, msg: "Ascend 2 Material 1  belum ada" };
    if (!data["ascend-2-count-1"]) return { status: false, msg: "Ascend 2 Count 1  belum ada" };
    if (!data["ascend-2-material-2"]) return { status: false, msg: "Ascend 2 Material 2  belum ada" };
    if (!data["ascend-2-count-2"]) return { status: false, msg: "Ascend 2 Count 2  belum ada" };
    if (!data["ascend-2-material-3"]) return { status: false, msg: "Ascend 2 Material 3  belum ada" };
    if (!data["ascend-2-count-3"]) return { status: false, msg: "Ascend 2 Count 3  belum ada" };
    if (!data["ascend-2-material-4"]) return { status: false, msg: "Ascend 2 Material 4  belum ada" };
    if (!data["ascend-2-count-4"]) return { status: false, msg: "Ascend 2 Count 4  belum ada" };
    if (!data["ascend-2-material-5"]) return { status: false, msg: "Ascend 2 Material 5  belum ada" };
    if (!data["ascend-2-count-5"]) return { status: false, msg: "Ascend 2 Count 5  belum ada" };

    if (!data["ascend-3-material-1"]) return { status: false, msg: "Ascend 3 Material 1  belum ada" };
    if (!data["ascend-3-count-1"]) return { status: false, msg: "Ascend 3 Count 1  belum ada" };
    if (!data["ascend-3-material-2"]) return { status: false, msg: "Ascend 3 Material 2  belum ada" };
    if (!data["ascend-3-count-2"]) return { status: false, msg: "Ascend 3 Count 2  belum ada" };
    if (!data["ascend-3-material-3"]) return { status: false, msg: "Ascend 3 Material 3  belum ada" };
    if (!data["ascend-3-count-3"]) return { status: false, msg: "Ascend 3 Count 3  belum ada" };
    if (!data["ascend-3-material-4"]) return { status: false, msg: "Ascend 3 Material 4  belum ada" };
    if (!data["ascend-3-count-4"]) return { status: false, msg: "Ascend 3 Count 4  belum ada" };
    if (!data["ascend-3-material-5"]) return { status: false, msg: "Ascend 3 Material 5  belum ada" };
    if (!data["ascend-3-count-5"]) return { status: false, msg: "Ascend 3 Count 5  belum ada" };

    if (!data["ascend-4-material-1"]) return { status: false, msg: "Ascend 4 Material 1  belum ada" };
    if (!data["ascend-4-count-1"]) return { status: false, msg: "Ascend 4 Count 1  belum ada" };
    if (!data["ascend-4-material-2"]) return { status: false, msg: "Ascend 4 Material 2  belum ada" };
    if (!data["ascend-4-count-2"]) return { status: false, msg: "Ascend 4 Count 2  belum ada" };
    if (!data["ascend-4-material-3"]) return { status: false, msg: "Ascend 4 Material 3  belum ada" };
    if (!data["ascend-4-count-3"]) return { status: false, msg: "Ascend 4 Count 3  belum ada" };
    if (!data["ascend-4-material-4"]) return { status: false, msg: "Ascend 4 Material 4  belum ada" };
    if (!data["ascend-4-count-4"]) return { status: false, msg: "Ascend 4 Count 4  belum ada" };
    if (!data["ascend-4-material-5"]) return { status: false, msg: "Ascend 4 Material 5  belum ada" };
    if (!data["ascend-4-count-5"]) return { status: false, msg: "Ascend 4 Count 5  belum ada" };

    if (!data["ascend-5-material-1"]) return { status: false, msg: "Ascend 5 Material 1  belum ada" };
    if (!data["ascend-5-count-1"]) return { status: false, msg: "Ascend 5 Count 1  belum ada" };
    if (!data["ascend-5-material-2"]) return { status: false, msg: "Ascend 5 Material 2  belum ada" };
    if (!data["ascend-5-count-2"]) return { status: false, msg: "Ascend 5 Count 2  belum ada" };
    if (!data["ascend-5-material-3"]) return { status: false, msg: "Ascend 5 Material 3  belum ada" };
    if (!data["ascend-5-count-3"]) return { status: false, msg: "Ascend 5 Count 3  belum ada" };
    if (!data["ascend-5-material-4"]) return { status: false, msg: "Ascend 5 Material 4  belum ada" };
    if (!data["ascend-5-count-4"]) return { status: false, msg: "Ascend 5 Count 4  belum ada" };
    if (!data["ascend-5-material-5"]) return { status: false, msg: "Ascend 5 Material 5  belum ada" };
    if (!data["ascend-5-count-5"]) return { status: false, msg: "Ascend 5 Count 5  belum ada" };

    if (!data["ascend-6-material-1"]) return { status: false, msg: "Ascend 6 Material 1  belum ada" };
    if (!data["ascend-6-count-1"]) return { status: false, msg: "Ascend 6 Count 1  belum ada" };
    if (!data["ascend-6-material-2"]) return { status: false, msg: "Ascend 6 Material 2  belum ada" };
    if (!data["ascend-6-count-2"]) return { status: false, msg: "Ascend 6 Count 2  belum ada" };
    if (!data["ascend-6-material-3"]) return { status: false, msg: "Ascend 6 Material 3  belum ada" };
    if (!data["ascend-6-count-3"]) return { status: false, msg: "Ascend 6 Count 3  belum ada" };
    if (!data["ascend-6-material-4"]) return { status: false, msg: "Ascend 6 Material 4  belum ada" };
    if (!data["ascend-6-count-4"]) return { status: false, msg: "Ascend 6 Count 4  belum ada" };
    if (!data["ascend-6-material-5"]) return { status: false, msg: "Ascend 6 Material 5  belum ada" };
    if (!data["ascend-6-count-5"]) return { status: false, msg: "Ascend 6 Count 5  belum ada" };

    if (!data["character-voice-chinese"]) return { status: false, msg: "Actor voice Chinese belum diisi" };
    if (!data["character-voice-english"]) return { status: false, msg: "Actor voice English belum diisi" };
    if (!data["character-voice-japanese"]) return { status: false, msg: "Actor voice Japanese belum diisi" };
    if (!data["character-voice-korean"]) return { status: false, msg: "Actor voice Korean belum diisi" };

    const allowedElement: GenshinImpact.Character["element"][] = ["Anemo", "Cryo", "Dendro", "Geo", "Hydro", "Pyro"];
    const allowedWeapon: GenshinImpact.Character["weapon"][] = ["Bow", "Catalyst", "Claymore", "Polearm", "Sword"];
    const allowedGender: GenshinImpact.Character["gender"][] = ["Female", "Male", "Perempuan", "Pria"];
    const allowedRegion: GenshinImpact.Character["region"][] = ["Fontain", "Inazuma", "Liyue", "Mondstadt", "Sumeru"];

    if (!data.rarity) return { status: false, msg: "Rarity belum diisi" };
    if (!data.element) return { status: false, msg: "Element belum diisi" };
    if (!allowedElement.includes(data.element as GenshinImpact.Character["element"])) return { status: false, msg: "Element tidak diizinkan" };

    if (!data.weapon) return { status: false, msg: "Weapon belum diisi" };
    if (!allowedWeapon.includes(data.weapon as GenshinImpact.Character["weapon"])) return { status: false, msg: "Weapon tidak diizinkan" };

    if (!data.gender) return { status: false, msg: "Gender belum diisi" };
    if (!allowedGender.includes(data.gender as GenshinImpact.Character["gender"])) return { status: false, msg: "Gender tidak diizinkan" };

    if (!data.region) return { status: false, msg: "Region belum diisi" };
    if (!allowedRegion.includes(data.region as GenshinImpact.Character["region"])) return { status: false, msg: "Region tidak diizinkan" };

    if (data.image?.name) {
      const imageValidation = file.validationImage(data.image);
      if (!imageValidation.status) return { msg: imageValidation.msg, status: false };

      if (!data.image?.name.toLowerCase().includes(data.name.toLowerCase())) {
        return {
          status: false,
          msg: "Nama file tidak mencakup nama karakter. Apa ini file yang benar?",
        };
      }
    } else if (!data?.image?.name) {
      data.image = undefined;
    }

    return { status: true, data };
  },
  async talent(data) {
    if (!data["character-name"]) return { status: false, msg: "Nama karakter belum diisi" };

    for (let i = 1; i <= 3; i++) {
      if (!data[`combat${i}-name` as keyof FormUtils.Genshin.FormDataTalent]) return { status: false, msg: `Data Nama Talent ${i} belum diisi` };

      if (!data[`combat${i}-description` as keyof FormUtils.Genshin.FormDataTalent]) return { status: false, msg: `Data Deskripsi Talent ${i} belum diisi` };

      if (!data[`passive${i}-name` as keyof FormUtils.Genshin.FormDataTalent]) return { status: false, msg: `Data Nama passive Talent ${i} belum diisi` };

      if (!data[`passive${i}-description` as keyof FormUtils.Genshin.FormDataTalent]) return { status: false, msg: `Data Passive Deskripsi Talent ${i} belum diisi` };
    }

    for (const key in data) {
      if (key.startsWith("lvl")) {
        if (!data[key as keyof FormUtils.Genshin.FormDataTalent]) return { status: false, msg: `Data masih ada yang kosong` };
      }
    }
    return { status: true, data };
  },
};
