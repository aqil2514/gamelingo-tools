/**
 *
 * API FOR SERVER SIDE
 *
 */

import { DB, UserSelect, supabase } from "@/lib/supabase";
import { z } from "zod";
import bcrypt from "bcrypt";
import { createTransport } from "nodemailer";
import { getServerSession } from "next-auth";
import { authOptions } from "./authoptions";
import Character from "@/models/Evertale/Characters";
import { Route } from "next";
import { UploadApiResponse, v2 as cloudinary } from "cloudinary";
import { User } from "@/models/General/User";
import { MailOptions } from "nodemailer/lib/sendmail-transport";
import { baseUrl } from "@/components/general/Data";

/** Membuat verifikasi data untuk disimpan ke Database */
export function verifDataBuilder(email: string) {
  const uid = crypto.randomUUID();
  const verificationCode = verification.generate();

  const verifData: Account.VerifCode = {
    uid,
    code: verificationCode,
    email,
  };

  return verifData;
}

/**
 * Membuat link untuk pemulihan password
 */
export function linkBuilder() {
  const uid = crypto.randomUUID();

  return uid;
}

const transporter = createTransport({
  host: process.env.SMTP_SERVER,
  port: Number(process.env.SMTP_PORT),
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
});

/**
 * USERS API UTILS
 */

/** Register API Utils */
export const register: ApiUtils.RegisterApi = {
  nameValidation: (name) => {
    if (!name) {
      return { status: false, ref: "name", msg: "Nama belum diisi" };
    }
    return { status: true };
  },
  usernameValidation: async (username) => {
    if (!username) {
      return { status: false, ref: "username", msg: "Username belum diisi" };
    }
    if (username.length <= 7) {
      return {
        status: false,
        ref: "username",
        msg: "Username kurang dari 8 karakter",
      };
    }

    const isThere = await supabase.from(DB.user).select("*").like("username", username);
    if (isThere.data?.length !== 0) {
      return {
        status: false,
        ref: "username",
        msg: "Username Telah digunakan",
      };
    }

    return { status: true };
  },
  emailValidation: async (email) => {
    const emailType = z.string().email();

    try {
      emailType.parse(email);
    } catch (error) {
      return { status: false, ref: "email", msg: "Email tidak valid" };
    }

    const isThere = await supabase.from(DB.user).select("*").like("email", email);
    if (isThere.data?.length !== 0) return { status: false, ref: "email", msg: "Email telah digunakan" };

    return { status: true };
  },
  passwordValidation: (password, confirmPassword) => {
    const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)\w{7,20}$/;
    if (!password.match(regex)) {
      return {
        status: false,
        ref: "password",
        msg: "Password tidak sesuai dengan aturan",
      };
    }
    if (password !== confirmPassword) {
      return {
        status: false,
        ref: "confirm-password",
        msg: "Password tidak sama",
      };
    }

    return { status: true };
  },
  addAccount: async (username, password, name, email) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = crypto.randomUUID();

    const insertData: Account.UsersLogin = {
      id: userId,
      username,
      name,
      password: hashedPassword,
      email,
      passwordExist: true,
      role: "User",
    };

    const verifData: Account.VerifCode = verifDataBuilder(email);

    try {
      await supabase.from(DB.user).insert(insertData).select();

      await supabase.from(DB.code).insert(verifData).select();

      await sendMail.verification(email, verifData.code, name, verifData.uid);

      await User.create({
        userId,
        username: insertData.username,
        name: insertData.name,
        email: insertData.email,
        avatar: null,
        post: [],
      });

      return {
        status: true,
        msg: "Akun berhasil ditambah",
        UID: verifData.uid,
      };
    } catch (error) {
      throw error;
    }
  },
};

/** Login API Utils*/
export const login: ApiUtils.LoginApi = {
  usernameValidation: async (username: string) => {
    if (!username) return { status: false, msg: "Username belum diisi" };

    const isThere = await supabase.from(DB.user).select("*").eq("username", username);
    if (!isThere || !isThere.data || isThere.data?.length === 0) {
      return { status: false, msg: "Username tidak tersedia" };
    }

    return { status: true };
  },
  passwordValidation: async (username: string, password: string) => {
    if (!password) return { status: false, msg: "Password belum diisi" };

    const isThere = await supabase.from(DB.user).select("*").eq("username", username);
    if (!isThere || !isThere.data || isThere.data?.length === 0) {
      return { status: false, msg: "Username tidak tersedia" };
    }

    const passwordCompared = await bcrypt.compare(password, isThere.data[0].password);
    if (!passwordCompared) return { status: false, msg: "Password salah" };

    return { status: true };
  },
  isVerifiedValidation: async (username: string) => {
    const isVerified = await supabase.from(DB.user).select("*").eq("username", username);

    if (!isVerified || !isVerified.data || isVerified.data.length === 0) throw new Error("Data tidak ada");
    const userData: Account.UsersLogin = isVerified.data[0];

    if (!userData.account_verified) {
      const verification = await supabase.from(DB.code).select("*").eq("email", userData.email);
      if (!verification || !verification.data || verification.data.length === 0) throw new Error("Data tidak ada");
      const verifCodeData: Account.VerifCode = verification.data[0];

      if (!userData.account_verified)
        return {
          status: false,
          UID: verifCodeData.uid,
          msg: "Aku belum diverifikasi, verifikasi sekarang?",
        };
    }

    return { status: true };
  },
};

/** Dashboard API Utils */
export const dashboard: ApiUtils.DashboardApi = {
  /** Validasi nama */
  nameValidation: (name) => {
    if (!name) return { status: false, msg: "Nama belum diisi" };

    return { status: true };
  },
  /** Validasi Username */
  usernameValidation: async (username, oldUsername) => {
    if (!username) return { status: false, msg: "Username belum diisi" };

    if (username.length <= 7) return { status: false, msg: "Username kurang dari 8 karakter" };

    const isDupplicate = await supabase.from(DB.user).select("username").eq("username", username);
    if (isDupplicate.data?.length !== 0 && isDupplicate!.data![0].username !== oldUsername) return { status: false, msg: "Username telah digunakan" };

    return { status: true };
  },
  /** Validasi email */
  emailValidation: async (email, oldEmail) => {
    if (!email) return { status: false, msg: "Email belum diisi" };

    const emailType = z.string().email();

    try {
      emailType.parse(email);
    } catch (error) {
      return { status: false, ref: "email", msg: "Email tidak valid" };
    }

    const isDupplicate = await supabase.from(DB.user).select("email").like("email", email);
    if (isDupplicate.data?.length !== 0 && isDupplicate!.data![0].email !== oldEmail) return { status: false, ref: "email", msg: "Email telah digunakan" };

    return { status: true };
  },
  /** Fungsi ubah data */
  changeHandler: async (data) => {
    try {
      await supabase.from(DB.user).update(data).eq("id", data.id);

      await User.findOneAndUpdate({ userId: data.id }, data);

      return { status: true };
    } catch (error) {
      return { status: false, msg: "Terjadi kesalahan", error };
    }
  },
};

/**
 * Verification API Utils
 */
export const verification: ApiUtils.VerificationApi = {
  generate: () => {
    const length = 6;
    let result = "";

    for (let i = 0; i < length; i++) {
      const number = Math.floor(Math.random() * 10);
      result += number;
    }

    return result;
  },

  compare: async (code, email, action, newEmail) => {
    // Periksa apakah 'code' adalah angka
    if (isNaN(Number(code))) {
      return { status: false, msg: "Format kode harus angka" };
    }

    const isThere = await supabase.from(DB.code).select("*").eq("email", email);
    if (!isThere || !isThere.data || isThere.data.length === 0) {
      return {
        status: false,
        msg: "Kode tidak tersedia atau sudah kadaluarsa",
      };
    }

    const isSame = await supabase.from(DB.code).select("*").eq("code", code);
    if (!isSame || !isSame.data || isSame.data.length === 0) {
      return { status: false, msg: "Kode verifikasi salah" };
    }

    const date = isSame.data[0].createdat;
    const currentTime = new Date();
    const createdDate = new Date(date + "Z");

    const currentTimeUTC = currentTime.getTime();
    const createdDateUTC = createdDate.getTime();

    if (currentTimeUTC > createdDateUTC + 5 * 60 * 1000) {
      //Hapus semua kode yang sudah kadaluarsa
      await supabase.from(DB.code).delete().eq("code", code);
      return { status: false, msg: "Kode sudah kadaluarsa" };
    }

    if (action === "verify-account") {
      await supabase.from(DB.user).update({ account_verified: true }).eq("email", email);

      await supabase.from(DB.code).delete().eq("email", email);

      return {
        status: true,
        msg: "Akun berhasil diverifikasi! Silahkan login!",
      };
    } else if (action === "change-email") {
      await supabase.from(DB.user).update({ email }).eq("email", newEmail);

      await supabase.from(DB.code).delete().eq("email", email);

      return { status: true, msg: "Email berhasil diganti!" };
    }

    return { status: true };
  },
};

/** Sendmail API Utils */
export const sendMail: ApiUtils.SendmailApi = {
  async verification(email, verificationCode, name, uid) {
    await new Promise((resolve, reject) => {
      transporter.verify((error, success) => {
        if (error) {
          console.error(error);
          reject(error);
        } else {
          console.info("Server is ready to take our messages");
          resolve(success);
        }
      });
    });

    const mailData: MailOptions = {
      from: "clevergaming68@gmail.com",
      to: email,
      subject: "Email Verification",
      html: `<div style="width:100%;background-color:#333; min-height:10px; padding:1rem; font-family: sans-serif; text-align:center;">
      <h1 style="color: white; text-decoration: underline;">GameLingo Tools</h1>
      <p style="color: orange; font-weight:bold">Halo ${name}! Sedikit lagi anda akan menjadi bagian dari GameLingo Tools.</p>
      <p style="color: orange; font-weight:bold">Ini adalah kode verifikasi Anda :</p>
      <p style="border:2px solid white; border-radius: 1rem; width: 200px; margin: 0.2rem auto; padding: 1rem; font-weight: 900; color: white">${verificationCode}</p>
      <p style="color: orange; font-weight:bold">Anda juga bisa langsung menekan tombol berikut:</p>
      ${
        uid
          ? `<a href="${baseUrl}/verification/${uid}?code=${verificationCode}">
        <button style="background-color:#007bff; border:none; border-radius: 0.5rem; padding: 0.5rem; font-size:1.3rem; color:white">Verifikasi Akun</button>
      </a>`
          : ``
      }
      <p style="color: orange; font-weight:bold">Ayo selesaikan verifikasi email dan jadilah bagian dari GameLingo Tools sekarang juga.</p>
      
      <p style="color: white; font-weight:bold; text-align:left;"> Hormat Kami,</p>
      <br/>
      <br/>
      <p style="color: white; font-weight:bold; text-align:left;"> Admin GameLingo Tools</p>
    </div>`,
    };

    await new Promise((resolve, reject) => {
      transporter.sendMail(mailData, (err, info) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          console.info(info);
          resolve(info);
        }
      });
    });
  },
  async purify(email, uniqueLink) {
    await new Promise((resolve, reject) => {
      transporter.verify((error, success) => {
        if (error) {
          console.error(error);
          reject(error);
        } else {
          console.info("Server is ready to take our messages");
          resolve(success);
        }
      });
    });

    const mailData: MailOptions = {
      from: "clevergaming68@gmail.com",
      to: email,
      subject: "Reset Password",
      html: `<div style="width:100%;background-color:#333; min-height:10px; padding:1rem; font-family: sans-serif; text-align:center;">
      <h1 style="color: white; text-decoration: underline;">GameLingo Tools</h1>
      <p style="color: orange; font-weight:bold">Anda terlihat kesulitan untuk memasuki akun anda.</p>
      <p style="color: orange; font-weight:bold"> Tekan tombol di bawah ini dan Anda akan diarahkan ke halaman reset password</p>
      <a href="${uniqueLink}">
        <button style="background-color:#007bff; border:none; border-radius: 0.5rem; padding: 0.5rem; font-size:1.3rem; color:white">Reset Password</button>
      </a>
      <p style="color: red; font-weight:bold"> Harap diingat link ini hanya bisa digunakan sekali dan akan langsung expired ketika diklik!</p>
      <p style="color: orange; font-weight:bold"> Semoga ini dapat membantu Anda ^_^</p>
      <p style="color: white; font-weight:bold; text-align:left;"> Hormat Kami,</p>
      <br/>
      <br/>
      <p style="color: white; font-weight:bold; text-align:left;"> Admin GameLingo Tools</p>
    </div>`,
    };

    await new Promise((resolve, reject) => {
      transporter.sendMail(mailData, (err, info) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          console.info(info);
          resolve(info);
        }
      });
    });
  },
};

/** Mendapatkan user dari server */
export async function getUser() {
  const session = await getServerSession(authOptions);

  if (!session) return null;

  const user = await supabase
    .from(DB.user)
    .select(UserSelect.basic)
    .eq("id", (session?.user as Account.User)?.id);

  if (!user || !user.data || !user.data[0]) return null;

  const data = user.data[0];
  const userData: Account.User = {
    username: data.username,
    id: data.id,
    name: data.name,
    role: data.role,
    email: data.email,
    image: data.image,
    passwordExisting: data.passwordExist,
  };
  return userData;
}

/**
 * Reset Password Utils
 */
export const resetPassword: ApiUtils.ResetPasswordApi = {
  async checkEmail(email) {
    const isThere = await supabase.from(DB.user).select("email").eq("email", email);
    if (!isThere || !isThere.data || isThere.data.length === 0) return { status: false, msg: "Email tidak ditemukan" };
    return { status: true };
  },
};

// Admin API UTILS

export const admin: ApiUtils.AdminApi = {
  async getUser() {
    const res = await supabase.from(DB.user).select("*");

    if (!res || !res.data || res.data.length === 0) return null;

    const resData = res.data;
    const data = resData.map(
      (d: Account.UsersLogin) =>
        ({
          id: d.id,
          oauthid: d.oauthid,
          image: d.image,
          name: d.name,
          username: d.username,
          email: d.email,
          role: d.role,
          account_verified: d.account_verified,
          createdat: d.createdAt,
          passwordExist: d.passwordExist,
        } as Account.AdminUserOutput)
    );

    return data;
  },
  async getEvertaleCharacter() {
    const characters: Evertale.Character.State[] = await Character.find();

    if (!characters || characters.length === 0) return null;

    const data: Evertale.Character.QuickInfo[] = characters.map((char) => ({
      id: char._id as string,
      name: char.charStatus.charName,
      link: `/evertale/chars/${char._id as string}` as Route,
    }));

    return data;
  },
};

// File Handler Api

/**
 * File API UTILS
 */

export const file: ApiUtils.FileApi = {
  validationImageArray: (files, config) => {
    const allowedExtension = ["webp", "png"];
    const maxSizeInBytes = 1 * 1024 * 1024;

    for (const file of files) {
      const extension = file.type.split("/")[1];

      if (!allowedExtension.includes(extension)) {
        return {
          status: false,
          msg: "Gambar harus format webp atau png",
        };
      }
      if (file.size > maxSizeInBytes) {
        return {
          status: false,
          msg: "Maksimal ukuran gambar 1MB",
        };
      }
    }

    return { status: true, files };
  },
  validationImage: (file, config) => {
    // <<<<< Cek apa saja config yang ditentukan >>>>>
    const allowedExtension = config?.allowedExtension ? config.allowedExtension : ["webp", "png"];
    const validateName = config?.validateName ? config.validateName : false;

    // <<<<< Variabel Local >>>>>
    const maxSizeInBytes = 1 * 1024 * 1024;
    const extension = file.type.split("/")[1];

    // <<<<< Validation >>>>>

    // Apakah formatnya sesuai dengan yang diminta?
    if (!allowedExtension.includes(extension)) {
      return {
        status: false,
        msg: `Format gambar tidak diizinkan. Format yang diizinkan : ${allowedExtension.join(", ")}`,
      };
    }

    // Apakah ukuran gambar tidak lebih dari 1MB?
    if (file.size > maxSizeInBytes) {
      return {
        status: false,
        msg: "Maksimal ukuran gambar 1MB",
      };
    }

    // Apakah file akan divalidasi?
    // TODO: Fix this later
    if (validateName) {
      // Apakah nama gambar sesuai dengan nama data?
      if (validateName === "exactly the same") {
        const name = config?.validationName;
        if (!name) throw new Error("Nama belum ditentukan");

        if (!file.name.toLowerCase().includes(name.toLowerCase())) return { status: false, msg: "Nama Image harus sesuai dengan nama data." };
      }
      // Apakah nama gambar mengandung nama data?
      else if (validateName === "including") {
        const name = config?.validationName;
        if (!name) throw new Error("Nama belum ditentukan");

        if (!file.name.toLowerCase().includes(name.toLowerCase())) {
          return {
            status: false,
            msg: "Nama file tidak mencakup nama karakter. Apa ini file yang benar?",
          };
        }
      } else {
        throw new Error("Pilihan tidak ada");
      }
    }

    return { status: true, file };
  },
  uploadImage: async (files, game, category) => {
    try {
      const uploadPromises = files.map(async (file) => {
        try {
          const fileBuffer = await file.arrayBuffer();
          const format = file.name.split(".");
          const mime = file.type;
          const encoding = "base64";
          const base64Data = Buffer.from(fileBuffer).toString("base64");
          const fileUri = `data:${mime};${encoding},${base64Data}`;

          const result = await cloudinary.uploader.upload(fileUri, {
            invalidate: true,
            folder: `${game}/${category}/${format[1]}`,
            public_id: format[0],
            discard_original_filename: true,
          });

          return result;
        } catch (error) {
          console.error(error);
          throw error;
        }
      });

      const uploadResults = await Promise.all(uploadPromises);
      return uploadResults;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  uploadSingleImage: async (file, game, category) => {
    try {
      const fileBuffer = await file.arrayBuffer();
      const format = file.name.split(".");
      const mime = file.type;
      const encoding = "base64";
      const base64Data = Buffer.from(fileBuffer).toString("base64");
      const fileUri = `data:${mime};${encoding},${base64Data}`;
      const result = await cloudinary.uploader.upload(fileUri, {
        invalidate: true,
        folder: `${game}/${category}/${format[1]}`,
        public_id: format[0],
        discard_original_filename: true,
      });

      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};

/** Type Guard Function */

/** Type Guard for ensuring subfield data in api route
 * 
 * WARNING : this will error if you use this for Client Side.
 */
export const isSubfieldData = {
  account(subfield: any): subfield is General.AdminQueryUser["subfield"] {
    return subfield;
  },
  evertale(subfield: any): subfield is General.AdminQueryGameEvertale["subfield"] {
    return subfield;
  },
  genshinImpact(subfield: any): subfield is General.AdminQueryGameGenshin["subfield"] {
    return subfield;
  },
};
