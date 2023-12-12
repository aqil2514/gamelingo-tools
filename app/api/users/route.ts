import { checkUser, addUser, checkEmail, getUsers } from "@/lib/prisma/users";
import { NextResponse } from "next/server";
import { createTransport } from "nodemailer";
import bcrypt from "bcrypt";
//@ts-ignore
import prisma from "@/lib/prisma/prisma";

export async function GET(req: Request) {
  const users = await getUsers();
  return NextResponse.json({ users, status: 200, msg: "Ok" });

  // if (typeAction === "getAccountInfo") {
  //   return NextResponse.json({ typeAction }, { status: 200 });
  // }
  // try {
  //   return NextResponse.json({ users }, { status: 200 });
  // } catch (error) {
  //   return NextResponse.json({ error }, { status: 500 });
  // }
}

const transporter = createTransport({
  host: process.env.SMTP_SERVER,
  port: Number(process.env.SMTP_PORT),
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
  // secure: true,
});

export async function POST(req: Request) {
  const { name, username, password, confirmPassword, email, typeAction, id, code } = await req.json();
  if (typeAction === "login") {
    try {
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
      if (!compare) {
        return NextResponse.json({ status: "w-password", msg: "Password Salah" });
      } else if (user[0].account_verified === false) {
        return NextResponse.json({ status: "av", msg: "Akun belum diverifikasi", email: user[0].email });
      }

      return NextResponse.json({ status: "ok", msg: "Login Berhasil" });
    } catch (error) {
      return NextResponse.json({ error }, { status: 500 });
    }
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

    //@ts-ignore
    // await prisma.verificationCode.create({
    //   data: {
    //     email,
    //     code: verificationCode,
    //   },
    // });

    // await addUser(dataUser);

    return NextResponse.json({
      status: 200,
      msg: "Kode verifikasi telah dikirim ke email! Silahkan masukkan kode verifikasi",
    });
  } else if (typeAction === "code") {
    //@ts-ignore
    const verifyCode = await prisma.verificationCode.findMany({
      where: {
        email,
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
        email,
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
