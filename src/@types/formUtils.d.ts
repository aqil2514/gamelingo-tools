namespace FormUtils {
  namespace Genshin{
    interface Result {
      msg?: string;
      status: number;
    }
  
    export interface FormDataArtifactKey {
      key:
        | "name"
        | "type"
        | "set"
        | "setName_1"
        | "setValue_1"
        | "setName_2"
        | "setValue_2"
        | "rarity"
        | "image";
    }
  
    export interface FormDataArtifact{
      name: string;
      type: string;
      set: string;
      'setName-1': string;
      'setValue-1': string;
      'setName-2'?: string;
      'setValue-2'?: string;
      rarity: string;
      image?: File;
      source: string;
    }
  
    export interface FormDataWeapon {
      name: string;
      type: string;
      subStatus: string;
      'weap-ref-1': string;
      'weap-ref-1-effect': string;
      'weap-ref-2': string;
      'weap-ref-2-effect': string;
      'weap-ref-3': string;
      'weap-ref-3-effect': string;
      'weap-ref-4': string;
      'weap-ref-4-effect': string;
      'weap-ref-5': string;
      'weap-ref-5-effect': string;
      lore: string;
      rarity: string;
      image?: File;
    }
    
    export interface FormDataCharacter{
        name: string;
        description: string;
        ascendStatus: string;
        'ascend-1-material-1': string;
        'ascend-1-count-1': string;
        'ascend-1-material-2': string;
        'ascend-1-count-2': string;
        'ascend-1-material-3': string;
        'ascend-1-count-3': string;
        'ascend-1-material-4': string;
        'ascend-1-count-4': string;
        'ascend-2-material-1': string;
        'ascend-2-count-1': string;
        'ascend-2-material-2': string;
        'ascend-2-count-2': string;
        'ascend-2-material-3': string;
        'ascend-2-count-3': string;
        'ascend-2-material-4': string;
        'ascend-2-count-4': string;
        'ascend-2-material-5': string;
        'ascend-2-count-5': string;
        'ascend-3-material-1': string;
        'ascend-3-count-1': string;
        'ascend-3-material-2': string;
        'ascend-3-count-2': string;
        'ascend-3-material-3': string;
        'ascend-3-count-3': string;
        'ascend-3-material-4': string;
        'ascend-3-count-4': string;
        'ascend-3-material-5': string;
        'ascend-3-count-5': string;
        'ascend-4-material-1': string;
        'ascend-4-count-1': string;
        'ascend-4-material-2': string;
        'ascend-4-count-2': string;
        'ascend-4-material-3': string;
        'ascend-4-count-3': string;
        'ascend-4-material-4': string;
        'ascend-4-count-4': string;
        'ascend-4-material-5': string;
        'ascend-4-count-5': string;
        'ascend-5-material-1': string;
        'ascend-5-count-1': string;
        'ascend-5-material-2': string;
        'ascend-5-count-2': string;
        'ascend-5-material-3': string;
        'ascend-5-count-3': string;
        'ascend-5-material-4': string;
        'ascend-5-count-4': string;
        'ascend-5-material-5': string;
        'ascend-5-count-5': string;
        'ascend-6-material-1': string;
        'ascend-6-count-1': string;
        'ascend-6-material-2': string;
        'ascend-6-count-2': string;
        'ascend-6-material-3': string;
        'ascend-6-count-3': string;
        'ascend-6-material-4': string;
        'ascend-6-count-4': string;
        'ascend-6-material-5': string;
        'ascend-6-count-5': string;
        'character-voice-chinese': string;
        'character-voice-english': string;
        'character-voice-japanese': string;
        'character-voice-korean': string;
        rarity: string;
        element: string;
        weapon: string;
        gender: string;
        region: string;
        image?: File;
            
    }

    export interface Genshin {
      processMaterial: (formData: FormData) => Promise<Result>;
      proccessArtifact: (formData: FormData) => Promise<Result>;
      processWeapon : (formData:FormData) => Promise<Result>;
      proccessCharacter : (formData :FormData) => Promise<Result>;
    }
  }
}
