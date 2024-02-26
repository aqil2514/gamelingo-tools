import { IDMaterial, ENMaterial } from "@/models/GenshinImpact/Material";
import { file } from "./api";
import { adminValidator, genshinValidator } from "./formValidator";
import { adminOrganizing, genshinOrganizing } from "./organizeData";
import { TalentEN, TalentID } from "@/models/GenshinImpact/Talent";
import { ConstellationEN, ConstellationID } from "@/models/GenshinImpact/Constellation";
import { CharacterEN, CharacterID } from "@/models/GenshinImpact/Character";
import { ENArtifact, IDArtifact } from "@/models/GenshinImpact/Artifact";
import { ENWeapon, IDWeapon } from "@/models/GenshinImpact/Weapon";
import { Post } from "@/models/General/Post";
import { DB, supabase } from "@/lib/supabase";
import { User } from "@/models/General/User";

/**
 *
 * Genshin Impact Form Utils
 *
 */

export const genshin: FormUtils.Genshin.Genshin = {
  processMaterial: async (formData, user) => {
    const game: General.Game["game"] = "Genshin Impact";
    const category: General.Game["category"] = "Material";

    const data = Object.fromEntries(formData.entries()) as unknown as FormUtils.Genshin.FormDataMaterial;

    const validation = await genshinValidator.material(data);
    if (!validation.status) return { status: 422, msg: validation.msg };

    let imageUrl: string = "";
    if (validation.data.image) {
      const uploadFile = await file.uploadSingleImage(validation.data.image, game, category);
      imageUrl = uploadFile.secure_url;
    }

    const organizedData = genshinOrganizing.material(validation.data, imageUrl);

    if (data["result-lang"] === "Indonesian") {
      const material = await IDMaterial.create(organizedData);

      await addPost(data, data["result-lang"], game, category, material, user, data.typeMaterial);
    } else if (data["result-lang"] === "English") {
      const material = await ENMaterial.create(organizedData);

      await addPost(data, data["result-lang"], game, category, material, user, data.typeMaterial);
    }

    return {
      msg: "Data material berhasil ditambah",
      status: 200,
      data: organizedData,
    };
  },
  async proccessArtifact(formData, user) {
    const game: General.Game["game"] = "Genshin Impact";
    const category: General.Game["category"] = "Artifact";

    // Ambil data dari form;
    const data = Object.fromEntries(formData.entries()) as unknown as FormUtils.Genshin.FormDataArtifact;

    // Validasi data
    const validation = await genshinValidator.artifact(data);
    if (!validation.status) return { msg: validation.msg, status: 422 };

    let imageUrl: string[] = [];
    // Upload image
    if (validation.images?.length !== 0 && validation.images) {
      const uploadFile = await file.uploadImage(validation.images, game, category);
      imageUrl = uploadFile.map((file) => file.secure_url);
    }

    // Penyusunan Data
    const organizedData = genshinOrganizing.artifact(validation.data, imageUrl);

    // Tambah ke database
    if (data["result-lang"] === "Indonesian") {
      const artifact = await IDArtifact.create(organizedData);

      await addPost(data, data["result-lang"], game, category, artifact, user, data.name);
    } else if (data["result-lang"] === "English") {
      const artifact = await ENArtifact.create(organizedData);

      await addPost(data, data["result-lang"], game, category, artifact, user, data.name);
    }

    return {
      msg: "Tambah data artefak berhasil",
      status: 200,
      data: organizedData,
    };
  },
  async processWeapon(formData, user) {
    const game: General.Game["game"] = "Genshin Impact";
    const category: General.Game["category"] = "Weapon";

    // Ambil Data
    const data = Object.fromEntries(formData.entries()) as unknown as FormUtils.Genshin.FormDataWeapon;

    // Validasi
    const validation = await genshinValidator.weapon(data);
    if (!validation.status) return { status: 422, msg: validation.msg };

    // Upload Image jika ada
    let imageUrl = "";
    if (validation.data.image) {
      const uploadFile = await file.uploadSingleImage(validation.data.image, game, category);
      imageUrl = uploadFile.secure_url;
    }

    // data final
    const organizedData = genshinOrganizing.weapon(validation.data, imageUrl);

    if (data["result-lang"] === "Indonesian") {
      const weapon = await IDWeapon.create(organizedData);

      await addPost(data, data["result-lang"], game, category, weapon, user, data.type);
    } else if (data["result-lang"] === "English") {
      const weapon = await ENWeapon.create(organizedData);

      await addPost(data, data["result-lang"], game, category, weapon, user, data.type);
    }
    return { status: 200, data: organizedData };
  },
  async proccessCharacter(formData, user) {
    const game: General.Game["game"] = "Genshin Impact";
    const category: General.Game["category"] = "Character";

    // Ambil Data
    const data = Object.fromEntries(formData.entries()) as unknown as FormUtils.Genshin.FormDataCharacter;

    // Validasi
    const validation = await genshinValidator.character(data);
    if (!validation.status) return { status: 422, msg: validation.msg };

    // Upload Image jika ada
    let imageUrl = "";
    if (validation.data.image) {
      const uploadFile = await file.uploadSingleImage(validation.data.image, game, category);
      imageUrl = uploadFile.secure_url;
    }

    const organizedData = genshinOrganizing.character(validation.data, imageUrl);

    if (data["result-lang"] === "English") {
      const character = await CharacterEN.create(organizedData);

      await addPost(data, data["result-lang"], game, category, character, user, data.element);
    } else if (data["result-lang"] === "Indonesian") {
      const character = await CharacterID.create(organizedData);

      await addPost(data, data["result-lang"], game, category, character, user, data.element);
    }

    return { status: 200, organizedData };
  },
  async processTalent(formData, user) {
    const game: General.Game["game"] = "Genshin Impact";
    const category: General.Game["category"] = "Character";

    // Ambil Data
    const data = Object.fromEntries(formData.entries()) as unknown as FormUtils.Genshin.FormDataTalent;

    // Validasi
    const validation = await genshinValidator.talent(data);
    if (!validation.status) return { status: 422, msg: validation.msg };

    const organizedData = genshinOrganizing.talent(data);

    if (data["result-lang"] === "Indonesian") {
      const talent = await TalentID.create(organizedData);

      await addPost(data, data["result-lang"], game, category, talent, user, data["character-name"]);
    } else if (data["result-lang"] === "English") {
      const talent = await TalentEN.create(organizedData);

      await addPost(data, data["result-lang"], game, category, talent, user, data["character-name"]);
    }

    return { status: 200, data: organizedData };
  },
  async processConstellation(formData, user) {
    const game: General.Game["game"] = "Genshin Impact";
    const category: General.Game["category"] = "Character";
    //Ambil data
    const data = Object.fromEntries(formData.entries()) as unknown as FormUtils.Genshin.FormDataConstellation;

    // Validasi
    const validation = await genshinValidator.constellation(data);
    if (!validation.status) return { status: 422, msg: validation.msg };

    // Susun adta
    const organizedData = genshinOrganizing.constellation(data);

    if (data["result-lang"] === "Indonesian") {
      const constellation = await ConstellationID.create(organizedData);

      await addPost(data, data["result-lang"], game, category, constellation, user, data.charName);
    } else if (data["result-lang"] === "English") {
      const constellation = await ConstellationEN.create(organizedData);

      await addPost(data, data["result-lang"], game, category, constellation, user, data.charName);
    }

    return { status: 200, data: organizedData };
  },
};

/**
 *
 * Admin AccountFormApi utils
 *
 */

export const admin: FormUtils.Account.AccountFormApi = {
  async processUser(formData) {
    const validation = await adminValidator.user(formData);
    if (!validation.status) return { status: 422, msg: validation.msg };

    const organizedData = adminOrganizing.user(formData);

    try {
      await supabase
        .from(DB.user)
        .update({
          email: organizedData.email,
          name: organizedData.name,
          passwordExisting: organizedData.passwordExisting,
          account_verified: organizedData.account_verified,
          role: organizedData.role,
          image: organizedData.image,
        } as Account.User)
        .eq("id", organizedData.id);
      await User.findOneAndUpdate(
        { userId: organizedData.id },
        {
          username: organizedData.username,
          email: organizedData.email,
          name: organizedData.name,
        }
      );
      console.log("Ganti sukses")
    } catch (error) {
      
      console.log("Ganti gagal:", error)
    }


    return { status: 200, organizedData };
  },
};

/**
 * Untuk menambahkan post
 * @param data  - Data yang dari form
 * @param lang - Bahasa dari data yang ditambahkan
 * @param gameName - Nama game
 * @param gameTopic - Topic atau kategorinya
 * @param parent - Mongoose Create document
 * @param user - User
 * @param firstTag - Tag Pertama
 */
async function addPost(data: any, lang: General.PostDocument["lang"], gameName: General.PostDocument["game"]["name"], gameTopic: General.PostDocument["game"]["topic"], parent: any, user: Account.User, firstTag: string) {
  const postData: General.PostDocument = {
    title: data.name,
    lang: lang,
    game: {
      name: gameName,
      topic: gameTopic,
    },
    content: parent._id,
    author: user.name,
    tags: [firstTag, gameName, gameTopic],
  };

  await Post.create(postData);
}
