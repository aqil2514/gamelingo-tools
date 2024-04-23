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
  }
}
