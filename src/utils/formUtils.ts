import Material from "@/models/GenshinImpact/Material";
import { file, genshinValidator, getFormData } from "./api";

export const genshin: FormUtils.Genshin = {
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
};
