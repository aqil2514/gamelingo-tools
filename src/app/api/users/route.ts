// import { checkUser, checkEmail, updateUser } from "@/lib/prisma/users";
import { NextRequest, NextResponse } from "next/server";
import { login, register } from "@/utils/api";
import { DB, UserSelect, supabase } from "@/lib/supabase";
import { User } from "@/models/General/User";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const userId = searchParams.get("userId");

  if (!userId) return NextResponse.json({ userId: "Tidak ada user id" }, { status: 200 });

  const user = await supabase.from(DB.user).select(UserSelect.basic).eq("id", userId);
  if (!user.data || !user.data[0]) return NextResponse.json({ userId: "Tidak ditemukan" }, { status: 200 });
  const data: Account.AdminUserOutput = {
    id: userId,
    username: user.data[0].username,
    name: user.data[0].name,
    email: user.data[0].email,
    role: user.data[0].role,
    passwordExist: user.data[0].passwordExist,
    image: user.data[0].image,
    createdat: user.data[0].createdat,
    account_verified: user.data[0].account_verified,
    oauthid: user.data[0].oauthid,
  };

  return NextResponse.json({ data, user }, { status: 200 });
}

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

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();

  await supabase.from(DB.user).delete().eq("id", id);
  await User.findOneAndDelete({ userId: id });

  return NextResponse.json({ msg: "Data berhasil dihapus" }, { status: 200 });
}
