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
  
    interface FormDataWeapon {
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
    
  
    export interface Genshin {
      processMaterial: (formData: FormData) => Promise<Result>;
      proccessArtifact: (formData: FormData) => Promise<Result>;
      processWeapon : (formData:FormData) => Promise<Result>;
    }
  }
}
