namespace Evertale {
  export interface QuickInfo{
    id: string;
    name:string;
    link?: string;
    image?: string;
  }


  namespace Character {
    export interface Image {
      f1Img?: string;
      f2Img?: string;
      f3Img?: string;
    }
    export interface State extends General.MongoDBDocument {
      charStatus: Status;
      charIntro?: Intro;
      charImage: Image;
      charProfile: Profile;
      charActiveSkill: ActiveSkill[];
      charPassiveSkill: PassiveSkill[];
    }
    export interface Intro {
      gachaIntroEn?: string;
      gachaIntroId?: string;
      gachaTextEn?: string;
      gachaTextId?: string;
      loginTextEn?: string;
      loginTextId?: string;
      text1En?: string;
      text1Id?: string;
      text2En?: string;
      text2Id?: string;
      text3Id?: string;
      text3En?: string;
      text4En?: string;
      text4Id?: string;
      text5En?: string;
      text5Id?: string;
      text6En?: string;
      text6Id?: string;
      text7Id?: string;
      text7En?: string;
      text8En?: string;
      text8Id?: string;
    }

    export interface Status {
      charName: string;
      charRank: StatusRank;
      charElement: StatusElement;
      charTeam: string[];
      charWeapon1: StatusWeapon;
      charWeapon2?: StatusWeapon;
      charLeaderSkill?: string;
      isConjured: boolean;
      charConjure?: string;
    }

    type StatusRank = "SSR" | "SR" | "R" | "N";
    type StatusElement = "Dark" | "Light" | "Earth" | "Fire" | "Storm" | "Water";
    type StatusWeapon = "Sword" | "Axe" | "Staff" | "Mace" | "GreatSword" | "GreatAxe" | "Spear" | "Hammer" | "Katana";

    export interface Profile {
      part1En: string;
      part1Id: string;
      part2En?: string;
      part2Id?: string;
      part3En?: string;
      part3Id?: string;
    }
    export interface ActiveSkill {
      skillName: string;
      typeSkill: string[];
      skillSpirit: string;
      skillTarget: string;
      skillTu: string;
      skillDescEn: string;
      skillDescId: string;
    }
    export interface PassiveSkill {
      _id?: string;
      skillName: string;
      typeSkill: string[];
      skillDescEn: string;
      skillDescId: string;
    }

    export interface QuickInfo {
      id?: string;
      name: string;
      link: Route;
    }
  }
  namespace Weapon {
    export interface State {
      _id?: string;
      weapImage: { png: string; webp: string };
      weapName: string;
      weapRank: "SSR" | "SR" | "R" | "N" | "Weap Rank";
      weapType: "Sword" | "Axe" | "Staff" | "Mace" | "GreatSword" | "GreatAxe" | "Spear" | "Hammer" | "Katana" | "Weap Type";
      weapLore?: WeapLore;
      weapAscend?: Ascend;
      weapMax?: WeapMax;
      createdAt?: string;
      updatedAt?: string;
      __v?: number;
    }

    export interface WeapLore {
      loreEn?: string;
      loreId?: string;
    }

    export interface WeapMax {
      status?: {
        power?: number;
        cost?: number;
        hp?: number;
        atk?: number;
        level?: number;
        boost?: number;
        potential?: number;
      };
    }

    export interface Ascend {
      noAscend?: NoAscend;
      ascend1?: Ascend1;
      fullAscend?: FullAscend;
    }

    export interface NoAscend {
      weapSkill?: Skill;
      status?: Status;
    }

    export interface Ascend1 {
      weapSkill?: Skill;
      status?: Status;
    }

    export interface FullAscend {
      weapSkill?: Skill;
      status?: Status;
    }

    export interface Skill {
      skillEn?: string;
      skillId?: string;
    }

    export interface Status {
      power?: number;
      hp?: number;
      atk?: number;
      level?: number;
      boost?: number;
      cost?: number;
      potential?: number;
    }
  }
  namespace Misc {
    export interface TypeSkill {
      _id?: string;
      typeLeaderSkill: string[];
      typePassiveSkill: string[];
      typeActiveSkill: string[];
      typeCharTeam: string[];
      __v?: number;
    }

    export interface LeaderSkill {
      _id?: string;
      name: string;
      descEn: string;
      descId: string;
      typeSkill: string;
      createdAt?: string;
      updatedAt?: string;
      __v?: number;
    }

    export interface PassiveSkill {
      _id?: string;
      skillName: string;
      typeSkill: string[];
      skillDescEn: string;
      skillDescId: string;
      createdAt?: string;
      updatedAt?: string;
      __v?: number;
    }
  }
}
