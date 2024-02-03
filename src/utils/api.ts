import { supabase } from "@/lib/supabase";
import { z } from "zod";
import bcrypt from "bcrypt";
import { createTransport } from "nodemailer";

function verifDataBuilder(email: string) {
  const uid = crypto.randomUUID();
  const verificationCode = verification.generate();

  const verifData: Account.VerifCode = {
    uid,
    code: verificationCode,
    email,
  };

  return verifData;
}

const transporter = createTransport({
  host: process.env.SMTP_SERVER,
  port: Number(process.env.SMTP_PORT),
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
});

// UTILS FOR API/Users
export const register = {
  nameValidation: (name: string) => {
    if (!name) {
      return { status: false, ref: "name", msg: "Nama belum diisi" };
    }
    return { status: true };
  },
  usernameValidation: async (username: string) => {
    if (!username) {
      return { status: false, ref: "username", msg: "Username belum diisi" };
    }
    if (username.length <= 7) {
      return { status: false, ref: "username", msg: "Username kurang dari 8 karakter" };
    }

    const isThere = await supabase.from("userslogin").select("*").like("username", username);
    if (isThere.data?.length !== 0) {
      return { status: false, ref: "username", msg: "Username Telah digunakan" };
    }

    return { status: true };
  },
  emailValidation: async (email: string) => {
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
  passwordValidation: (password: string, confirmPassword: string) => {
    const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)\w{7,20}$/;
    if (!password.match(regex)) {
      return { status: false, ref: "password", msg: "Password tidak sesuai dengan aturan" };
    }
    if (password !== confirmPassword) {
      return { status: false, ref: "confirm-password", msg: "Password tidak sama" };
    }

    return { status: true };
  },
  addAccount: async (username: string, password: string, name: string, email: string) => {
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

      return { status: true, msg: "Akun berhasil ditambah", UID: verifData.uid };
    } catch (error) {
      throw error;
    }
  },
};

export const login = {
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

    const verification = await supabase.from("verificationcode").select("*").eq("email", userData.email);
    if (!verification || !verification.data || verification.data.length === 0) throw new Error("Data tidak ada");
    const verifCodeData: Account.VerifCode = verification.data[0];

    if (!userData.account_verified) return { status: false, UID: verifCodeData.uid, msg: "Aku belum diverifikasi, verifikasi sekarang?" };

    return { status: true };
  },
};

export const verification = {
  generate: () => {
    const length = 6;
    let result = "";

    for (let i = 0; i < length; i++) {
      const number = Math.floor(Math.random() * 10);
      result += number;
    }

    return result;
  },
  compare: async (code: string, email: string) => {
    const isNumber = z.number();

    try {
      isNumber.parse(Number(code));
    } catch (error) {
      return { status: false, msg: "Format kode harus angka" };
    }

    const isThere = await supabase.from("verificationcode").select("*").eq("email", email);
    if (!isThere || !isThere.data || isThere.data.length === 0) {
      return { status: false, msg: "Kode tidak tersedia atau sudah kadaluarsa" };
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
      return { status: false, msg: "Kode sudah kadaluarsa" };
    }

    await supabase.from("userslogin").update({ account_verified: true }).eq("email", email);

    await supabase.from("verificationcode").delete().eq("email", email);

    return { status: true, msg: "Akun berhasil diverifikasi, silahkan login" };
  },
};

export const sendMail = {
  verification: async (email: string, verificationCode: string) => {
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
};
