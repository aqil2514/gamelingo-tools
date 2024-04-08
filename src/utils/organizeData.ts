/**
 *
 * Genshin Organizing
 *
 */

import { CharacterEN, CharacterID } from "@/models/GenshinImpact/Character";

export const genshinOrganizing: OrganizeData.Genshin = {
  material: (data, imageUrl) => {
    const finalData: GenshinImpact.Material = {
      name: data.name,
      typeMaterial: data.typeMaterial,
      rarity: data.rarity,
      lore: data.lore,
      gainedFrom:
        typeof data.gainedFrom === "string"
          ? data.gainedFrom.replace(", ", ",").split(",")
          : data.gainedFrom,
      image: imageUrl ? imageUrl : undefined,
    };
    return finalData;
  },
  artifact: (data, imageUrl) => {
    const finalData: GenshinImpact.Artifact = {
      name: data.name,
      rarityList:
        typeof data.rarityList === "string"
          ? data.rarityList.split(",")
          : data.rarityList,
      effect2pc: data.effect2Pc,
      effect4pc: data.effect4Pc,
      flower: {
        name: data["flower-name"],
        description: data["flower-description"],
        lore: data["flower-lore"],
        type: data["flower-type"],
        image: findImage(imageUrl, "Flower"),
      },
      plume: {
        name: data["plume-name"],
        description: data["plume-description"],
        lore: data["plume-lore"],
        type: data["plume-type"],
        image: findImage(imageUrl, "Plume"),
      },
      sands: {
        name: data["sands-name"],
        description: data["sands-description"],
        lore: data["sands-lore"],
        type: data["sands-type"],
        image: findImage(imageUrl, "Sands"),
      },
      goblet: {
        name: data["goblet-name"],
        description: data["goblet-description"],
        lore: data["goblet-lore"],
        type: data["goblet-type"],
        image: findImage(imageUrl, "Goblet"),
      },
      circlet: {
        name: data["circlet-name"],
        description: data["circlet-description"],
        lore: data["circlet-lore"],
        type: data["circlet-type"],
        image: findImage(imageUrl, "Circlet"),
      },
    };

    return finalData;
  },
  weapon(data, imageUrl) {
    const finalData: GenshinImpact.Weapon = {
      name: data.name,
      type: data.type,
      baseAtk: data["weapon-base-atk"],
      baseStat: data["weapon-base-stat"],
      subStatus: data.subStatus,
      lore: data.lore,
      rarity: data.rarity,
      passive: {
        passiveName: data["passive-name"],
        r1: data["weapon-ref-r1"],
        r2: data["weapon-ref-r2"],
        r3: data["weapon-ref-r3"],
        r4: data["weapon-ref-r4"],
        r5: data["weapon-ref-r5"],
      },
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
      ],
      image: imageUrl ? imageUrl : undefined,
    };

    return finalData;
  },
  async character(data, coverImageUrl, portraitImageUrl, action) {
    let oldData: GenshinImpact.Character = {} as GenshinImpact.Character;

    if (action === "edit") {
      if (data.lang.includes("English"))
        oldData = (await CharacterEN.findOne({
          name: data.name,
        })) as unknown as GenshinImpact.Character;
      oldData = (await CharacterID.findOne({
        name: data.name,
      })) as unknown as GenshinImpact.Character;
    }

    const selectImage = (field: "cover" | "portrait"): string => {
      const coverMap = {
        cover: coverImageUrl,
        portrait: portraitImageUrl,
      };

      console.log(oldData.image);

      // Jika data lama ada dan tidak ada data baru,
      if (
        oldData.image[field].toLowerCase().includes(data.name.toLowerCase()) &&
        !coverMap[field]
      ) {
        // Gunakan data lama
        console.log(
          "Jika data lama ada dan tidak ada data baru, Gunakan data lama"
        );
        return oldData.image[field];
      }

      // Jika data lama ada dan ada data baru,
      else if (
        oldData.image[field].toLowerCase().includes(data.name.toLowerCase()) &&
        coverMap[field]
      ) {
        // Gunakan data baru
        console.log(
          "Jika data lama ada dan tidak ada data baru, Gunakan data baru"
        );
        return coverMap[field];
      }

      // Apakah ada data lama? Jika ada, gunakan data lama. Jika tidak, gunakan data baru
      return oldData.image[field]
        .toLowerCase()
        .includes(data.name.toLowerCase())
        ? oldData.image[field]
        : coverMap[field];
    };

    const finalData: GenshinImpact.Character = {
      lang: data["result-lang"],
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
      cv: {
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
      image: {
        cover: action === "edit" ? selectImage("cover") : coverImageUrl,
        portrait:
          action === "edit" ? selectImage("portrait") : portraitImageUrl,
      },
    };

    return finalData;
  },
  talent(data, imageUrl) {

    const combatLabels = (
      field: "combat1" | "combat2" | "combat3" | "combatsp"
    ) => {
      const result: string[] = [];
      for (const key in data) {
        if (key.includes(`${field}-attribute-label`))
          result.push((data as any)[key]);
      }

      return result;
    };

    const combatParameters = (
      field: "combat1" | "combat2" | "combat3" | "combatsp"
    ) => {
      const result:
        | {
            [key: string]: number[];
          }
        | undefined = {};

      for (const key in data) {
        if (key.includes(`${field}-attribute-param`)) {
          const keySplit = key.split("-");
          const newKey = keySplit[2] + keySplit[3];

          result[newKey] = (data as any)[key];
        }
      }
      return result;
    };

    const finalData: GenshinImpact.Talent = {
      charName: data["character-name"],
      combats: {
        combat1: {
          name: data["combat1-name"],
          description: data["combat1-description"],
          icon: imageUrl.find((img) => img.includes("Combat1")),
          attributes: {
            labels: combatLabels("combat1"),
            parameters: combatParameters("combat1"),
          },
        },
        combat2: {
          name: data["combat2-name"],
          description: data["combat2-description"],
          icon: imageUrl.find((img) => img.includes("Combat2")),
          attributes: {
            labels: combatLabels("combat2"),
            parameters: combatParameters("combat2"),
          },
        },
        combat3: {
          name: data["combat3-name"],
          description: data["combat3-description"],
          icon: imageUrl.find((img) => img.includes("Combat3")),
          attributes: {
            labels: combatLabels("combat3"),
            parameters: combatParameters("combat3"),
          },
        },
        combatsp:
        data["combatsp-name"] && data["combatsp-description"]
        ? {
          name: data["combatsp-name"],
          description: data["combatsp-description"],
          icon: imageUrl.find((img) => img.includes("Combatsp")),
          attributes: {
            labels: combatLabels("combatsp"),
            parameters: combatParameters("combatsp"),
          },
              }
            : undefined,
      },
      passives: {
        passive1: {
          name: data["passive1-name"],
          description: data["passive1-description"],
          icon: imageUrl.find((img) => img.includes("Passive1")),
        },
        passive2: {
          name: data["passive2-name"],
          description: data["passive2-description"],
          icon: imageUrl.find((img) => img.includes("Passive2")),
        },
        passive3: {
          name: data["passive3-name"],
          description: data["passive3-description"],
          icon: imageUrl.find((img) => img.includes("Passive3")),
        },
      },
      costs: {
        lvl2: [
          {
            name: data["lvl2-material-1"],
            count: Number(data["lvl2-count-1"]),
          },
          {
            name: data["lvl2-material-2"],
            count: Number(data["lvl2-count-2"]),
          },
          {
            name: data["lvl2-material-3"],
            count: Number(data["lvl2-count-3"]),
          },
        ],
        lvl3: [
          {
            name: data["lvl3-material-1"],
            count: Number(data["lvl3-count-1"]),
          },
          {
            name: data["lvl3-material-2"],
            count: Number(data["lvl3-count-2"]),
          },
          {
            name: data["lvl3-material-3"],
            count: Number(data["lvl3-count-3"]),
          },
        ],
        lvl4: [
          {
            name: data["lvl4-material-1"],
            count: Number(data["lvl4-count-1"]),
          },
          {
            name: data["lvl4-material-2"],
            count: Number(data["lvl4-count-2"]),
          },
          {
            name: data["lvl4-material-3"],
            count: Number(data["lvl4-count-3"]),
          },
        ],
        lvl5: [
          {
            name: data["lvl5-material-1"],
            count: Number(data["lvl5-count-1"]),
          },
          {
            name: data["lvl5-material-2"],
            count: Number(data["lvl5-count-2"]),
          },
          {
            name: data["lvl5-material-3"],
            count: Number(data["lvl5-count-3"]),
          },
        ],
        lvl6: [
          {
            name: data["lvl6-material-1"],
            count: Number(data["lvl6-count-1"]),
          },
          {
            name: data["lvl6-material-2"],
            count: Number(data["lvl6-count-2"]),
          },
          {
            name: data["lvl6-material-3"],
            count: Number(data["lvl6-count-3"]),
          },
        ],
        lvl7: [
          {
            name: data["lvl7-material-1"],
            count: Number(data["lvl7-count-1"]),
          },
          {
            name: data["lvl7-material-2"],
            count: Number(data["lvl7-count-2"]),
          },
          {
            name: data["lvl7-material-3"],
            count: Number(data["lvl7-count-3"]),
          },
          {
            name: data["lvl7-material-4"],
            count: Number(data["lvl7-count-4"]),
          },
        ],
        lvl8: [
          {
            name: data["lvl8-material-1"],
            count: Number(data["lvl8-count-1"]),
          },
          {
            name: data["lvl8-material-2"],
            count: Number(data["lvl8-count-2"]),
          },
          {
            name: data["lvl8-material-3"],
            count: Number(data["lvl8-count-3"]),
          },
          {
            name: data["lvl8-material-4"],
            count: Number(data["lvl8-count-4"]),
          },
        ],
        lvl9: [
          {
            name: data["lvl9-material-1"],
            count: Number(data["lvl9-count-1"]),
          },
          {
            name: data["lvl9-material-2"],
            count: Number(data["lvl9-count-2"]),
          },
          {
            name: data["lvl9-material-3"],
            count: Number(data["lvl9-count-3"]),
          },
          {
            name: data["lvl9-material-4"],
            count: Number(data["lvl9-count-4"]),
          },
        ],
        lvl10: [
          {
            name: data["lvl10-material-1"],
            count: Number(data["lvl10-count-1"]),
          },
          {
            name: data["lvl10-material-2"],
            count: Number(data["lvl10-count-2"]),
          },
          {
            name: data["lvl10-material-3"],
            count: Number(data["lvl10-count-3"]),
          },
          {
            name: data["lvl10-material-4"],
            count: Number(data["lvl10-count-4"]),
          },
          {
            name: data["lvl10-material-5"],
            count: Number(data["lvl10-count-5"]),
          },
        ],
      },
    };

    return finalData;
  },
  constellation(data, imageUrl) {
    const finalData: GenshinImpact.Constellation = {
      charName: data.charName,
      constellation: {
        c1: {
          name: data.c1,
          description: data.d1,
          icon: imageUrl.find((img) => img.includes("Constellation-1")),
        },
        c2: {
          name: data.c2,
          description: data.d2,
          icon: imageUrl.find((img) => img.includes("Constellation-2")),
        },
        c3: {
          name: data.c3,
          description: data.d3,
          icon: imageUrl.find((img) => img.includes("Constellation-3")),
        },
        c4: {
          name: data.c4,
          description: data.d4,
          icon: imageUrl.find((img) => img.includes("Constellation-4")),
        },
        c5: {
          name: data.c5,
          description: data.d5,
          icon: imageUrl.find((img) => img.includes("Constellation-5")),
        },
        c6: {
          name: data.c6,
          description: data.d6,
          icon: imageUrl.find((img) => img.includes("Constellation-6")),
        },
      },
    };

    return finalData;
  },
};

/**
 *
 * Admin Organizing
 *
 */

export const adminOrganizing: OrganizeData.Admin = {
  user(data) {
    const finalData: Account.User = {
      id: data["user-id"],
      username: data.username,
      email: data.email,
      name: data.name,
      image: data.image,
      role: data.role as Account.User["role"],
      account_verified: data["account-verified"] === "on" ? true : false,
      passwordExisting: data["password-exist"] === "on" ? true : false,
    };

    return finalData;
  },
};

/** Evertale Organizing */
export const evertaleOrganizing: OrganizeData.ET = {
  character(data, images) {
    const charStatus: Evertale.Character.Status = {
      charName: data["status-charName"],
      isConjured: data["status-isConjured"] === "on" ? true : false,
      charTeam: data["status-charTeam"].split(", "),
      charRank: data["status-charRank"],
      charElement: data["status-charElement"],
      charWeapon1: data["status-charWeapon1"],
      charWeapon2: data["status-charWeapon2"],
      charLeaderSkill: data["status-charLeaderSkill"],
      charConjure:
        data["status-charConjure"] !== "selfConjured"
          ? data["status-charConjure"]
          : data["status-charName"],
    };

    const charIntro: Evertale.Character.Intro = {
      gachaIntroEn: data["intro-gachaIntroEn"],
      gachaIntroId: data["intro-gachaIntroId"],
      gachaTextEn: data["intro-gachaTextEn"],
      gachaTextId: data["intro-gachaTextId"],
      loginTextEn: data["intro-loginTextEn"],
      loginTextId: data["intro-loginTextId"],
      text1En: data["intro-text1En"],
      text1Id: data["intro-text1Id"],
      text2En: data["intro-text2En"],
      text2Id: data["intro-text2Id"],
      text3En: data["intro-text3En"],
      text3Id: data["intro-text3Id"],
      text4En: data["intro-text4En"],
      text4Id: data["intro-text4Id"],
      text5En: data["intro-new-field1En"],
      text5Id: data["intro-new-field1Id"],
      text6En: data["intro-new-field2En"],
      text6Id: data["intro-new-field2Id"],
      text7En: data["intro-new-field3En"],
      text7Id: data["intro-new-field3Id"],
      text8En: data["intro-new-field4En"],
      text8Id: data["intro-new-field4Id"],
    };

    const charProfile: Evertale.Character.Profile = {
      part1En: data["profile-part1En"],
      part1Id: data["profile-part1Id"],
      part2En: data["profile-part2En"],
      part2Id: data["profile-part2Id"],
      part3En: data["profile-part3En"],
      part3Id: data["profile-part3Id"],
    };

    const charImage: Evertale.Character.Image = {
      f1Img: images.find((img) => img.includes("Form%201")),
      f2Img: images.find((img) => img.includes("Form%202")),
      f3Img: images.find((img) => img.includes("Form%203")),
    };

    const charActiveSkill: Evertale.Character.ActiveSkill[] = [];

    for (let i = 1; i <= 4; i++) {
      type NumberActive = "1" | "2" | "3" | "4";
      const skillName =
        data[`active-skill-name-${i as unknown as NumberActive}`];

      if (skillName) {
        const active: Evertale.Character.ActiveSkill = {
          skillName: data[`active-skill-name-${i as unknown as NumberActive}`],
          typeSkill:
            data[`active-type-${i as unknown as NumberActive}`].split(", "),
          skillSpirit:
            data[`active-skill-spirit-${i as unknown as NumberActive}`],
          skillTarget:
            data[`active-skill-target-${i as unknown as NumberActive}`],
          skillTu: data[`active-skill-tu-${i as unknown as NumberActive}`],
          skillDescEn:
            data[`active-skill-desc-en-${i as unknown as NumberActive}`],
          skillDescId:
            data[`active-skill-desc-id-${i as unknown as NumberActive}`],
        };

        if (active.skillName) {
          charActiveSkill.push(active);
        }
      }
    }

    const charPassiveSkill: Evertale.Character.PassiveSkill[] = [];

    for (let i = 1; i <= 6; i++) {
      type NumberPassive = "1" | "2" | "3" | "4" | "5" | "6";
      const skillName =
        data[`passive-skill-name-${i as unknown as NumberPassive}`];

      if (skillName) {
        const passive: Evertale.Character.PassiveSkill = {
          skillName:
            data[`passive-skill-name-${i as unknown as NumberPassive}`],
          typeSkill:
            data[`passive-type-${i as unknown as NumberPassive}`].split(","),
          skillDescEn:
            data[`passive-skill-desc-en-${i as unknown as NumberPassive}`],
          skillDescId:
            data[`passive-skill-desc-id-${i as unknown as NumberPassive}`],
        };

        if (passive.skillName) {
          charPassiveSkill.push(passive);
        }
      }
    }

    const finalData: Evertale.Character.State = {
      charStatus,
      charIntro,
      charImage,
      charProfile,
      charActiveSkill,
      charPassiveSkill,
    };

    return finalData;
  },
};

function findImage(
  imageUrl: string[],
  artifactType: "Flower" | "Plume" | "Sands" | "Goblet" | "Circlet"
): string | undefined {
  return imageUrl.find((image) => image.includes(artifactType));
}
