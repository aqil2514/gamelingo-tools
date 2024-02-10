export const genshinOrganizing: OrganizeData.Genshin = {
  artifact: (data, imageUrl) => {
    const finalData: GenshinImpact.Artifact = {
      name: data.name,
      type: data.type as GenshinImpact.Artifact["type"],
      set: data.set,
      setBonus: [
        {
          setName: data["setName-1"] as "2 Set Bonus" | "4 Set Bonus",
          setValue: data["setValue-1"],
        },
        {
          setName: data["setName-2"] as "2 Set Bonus" | "4 Set Bonus",
          setValue: data["setValue-2"],
        },
      ],
      rarity: data.rarity,
      source: data.source.split(","),
      image: imageUrl,
    };

    return finalData;
  },
  weapon(data, imageUrl) {
    const finalData: GenshinImpact.Weapon = {
      name: data.name,
      type: data.type as GenshinImpact.Character["weapon"],
      subStatus: data.subStatus,
      refinement: [
        {
          nameRef: data["weap-ref-1"],
          effectRef: data["weap-ref-1-effect"],
        },
        {
          nameRef: data["weap-ref-2"],
          effectRef: data["weap-ref-2-effect"],
        },
        {
          nameRef: data["weap-ref-3"],
          effectRef: data["weap-ref-3-effect"],
        },
        {
          nameRef: data["weap-ref-4"],
          effectRef: data["weap-ref-4-effect"],
        },
        {
          nameRef: data["weap-ref-5"],
          effectRef: data["weap-ref-5-effect"],
        },
      ],
      lore: data.lore,
      rarity: data.rarity,
      image: imageUrl ? imageUrl : undefined
    };

    return finalData;
  },
};
