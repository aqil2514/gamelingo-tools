namespace FormUtils {
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

  export interface Genshin {
    processMaterial: (formData: FormData) => Promise<Result>;
    proccessArtifact: (formData: FormData) => Promise<Result>;
  }
}
