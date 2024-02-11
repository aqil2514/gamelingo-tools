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
    gender: "Female" | "Male";
    region: "Mondstadt" | "Liyue " | "Inazuma" | "Sumeru" | "Fontain";
    cv: {
      english: string;
      chinese: string;
      japanese: string;
      korean: string;
    };
    image: string;
    build: {
      weapon: string;
      substitude: string[];
      bestArtifact: string;
      artifactStatus: string[];
      prioritySubStat: string[];
      team: string[];
    };
    talent: Talent[];
    constellation: Constellation[];
  }

  interface AscendMaterial{
    ascend1: AscendMaterialItem[],
    ascend2: AscendMaterialItem[],
    ascend3: AscendMaterialItem[],
    ascend4: AscendMaterialItem[],
    ascend5: AscendMaterialItem[],
    ascend6: AscendMaterialItem[],
  }

interface AscendMaterialItem{
  name:string, 
  count:number,
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
    talentName: string;
    talentImage?: string;
    infoTalent: string;
    statsSkill?: {
      statName: string;
      statValue: string;
    }[];
  }

  export interface Constellation {
    constName: string;
    constEffect: string;
  }

  export interface Weapon {
    _id?: string;
    type: Character["weapon"];
    name: string;
    subStatus: string;
    refinement: Refinement[];
    lore: string;
    rarity: string;
    image?:string;
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
    typeMaterial?:
      | "Character Ascension"
      | "Weapon Ascension"
      | "Weapon and Character Material"
      | "Talent Material";
    rarity: string;
    lore: string;
    gainedFrom?: string[] | string;
    image?: string;
  }

  export interface Artifact {
    _id?: string;
    name: string;
    type:
      | "Flower of Life"
      | "Plume of Death"
      | "Sands of Eon"
      | "Goblet of Eonothem"
      | "Circlet of Logos";
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
