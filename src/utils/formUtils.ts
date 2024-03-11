import { IDMaterial, ENMaterial } from "@/models/GenshinImpact/Material";
import { file } from "./api";
import { adminValidator, evertaleValidator, genshinValidator } from "./formValidator";
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
  processMaterial: async (formData, user, config) => {
    if (!config) throw new Error("Konfigurasi diperlukan");
    const { action, oldId, lang } = config;

    // <<<<< Local Variabel >>>>>
    const game: General.Game["game"] = "Genshin Impact";
    const category: General.Game["category"] = "Material";
    let imageUrl: string = "";

    // <<<<< Ambil Data >>>>>
    const data = Object.fromEntries(formData.entries()) as unknown as FormUtils.Genshin.FormDataMaterial;

    // <<<<< Validasi >>>>>
    const validation = await genshinValidator.material(data);
    if (!validation.status) return { status: 422, msg: validation.msg };

    // <<<<< Upload Gambar jika ada >>>>>
    if (validation.data.image) {
      const uploadFile = await file.uploadSingleImage(validation.data.image, game, category);
      imageUrl = uploadFile.secure_url;
    }

    // <<<<< Penyusunan Data >>>>>
    const organizedData = genshinOrganizing.material(validation.data, imageUrl);

    // <<<<< Tambah ke Database >>>>>
    if (action === "add") {
      if (data["result-lang"] === "Indonesian") {
        const material = await IDMaterial.create(organizedData);

        await post.addPost(data, { lang: data["result-lang"], gameName: game, gameTopic: category, parent: material, user });
      } else if (data["result-lang"] === "English") {
        const material = await ENMaterial.create(organizedData);

        await post.addPost(data, { lang: data["result-lang"], gameName: game, gameTopic: category, parent: material, user });
      }
    }

    // <<<<< Edit data dari Database >>>>>
    else if (action === "edit") {
      if (!oldId) throw new Error("Old ID diperlukan");
      if (lang === "Indonesian") {
        const material = await IDMaterial.findByIdAndUpdate(oldId, organizedData);

        await post.editPost(data, oldId, { lang: data["result-lang"], gameName: game, gameTopic: category, parent: material, user });
      } else if (lang === "English") {
        const material = await ENMaterial.findByIdAndUpdate(oldId, organizedData);

        await post.editPost(data, oldId, { lang: data["result-lang"], gameName: game, gameTopic: category, parent: material, user });
      }
    }

    return {
      msg: "Data material berhasil ditambah",
      status: 200,
      data: organizedData,
    };
  },
  async proccessArtifact(formData, user, config) {
    if (!config) throw new Error("Konfigurasi diperlukan");
    const { action, oldId, lang } = config;

    // <<<<< Local Variabel >>>>>
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
    if (action === "add") {
      if (data["result-lang"] === "Indonesian") {
        const artifact = await IDArtifact.create(organizedData);

        await post.addPost(data, { lang: data["result-lang"], gameName: game, gameTopic: category, parent: artifact, user });
      } else if (data["result-lang"] === "English") {
        const artifact = await ENArtifact.create(organizedData);

        await post.addPost(data, { lang: data["result-lang"], gameName: game, gameTopic: category, parent: artifact, user });
      }
    }

    // <<<<< Edit data dari Database >>>>>
    else if (action === "edit") {
      if (!oldId) throw new Error("Old ID diperlukan");
      if (lang === "Indonesian") {
        const material = await IDArtifact.findByIdAndUpdate(oldId, organizedData);

        await post.editPost(data, oldId, { lang: data["result-lang"], gameName: game, gameTopic: category, parent: material, user });
      } else if (lang === "English") {
        const material = await ENArtifact.findByIdAndUpdate(oldId, organizedData);

        await post.editPost(data, oldId, { lang: data["result-lang"], gameName: game, gameTopic: category, parent: material, user });
      }
    }
    return {
      msg: "Tambah data artefak berhasil",
      status: 200,
      data: organizedData,
    };
  },
  async processWeapon(formData, user, config) {
    if (!config) throw new Error("Konfigurasi diperlukan");
    const { action, oldId, lang } = config;

    // <<<<< Local Variabel >>>>>
    const game: General.Game["game"] = "Genshin Impact";
    const category: General.Game["category"] = "Weapon";

    // <<<<< Ambil Data >>>>>
    const data = Object.fromEntries(formData.entries()) as unknown as FormUtils.Genshin.FormDataWeapon;

    // <<<<< Validasi >>>>>
    const validation = await genshinValidator.weapon(data);
    if (!validation.status) return { status: 422, msg: validation.msg };

    // <<<<< Upload Image jika ada >>>>>
    let imageUrl = "";
    if (validation.data.image) {
      const uploadFile = await file.uploadSingleImage(validation.data.image, game, category);
      imageUrl = uploadFile.secure_url;
    }

    // <<<<< Data final >>>>>
    const organizedData = genshinOrganizing.weapon(validation.data, imageUrl);

    // <<<<< Tambah data ke Database >>>>>
    if (action === "add") {
      if (data["result-lang"] === "Indonesian") {
        const weapon = await IDWeapon.create(organizedData);

        await post.addPost(data, { lang: data["result-lang"], gameName: game, gameTopic: category, parent: weapon, user });
      } else if (data["result-lang"] === "English") {
        const weapon = await ENWeapon.create(organizedData);

        await post.addPost(data, { lang: data["result-lang"], gameName: game, gameTopic: category, parent: weapon, user });
      }
    }

    // <<<<< Edit data dari Database >>>>>
    else if (action === "edit") {
      if (!oldId) throw new Error("Old ID diperlukan");
      if (lang === "Indonesian") {
        const weapon = await IDWeapon.findByIdAndUpdate(oldId, organizedData);

        await post.editPost(data, oldId, { lang: data["result-lang"], gameName: game, gameTopic: category, parent: weapon, user });
      } else if (lang === "English") {
        const weapon = await ENWeapon.findByIdAndUpdate(oldId, organizedData);

        await post.editPost(data, oldId, { lang: data["result-lang"], gameName: game, gameTopic: category, parent: weapon, user });
      }
    }

    return { status: 200, data: organizedData };
  },
  async proccessCharacter(formData, user, config) {
    if (!config) throw new Error("Konfigurasi diperlukan");
    const { action, oldId, lang } = config;

    // <<<<< Local Variabel >>>>>
    const game: General.Game["game"] = "Genshin Impact";
    const category: General.Game["category"] = "Character";

    // <<<<< Ambil Data >>>>>
    const data = Object.fromEntries(formData.entries()) as unknown as FormUtils.Genshin.FormDataCharacter;

    // <<<<< Validasi >>>>>
    const validation = await genshinValidator.character(data);
    if (!validation.status) return { status: 422, msg: validation.msg };

    // <<<<< Upload Image jika ada >>>>>
    let imageUrl = "";
    if (validation.data.image) {
      const uploadFile = await file.uploadSingleImage(validation.data.image, game, category);
      imageUrl = uploadFile.secure_url;
    }

    const organizedData = genshinOrganizing.character(validation.data, imageUrl);

    // <<<<< Tambah ke Data base >>>>

    if (action === "add") {
      if (data["result-lang"] === "English") {
        const character = await CharacterEN.create(organizedData);

        await post.addPost(data, { lang: data["result-lang"], gameName: game, gameTopic: category, parent: character, user });
      } else if (data["result-lang"] === "Indonesian") {
        const character = await CharacterID.create(organizedData);

        await post.addPost(data, { lang: data["result-lang"], gameName: game, gameTopic: category, parent: character, user });
      }
    }

    // <<<<< Edit data dari Database >>>>>
    else if (action === "edit") {
      if (!oldId) throw new Error("Old ID diperlukan");
      if (lang === "Indonesian") {
        const character = await CharacterID.findByIdAndUpdate(oldId, organizedData);

        await post.editPost(data, oldId, { lang: data["result-lang"], gameName: game, gameTopic: category, parent: character, user });
      } else if (lang === "English") {
        const character = await CharacterEN.findByIdAndUpdate(oldId, organizedData);

        await post.editPost(data, oldId, { lang: data["result-lang"], gameName: game, gameTopic: category, parent: character, user });
      }
    }

    return { status: 200, organizedData };
  },
  async processConstellation(formData, user, config) {
    if (!config) throw new Error("Konfigurasi diperlukan");
    const { action, oldId, lang } = config;

    // <<<<< Local Variabel >>>>>
    const game: General.Game["game"] = "Genshin Impact";
    const category: General.Game["category"] = "Constellations";

    // <<<<< Ambil data >>>>>
    const data = Object.fromEntries(formData.entries()) as unknown as FormUtils.Genshin.FormDataConstellation;

    // <<<<< Validasi >>>>>
    const validation = await genshinValidator.constellation(data);
    if (!validation.status) return { status: 422, msg: validation.msg };

    let imageUrl: string[] = [];

    // <<<<< Upload image >>>>>
    if (validation.images?.length !== 0 && validation.images) {
      const uploadFile = await file.uploadImage(validation.images, game, category);
      imageUrl = uploadFile.map((file) => file.secure_url);
    }

    // <<<<< Susun data >>>>>
    const organizedData = genshinOrganizing.constellation(data, imageUrl);

    // <<<<< Tambah ke Data base >>>>

    if (action === "add") {
      if (data["result-lang"] === "Indonesian") {
        const constellation = await ConstellationID.create(organizedData);

        await post.addPost(data, { lang: data["result-lang"], gameName: game, gameTopic: category, parent: constellation, user, aliasName: data.charName });
      } else if (data["result-lang"] === "English") {
        const constellation = await ConstellationEN.create(organizedData);

        await post.addPost(data, { lang: data["result-lang"], gameName: game, gameTopic: category, parent: constellation, user, aliasName: data.charName });
      }
    }
    // <<<<< Edit data dari Database >>>>>
    else if (action === "edit") {
      if (!oldId) throw new Error("Old ID diperlukan");
      if (lang === "Indonesian") {
        const constellation = await ConstellationID.findByIdAndUpdate(oldId, organizedData);

        await post.editPost(data, oldId, { lang: data["result-lang"], gameName: game, gameTopic: category, parent: constellation, user });
      } else if (lang === "English") {
        const constellation = await ConstellationEN.findByIdAndUpdate(oldId, organizedData);

        await post.editPost(data, oldId, { lang: data["result-lang"], gameName: game, gameTopic: category, parent: constellation, user });
      }
    }

    return { status: 200, data: organizedData, test: validation };
  },
  async processTalent(formData, user, config) {
    if (!config) throw new Error("Konfigurasi diperlukan");
    const { action, oldId, lang } = config;

    // <<<<< Local Variabel >>>>>
    const game: General.Game["game"] = "Genshin Impact";
    const category: General.Game["category"] = "Talent";
    const images: string[] = [];

    // <<<<< Ambil Data >>>>>
    const data = Object.fromEntries(formData.entries()) as unknown as FormUtils.Genshin.FormDataTalent;

    // <<<<< Validasi >>>>>
    const validation = await genshinValidator.talent(data);
    if (!validation.status) return { status: 422, msg: validation.msg };

    // <<<<< Upload Image >>>>>
    if (validation.images && validation.images?.length !== 0) {
      const uploadImage = await file.uploadImage(validation.images, game, category);
      images.push(uploadImage.map((img) => img.secure_url)[0]);
    }

    const organizedData = genshinOrganizing.talent(data, images);

    if (action === "add") {
      if (data["result-lang"] === "Indonesian") {
        const talent = await TalentID.create(organizedData);

        await post.addPost(data, { lang: data["result-lang"], gameName: game, gameTopic: category, parent: talent, user, aliasName: data["character-name"] });
      } else if (data["result-lang"] === "English") {
        const talent = await TalentEN.create(organizedData);

        await post.addPost(data, { lang: data["result-lang"], gameName: game, gameTopic: category, parent: talent, user, aliasName: data["character-name"] });
      }
    }
    // <<<<< Edit data dari Database >>>>>
    else if (action === "edit") {
      if (!oldId) throw new Error("Old ID diperlukan");
      if (lang === "Indonesian") {
        const talent = await TalentID.findByIdAndUpdate(oldId, organizedData);

        await post.editPost(data, oldId, { lang: data["result-lang"], gameName: game, gameTopic: category, parent: talent, user });
      } else if (lang === "English") {
        const talent = await TalentEN.findByIdAndUpdate(oldId, organizedData);

        await post.editPost(data, oldId, { lang: data["result-lang"], gameName: game, gameTopic: category, parent: talent, user });
      }
    }

    return { status: 200, data: organizedData };
  },
};

/**
 *
 * Evertale Form Utils
 *
 */

export const evertale: FormUtils.Evertale.ProcessForm = {
  async processCharacter(formData, config) {
    const { action, oldId } = config;

    // <<<<< Local Variable >>>>>
    const game: General.Game["game"] = "Evertale";
    const category: General.GameEvertale["category"] = "Character";
    const images: string[] = [];

    // <<<<< Ambil Data >>>>>
    const data = Object.fromEntries(formData.entries()) as unknown as FormUtils.Evertale.FormDataCharacter;

    // <<<<< Validasi >>>>>
    const validation = await evertaleValidator.character(data);

    // <<<<< Susun Data >>>>>

    // <<<<< Tambah & Edit >>>>>

    return { status: 200, data };
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
          passwordExist: organizedData.passwordExisting,
          account_verified: organizedData.account_verified,
          role: organizedData.role,
          image: organizedData.image,
        } as Account.UsersLogin)
        .eq("id", organizedData.id);

      await User.findOneAndUpdate(
        { userId: organizedData.id },
        {
          username: organizedData.username,
          email: organizedData.email,
          name: organizedData.name,
        }
      );
    } catch (error) {
      console.error("Ganti gagal:", error);
    }

    return { status: 200, organizedData };
  },
};

const post: FormUtils.Post.PostAPI = {
  async addPost(data, config) {
    // <<<<< Variabel from config >>>>>
    const { lang, gameName, gameTopic, parent, user, autoTag = true, tag, aliasName } = config;

    if (!autoTag && (!tag || tag.length === 0)) throw new Error("Tag harus diberikan jika autoTag disetting false");
    if (!data.name && !aliasName) throw new Error("Data Name tidak ada. Harus gunakan aliasName");

    const postData: General.PostDocument = {
      title: data.name ? data.name : aliasName,
      lang: lang,
      game: {
        name: gameName,
        topic: gameTopic,
      },
      content: parent._id,
      author: user.name,
      tags: autoTag ? [gameName, gameTopic] : tag ?? [],
    };

    await Post.create(postData);
  },
  async editPost(data, oldId, config) {
    // <<<<< Variabel from config >>>>>
    const { lang, gameName, gameTopic, parent, user, autoTag = true, tag } = config;

    if (!parent) throw new Error("Document parent tidak ditemukan");

    if (!autoTag && (!tag || tag.length === 0)) throw new Error("Tag harus diberikan jika autoTag disetting false");

    const postData: General.PostDocument = {
      title: data.name,
      lang: lang,
      game: {
        name: gameName,
        topic: gameTopic,
      },
      content: parent._id,
      author: user.name,
      tags: autoTag ? [gameName, gameTopic] : tag ?? [],
    };

    await Post.findOneAndUpdate({ content: oldId }, postData);
  },
};
