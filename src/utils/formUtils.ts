import Material from "@/models/GenshinImpact/Material";
import { file, getFormData } from "./api";
import { genshinValidator } from "./formValidator";
import { genshinOrganizing } from "./organizeData";
import Weapon from "@/models/GenshinImpact/Weapon";
import { TalentEN, TalentID } from "@/models/GenshinImpact/Talent";
import {
  ConstellationEN,
  ConstellationID,
} from "@/models/GenshinImpact/Constellation";
import { CharacterEN, CharacterID } from "@/models/GenshinImpact/Character";
import { ENArtifact, IDArtifact } from "@/models/GenshinImpact/Artifact";

export const genshin: FormUtils.Genshin.Genshin = {
  processMaterial: async (formData: FormData) => {
    const game: General.Game["game"] = "Genshin Impact";
    const category: General.Game["category"] = "Material";

    const data = getFormData(formData, "Genshin Impact", "Material");
    if (!data) return { msg: "Data tidak Valid", status: 422 };
    const { name, lore, gainedFrom, rarity, typeMaterial, image } = data;

    const materialValidation = await genshinValidator.material({
      name,
      image,
      lore,
      gainedFrom,
      rarity,
      typeMaterial,
    });

    if (!materialValidation.status)
      return { msg: materialValidation.msg, status: 422 };

    const imageValidation = file.validationImageArray(image);
    if (!imageValidation.status)
      return { msg: imageValidation.msg, status: 422 };

    const uploadFile = await file.uploadImage(image, game, category);

    const finalData: GenshinImpact.Material = {
      name,
      lore,
      gainedFrom,
      rarity,
      image: uploadFile[0].secure_url,
      typeMaterial,
    };

    await Material.create(finalData);
    return { msg: "Data material berhasil ditambah", status: 200 };
  },
  async proccessArtifact(formData) {
    const game: General.Game["game"] = "Genshin Impact";
    const category: General.Game["category"] = "Artifact";

    // Ambil data dari form;
    const data = Object.fromEntries(
      formData.entries(),
    ) as unknown as FormUtils.Genshin.FormDataArtifact;

    // Validasi data
    const validation = await genshinValidator.artifact(data);
    if (!validation.status) return { msg: validation.msg, status: 422 };

    let imageUrl: string[] = [];
    // Upload image
    if (validation.images?.length !== 0 && validation.images) {
      const uploadFile = await file.uploadImage(
        validation.images,
        game,
        category,
      );
      imageUrl = uploadFile.map((file) => file.secure_url);
    }

    // Penyusunan Data
    const organizedData = genshinOrganizing.artifact(validation.data, imageUrl);

    // Tambah ke database
    if (data["result-lang"] === "Indonesian")
      await IDArtifact.create(organizedData);
    else if (data["result-lang"] === "English")
      await ENArtifact.create(organizedData);

    return {
      msg: "Tambah data artefak berhasil",
      status: 200,
      data: organizedData,
    };
  },
  async processWeapon(formData) {
    const game: General.Game["game"] = "Genshin Impact";
    const category: General.Game["category"] = "Artifact";

    // Ambil Data
    const data = Object.fromEntries(
      formData.entries(),
    ) as unknown as FormUtils.Genshin.FormDataWeapon;

    // Validasi
    const validation = await genshinValidator.weapon(data);
    if (!validation.status) return { status: 422, msg: validation.msg };

    // Upload Image jika ada
    let imageUrl = "";
    if (validation.data.image) {
      const uploadFile = await file.uploadSingleImage(
        validation.data.image,
        game,
        category,
      );
      imageUrl = uploadFile.secure_url;
    }

    // data final
    const organizedData = genshinOrganizing.weapon(validation.data, imageUrl);

    await Weapon.create(organizedData);

    return { status: 200, organizedData, validation, data };
  },
  async proccessCharacter(formData) {
    const game: General.Game["game"] = "Genshin Impact";
    const category: General.Game["category"] = "Character";

    // Ambil Data
    const data = Object.fromEntries(
      formData.entries(),
    ) as unknown as FormUtils.Genshin.FormDataCharacter;

    // Validasi
    const validation = await genshinValidator.character(data);
    if (!validation.status) return { status: 422, msg: validation.msg };

    // Upload Image jika ada
    let imageUrl = "";
    if (validation.data.image) {
      const uploadFile = await file.uploadSingleImage(
        validation.data.image,
        game,
        category,
      );
      imageUrl = uploadFile.secure_url;
    }

    const organizedData = genshinOrganizing.character(
      validation.data,
      imageUrl,
    );

    if (data["result-lang"] === "English")
      await CharacterEN.create(organizedData);
    else if (data["result-lang"] === "Indonesian")
      await CharacterID.create(organizedData);

    return { status: 200, organizedData };
  },
  async processTalent(formData) {
    const game: General.Game["game"] = "Genshin Impact";
    const category: General.Game["category"] = "Character";

    // Ambil Data
    const data = Object.fromEntries(
      formData.entries(),
    ) as unknown as FormUtils.Genshin.FormDataTalent;

    // Validasi
    const validation = await genshinValidator.talent(data);
    if (!validation.status) return { status: 422, msg: validation.msg };

    const organizedData = genshinOrganizing.talent(data);

    if (data["result-lang"] === "Indonesian")
      await TalentID.create(organizedData);
    else if (data["result-lang"] === "English")
      await TalentEN.create(organizedData);

    return { status: 200, data: organizedData };
  },
  async processConstellation(formData) {
    //Ambil data
    const data = Object.fromEntries(
      formData.entries(),
    ) as unknown as FormUtils.Genshin.FormDataConstellation;

    // Validasi
    const validation = await genshinValidator.constellation(data);
    if (!validation.status) return { status: 422, msg: validation.msg };

    // Susun adta
    const organizedData = genshinOrganizing.constellation(data);

    if (data["result-lang"] === "Indonesian")
      await ConstellationID.create(organizedData);
    else if (data["result-lang"] === "English")
      await ConstellationEN.create(organizedData);

    return { status: 200, data: organizedData };
  },
};
