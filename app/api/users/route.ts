import { checkUser, addUser, checkEmail, getUsers, updateUser } from "@/lib/prisma/users";
import { NextResponse } from "next/server";
import { createTransport } from "nodemailer";
import bcrypt from "bcrypt";
//@ts-ignore
import prisma from "@/lib/prisma/prisma";
import { getSession } from "next-auth/react";
import { redirect } from "next/navigation";

export async function GET(req: Request) {
  const session = await getSession();

  if (!session) {
    redirect("/");
  }
  const users = await getUsers();
  return NextResponse.json({ session, users, status: 200, msg: "Ok" });
}

const transporter = createTransport({
  host: process.env.SMTP_SERVER,
  port: Number(process.env.SMTP_PORT),
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function POST(req: Request) {
  const { name, username, password, confirmPassword, email, typeAction, id, code, UID } = await req.json();
  if (typeAction === "login") {
    if (!username) {
      return NextResponse.json({ status: "n-username", msg: `Username belum diisi` });
    } else if (!password) {
      return NextResponse.json({ status: "n-password", msg: `Password belum diisi` });
    }
    const user = await checkUser(username);

    if (user.length === 0) {
      return NextResponse.json({ status: "n-user", msg: "Akun tidak ditemukan" });
    }

    const compare = await bcrypt.compare(password, user[0].password);
    //@ts-ignore
    const verify = await prisma.verificationCode.findMany({});
    const serializedVerify = verify.map((item: any) => ({
      ...item,
      UID: item.UID.toString(),
    }));
    if (!compare) {
      return NextResponse.json({ status: "w-password", msg: "Password Salah" });
    } else if (user[0].account_verified === false) {
      return NextResponse.json({ status: "av", msg: "Akun belum diverifikasi", UID: serializedVerify[0].UID });
    }

    return NextResponse.json({ status: "ok", msg: "Login Berhasil" });
  } else if (typeAction === "register") {
    if (name.length <= 0 || username.length <= 0 || password.length <= 0 || confirmPassword.length <= 0 || email.length <= 0) {
      return NextResponse.json({ status: "no-data", msg: "Ada data yang belum diisi" });
    } else if (username.length <= 7) {
      return NextResponse.json({ status: "less-username", msg: "Username terlalu pendek" });
    } else if (password !== confirmPassword) {
      return NextResponse.json({ status: "incorrect-password", msg: "Password tidak sama" });
    } else if (password.length <= 7) {
      return NextResponse.json({ status: "less-password", msg: "Password terlalu pendek" });
    }

    const isUser = await checkUser(username);
    const isEmail = await checkEmail(email);

    if (isUser.length === 1) {
      return NextResponse.json({ isUser, status: "found-user", msg: "User telah terdaftar. Gunakan data yang lain atau login" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const number: number[] = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];

    const verificationCode = parseInt(number.join(""));

    if (isEmail.length === 1) {
      //@ts-ignore
      const secondCheck = await prisma.usersLogin.findMany({
        where: {
          email,
          username: null,
        },
      });

      if (secondCheck.length === 0) {
        return NextResponse.json({ secondCheck, status: "email-found", msg: "Email telah terdaftar. Gunakan data yang lain atau login" });
      }
      // @ts-ignore
      await prisma.usersLogin.update({
        where: {
          email,
        },
        data: {
          username,
          password: hashedPassword,
        },
      });

      transporter.sendMail(
        {
          from: "clevergaming68@gmail.com",
          to: email,
          subject: "Email Verification",
          text: "",
          html: `<p>Your Verification Code: ${verificationCode}</p>`,
        },
        (err, info) => {
          if (err) {
            console.error(err);
          }
          console.log(info);
        }
      );

      //@ts-ignore
      await prisma.verificationCode.create({
        data: {
          email,
          code: verificationCode,
        },
      });
      return NextResponse.json({ secondCheck, status: 200, msg: "Sedikit lagi. Masukkan kode verifikasi dari email!" });
    }

    const dataUser = {
      name,
      username,
      password: hashedPassword,
      email,
    };

    await new Promise((resolve, reject) => {
      // verify connection configuration
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
      text: "",
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

    const UID = Math.floor(Math.random() * 1000000000000000);

    //@ts-ignore
    await prisma.verificationCode.create({
      data: {
        email,
        code: verificationCode,
        UID,
      },
    });

    await addUser(dataUser);

    return NextResponse.json({
      status: 200,
      UID,
      msg: "Kode verifikasi telah dikirim ke email! Periksa juga folder spam. Silahkan masukkan kode verifikasi",
    });
  } else if (typeAction === "code") {
    //@ts-ignore
    const verifyCode = await prisma.verificationCode.findMany({
      where: {
        code: parseInt(code),
      },
    });

    if (verifyCode.length === 0) {
      return NextResponse.json({ msg: "Kode salah atau Kadaluarsa" });
    }

    //@ts-ignore
    await prisma.usersLogin.update({
      where: {
        email,
      },
      data: {
        account_verified: true,
      },
    });

    //@ts-ignore
    await prisma.verificationCode.deleteMany({
      where: {
        UID: BigInt(UID),
        code: parseInt(code),
      },
    });

    return NextResponse.json({ status: "ok", msg: "Akun telah diverifikasi! Silahkan login" });
  } else if (typeAction === "update-info") {
    //@ts-ignore
    await prisma.usersLogin.update({
      where: {
        id,
      },
      data: {
        name,
        username,
        email,
      },
    });
    return NextResponse.json({ status: 200, msg: "Data berhasil diubah" });
  }
}

export async function PUT(req: Request) {
  const { username, password, putType } = await req.json();

  if (putType === "changePassword") {
    const { oldPassword, newPassword, confirmNewPassword } = password;

    if (!oldPassword || !newPassword || !confirmNewPassword) {
      return NextResponse.json({ status: "nd", msg: "Data masih ada yang kosong" });
    }

    const user = await checkUser(username);
    const compare = await bcrypt.compare(oldPassword, user[0].password);

    if (!compare) {
      return NextResponse.json({ status: "wp", msg: "Kata sandi lama salah" });
    }

    if (newPassword !== confirmNewPassword) {
      return NextResponse.json({ status: "wp2", msg: "Konfirmasi kata sandi baru tidak sama" });
    }

    if (newPassword === oldPassword) {
      return NextResponse.json({ status: "sp", msg: "Kata sandi baru tidak boleh sama dengan kata sandi lama" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const where = {
      username,
    };

    const data = {
      password: hashedPassword,
    };

    await updateUser(where, data);

    return NextResponse.json({ user, status: "ok", msg: "Password berhasil diganti" });
  }
}
