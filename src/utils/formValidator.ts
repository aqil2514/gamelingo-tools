//Genshin Validator API Utils

import { ConstellationEN, ConstellationID } from "@/models/GenshinImpact/Constellation";
import { file } from "./api";
import { File } from "@web-std/file";
import { CharacterEN, CharacterID } from "@/models/GenshinImpact/Character";
import { ENArtifact, IDArtifact } from "@/models/GenshinImpact/Artifact";
import { ENMaterial, IDMaterial } from "@/models/GenshinImpact/Material";
import { ENWeapon, IDWeapon } from "@/models/GenshinImpact/Weapon";
import { DB, UserSelect, supabase } from "@/lib/supabase";
import { allowedRole } from "@/components/general/Data";

/**
 *
 * Genshin Validator
 *
 */

export const genshinValidator: ApiUtils.GenshinValidatorApi = {
  async material(data) {
    // <<<<< Local Variabel >>>>>
    const checkData: Record<string, string> = {
      name: "Nama",
      typeMaterial: "Tipe material",
      lore: "Lore",
      rarity: "Rarity",
    };

    // <<<<< Apakah di dalam database ada material yang serupa? >>>>>
    if (data["result-lang"] === "English") {
      const isThere = await ENMaterial.findOne({ name: data.name });
      if (isThere) return { status: false, msg: "Material is there" };
    } else if (data["result-lang"] === "Indonesian") {
      const isThere = await IDMaterial.findOne({ name: data.name });
      if (isThere) return { status: false, msg: "Material sudah ada" };
    }

    // <<<<< Validation >>>>>
    for (const key in data) {
      // Apakah data terkait sudah diisi?
      if (key === "name" || key === "typeMaterial" || key === "lore" || key === "rarity") {
        if (!data[key]) return { status: false, msg: `${checkData[key]} material belum diisi.` };
      }
    }

    // <<<<< Apakah ada gambar yang dikirim dari client side? >>>>>
    if (data.image && data.image?.name !== "undefined" && data.image?.type !== "application/octet-stream") {
      // Jika ada, lakukan validasi
      const validation = file.validationImage(data.image, { validateName: true, validationName: data.name });
      if (!validation.status) return { status: false, msg: validation.msg };

      // Buat file
      const newFile = new File([data.image], `${data.name}.${data.image.type.split("/")[1]}`, {
        type: data.image.type,
      });
      data.image = newFile;
    } else {
      data.image = undefined;
    }

    return { status: true, data };
  },
  async artifact(data) {
    // <<<<< Local Variabel >>>>>
    const types: string[] = ["flower", "plume", "sands", "goblet", "circlet"];
    const images: File[] = [];

    if (!data.name) return { status: false, msg: "Name artifact harus diisi" };

    // <<<<< Apakah di dalam database ada material yang serupa? >>>>>
    if (data["result-lang"] === "Indonesian") {
      const isThere = await IDArtifact.findOne({ name: data.name });
      if (isThere)
        return {
          status: false,
          msg: `${data.name} sudah ada di database`,
        };
    } else if (data["result-lang"] === "English") {
      const isThere = await ENArtifact.findOne({ name: data.name });
      if (isThere) return { status: false, msg: `${data.name} is there in database` };
    }

    if (!data.rarityList || data.rarityList.length === 0) return { status: false, msg: "Rarity list harus diisi" };
    if (!data.effect2Pc) return { status: false, msg: "Effect 2pc harus diisi" };
    if (!data.effect4Pc) return { status: false, msg: "Effect 4pc harus diisi" };

    for (const type of types) {
      const image = data[`${type}-image` as keyof FormUtils.Genshin.FormDataArtifact] as File | undefined;

      if (!data[`${type}-name` as keyof FormUtils.Genshin.FormDataArtifact]) return { status: false, msg: `${type} name harus diisi` };
      if (!data[`${type}-type` as keyof FormUtils.Genshin.FormDataArtifact]) return { status: false, msg: `${type} type harus diisi` };
      if (!data[`${type}-description` as keyof FormUtils.Genshin.FormDataArtifact]) return { status: false, msg: `${type} description harus diisi` };
      if (!data[`${type}-lore` as keyof FormUtils.Genshin.FormDataArtifact]) return { status: false, msg: `${type} lore harus diisi` };
      if (!image || (image && image?.name !== "undefined") || (!image.name && image?.type !== "application/octet-stream")) {
        (data[`${type}-image` as keyof FormUtils.Genshin.FormDataArtifact] as File | undefined) = undefined;
      } else {
        if (!image.name.includes(`${type}`))
          return {
            status: false,
            msg: `Ini adalah bagian ${type}, nama gambar anda adalah ${image.name}`,
          };

        if (image.size > 1 * 1024 * 1024) {
          return { status: false, msg: "Gambar terlalu besar, maksimal 1 MB" };
        }

        const firstChar = image.name.charAt(0).toUpperCase();
        const newFileName = new File([image], `${data.name} - ${firstChar + image.name.slice(1)}.${image.type.split("/")[1]}`, {
          type: image.type,
        });

        images.push(newFileName);
      }
    }

    return { status: true, data, images };
  },
  async weapon(data) {
    const allowedType: string[] = ["Bow", "Catalyst", "Claymore", "Polearm", "Sword"];
    if (!data.name) return { status: false, msg: "Nama Weapon belum diisi" };

    if (data["result-lang"] === "Indonesian") {
      const isThere = await IDWeapon.findOne({ name: data.name });
      if (isThere) return { status: false, msg: `${data.name} sudah ada di database` };
    } else if (data["result-lang"] === "English") {
      const isThere = await ENWeapon.findOne({ name: data.name });
      if (isThere) return { status: false, msg: `${data.name} is there in database` };
    }
    if (!data.type) return { status: false, msg: "Tipe Weapon belum diisi" };
    if (!allowedType.includes(data.type)) return { status: false, msg: "Tipe weapon tidak diizinkan" };
    if (!data.subStatus) return { status: false, msg: "Sub status weapon belum diisi" };
    if (!data.lore) return { status: false, msg: "Lore weapon belum diisi" };
    if (!data.rarity) return { status: false, msg: "Rarity weapon belum diisi" };
    if (!data["weapon-base-atk"]) return { status: false, msg: "Base Atk weapon belum diisi" };
    if (!data["weapon-base-stat"]) return { status: false, msg: "Base Stat weapon belum diisi" };
    if (!data["passive-name"]) return { status: false, msg: "Passive name weapon belum diisi" };

    for (const key in data) {
      if (key.startsWith("weapon-ref") || key.startsWith("ascend")) {
        if (!data[key as keyof FormUtils.Genshin.FormDataWeapon]) return { status: false, msg: `Data masih ada yang kosong` };
      }
    }

    if (data.image && data.image.type !== "application/octet-stream") {
      const validation = file.validationImage(data.image, { validateName: true, validationName: data.name });
      if (!validation.status) return { status: false, msg: validation.msg };

      const newFile = new File([data.image], `${data.name}.${data.image.type.split("/")[1]}`, {
        type: data.image.type,
      });

      data.image = newFile;
    } else {
      data.image = undefined;
    }

    return { status: true, data };
  },
  async character(data) {
    if (!data.name) return { status: false, msg: "Nama karakter belum ada" };

    if (data["result-lang"] === "Indonesian") {
      const isThere = await CharacterID.findOne({ name: data.name });
      if (isThere) return { status: false, msg: `${data.name} sudah ada di Database` };
    } else if (data["result-lang"] === "English") {
      const isThere = await CharacterEN.findOne({ name: data.name });
      if (isThere) return { status: false, msg: `${data.name} is there in Database` };
    }

    if (!data.description) return { status: false, msg: "Deskripsi karakter belum ada" };
    if (!data.ascendStatus) return { status: false, msg: "Ascend status karakter belum ada" };

    for (const key in data) {
      if (key.startsWith("ascend")) {
        if (!data[key as keyof FormUtils.Genshin.FormDataCharacter]) return { status: false, msg: "Ada data yang belum diisi" };
      }
    }

    if (!data["character-voice-chinese"]) return { status: false, msg: "Actor voice Chinese belum diisi" };
    if (!data["character-voice-english"]) return { status: false, msg: "Actor voice English belum diisi" };
    if (!data["character-voice-japanese"]) return { status: false, msg: "Actor voice Japanese belum diisi" };
    if (!data["character-voice-korean"]) return { status: false, msg: "Actor voice Korean belum diisi" };

    const allowedElement: GenshinImpact.Character["element"][] = ["Anemo", "Cryo", "Dendro", "Geo", "Hydro", "Pyro", "Electro"];
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

    if (data.image && data.image.type !== "application/octet-stream") {
      const imageValidation = file.validationImage(data.image as File, { validateName: "including", validationName: data.name });
      if (!imageValidation.status) return { msg: imageValidation.msg, status: false };

      const newFile = new File([data.image], `${data.name}.${data.image.type.split("/")[1]}`, {
        type: data.image.type,
      });

      data.image = newFile;
    } else if (data.image && data.image.type === "application/octet-stream") {
      data.image = undefined
    }

    return { status: true, data };
  },
  async talent(data) {
    // <<<<< Local Variabel >>>>>
    const images: File[] = [];
    // <<<<< Validation >>>>>

    // Apakah nama sudah diisi?
    if (!data["character-name"]) return { status: false, msg: "Nama karakter belum diisi" };

    /// ***** Periksa semua talent sekaligus *****
    for (let i = 1; i <= 3; i++) {
      /// Apakah nama talent sudah diisi?
      if (!data[`combat${i}-name` as keyof FormUtils.Genshin.FormDataTalent]) return { status: false, msg: `Data Nama Talent ${i} belum diisi` };

      // Apakah deskripsinya sudah diisi?
      if (!data[`combat${i}-description` as keyof FormUtils.Genshin.FormDataTalent]) return { status: false, msg: `Data Deskripsi Talent ${i} belum diisi` };

      // Apakah Nama pasifnya sudah diisi?
      if (!data[`passive${i}-name` as keyof FormUtils.Genshin.FormDataTalent])
        return {
          status: false,
          msg: `Data Nama passive Talent ${i} belum diisi`,
        };

      // Apakah deskripsi pasif suda diisi?
      if (!data[`passive${i}-description` as keyof FormUtils.Genshin.FormDataTalent])
        return {
          status: false,
          msg: `Data Passive Deskripsi Talent ${i} belum diisi`,
        };
    }

    // ***** Periksa banyak data sekaligus *****
    for (const key in data) {
      // ##### Periksa semua data yang diawali dengan lvl #####
      if (key.startsWith("lvl")) {
        // Apakah data sudah diisi?
        if (!data[key as keyof FormUtils.Genshin.FormDataTalent]) return { status: false, msg: `Data masih ada yang kosong` };
      }
      // ##### Image Validation #####
      if (key.includes("icon")) {
        type IconImage = Pick<FormUtils.Genshin.FormDataTalent, "talent-combat1-icon" | "talent-combat2-icon" | "talent-combat3-icon" | "talent-combatsp-icon" | "talent-passive1-icon" | "talent-passive2-icon" | "talent-passive3-icon">;

        // Ubah jadi Undefined jika namanya adalah "undefined"
        if (data[key as keyof IconImage]?.name === "undefined" && data[key as keyof IconImage]?.type === "application/octet-stream") {
          data[key as keyof IconImage] = undefined;
        }
        // Jika bukan, lakukan validasi
        else if (data[key as keyof IconImage]?.name !== "undefined" && data[key as keyof IconImage]?.type !== "application/octet-stream") {
          const validation = file.validationImage(data[key as keyof IconImage] as File, { validateName: true, validationName: data["character-name"] });
          if (!validation.status) return { status: false, msg: validation.msg };

          const filePart = data[key as keyof IconImage] as File;
          const firstName = data["character-name"];
          const secondName = key.split("-")[1].charAt(0).toUpperCase() + key.split("-")[1].slice(1);
          const thirdName = filePart.type.split("/")[1];
          const fileName = `${firstName}-${secondName}.${thirdName}`;

          const newFile = new File([filePart], fileName, { type: filePart?.type });

          images.push(newFile);
        }
      }
    }

    return { status: true, data, images };
  },
  async constellation(data) {
    const images: File[] = [];

    if (!data.charName) return { status: false, msg: "Nama karakter belum diisi" };

    for (const key in data) {
      if (key.startsWith("c") || key.startsWith("d")) {
        if (!data[key as keyof FormUtils.Genshin.FormDataConstellation]) return { status: false, msg: `Data masih ada yang kosong` };
      }
      if (key.includes("icon")) {
        let image = data[key as keyof FormUtils.Genshin.FormDataConstellation] as FormUtils.Genshin.FormDataConstellation["constellation-1-icon"];
        if ( image?.type === "application/octet-stream") {
          data[key as "constellation-1-icon"] = undefined;
        }
        if (data[key as "constellation-1-icon"]) {
          const image = data[key as "constellation-1-icon"] as File;
          const splitName = key.split("-");
          const firstName = splitName[0].charAt(0).toUpperCase() + splitName[0].slice(1);
          const secondName = splitName[1];
          const lastName = splitName[2].charAt(0).toUpperCase() + splitName[2].slice(1);
          const fileName = `${firstName}-${secondName}-${lastName}`;

          const newFile = new File([image], `${data.charName}-${fileName}.${image.type.split("/")[1]}`, { type: image.type });

          images.push(newFile);
        }
      }
    }
    

    if (data["result-lang"] === "English") {
      const isThere = await ConstellationEN.findOne({
        charName: data.charName,
      });
      if (isThere) return { status: false, msg: `${data.charName} is there in Database.` };
    } else if (data["result-lang"] === "Indonesian") {
      const isThere = await ConstellationID.findOne({
        charName: data.charName,
      });
      if (isThere) return { status: false, msg: `${data.charName} sudah ada di Database.` };
    }

    return { status: true, data, images };
  },
};

/**
 *
 * Admin Validator
 *
 */

export const adminValidator: ApiUtils.AdminValidatorApi = {
  async user(data) {
    const user = await supabase.from(DB.user).select("id").eq("id", data["user-id"]);

    if (user.data?.length === 0 || !user.data || !user.data[0]) return { status: false, msg: "Terjadi kesalahan pada pengambilan data user" };

    const oldData = user.data[0];

    for (const key in data) {
      if (key !== "account-verified" && key !== "password-exist" && key !== "image" && key !== "oauth-id") {
        if (!data[key as keyof FormUtils.Account.FormDataUser]) return { status: false, msg: `${key.charAt(0).toUpperCase() + key.slice(1)} belum diisi` };
      }
    }

    if (!allowedRole.includes(data.role)) return { status: false, msg: "Role tidak diizinkan" };

    return { status: true };
  },
};
