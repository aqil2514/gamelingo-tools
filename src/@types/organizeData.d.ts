namespace OrganizeData {
  export interface Genshin {
    material: (data: FormUtils.Genshin.FormDataMaterial, imageUrl: string) => GenshinImpact.Material;
    artifact: (data: FormUtils.Genshin.FormDataArtifact, imageUrl: string[]) => GenshinImpact.Artifact;
    weapon: (data: FormUtils.Genshin.FormDataWeapon, imageUrl: string) => GenshinImpact.Weapon;
    character: (data: FormUtils.Genshin.FormDataCharacter, imageUrl: string) => GenshinImpact.Character;
    talent: (data: FormUtils.Genshin.FormDataTalent, imageUrl: string[]) => GenshinImpact.Talent;
    constellation: (data: FormUtils.Genshin.FormDataConstellation, imageUrl: string[]) => GenshinImpact.Constellation;
  }

  export interface Admin {
    user: (data: FormUtils.Account.FormDataUser) => Account.User;
  }
}
