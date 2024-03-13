/**
 * FormUtils API Declaration Typescript
 * Please sort the type alphabetical
 */

namespace FormUtils {
  /** Account Form Utils */
  namespace AccountUtils {
    export interface AccountFormApi {
      processUser: (FormData: FormDataUser) => Promise<Result>;
    }
    export interface FormDataUser {
      name: string;
      username: string;
      email: string;
      role: string;
      image: string;
      "user-id": string;
      "oauth-id": string;
      "password-exist": string;
      "account-verified": string;
    }
  }

  /** Evertale Form Utils */
  namespace Evertale {
    /** Data yang didapat dari form Character */
    export interface FormDataCharacter {
      game: string;
      category: string;
      "status-charName": string;
      "status-isConjured": string;
      "status-charTeam": string;
      "status-charRank": StatusRank;
      "status-charElement": StatusElement;
      "status-charWeapon1": StatusWeapon;
      "status-charWeapon2": StatusWeapon;
      "status-charLeaderSkill": string;
      "status-charConjure": string;
      characterImages: File[];
      "intro-gachaIntroEn"?: string;
      "intro-gachaIntroId"?: string;
      "intro-gachaTextEn"?: string;
      "intro-gachaTextId"?: string;
      "intro-loginTextEn"?: string;
      "intro-loginTextId"?: string;
      "intro-text1En"?: string;
      "intro-text1Id"?: string;
      "intro-text2En"?: string;
      "intro-text2Id"?: string;
      "intro-text3En"?: string;
      "intro-text3Id"?: string;
      "intro-text4En"?: string;
      "intro-text4Id"?: string;
      "intro-new-field1En"?: string;
      "intro-new-field1Id"?: string;
      "intro-new-field2En"?: string;
      "intro-new-field2Id"?: string;
      "intro-new-field3En"?: string;
      "intro-new-field3Id"?: string;
      "intro-new-field4En"?: string;
      "intro-new-field4Id"?: string;
      "profile-part1En": string;
      "profile-part1Id": string;
      "profile-part2En": string;
      "profile-part2Id": string;
      "profile-part3En": string;
      "profile-part3Id": string;
      "active-skill-name-1": string;
      "active-type-1": string;
      "active-skill-spirit-1": string;
      "active-skill-target-1": string;
      "active-skill-tu-1": string;
      "active-skill-desc-en-1": string;
      "active-skill-desc-id-1": string;
      "active-skill-name-2": string;
      "active-type-2": string;
      "active-skill-spirit-2": string;
      "active-skill-target-2": string;
      "active-skill-tu-2": string;
      "active-skill-desc-en-2": string;
      "active-skill-desc-id-2": string;
      "active-skill-name-3": string;
      "active-type-3": string;
      "active-skill-spirit-3": string;
      "active-skill-target-3": string;
      "active-skill-tu-3": string;
      "active-skill-desc-en-3": string;
      "active-skill-desc-id-3": string;
      "active-skill-name-4": string;
      "active-type-4": string;
      "active-skill-spirit-4": string;
      "active-skill-target-4": string;
      "active-skill-tu-4": string;
      "active-skill-desc-en-4": string;
      "active-skill-desc-id-4": string;
      "passive-skill-name-1": string;
      "passive-type-1": string;
      "passive-skill-desc-en-1": string;
      "passive-skill-desc-id-1": string;
      "passive-skill-name-2": string;
      "passive-type-2": string;
      "passive-skill-desc-en-2": string;
      "passive-skill-desc-id-2": string;
      "passive-skill-name-3": string;
      "passive-type-3": string;
      "passive-skill-desc-en-3": string;
      "passive-skill-desc-id-3": string;
      "passive-skill-name-4": string;
      "passive-type-4": string;
      "passive-skill-desc-en-4": string;
      "passive-skill-desc-id-4": string;
      "passive-skill-name-5": string;
      "passive-type-5": string;
      "passive-skill-desc-en-5": string;
      "passive-skill-desc-id-5": string;
      "passive-skill-name-6": string;
      "passive-type-6": string;
      "passive-skill-desc-en-6": string;
      "passive-skill-desc-id-6": string;
    }

    export interface ProcessEvertaleConfig {
      /**
       * Aksi yang diinginkan?
       *
       * Default :"Add"
       *  */
      action: "add" | "edit";

      /**
       * Berlaku jika action adalah edit
       */
      oldId?: string | null;

      /**
       * Bahasa pada data?
       */
      lang?: General.PostDocument["lang"];
    }
    /** API untuk process form */
    export interface ProcessForm {
      processCharacter: (formData: FormData, user: Account.User, config: ProcessEvertaleConfig) => Promise<Result>;
    }

    type StatusRank = "SSR" | "SR" | "R" | "N";
    type StatusElement = "Dark" | "Light" | "Earth" | "Fire" | "Storm" | "Water";
    type StatusWeapon = "Sword" | "Axe" | "Staff" | "Mace" | "GreatSword" | "GreatAxe" | "Spear" | "Hammer" | "Katana";
  }

  /** Genshin Form Utils */
  namespace Genshin {
    export interface FormDataArtifact {
      "result-lang": Language;
      name: string;
      rarityList: string[] | string;
      effect2Pc: string;
      effect4Pc: string;
      "flower-name": string;
      "flower-type": string;
      "flower-description": string;
      "flower-lore": string;
      "plume-name": string;
      "plume-type": string;
      "plume-description": string;
      "plume-lore": string;
      "sands-name": string;
      "sands-type": string;
      "sands-description": string;
      "sands-lore": string;
      "goblet-name": string;
      "goblet-type": string;
      "goblet-description": string;
      "flower-image"?: File;
      "plume-image"?: File;
      "sands-image"?: File;
      "goblet-lore": string;
      "circlet-name": string;
      "circlet-type": string;
      "circlet-description": string;
      "circlet-lore": string;
      "goblet-image"?: File;
      "circlet-image"?: File;
    }

    export interface FormDataArtifactKey {
      key: "name" | "type" | "set" | "setName_1" | "setValue_1" | "setName_2" | "setValue_2" | "rarity" | "image";
    }

    export interface FormDataCharacter {
      "result-lang": Language;
      name: string;
      description: string;
      ascendStatus: string;
      "ascend-1-material-1": string;
      "ascend-1-count-1": string;
      "ascend-1-material-2": string;
      "ascend-1-count-2": string;
      "ascend-1-material-3": string;
      "ascend-1-count-3": string;
      "ascend-1-material-4": string;
      "ascend-1-count-4": string;
      "ascend-2-material-1": string;
      "ascend-2-count-1": string;
      "ascend-2-material-2": string;
      "ascend-2-count-2": string;
      "ascend-2-material-3": string;
      "ascend-2-count-3": string;
      "ascend-2-material-4": string;
      "ascend-2-count-4": string;
      "ascend-2-material-5": string;
      "ascend-2-count-5": string;
      "ascend-3-material-1": string;
      "ascend-3-count-1": string;
      "ascend-3-material-2": string;
      "ascend-3-count-2": string;
      "ascend-3-material-3": string;
      "ascend-3-count-3": string;
      "ascend-3-material-4": string;
      "ascend-3-count-4": string;
      "ascend-3-material-5": string;
      "ascend-3-count-5": string;
      "ascend-4-material-1": string;
      "ascend-4-count-1": string;
      "ascend-4-material-2": string;
      "ascend-4-count-2": string;
      "ascend-4-material-3": string;
      "ascend-4-count-3": string;
      "ascend-4-material-4": string;
      "ascend-4-count-4": string;
      "ascend-4-material-5": string;
      "ascend-4-count-5": string;
      "ascend-5-material-1": string;
      "ascend-5-count-1": string;
      "ascend-5-material-2": string;
      "ascend-5-count-2": string;
      "ascend-5-material-3": string;
      "ascend-5-count-3": string;
      "ascend-5-material-4": string;
      "ascend-5-count-4": string;
      "ascend-5-material-5": string;
      "ascend-5-count-5": string;
      "ascend-6-material-1": string;
      "ascend-6-count-1": string;
      "ascend-6-material-2": string;
      "ascend-6-count-2": string;
      "ascend-6-material-3": string;
      "ascend-6-count-3": string;
      "ascend-6-material-4": string;
      "ascend-6-count-4": string;
      "ascend-6-material-5": string;
      "ascend-6-count-5": string;
      "character-voice-chinese": string;
      "character-voice-english": string;
      "character-voice-japanese": string;
      "character-voice-korean": string;
      rarity: string;
      element: string;
      weapon: string;
      gender: string;
      region: string;
      image?: File;
    }

    export interface FormDataConstellation {
      "result-lang": Language;
      charName: string;
      c1: string;
      d1: string;
      c2: string;
      d2: string;
      c3: string;
      d3: string;
      c4: string;
      d4: string;
      c5: string;
      d5: string;
      c6: string;
      d6: string;
      "constellation-1-icon"?: File;
      "constellation-2-icon"?: File;
      "constellation-3-icon"?: File;
      "constellation-4-icon"?: File;
      "constellation-5-icon"?: File;
      "constellation-6-icon"?: File;
    }

    export interface FormDataMaterial {
      "result-lang": Language;
      name: string;
      typeMaterial: string;
      rarity: string;
      lore: string;
      gainedFrom: string;
      image?: File;
    }

    export interface FormDataTalent {
      "character-name": string;
      "result-lang": "Indonesian" | "English";
      "combat1-name": string;
      "combat1-description": string;
      "combat2-name": string;
      "combat2-description": string;
      "combat3-name": string;
      "combat3-description": string;
      "combatsp-name"?: string;
      "combatsp-description"?: string;
      "passive1-name": string;
      "passive1-description": string;
      "passive2-name": string;
      "passive2-description": string;
      "passive3-name": string;
      "passive3-description": string;
      "lvl2-material-1": string;
      "lvl2-count-1": number;
      "lvl2-material-2": string;
      "lvl2-count-2": number;
      "lvl2-material-3": string;
      "lvl2-count-3": number;
      "lvl3-material-1": string;
      "lvl3-count-1": number;
      "lvl3-material-2": string;
      "lvl3-count-2": number;
      "lvl3-material-3": string;
      "lvl3-count-3": number;
      "lvl4-material-1": string;
      "lvl4-count-1": number;
      "lvl4-material-2": string;
      "lvl4-count-2": number;
      "lvl4-material-3": string;
      "lvl4-count-3": number;
      "lvl5-material-1": string;
      "lvl5-count-1": number;
      "lvl5-material-2": string;
      "lvl5-count-2": number;
      "lvl5-material-3": string;
      "lvl5-count-3": number;
      "lvl6-material-1": string;
      "lvl6-count-1": number;
      "lvl6-material-2": string;
      "lvl6-count-2": number;
      "lvl6-material-3": string;
      "lvl6-count-3": number;
      "lvl7-material-1": string;
      "lvl7-count-1": number;
      "lvl7-material-2": string;
      "lvl7-count-2": number;
      "lvl7-material-3": string;
      "lvl7-count-3": number;
      "lvl7-material-4": string;
      "lvl7-count-4": number;
      "lvl8-material-1": string;
      "lvl8-count-1": number;
      "lvl8-material-2": string;
      "lvl8-count-2": number;
      "lvl8-material-3": string;
      "lvl8-count-3": number;
      "lvl8-material-4": string;
      "lvl8-count-4": number;
      "lvl9-material-1": string;
      "lvl9-count-1": number;
      "lvl9-material-2": string;
      "lvl9-count-2": number;
      "lvl9-material-3": string;
      "lvl9-count-3": number;
      "lvl9-material-4": string;
      "lvl9-count-4": number;
      "lvl10-material-1": string;
      "lvl10-count-1": number;
      "lvl10-material-2": string;
      "lvl10-count-2": number;
      "lvl10-material-3": string;
      "lvl10-count-3": number;
      "lvl10-material-4": string;
      "lvl10-count-4": number;
      "lvl10-material-5": string;
      "lvl10-count-5": number;
      "talent-combat1-icon"?: File;
      "talent-combat2-icon"?: File;
      "talent-combat3-icon"?: File;
      "talent-combatsp-icon"?: File;
      "talent-passive1-icon"?: File;
      "talent-passive2-icon"?: File;
      "talent-passive3-icon"?: File;
    }

    export interface FormDataWeapon {
      "result-lang": Language;
      name: string;
      "weapon-base-atk": string;
      "weapon-base-stat": string;
      subStatus: string;
      type: string;
      lore: string;
      rarity: string;
      "passive-name": string;
      "weapon-ref-r1": string;
      "weapon-ref-r2": string;
      "weapon-ref-r3": string;
      "weapon-ref-r4": string;
      "weapon-ref-r5": string;
      "ascend-1-material-1": string;
      "ascend-1-count-1": string;
      "ascend-1-material-2": string;
      "ascend-1-count-2": string;
      "ascend-1-material-3": string;
      "ascend-1-count-3": string;
      "ascend-1-material-4": string;
      "ascend-1-count-4": string;
      "ascend-2-material-1": string;
      "ascend-2-count-1": string;
      "ascend-2-material-2": string;
      "ascend-2-count-2": string;
      "ascend-2-material-3": string;
      "ascend-2-count-3": string;
      "ascend-2-material-4": string;
      "ascend-2-count-4": string;
      "ascend-3-material-1": string;
      "ascend-3-count-1": string;
      "ascend-3-material-2": string;
      "ascend-3-count-2": string;
      "ascend-3-material-3": string;
      "ascend-3-count-3": string;
      "ascend-3-material-4": string;
      "ascend-3-count-4": string;
      "ascend-4-material-1": string;
      "ascend-4-count-1": string;
      "ascend-4-material-2": string;
      "ascend-4-count-2": string;
      "ascend-4-material-3": string;
      "ascend-4-count-3": string;
      "ascend-4-material-4": string;
      "ascend-4-count-4": string;
      "ascend-5-material-1": string;
      "ascend-5-count-1": string;
      "ascend-5-material-2": string;
      "ascend-5-count-2": string;
      "ascend-5-material-3": string;
      "ascend-5-count-3": string;
      "ascend-5-material-4": string;
      "ascend-5-count-4": string;
      "ascend-6-material-1": string;
      "ascend-6-count-1": string;
      "ascend-6-material-2": string;
      "ascend-6-count-2": string;
      "ascend-6-material-3": string;
      "ascend-6-count-3": string;
      "ascend-6-material-4": string;
      "ascend-6-count-4": string;
      image?: File;
    }

    export interface Genshin {
      /**
       * Proses material Genshin Impact
       * @param formData - Form Data
       * @param user - Info User
       * @param config - Konfigurasi Material
       * @returns Berhasil atau gagal
       */
      processMaterial: (formData: FormData, user: Account.User, config?: ProcessGenshinConfig) => Promise<Result>;

      /**
       * Proses Artifact Genshin Impact
       * @param formData - Form Data
       * @param user - Info User
       * @param config - Konfigurasi Artifact
       * @returns Berhasil atau gagal
       */
      proccessArtifact: (formData: FormData, user: Account.User, config?: ProcessGenshinConfig) => Promise<Result>;

      /**
       * Proses Weapon Genshin Impact
       * @param formData - Form Data
       * @param user - Info User
       * @param config - Konfigurasi Weapon
       * @returns Berhasil atau gagal
       */
      processWeapon: (formData: FormData, user: Account.User, config?: ProcessGenshinConfig) => Promise<Result>;

      /**
       * Proses Character Genshin Impact
       * @param formData - Form Data
       * @param user - Info User
       * @param config - Konfigurasi Character
       * @returns Berhasil atau gagal
       */
      proccessCharacter: (formData: FormData, user: Account.User, config?: ProcessGenshinConfig) => Promise<Result>;

      /**
       * Proses Constellations Genshin Impact
       * @param formData - Form Data
       * @param user - Info User
       * @param config - Konfigurasi Constellations
       * @returns Berhasil atau gagal
       */
      processConstellation: (formData: FormData, user: Account.User, config?: ProcessGenshinConfig) => Promise<Result>;

      /**
       * Proses Talent Genshin Impact
       * @param formData - Form Data
       * @param user - Info User
       * @param config - Konfigurasi Talent
       * @returns Berhasil atau gagal
       */
      processTalent: (formData: FormData, user: Account.User, config?: ProcessGenshinConfig) => Promise<Result>;
    }

    type Language = "Indonesian" | "English";

    export interface ProcessGenshinConfig {
      /**
       * Aksi yang diinginkan?
       *
       * Default :"Add"
       *  */
      action: "add" | "edit";

      /**
       * Berlaku jika action adalah edit
       */
      oldId?: string | null;

      /**
       * Bahasa pada data?
       */
      lang?: General.PostDocument["lang"];
    }
  }

  /** Post Form Utils */
  namespace Post {
    export interface PostAPI {
      /**
       * Menambahkan data ke Collection Mongoose Post
       * @param data Data yang akan ditambahkan
       * @param config Konfigurasi penambahan postingan
       */
      addPost: (data: any, config: ProcessPostConfig) => Promise<void>;
      /**
       * Mengubah data yang ada di Collection Mongoose Post
       * @param data Data yang ingin diubah
       * @param oldId Id lama
       * @param config Konfigurasi
       */
      editPost: (data: any, oldId: string, config: ProcessPostConfig) => Promise<Void>;
    }

    /** Konfigurasi untuk Post API */
    export interface ProcessPostConfig {
      /**
       * Bahasa yang digunakan:
       *
       * "English" | "Indonesian" | "English & Indonesian"*/
      lang: General.PostDocument["lang"];

      /**
       * Nama game ?
       *
       * "Evertale" | "Genshin Impact" | "Mobile Legends"
       */
      gameName: General.PostDocument["game"]["name"];

      /**
       * Topik game yang dibahas ?
       *
       */
      gameTopic: General.PostDocument["game"]["topic"];

      /**
       * Variabel yang digunakan untuk tambah data, contoh:
       *
       * const Test = await Model.create(data)
       */
      parent: any;
      /**
       * Data user yang menambahkan data
       */

      user: Account.User;

      /**
       * Tag otomatis
       *
       * Default: true
       */
      autoTag?: boolean;

      /**
       * Tag yang ditambahkan;
       *
       */
      tag?: string[];

      /**
       * Alias name akan digunakan jika nama default dalam object bukan "name"
       *
       * Contoh, nama default => data.charName
       */
      aliasName?: string;
    }
  }

  interface Result {
    msg?: string;
    data?: any;
    ref?: string;
    status: number;
  }
}
