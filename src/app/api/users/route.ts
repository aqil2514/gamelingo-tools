// import { checkUser, checkEmail, updateUser } from "@/lib/prisma/users";
import { NextRequest, NextResponse } from "next/server";
import { login, register } from "@/utils/api";

export async function POST(req: NextRequest) {
  const reqBody = (await req.json()) as Route.Request.Users;
  const typeAction = reqBody.typeAction;

  if (typeAction === "register") {
    const { name, username, password, confirmPassword, email } = reqBody;

    if (!name || !confirmPassword || !email) return NextResponse.json({ msg: "Data tidak lengkap" } as Route.Response.Users, { status: 422 });

    const nameValidation = register.nameValidation(name);
    if (!nameValidation?.status) {
      return NextResponse.json({ ref: nameValidation?.ref, msg: nameValidation?.msg } as Route.Response.Users, { status: 422 });
    }

    const usernameValidation = await register.usernameValidation(username);
    if (!usernameValidation.status) {
      return NextResponse.json({ ref: usernameValidation.ref, msg: usernameValidation.msg } as Route.Response.Users, { status: 422 });
    }

    const emailValidation = await register.emailValidation(email);
    if (!emailValidation.status) {
      return NextResponse.json({ ref: emailValidation.ref, msg: emailValidation.msg } as Route.Response.Users, { status: 422 });
    }

    const passwordValidation = register.passwordValidation(password, confirmPassword);
    if (!passwordValidation.status) {
      return NextResponse.json({ ref: passwordValidation?.ref, msg: passwordValidation?.msg } as Route.Response.Users, { status: 422 });
    }

    const addAccount = await register.addAccount(username, password, name, email);
    return NextResponse.json({ msg: addAccount.msg, UID: addAccount.UID } as Route.Response.Users, { status: 200 });
  }
  if (typeAction === "login") {
    const { username, password } = reqBody;

    const usernameValidation = await login.usernameValidation(username);
    if (!usernameValidation.status) return NextResponse.json({ msg: usernameValidation.msg } as Route.Response.Users, { status: 422 });

    const passwordValidation = await login.passwordValidation(username, password);
    if (!passwordValidation.status) return NextResponse.json({ msg: passwordValidation.msg } as Route.Response.Users, { status: 422 });

    const isVerified = await login.isVerifiedValidation(username);
    if (!isVerified.status) return NextResponse.json({ msg: isVerified.msg, UID: isVerified.UID } as Route.Response.Users, { status: 422 });

    return NextResponse.json({ msg: "Login berhasil" } as Route.Response.Users, { status: 200 });
  }
}
