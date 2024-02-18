namespace FormUtils {
  namespace Genshin {
    interface Result {
      msg?: string;
      status: number;
    }

    export interface FormDataArtifactKey {
      key: "name" | "type" | "set" | "setName_1" | "setValue_1" | "setName_2" | "setValue_2" | "rarity" | "image";
    }

    export interface FormDataArtifact {
      name: string;
      type: string;
      set: string;
      "setName-1": string;
      "setValue-1": string;
      "setName-2"?: string;
      "setValue-2"?: string;
      rarity: string;
      image?: File;
      source: string;
    }

    export interface FormDataWeapon {
      name: string;
      type: string;
      subStatus: string;
      "weap-ref-1": string;
      "weap-ref-1-effect": string;
      "weap-ref-2": string;
      "weap-ref-2-effect": string;
      "weap-ref-3": string;
      "weap-ref-3-effect": string;
      "weap-ref-4": string;
      "weap-ref-4-effect": string;
      "weap-ref-5": string;
      "weap-ref-5-effect": string;
      lore: string;
      rarity: string;
      image?: File;
    }

    type Language = "Indonesian" | "English";

    export interface FormDataCharacter {
      name: string;
      description: string;
      ascendStatus: string;
      "ascend-1-material-1": string;
      "ascend-1-count-1": string;
      "ascend-1-material-2": string;
      "ascend-1-count-2": string;
      "ascend-1-material-3": string;
      "ascend-1-count-3": string;
      "ascend-1-material-4": string;
      "ascend-1-count-4": string;
      "ascend-2-material-1": string;
      "ascend-2-count-1": string;
      "ascend-2-material-2": string;
      "ascend-2-count-2": string;
      "ascend-2-material-3": string;
      "ascend-2-count-3": string;
      "ascend-2-material-4": string;
      "ascend-2-count-4": string;
      "ascend-2-material-5": string;
      "ascend-2-count-5": string;
      "ascend-3-material-1": string;
      "ascend-3-count-1": string;
      "ascend-3-material-2": string;
      "ascend-3-count-2": string;
      "ascend-3-material-3": string;
      "ascend-3-count-3": string;
      "ascend-3-material-4": string;
      "ascend-3-count-4": string;
      "ascend-3-material-5": string;
      "ascend-3-count-5": string;
      "ascend-4-material-1": string;
      "ascend-4-count-1": string;
      "ascend-4-material-2": string;
      "ascend-4-count-2": string;
      "ascend-4-material-3": string;
      "ascend-4-count-3": string;
      "ascend-4-material-4": string;
      "ascend-4-count-4": string;
      "ascend-4-material-5": string;
      "ascend-4-count-5": string;
      "ascend-5-material-1": string;
      "ascend-5-count-1": string;
      "ascend-5-material-2": string;
      "ascend-5-count-2": string;
      "ascend-5-material-3": string;
      "ascend-5-count-3": string;
      "ascend-5-material-4": string;
      "ascend-5-count-4": string;
      "ascend-5-material-5": string;
      "ascend-5-count-5": string;
      "ascend-6-material-1": string;
      "ascend-6-count-1": string;
      "ascend-6-material-2": string;
      "ascend-6-count-2": string;
      "ascend-6-material-3": string;
      "ascend-6-count-3": string;
      "ascend-6-material-4": string;
      "ascend-6-count-4": string;
      "ascend-6-material-5": string;
      "ascend-6-count-5": string;
      "character-voice-chinese": string;
      "character-voice-english": string;
      "character-voice-japanese": string;
      "character-voice-korean": string;
      rarity: string;
      element: string;
      weapon: string;
      gender: string;
      region: string;
      image?: File;
    }

    export interface FormDataTalent {
      "character-name": string;
      "result-lang": "Indonesian" | "English";
      "combat1-name": string;
      "combat1-description": string;
      "combat2-name": string;
      "combat2-description": string;
      "combat3-name": string;
      "combat3-description": string;
      "combatsp-name"?: string;
      "combatsp-description"?: string;
      "passive1-name": string;
      "passive1-description": string;
      "passive2-name": string;
      "passive2-description": string;
      "passive3-name": string;
      "passive3-description": string;
      "lvl2-material-1": string;
      "lvl2-count-1": number;
      "lvl2-material-2": string;
      "lvl2-count-2": number;
      "lvl2-material-3": string;
      "lvl2-count-3": number;
      "lvl3-material-1": string;
      "lvl3-count-1": number;
      "lvl3-material-2": string;
      "lvl3-count-2": number;
      "lvl3-material-3": string;
      "lvl3-count-3": number;
      "lvl4-material-1": string;
      "lvl4-count-1": number;
      "lvl4-material-2": string;
      "lvl4-count-2": number;
      "lvl4-material-3": string;
      "lvl4-count-3": number;
      "lvl5-material-1": string;
      "lvl5-count-1": number;
      "lvl5-material-2": string;
      "lvl5-count-2": number;
      "lvl5-material-3": string;
      "lvl5-count-3": number;
      "lvl6-material-1": string;
      "lvl6-count-1": number;
      "lvl6-material-2": string;
      "lvl6-count-2": number;
      "lvl6-material-3": string;
      "lvl6-count-3": number;
      "lvl7-material-1": string;
      "lvl7-count-1": number;
      "lvl7-material-2": string;
      "lvl7-count-2": number;
      "lvl7-material-3": string;
      "lvl7-count-3": number;
      "lvl7-material-4": string;
      "lvl7-count-4": number;
      "lvl8-material-1": string;
      "lvl8-count-1": number;
      "lvl8-material-2": string;
      "lvl8-count-2": number;
      "lvl8-material-3": string;
      "lvl8-count-3": number;
      "lvl8-material-4": string;
      "lvl8-count-4": number;
      "lvl9-material-1": string;
      "lvl9-count-1": number;
      "lvl9-material-2": string;
      "lvl9-count-2": number;
      "lvl9-material-3": string;
      "lvl9-count-3": number;
      "lvl9-material-4": string;
      "lvl9-count-4": number;
      "lvl10-material-1": string;
      "lvl10-count-1": number;
      "lvl10-material-2": string;
      "lvl10-count-2": number;
      "lvl10-material-3": string;
      "lvl10-count-3": number;
      "lvl10-material-4": string;
      "lvl10-count-4": number;
      "lvl10-material-5": string;
      "lvl10-count-5": number;
    }

    export interface FormDataConstellation {
      "result-lang": Language;
      charName: string;
      c1: string;
      d1: string;
      c2: string;
      d2: string;
      c3: string;
      d3: string;
      c4: string;
      d4: string;
      c5: string;
      d5: string;
      c6: string;
      d6: string;
    }

    export interface Genshin {
      processMaterial: (formData: FormData) => Promise<Result>;
      proccessArtifact: (formData: FormData) => Promise<Result>;
      processWeapon: (formData: FormData) => Promise<Result>;
      proccessCharacter: (formData: FormData) => Promise<Result>;
      processTalent: (formData: FormData) => Promise<Result>;
      processConstellation: (formData: FormData) => Promise<Result>;
    }
  }
}
