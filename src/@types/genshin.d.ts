namespace GenshinImpact {
  export interface Character {
    _id?: string;
    name: string;
    description: string;
    ascendStatus: string;
    ascendMaterial?: Material[];
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
    name: string;
    subStatus: string;
    refinement: Refinement[];
    lore: string;
    rarity: string;
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
    typeMaterial:
      | "Character Ascension"
      | "Weapon Ascension"
      | "Weapon and Character Material"
      | "Talent Material";
    rarity: string;
    lore: string;
    gainedFrom?: string[];
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
      setName?: string;
      setValue?: string;
    }[];
    rarity: string[];
    source: string;
  }
}
