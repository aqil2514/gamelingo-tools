namespace GenshinImpact {
  export interface Character {
    _id?: string;
    name: string;
    description: string;
    ascendStatus: string;
    ascendMaterial?: AscendMaterial;
    rarity: string;
    element: "Cryo" | "Pyro" | "Dendro" | "Geo" | "Hydro" | "Anemo";
    weapon: "Sword" | "Polearm" | "Claymore" | "Bow" | "Catalyst";
    gender: "Female" | "Male" | "Perempuan" | "Pria";
    region: "Mondstadt" | "Liyue" | "Inazuma" | "Sumeru" | "Fontain";
    cv: {
      english: string;
      chinese: string;
      japanese: string;
      korean: string;
    };
    image?: string;
    build?: BuildCharacter;
    talent?: Talent[];
    constellation?: Constellation[];
  }

  interface BuldCharacter {
    weapon: string;
    substitude: string[];
    bestArtifact: string;
    artifactStatus: string[];
    prioritySubStat: string[];
    team: string[];
  }

  interface UpgradeMaterial {
    ascend1: UpgradeMaterialItem[];
    ascend2: UpgradeMaterialItem[];
    ascend3: UpgradeMaterialItem[];
    ascend4: UpgradeMaterialItem[];
    ascend5: UpgradeMaterialItem[];
    ascend6: UpgradeMaterialItem[];
  }

  interface UpgradeMaterialItem {
    name: string;
    count: number;
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

  interface ApiResponseBasicInfo {
    name: string;
    descriptionRaw: string;
    description: string;
  }

  export interface ApiTalentCombatData {
    name: string;
    info?: string;
    description?: string;

    attributes: {
      labels: string[];
      parameters: {
        [key: string]: number[];
      };
    };
  }

  export interface ApiTalentPassiveData {
    name: string;
    description: string;
  }

  export interface ApiTalentCostData {
    id: number;
    name: string;
    count: number;
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
      ascend1: ApiResponseMaterial[];
      ascend2: ApiResponseMaterial[];
      ascend3: ApiResponseMaterial[];
      ascend4: ApiResponseMaterial[];
      ascend5: ApiResponseMaterial[];
      ascend6: ApiResponseMaterial[];
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

  interface ApiResponseMaterial {
    id: number;
    name: string;
    count: number;
  }

  export interface Talent {
    id?: string;
    charName: string;
    combats: {
      combat1: TalentSkill;
      combat2: TalentSkill;
      combat3: TalentSkill;
      combatsp?: TalentSkill;
    };
    passives: {
      passive1: TalentSkill;
      passive2: TalentSkill;
      passive3: TalentSkill;
    };
    costs: {
      lvl2: UpgradeMaterialItem[];
      lvl3: UpgradeMaterialItem[];
      lvl4: UpgradeMaterialItem[];
      lvl5: UpgradeMaterialItem[];
      lvl6: UpgradeMaterialItem[];
      lvl7: UpgradeMaterialItem[];
      lvl8: UpgradeMaterialItem[];
      lvl9: UpgradeMaterialItem[];
      lvl10: UpgradeMaterialItem[];
    };
  }

  interface TalentSkill {
    name: string;
    description: string;
  }

  interface TalentStatus {
    statName: string;
    status: {
      statLvl: string;
      statValue: string;
    }[];
  }

  export interface Constellation {
    id?: string;
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

  interface BasicInfo {
    name: string;
    description: string;
  }

  export interface Weapon {
    _id?: string;
    type: Character["weapon"];
    name: string;
    subStatus: string;
    refinement: Refinement[];
    lore: string;
    rarity: string;
    image?: string;
  }

  export interface Refinement {
    nameRef: string;
    effectRef: string;
  }

  export interface Misc {
    ascendStatus: string[];
    artifactMainStatus: string[];
    artifactSubStatus: string[];
  }

  export interface Material {
    _id?: string;
    name: string;
    typeMaterial?: "Character Ascension" | "Weapon Ascension" | "Weapon and Character Material" | "Talent Material";
    rarity: string;
    lore: string;
    gainedFrom?: string[] | string;
    image?: string;
  }

  export interface Artifact {
    _id?: string;
    name: string;
    type: "Flower of Life" | "Plume of Death" | "Sands of Eon" | "Goblet of Eonothem" | "Circlet of Logos";
    set: string;
    setBonus: {
      setName?: "2 Set Bonus" | "4 Set Bonus";
      setValue?: string;
    }[];
    rarity: string;
    source: string[];
    image: string;
  }
}
