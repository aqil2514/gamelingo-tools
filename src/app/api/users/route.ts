import { checkUser, checkEmail, updateUser } from "@/lib/prisma/users";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { login, register } from "@/utils/api";

export async function GET(req: Request) {
  const serverSession: any = await getServerSession();

  if (!serverSession) {
    redirect("/");
  }
  const user = await checkEmail(serverSession.user?.email);
  const { name, username, email, role } = user[0];
  return NextResponse.json({ user: { name, username, email, role }, status: 200, msg: "Ok" });
}

type TypeActionState = "register" | "login";
export async function POST(req: NextRequest) {
  const reqBody = await req.json();
  const typeAction: TypeActionState = reqBody.typeAction;

  if (typeAction === "register") {
    const data: Account.RegisterForm = reqBody;
    const { name, username, password, confirmPassword, email } = data;

    const nameValidation = register.nameValidation(name);
    if (!nameValidation?.status) {
      return NextResponse.json({ ref: nameValidation?.ref, msg: nameValidation?.msg }, { status: 422 });
    }

    const usernameValidation = await register.usernameValidation(username);
    if (!usernameValidation.status) {
      return NextResponse.json({ ref: usernameValidation.ref, msg: usernameValidation.msg }, { status: 422 });
    }

    const emailValidation = await register.emailValidation(email);
    if (!emailValidation.status) {
      return NextResponse.json({ ref: emailValidation.ref, msg: emailValidation.msg }, { status: 422 });
    }

    const passwordValidation = register.passwordValidation(password, confirmPassword);
    if (!passwordValidation.status) {
      return NextResponse.json({ ref: passwordValidation?.ref, msg: passwordValidation?.msg }, { status: 422 });
    }

    const addAccount = await register.addAccount(username, password, name, email);
    return NextResponse.json({ msg: addAccount.msg, UID: addAccount.UID }, { status: 200 });
  }
  if (typeAction === "login") {
    const data: Account.LoginForm = reqBody;
    const { username, password } = data;

    const usernameValidation = await login.usernameValidation(username);
    if (!usernameValidation.status) return NextResponse.json({ msg: usernameValidation.msg }, { status: 422 });

    const passwordValidation = await login.passwordValidation(username, password);
    if (!passwordValidation.status) return NextResponse.json({ msg: passwordValidation.msg }, { status: 422 });

    const isVerified = await login.isVerifiedValidation(username);
    if (!isVerified.status) return NextResponse.json({ msg: isVerified.msg, UID: isVerified.UID }, { status: 422 });

    return NextResponse.json({ msg: "Login berhasil" }, { status: 200 });
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
