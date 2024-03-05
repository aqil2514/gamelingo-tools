/**
 *
 * API UTILS DECALARATION TYPE FILE
 *
 * PLEASE SORT THE TYPES ALPHABETICAL
 *
 */

namespace ApiUtils {
  export interface AdminApi {
    /**
     * Mendapatkan user
     */
    getUser: () => Promise<Account.AdminUserOutput[] | null>;
    /**
     * Mendapatkan karakter Evertale
     */
    getEvertaleCharacter: () => Promise<Evertale.Character.QuickInfo[] | null>;
  }

  export interface AdminValidatorApi {
    user: (data: FormUtils.Account.FormDataUser) => Promise<ResultApiwithData>;
  }

  export interface AccountResult {
    status: true;
    msg: string;
    UID: string;
  }

  export interface DashboardApi {
    nameValidation: (name: string) => ResultApi;
    usernameValidation: (username: string, oldUsername: string) => Promise<ResultApi>;
    emailValidation: (email: string, oldEmail: string) => Promise<ResultApi>;
    changeHandler: (data: Account.User) => Promise<ResultApi>;
  }

  export interface FileApi {
    /**
     * Validasi file gambar
     *
     * Apa saja yang divalidasi?
     * - Format yang diizinkan
     * - Ukuran gambar maksimal 1MB
     * - Apakah namanya sesuai dengan yang diharapkan
     *
     * Config option:
     *
     * - allowedExtension: array of sring
     * - validateName: boolean
     * - validationName: string
     *
     * @param file  file yang akan divalidasi
     * @param config Konfigurasi validasi
     * @returns Hasil validasi
     */
    validationImageArray: (files: File[], config?: ImageValidationConfig) => FileApiValidationResult;

    /**
     * Validasi file gambar
     *
     * Apa saja yang divalidasi?
     * - Format yang diizinkan
     * - Ukuran gambar maksimal 1MB
     * - Apakah namanya sesuai dengan yang diharapkan
     *
     * Config option:
     *
     * - allowedExtension: array of sring
     * - validateName: boolean
     * - validationName: string
     *
     * @param file  file yang akan divalidasi
     * @param config Konfigurasi validasi
     * @returns Hasil validasi
     */
    validationImage: (file: File, config?: FileApiImageValidationConfig) => FileApiValidationResult;

    /**
     * Upload File Gambar ke Cloudinary
     *
     * @param files Array File yang ingin diupload
     * @param game Game apa? Digunakan untuk main folder
     * @param category Category apa? Digunakan untuk sub folder
     * @returns {Promise<CloudinaryAPI.Image[]>} Kumpulan informasi tentang data yang diupload
     */
    uploadImage: (files: File[], game: General.Game["game"], category: General.Game["category"]) => Promise<UploadApiResponse[]>;

    /**
     * Upload File Gambar ke Cloudinary
     *
     * @param files File yang ingin diupload
     * @param game Game apa? Digunakan untuk main folder
     * @param category Category apa? Digunakan untuk sub folder
     * @returns {Promise<CloudinaryAPI.Image[]>} Kumpulan informasi tentang data yang diupload
     */
    uploadSingleImage: (file: File, game: General.Game["game"], category: General.Game["category"]) => Promise<UploadApiResponse>;
  }

  type FileApiAllowedExtension = "webp" | "png" | "jpg" | "gif";

  export interface FileApiImageValidationConfig {
    /**
     * Ekstensi atau format yang diizinkan.
     *
     * Default: ["webp", "png"]
     */
    allowedExtension?: AllowedExtension[];
    /**
     * Validasi nama?
     *
     * Default: false
     */
    validateName?: boolean | "exactly the same" | "including";
    /**
     * Jika validasi nama digunakan, apa namanya?
     *
     * Jika tidak diisi, akan mengembalikan error;
     */
    validationName?: string;
  }

  interface FileApiValidationResult {
    status: boolean;
    msg?: string;
    file?: File;
  }

  export interface GenshinValidatorApi {
    material: (data: FormUtils.Genshin.FormDataMaterial) => Promise<ResultApiwithData>;
    artifact: (data: FormUtils.Genshin.FormDataArtifact) => Promise<ResultApiwithData>;
    weapon: (data: FormUtils.Genshin.FormDataWeapon) => Promise<ResultApiwithData>;
    character: (data: FormUtils.Genshin.FormDataCharacter) => Promise<ResultApiwithData>;
    talent: (data: FormUtils.Genshin.FormDataTalent) => Promise<ResultApiwithData>;
    constellation: (data: FormUtils.Genshin.FormDataConstellation) => Promise<ResultApiwithData>;
  }

  export interface LoginApi {
    usernameValidation: (username: string) => Promise<ResultApi>;
    passwordValidation: (username: string, password: string) => Promise<ResultApi>;
    isVerifiedValidation: (username: string) => Promise<VerifiedResult>;
  }

  export interface RegisterApi {
    nameValidation: (name: string) => ResultRefApi;
    usernameValidation: (username: string) => Promise<ResultRefApi>;
    emailValidation: (email: string) => Promise<ResultRefApi>;
    passwordValidation: (password: string, confirmPassword: string) => ResultRefApi;
    addAccount: (username: string, password: string, name: string, email: string) => Promise<AccountResult>;
  }

  export interface ResultApi {
    status: boolean;
    msg?: string;
  }

  export interface ResultApiwithData {
    status: boolean;
    msg?: string;
    data?: any;
    images?: File[];
  }

  export interface ResetPasswordApi {
    /**
     * Konfirmasi email
     * @param email = Email yang menjadi pemulihan
     */
    checkEmail: (email: string) => Promise<ResultApi>;
  }

  export interface ResultRefApi {
    status: boolean;
    ref?: string;
    msg?: string;
  }

  export interface SendmailApi {
    /**
     * Mengirim kode verifikasi ke email
     * @param email - Email tujuan
     * @param verificationCode - Kode yang akan dikirim
     */
    verification: (email: string, verificationCode: string, name?: string, uid?: string) => Promise<void>;
    /**
     * Mengirim unik link ke email
     * @param email Email tujuan
     * @param uniqueLink Unique link yang akan dikirim
     */
    purify: (email: string, uniqueLink: string) => Promise<void>;
  }

  interface UploadApiResponse {
    public_id: string;
    version: number;
    signature: string;
    width: number;
    height: number;
    format: string;
    resource_type: "image" | "video" | "raw" | "auto";
    created_at: string;
    tags: Array<string>;
    pages: number;
    bytes: number;
    type: string;
    etag: string;
    placeholder: boolean;
    url: string;
    secure_url: string;
    access_mode: string;
    original_filename: string;
    moderation: Array<string>;
    access_control: Array<string>;
    context: object; //won't change since it's response, we need to discuss documentation team about it before implementing.
    metadata: object; //won't change since it's response, we need to discuss documentation team about it before implementing.
    colors?: [string, number][];

    [futureKey: string]: any;
  } // This interface from Cloudinary API

  export interface VerifiedResult {
    status: boolean;
    UID?: string;
    msg?: string;
  }

  export interface VerificationApi {
    /**
     * Menghasilkan kode unik angka
     * @returns Result berupa kode unik angka sebanyak 6 digit
     */
    generate: () => string;
    /**
     * Komparasi kode
     * @param code - kode yang diinput
     * @param email - email yang digunakan
     * @param action = aksi yang digunakan. Action yang tersedia:  "verify-account" | "change-email"
     * @param newEmail = email tambahan
     * @returns Hasil
     */
    compare: (code: string, email: string, action: "verify-account" | "change-email", newEmail?: string) => Promise<ResultApi>;
  }
}
