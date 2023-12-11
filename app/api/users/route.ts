import { checkUser, addUser, checkEmail, getUsers } from "@/lib/prisma/users";
import { NextResponse } from "next/server";
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

export async function POST(req: Request) {
  const { name, username, password, confirmPassword, email, typeAction, id } = await req.json();
  if (typeAction === "login") {
    try {
      if (!password) {
        return NextResponse.json({ status: 403, msg: `Password belum diisi` });
      }
      const user = await checkUser(username);

      const compare = await bcrypt.compare(password, user[0].password);
      if (!compare) {
        return NextResponse.json({ status: 403, msg: "Password Salah" });
      }

      return NextResponse.json({ status: 200, msg: "Login Berhasil" });

      // if (user.length > 0 && user[0].password === password) {
      //   return NextResponse.json({ status: 200, msg: `Login Berhasil` });
      // } else if (user.length <= 0) {
      //   return NextResponse.json({ status: 404, msg: `Akun tidak terdaftar` });
      // } else if (user[0].password !== password) {
      //   return NextResponse.json({ status: 402, msg: `Password Salah` });
      // }
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
      return NextResponse.json({ secondCheck, status: 200, msg: "Akun Berhasil ditambah. Silahkan login!" });
    }

    const dataUser = {
      name,
      username,
      password: hashedPassword,
      email,
    };

    await addUser(dataUser);

    return NextResponse.json({ status: 200, msg: "Akun berhasil ditambah. Silahkan login" });
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
