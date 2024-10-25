namespace ServerGameLingo {
  namespace GenshinPage {
    export interface CharacterPage {
      talent: {
        data: GenshinImpact.TalentSubLang;
        icon: GenshinImpact.Talent["icon"];
      };
      constellation: {
        data: GenshinImpact.ConstellationSubLang;
        icon: GenshinImpact.Constellation["icon"];
      };
    }
  }
  namespace GenshinAdmin {
    export interface CharacterDataTable {
      name: GenshinImpact.Character["name"];
      data: GenshinImpact.CharacterTable;
    }
    export interface CharacterShortDetail {
      name: GenshinImpact.Character["name"];
      _id: GenshinImpact.Character["_id"];
      image: GenshinImpact.Character["image"];
      detail: GenshinImpact.SubCharacter;
      createdAt: GenshinImpact.Character["createdAt"];
    }
    export interface ArtifactShortDetail {
      name: string;
      rarityList: GenshinImpact.ArtifactSubField["rarityList"];
      effect2pc: GenshinImpact.ArtifactSubField["effect2pc"];
      effect4pc: GenshinImpact.ArtifactSubField["effect4pc"];
      effectOther?: GenshinImpact.ArtifactSubField["effectOther"];
      createdAt: string;
    }
    export interface ConstellationShortDetail{
      charName : string;
      createdAt: string;
      data : GenshinImpact.ConstellationSubLang;
    }
    export interface TalentShortDetail{
      charName: string;
      createdAt: string;
      data: GenshinImpact.TalentSubLang;
      combats: GenshinImpact.TalentSubLang["combats"];
      icons: GenshinImpact.Talent["icon"];
    }
  }
}
