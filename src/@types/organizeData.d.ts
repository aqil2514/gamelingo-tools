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
  }
}
