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
      image: imageUrl ? imageUrl : undefined,
    };

    return finalData;
  },
  character(data, imageUrl) {
    const finalData: GenshinImpact.Character = {
      name: data.name,
      description: data.description,
      ascendStatus: data.ascendStatus,
      ascendMaterial: {
        ascend1: [
          {
            name: data["ascend-1-material-1"],
            count: Number(data["ascend-1-count-1"]),
          },
          {
            name: data["ascend-1-material-2"],
            count: Number(data["ascend-1-count-2"]),
          },
          {
            name: data["ascend-1-material-3"],
            count: Number(data["ascend-1-count-3"]),
          },
          {
            name: data["ascend-1-material-4"],
            count: Number(data["ascend-1-count-4"]),
          },
        ],
        ascend2: [
          {
            name: data["ascend-2-material-1"],
            count: Number(data["ascend-2-count-1"]),
          },
          {
            name: data["ascend-2-material-2"],
            count: Number(data["ascend-2-count-2"]),
          },
          {
            name: data["ascend-2-material-3"],
            count: Number(data["ascend-2-count-3"]),
          },
          {
            name: data["ascend-2-material-4"],
            count: Number(data["ascend-2-count-4"]),
          },
          {
            name: data["ascend-2-material-5"],
            count: Number(data["ascend-2-count-5"]),
          },
        ],
        ascend3: [
          {
            name: data["ascend-3-material-1"],
            count: Number(data["ascend-3-count-1"]),
          },
          {
            name: data["ascend-3-material-2"],
            count: Number(data["ascend-3-count-2"]),
          },
          {
            name: data["ascend-3-material-3"],
            count: Number(data["ascend-3-count-3"]),
          },
          {
            name: data["ascend-3-material-4"],
            count: Number(data["ascend-3-count-4"]),
          },
          {
            name: data["ascend-3-material-5"],
            count: Number(data["ascend-3-count-5"]),
          },
        ],
        ascend4: [
          {
            name: data["ascend-4-material-1"],
            count: Number(data["ascend-4-count-1"]),
          },
          {
            name: data["ascend-4-material-2"],
            count: Number(data["ascend-4-count-2"]),
          },
          {
            name: data["ascend-4-material-3"],
            count: Number(data["ascend-4-count-3"]),
          },
          {
            name: data["ascend-4-material-4"],
            count: Number(data["ascend-4-count-4"]),
          },
          {
            name: data["ascend-4-material-5"],
            count: Number(data["ascend-4-count-5"]),
          },
        ],
        ascend5: [
          {
            name: data["ascend-5-material-1"],
            count: Number(data["ascend-5-count-1"]),
          },
          {
            name: data["ascend-5-material-2"],
            count: Number(data["ascend-5-count-2"]),
          },
          {
            name: data["ascend-5-material-3"],
            count: Number(data["ascend-5-count-3"]),
          },
          {
            name: data["ascend-5-material-4"],
            count: Number(data["ascend-5-count-4"]),
          },
          {
            name: data["ascend-5-material-5"],
            count: Number(data["ascend-5-count-5"]),
          },
        ],
        ascend6: [
          {
            name: data["ascend-6-material-1"],
            count: Number(data["ascend-6-count-1"]),
          },
          {
            name: data["ascend-6-material-2"],
            count: Number(data["ascend-6-count-2"]),
          },
          {
            name: data["ascend-6-material-3"],
            count: Number(data["ascend-6-count-3"]),
          },
          {
            name: data["ascend-6-material-4"],
            count: Number(data["ascend-6-count-4"]),
          },
          {
            name: data["ascend-6-material-5"],
            count: Number(data["ascend-6-count-5"]),
          },
        ],
      },
      cv:{
        english: data["character-voice-english"],
        japanese: data["character-voice-japanese"],
        korean: data["character-voice-korean"],
        chinese: data["character-voice-chinese"],
      },
      rarity: data.rarity,
      element: data.element as GenshinImpact.Character["element"],
      weapon: data.weapon as GenshinImpact.Character["weapon"],
      gender: data.gender as GenshinImpact.Character["gender"],
      region: data.region as GenshinImpact.Character["region"],
      image: imageUrl ? imageUrl : undefined,
    };

    return finalData;
  },
};
