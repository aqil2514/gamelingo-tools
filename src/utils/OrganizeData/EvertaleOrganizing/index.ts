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