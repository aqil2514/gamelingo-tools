import { supabase } from "@/lib/supabase";
import { z } from "zod";
import bcrypt from "bcrypt";
import { createTransport } from "nodemailer";
import { getServerSession } from "next-auth";
import { authOptions } from "./authoptions";
import connectMongoDB from "@/lib/mongoose";
import Character from "@/models/Evertale/Characters";
import { Route } from "next";

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

/**
 * Mengecek dan mengembalikan Base URL
 */
export function getBaseUrl() {
  const isLocal = process.env.NODE_ENV === "development";
  const baseUrl = isLocal ? "http://localhost:3000" : "https://gamelingo-tools.vercel.app";

  return baseUrl;
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

    const isThere = await supabase.from("userslogin").select("*").like("username", username);
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

    const isThere = await supabase.from("userslogin").select("*").like("email", email);
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

    const insertData: Account.UsersLogin = {
      username,
      name,
      password: hashedPassword,
      email,
      role: "Pengguna",
    };

    const verifData: Account.VerifCode = verifDataBuilder(email);

    try {
      await supabase.from("userslogin").insert(insertData).select();

      await supabase.from("verificationcode").insert(verifData).select();

      await sendMail.verification(email, verifData.code);

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

    const isThere = await supabase.from("userslogin").select("*").eq("username", username);
    if (!isThere || !isThere.data || isThere.data?.length === 0) {
      return { status: false, msg: "Username tidak tersedia" };
    }

    return { status: true };
  },
  passwordValidation: async (username: string, password: string) => {
    if (!password) return { status: false, msg: "Password belum diisi" };

    const isThere = await supabase.from("userslogin").select("*").eq("username", username);
    if (!isThere || !isThere.data || isThere.data?.length === 0) {
      return { status: false, msg: "Username tidak tersedia" };
    }

    const passwordCompared = await bcrypt.compare(password, isThere.data[0].password);
    if (!passwordCompared) return { status: false, msg: "Password salah" };

    return { status: true };
  },
  isVerifiedValidation: async (username: string) => {
    const isVerified = await supabase.from("userslogin").select("*").eq("username", username);

    if (!isVerified || !isVerified.data || isVerified.data.length === 0) throw new Error("Data tidak ada");
    const userData: Account.UsersLogin = isVerified.data[0];

    if (!userData.account_verified) {
      const verification = await supabase.from("verificationcode").select("*").eq("email", userData.email);
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

    const isDupplicate = await supabase.from("userslogin").select("username").eq("username", username);
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

    const isDupplicate = await supabase.from("userslogin").select("email").like("email", email);
    if (isDupplicate.data?.length !== 0 && isDupplicate!.data![0].email !== oldEmail) return { status: false, ref: "email", msg: "Email telah digunakan" };

    return { status: true };
  },
  /** Fungsi ubah data */
  changeHandler: async (data) => {
    try {
      await supabase.from("userslogin").update(data).eq("id", data.id);

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
  /**
   * Menghasilkan kode unik angka
   * @returns Result berupa kode unik angka sebanyak 6 digit
   */
  generate: () => {
    const length = 6;
    let result = "";

    for (let i = 0; i < length; i++) {
      const number = Math.floor(Math.random() * 10);
      result += number;
    }

    return result;
  },
  /**
   * Komparasi kode
   * @param code - kode yang diinput
   * @param email - email yang digunakan
   * @param action = aksi yang digunakan
   * @param newEmail = email tambahan
   * @returns Hasil
   */
  compare: async (code, email, action, newEmail) => {
    // Periksa apakah 'code' adalah angka
    if (isNaN(Number(code))) {
      return { status: false, msg: "Format kode harus angka" };
    }

    const isThere = await supabase.from("verificationcode").select("*").eq("email", email);
    if (!isThere || !isThere.data || isThere.data.length === 0) {
      return {
        status: false,
        msg: "Kode tidak tersedia atau sudah kadaluarsa",
      };
    }

    const isSame = await supabase.from("verificationcode").select("*").eq("code", code);
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
      await supabase.from("verificationcode").delete().eq("code", code);
      return { status: false, msg: "Kode sudah kadaluarsa" };
    }

    if (action === "verify-account") {
      await supabase.from("userslogin").update({ account_verified: true }).eq("email", email);

      await supabase.from("verificationcode").delete().eq("email", email);

      return {
        status: true,
        msg: "Akun berhasil diverifikasi! Silahkan login!",
      };
    } else if (action === "change-email") {
      await supabase.from("userslogin").update({ email }).eq("email", newEmail);

      await supabase.from("verificationcode").delete().eq("email", email);

      return { status: true, msg: "Email berhasil diganti!" };
    }

    return { status: true };
  },
};

/** Sendmail API Utils */
export const sendMail: ApiUtils.SendmailApi = {
  /**
   * Mengirim kode verifikasi ke email
   * @param email - Email tujuan
   * @param verificationCode - Kode yang akan dikirim
   */
  async verification(email, verificationCode) {
    await new Promise((resolve, reject) => {
      transporter.verify((error, success) => {
        if (error) {
          console.log(error);
          reject(error);
        } else {
          console.log("Server is ready to take our messages");
          resolve(success);
        }
      });
    });

    const mailData = {
      from: "clevergaming68@gmail.com",
      to: email,
      subject: "Email Verification",
      html: `<p>Your Verification Code: ${verificationCode}</p>`,
    };

    await new Promise((resolve, reject) => {
      transporter.sendMail(mailData, (err, info) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          console.log(info);
          resolve(info);
        }
      });
    });
  },
  async purify(email, uniqueLink) {
    await new Promise((resolve, reject) => {
      transporter.verify((error, success) => {
        if (error) {
          console.log(error);
          reject(error);
        } else {
          console.log("Server is ready to take our messages");
          resolve(success);
        }
      });
    });

    const mailData = {
      from: "clevergaming68@gmail.com",
      to: email,
      subject: "Reset Password",
      html: `<p>Click the link to:<br /> <a href="${uniqueLink}"> Purify your Password </a></p>`,
    };

    await new Promise((resolve, reject) => {
      transporter.sendMail(mailData, (err, info) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          console.log(info);
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
    .from("userslogin")
    .select("username, email, name, role, id, image")
    .eq("id", (session?.user as Account.User)?.id);

  if (!user || !user.data || !user.data[0]) return null;

  const userData = user.data[0] as Account.User;
  return userData;
}

export const resetPassword: ApiUtils.ResetPasswordApi = {
  /**
   * Konfirmasi email
   * @param email = Email yang menjadi pemulihan
   */
  async checkEmail(email) {
    const isThere = await supabase.from("userslogin").select("email").eq("email", email);
    if (!isThere || !isThere.data || isThere.data.length === 0) return { status: false, msg: "Email tidak ditemukan" };
    return { status: true };
  },
};

// Admin API UTILS

export const admin: ApiUtils.AdminApi = {
  async getUser() {
    const res = await supabase.from("userslogin").select("*");

    if (!res || !res.data || res.data.length === 0) return null;

    const resData = res.data;
    const data = resData.map((d: Account.UsersLogin) => ({
      id: d.id,
      oauthid: d.oauthid,
      image: d.image,
      name: d.name,
      username: d.username,
      email: d.email,
      role: d.role,
      account_verified: d.account_verified,
      createdat: d.createdAt,
    }));

    return data;
  },
  async getEvertaleCharacter() {
    await connectMongoDB();

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

//Genshin Validator API Utils

export const genshinValidator: ApiUtils.GenshinValidatorApi = {
  async material({ name, image, lore, gainedFrom, rarity, typeMaterial }) {
    const allowedType: GenshinImpact.Material["typeMaterial"][] = ["Character Ascension", "Talent Material", "Weapon Ascension", "Weapon and Character Material"];

    if (!name) return { status: false, msg: "Nama material belum diisi" };
    if (!lore) return { status: false, msg: "Lore material belum diisi" };
    if (!rarity) return { status: false, msg: "Rarity material belum diisi" };
    if (!typeMaterial) return { status: false, msg: "Tipe material belum diisi" };
    if (allowedType.includes(typeMaterial)) return { status: false, msg: "Tipe material tidak dikenal" };

    return { status: true };
  },
};
