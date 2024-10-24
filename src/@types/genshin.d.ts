// <<<<< GENSHIN IMPACT DECLARATION TYPESCRIPT >>>>>
// PLEASE SORT THE DATA BY ALPHABETICAL

namespace GenshinImpact {
  // FIXED
  // export interface Character extends General.MongoDBDocument {
  //   lang: "Indonesian" | "English";
  //   name: string;
  //   description: string;
  //   ascendStatus: string;
  //   ascendMaterial?: UpgradeMaterial;
  //   rarity: string;
  //   element: "Cryo" | "Pyro" | "Dendro" | "Geo" | "Hydro" | "Anemo" | "Electro";
  //   weapon: "Sword" | "Polearm" | "Claymore" | "Bow" | "Catalyst";
  //   gender: "Female" | "Male" | "Perempuan" | "Pria";
  //   region: "Mondstadt" | "Liyue" | "Inazuma" | "Sumeru" | "Fontain" | "Snezhnaya" | "Another World";
  //   cv: {
  //     english: string;
  //     chinese: string;
  //     japanese: string;
  //     korean: string;
  //   };
  //   image: {
  //     cover: string,
  //     portrait: string,
  //   };
  //   build?: BuildCharacter;
  //   talent?: Talent[];
  //   constellation?: Constellation[];
  // }

  // type CharacterInfo = Pick<Character, "rarity" | "description" | "element" | "weapon">;

  /**
   * Mewakili karakter dalam Genshin Impact.
   */
  interface Character {
    /**
     * ID dokumen unik untuk karakter.
     * @type {string}
     */
    _id: string;

    /**
     * Nama karakter.
     * @type {string}
     */
    characterName: string;

    /**
     * Versi ramah URL dari nama karakter.
     * @type {string}
     */
    slug: string;

    /**
     * Gambar yang terkait dengan karakter.
     * @type {CharacterImage}
     */
    image: CharacterImage;

    /**
     * Jenis kelamin karakter.
     * @type {"female" | "male"}
     */
    gender: "female" | "male";

    /**
     * Wilayah tempat karakter berasal.
     * @type {"Mondstadt" | "Liyue" | "Inazuma" | "Sumeru" | "Fontain" | "Natlan" | "Snezhnaya" | "Another World"}
     */
    region:
      | "Mondstadt"
      | "Liyue"
      | "Inazuma"
      | "Sumeru"
      | "Fontain"
      | "Natlan"
      | "Snezhnaya"
      | "Another World";

    /**
     * Tipe elemen karakter.
     * @type {"Cryo" | "Pyro" | "Dendro" | "Geo" | "Hydro" | "Anemo" | "Electro"}
     */
    element: "Cryo" | "Pyro" | "Dendro" | "Geo" | "Hydro" | "Anemo" | "Electro";

    /**
     * Tingkat rarity karakter.
     * @type {"4" | "5"}
     */
    rarity: "4" | "5";

    /**
     * Tipe senjata yang digunakan karakter.
     * @type {"Sword" | "Polearm" | "Claymore" | "Bow" | "Catalyst"}
     */
    weapon: "Sword" | "Polearm" | "Claymore" | "Bow" | "Catalyst";

    /**
     * Status ascend karakter.
     * @type {string}
     */
    ascendStatus: string;

    /**
     * Deskripsi singkat tentang karakter.
     * @type {string}
     */
    description: string;

    /**
     * Informasi pengisi suara untuk karakter.
     * @type {CharacterVoiceActor}
     */
    cv: CharacterVoiceActor;

    /**
     * Tanggal saat karakter dibuat.
     * @type {string}
     */
    createdAt: string;

    /**
     * Tanggal saat karakter terakhir diperbarui.
     * @type {string}
     */
    updatedAt: string;

    /**
     * Daftar talenta yang terkait dengan karakter.
     * @type {Talent[]}
     */
    talents: Talent[];
  }

  /**
   * Mewakili gambar yang terkait dengan karakter.
   */

  interface ChildText {
    text: string; // Teks yang disimpan dalam children
    marks: string[]; // Daftar marks yang diterapkan pada teks ini
  }

  interface MarkDef {
    _key: string;
    markType: string; // Misalnya "strong", "em", dll.
    text: string; // Teks yang terkait dengan mark
  }

  interface CharacterImage {
    /**
     * URL gambar sampul karakter.
     * @type {string}
     */
    cover: string;

    /**
     * URL gambar potret karakter.
     * @type {string}
     */
    portrait: string;
  }

  interface Talent {
    /** Nama Talent */
    talentName: string;
    /** Deskripsi Talent */
    description: TalentDescription[];
    /** Url gambar talent */
    image: string; // URL untuk gambar talent
  }

  interface TalentDescription {
    /** Kunci unik untuk blok deskripsi */
    _key: string;
    /** Array yang menyimpan teks dan marks */
    text: ChildText[];
    /** Arra definisi mark */
    markDefs: MarkDef[];
    /** menyimpan informasi jika ada list */
    listItem: string | null;
  }

  type CharacterTable = Pick<
    Character,
    | "_id"
    | "characterName"
    | "element"
    | "rarity"
    | "region"
    | "weapon"
    | "image"
    | "slug"
  >;

  interface CharacterVoiceActor {
    english: string;
    chinese: string;
    japanese: string;
    korean: string;
  }

  // NON-FIXED
  export interface Artifact extends General.MongoDBDocument {
    name: string;
    rarityList: string[];
    effect2pc: string;
    effect4pc: string;
    effectOther?: string;
    flower: ArtifactSub;
    plume: ArtifactSub;
    sands: ArtifactSub;
    goblet: ArtifactSub;
    circlet: ArtifactSub;
  }

  export type ArtifactDoc = Pick<
    Artifact,
    "_id" | "name" | "rarityList" | "effect2pc" | "effect4pc" | "effectOther"
  >;

  export interface ArtifactSub {
    name: string;
    description: string;
    lore: string;
    type: string;
    image?: string;
  }

  export type ArtifactSubDoc = Pick<
    Artifact,
    "flowe" | "plume" | "sands" | "goblet" | "circlet"
  >;

  export type ArtifactTable = Pick<Artifact, "_id" | "name" | "rarityList">;

  export interface ApiResponseArtifacts {
    id: number;
    rarityList: string[] | string;
    name: string;
    effect2Pc: string;
    effect4Pc: string;
    flower: {
      name: string;
      relicType: string;
      relicText: string;
      description: string;
      story: string;
    };
    plume: {
      name: string;
      relicType: string;
      relicText: string;
      description: string;
      story: string;
    };
    sands: {
      name: string;
      relicType: string;
      relicText: string;
      description: string;
      story: string;
    };
    goblet: {
      name: string;
      relicType: string;
      relicText: string;
      description: string;
      story: string;
    };
    circlet: {
      name: string;
      relicType: string;
      relicText: string;
      description: string;
      story: string;
    };
    images: {
      flower: string;
      plume: string;
      sands: string;
      goblet: string;
      circlet: string;
      filename_flower: string;
      filename_plume: string;
      filename_sands: string;
      filename_goblet: string;
      filename_circlet: string;
      mihoyo_flower: string;
      mihoyo_plume: string;
      mihoyo_sands: string;
      mihoyo_goblet: string;
      mihoyo_circlet: string;
    };
    version: string;
  }

  interface ApiResponseBasicInfo {
    name: string;
    descriptionRaw: string;
    description: string;
  }

  export interface ApiResponseCharacter {
    id: number;
    name: string;
    title: string;
    description: string;
    weaponType: string;
    weaponText: string;
    bodyType: string;
    gender: string;
    qualityType: string;
    rarity: number;
    birthdaymmdd: string;
    birthday: string;
    elementType: string;
    elementText: string;
    affiliation: string;
    associationType: string;
    region: string;
    substatType: string;
    substatText: string;
    constellation: string;
    cv: {
      english: string;
      chinese: string;
      japanese: string;
      korean: string;
    };
    costs: {
      ascend1: ApiTalentCostData[];
      ascend2: ApiTalentCostData[];
      ascend3: ApiTalentCostData[];
      ascend4: ApiTalentCostData[];
      ascend5: ApiTalentCostData[];
      ascend6: ApiTalentCostData[];
    };
    images: {
      card: string;
      portrait: string;
      cover1: string;
      cover2: string;
      hoyolabAvatar: string;
      filenameIcon: string;
      filenameIconCard: string;
      filenameSideIcon: string;
      filenameGachaSplash: string;
      filenameGachaSlice: string;
      mihoyoIcon: string;
      mihoyoSideIcon: string;
    };
    url: {
      fandom: string;
    };
    version: string;
  }

  export interface ApiResponseConstellations {
    id?: number;
    name: string;
    c1: ApiResponseBasicInfo;
    c2: ApiResponseBasicInfo;
    c3: ApiResponseBasicInfo;
    c4: ApiResponseBasicInfo;
    c5: ApiResponseBasicInfo;
    c6: ApiResponseBasicInfo;
    images: {
      filename_c1: string;
      filename_c2: string;
      filename_c3: string;
      filename_c4: string;
      filename_c5: string;
      filename_c6: string;
      filename_constellation: string;
    };
    version: string;
  }

  export interface ApiResponseMaterial {
    id: number;
    name: string;
    rarity: number;
    sortRank: number;
    description: string;
    category: string;
    typeText: string;
    sources: string[] | string;
    images: {
      filename_icon: string;
    };
    version: string;
  }

  export interface ApiResponseTalent {
    id: number;
    name: string;
    combat1: ApiTalentCombatData;
    combat2: ApiTalentCombatData;
    combat3: ApiTalentCombatData;
    combatsp?: ApiTalentCombatData;
    passive1: ApiTalentPassiveData;
    passive2: ApiTalentPassiveData;
    passive3: ApiTalentPassiveData;
    costs: {
      lvl2: ApiTalentCostData[];
      lvl3: ApiTalentCostData[];
      lvl4: ApiTalentCostData[];
      lvl5: ApiTalentCostData[];
      lvl6: ApiTalentCostData[];
      lvl7: ApiTalentCostData[];
      lvl8: ApiTalentCostData[];
      lvl9: ApiTalentCostData[];
      lvl10: ApiTalentCostData[];
    };
    images: {
      combat1: string;
      combat2: string;
      combatsp?: string;
      combat3: string;
      passive1: string;
      passive2: string;
      passive3: string;
    };
    version: string;
  }

  export interface ApiResponseWeapon {
    id: number;
    name: string;
    description: string;
    descriptionRaw: string;
    weaponType: string;
    weaponText: string;
    rarity: number;
    story: string;
    baseAtkValue: number;
    mainStatType: string;
    mainStatText: string;
    baseStatText: string;
    effectName: string;
    effectTemplateRaw: string;
    r1: {
      description: string;
      values: string[];
    };
    r2: {
      description: string;
      values: string[];
    };
    r3: {
      description: string;
      values: string[];
    };
    r4: {
      description: string;
      values: string[];
    };
    r5: {
      description: string;
      values: string[];
    };
    costs: {
      ascend1: [
        {
          id: number;
          name: string;
          count: number;
        },
        {
          id: number;
          name: string;
          count: number;
        },
        {
          id: number;
          name: string;
          count: number;
        },
        {
          id: number;
          name: string;
          count: number;
        },
      ];
      ascend2: [
        {
          id: number;
          name: string;
          count: number;
        },
        {
          id: number;
          name: string;
          count: number;
        },
        {
          id: number;
          name: string;
          count: number;
        },
        {
          id: number;
          name: string;
          count: number;
        },
      ];
      ascend3: [
        {
          id: number;
          name: string;
          count: number;
        },
        {
          id: number;
          name: string;
          count: number;
        },
        {
          id: number;
          name: string;
          count: number;
        },
        {
          id: number;
          name: string;
          count: number;
        },
      ];
      ascend4: [
        {
          id: number;
          name: string;
          count: number;
        },
        {
          id: number;
          name: string;
          count: number;
        },
        {
          id: number;
          name: string;
          count: number;
        },
        {
          id: number;
          name: string;
          count: number;
        },
      ];
      ascend5: [
        {
          id: number;
          name: string;
          count: number;
        },
        {
          id: number;
          name: string;
          count: number;
        },
        {
          id: number;
          name: string;
          count: number;
        },
        {
          id: number;
          name: string;
          count: number;
        },
      ];
      ascend6: [
        {
          id: number;
          name: string;
          count: number;
        },
        {
          id: number;
          name: string;
          count: number;
        },
        {
          id: number;
          name: string;
          count: number;
        },
        {
          id: number;
          name: string;
          count: number;
        },
      ];
    };
    images: {
      icon: string;
      awakenicon: string;
      filename_icon: string;
      filename_awakenIcon: string;
      filename_gacha: string;
      mihoyo_icon: string;
      mihoyo_awakenIcon: string;
    };
    version: string;
  }

  export interface ApiTalentCombatData {
    name: string;
    description: string;

    attributes?: {
      labels: string[];
      parameters: {
        [key: string]: number[];
      };
    };
  }

  export interface ApiTalentCombatDataIcon extends ApiTalentCombatData {
    icon?: string;
  }

  export interface ApiTalentCostData {
    id: number;
    name: string;
    count: number;
  }

  export interface ApiTalentPassiveData {
    name: string;
    description: string;
  }

  /**
   * Tipe data yang sering digunakan
   *
   * Terdapat:
   * - name : string
   * - description : string
   * - icon : string (optional)
   */
  interface BasicInfo {
    name: string;
    description: string;
    icon?: string;
  }

  interface BuildCharacter {
    weapon: string;
    substitude: string[];
    bestArtifact: string;
    artifactStatus: string[];
    prioritySubStat: string[];
    team: string[];
  }

  export interface Constellation extends General.MongoDBDocument {
    charName: string;
    constellation: {
      c1: BasicInfo;
      c2: BasicInfo;
      c3: BasicInfo;
      c4: BasicInfo;
      c5: BasicInfo;
      c6: BasicInfo;
    };
  }

  export type ConstellationTable = Omit<Constellation, "constellation">;

  export interface GeneralInfo {
    name: string;
    id: string;
    image: string;
  }

  export interface Material extends General.MongoDBDocument {
    name: string;
    typeMaterial: string;
    rarity?: string;
    lore: string;
    gainedFrom: string[] | string;
    image?: string;
  }

  export type MaterialTable = Pick<
    Material,
    "name" | "typeMaterial" | "rarity" | "_id"
  >;

  export interface Misc {
    ascendStatus: string[];
    artifactMainStatus: string[];
    artifactSubStatus: string[];
  }

  // export interface Talent extends General.MongoDBDocument {
  //   charName: string;
  //   combats: {
  //     combat1: ApiTalentCombatDataIcon;
  //     combat2: ApiTalentCombatDataIcon;
  //     combat3: ApiTalentCombatDataIcon;
  //     combatsp?: ApiTalentCombatDataIcon;
  //   };
  //   passives: {
  //     passive1: BasicInfo;
  //     passive2: BasicInfo;
  //     passive3: BasicInfo;
  //   };
  //   costs: {
  //     lvl2: UpgradeMaterialItem[];
  //     lvl3: UpgradeMaterialItem[];
  //     lvl4: UpgradeMaterialItem[];
  //     lvl5: UpgradeMaterialItem[];
  //     lvl6: UpgradeMaterialItem[];
  //     lvl7: UpgradeMaterialItem[];
  //     lvl8: UpgradeMaterialItem[];
  //     lvl9: UpgradeMaterialItem[];
  //     lvl10: UpgradeMaterialItem[];
  //   };
  // }

  // export type TalentTable = Pick<Talent, "_id" | "charName">;

  // interface TalentStatus {
  //   statName: string;
  //   status: {
  //     statLvl: string;
  //     statValue: string;
  //   }[];
  // }

  export interface UpgradeMaterial {
    ascend1: UpgradeMaterialItem[];
    ascend2: UpgradeMaterialItem[];
    ascend3: UpgradeMaterialItem[];
    ascend4: UpgradeMaterialItem[];
    ascend5: UpgradeMaterialItem[];
    ascend6: UpgradeMaterialItem[];
  }

  export interface UpgradeMaterialItem {
    name: string;
    count: number;
  }

  export interface Weapon extends General.MongoDBDocument {
    name: string;
    type: string;
    baseAtk: string;
    baseStat: string;
    subStatus: string;
    lore: string;
    passive: {
      passiveName: string;
      r1: string;
      r2: string;
      r3: string;
      r4: string;
      r5: string;
    };
    ascend1: UpgradeMaterialItem[];
    ascend2: UpgradeMaterialItem[];
    ascend3: UpgradeMaterialItem[];
    ascend4: UpgradeMaterialItem[];
    ascend5: UpgradeMaterialItem[];
    ascend6: UpgradeMaterialItem[];
    rarity: string;
    image?: string;
  }

  type WeaponTable = Pick<Weapon, "_id" | "name" | "type" | "rarity">;
}
