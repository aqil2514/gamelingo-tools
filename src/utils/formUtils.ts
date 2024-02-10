import Material from "@/models/GenshinImpact/Material";
import { file, getFormData } from "./api";
import { genshinValidator } from "./formValidator";
import { genshinOrganizing } from "./organizeData";
import Artifact from "@/models/GenshinImpact/Artifact";

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
  async proccessArtifact(formData) {
    const game: General.Game["game"] = "Genshin Impact";
    const category: General.Game["category"] = "Artifact";

    // Ambil data dari form;
    const data = Object.fromEntries(
      formData.entries()
    ) as unknown as FormUtils.FormDataArtifact;

    // Validasi data
    const validation = await genshinValidator.artifact(data);
    if (!validation.status) return { msg: validation.msg, status: 422 };

    let imageUrl="";
    // Upload image
    if (validation.data.image) {
      const uploadFile = await file.uploadSingleImage(validation.data.image, game, category);
      imageUrl=uploadFile.secure_url;
    }

    // Penyusunan Data
    const organizedData = genshinOrganizing.artifact(validation.data, imageUrl);

    // Tambah ke database
    await Artifact.create(organizedData);

    return { msg: "Tambah data artefak berhasil", status: 200 };
  },
};
