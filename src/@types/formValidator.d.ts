namespace FormValidator {
  export interface AdminValidatorApi {
    user: (data: FormUtils.Account.FormDataUser) => Promise<ResultApiwithData>;
  }

  export interface EvertaleValidatorApi {
    character: (data: FormUtils.Evertale.FormDataCharacter) => Promise<ResultApiwithData>;
    images: (images:File[], fileName:string) => ResultApiwithData;
  }

  export interface GenshinValidatorApi {
    material: (data: FormUtils.Genshin.FormDataMaterial) => Promise<ResultApiwithData>;
    artifact: (data: FormUtils.Genshin.FormDataArtifact) => Promise<ResultApiwithData>;
    weapon: (data: FormUtils.Genshin.FormDataWeapon) => Promise<ResultApiwithData>;
    character: (data: FormUtils.Genshin.FormDataCharacter) => Promise<ResultApiwithData>;
    talent: (data: FormUtils.Genshin.FormDataTalent) => Promise<ResultApiwithData>;
    constellation: (data: FormUtils.Genshin.FormDataConstellation) => Promise<ResultApiwithData>;
  }

  export interface ResultApiwithData {
    status: boolean;
    msg?: string;
    data?: any;
    ref?: string;
    images?: File[];
  }
}
