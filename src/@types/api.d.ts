namespace ApiUtils {
  export interface ResultApi {
    status: boolean;
    msg?: string;
  }

  export interface ResultApiwithData {
    status: boolean;
    msg?: string;
    data?: any;
  }

  export interface ResultRefApi {
    status: boolean;
    ref?: string;
    msg?: string;
  }

  export interface AccountResult {
    status: true;
    msg: string;
    UID: string;
  }
  export interface RegisterApi {
    nameValidation: (name: string) => ResultRefApi;
    usernameValidation: (username: string) => Promise<ResultRefApi>;
    emailValidation: (email: string) => Promise<ResultRefApi>;
    passwordValidation: (
      password: string,
      confirmPassword: string
    ) => ResultRefApi;
    addAccount: (
      username: string,
      password: string,
      name: string,
      email: string
    ) => Promise<AccountResult>;
  }

  export interface VerifiedResult {
    status: boolean;
    UID?: string;
    msg?: string;
  }

  export interface DashboardApi {
    nameValidation: (name: string) => ResultApi;
    usernameValidation: (
      username: string,
      oldUsername: string
    ) => Promise<ResultApi>;
    emailValidation: (email: string, oldEmail: string) => Promise<ResultApi>;
    changeHandler: (data: Account.User) => Promise<ResultApi>;
  }

  export interface SendmailApi {
    verification: (email: string, verificationCode: string) => Promise<void>;
    purify: (email: string, uniqueLink: string) => Promise<void>;
  }

  export interface LoginApi {
    usernameValidation: (username: string) => Promise<ResultApi>;
    passwordValidation: (
      username: string,
      password: string
    ) => Promise<ResultApi>;
    isVerifiedValidation: (username: string) => Promise<VerifiedResult>;
  }

  export interface VerificationApi {
    generate: () => string;
    compare: (
      code: string,
      email: string,
      action: "verify-account" | "change-email",
      newEmail?: string
    ) => Promise<ResultApi>;
  }

  export interface ResetPasswordApi {
    checkEmail: (email: string) => Promise<ResultApi>;
  }

  export interface AdminApi {
    getUser: () => Promise<Account.AdminUserOutput[] | null>;
    getEvertaleCharacter: () => Promise<Evertale.Character.QuickInfo[] | null>;
  }

  export interface GenshinValidatorApi {
    material: ({
      name,
      image,
      lore,
      gainedFrom,
      rarity,
      typeMaterial,
    }: any) => Promise<ResultApiwithData>;
  }
}
