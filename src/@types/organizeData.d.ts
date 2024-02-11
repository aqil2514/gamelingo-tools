namespace OrganizeData {
  export interface Genshin {
    artifact: (
      data: FormUtils.Genshin.FormDataArtifact,
      imageUrl: string
    ) => GenshinImpact.Artifact;
    weapon: (
      data: FormUtils.Genshin.FormDataWeapon,
      imageUrl: string
    ) => GenshinImpact.Weapon;
    character: (
      data: FormUtils.Genshin.FormDataCharacter,
      imageUrl: string
    ) => GenshinImpact.Character;
  }
}
