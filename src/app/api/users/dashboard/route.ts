import { DB, supabase } from "@/lib/supabase";
import { dashboard, login, register, sendMail, verifDataBuilder } from "@/utils/api";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  const { oldPassword, newPassword, confirmNewPassword, username, action } = await req.json();

  if (action === "change-password") {
    const oldPasswordValidation = await login.passwordValidation(username, oldPassword);
    if (!oldPasswordValidation.status) return NextResponse.json({ msg: oldPasswordValidation.msg }, { status: 422 });

    const isSamePassword = register.passwordValidation(newPassword, confirmNewPassword);
    if (!isSamePassword.status) return NextResponse.json({ msg: isSamePassword.msg }, { status: 422 });

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await supabase.from(DB.user).update({ password: hashedPassword }).eq("username", username);

    return NextResponse.json({ msg: "Password berhasil diubah" }, { status: 200 });
  }
}

export async function PUT(req: NextRequest) {
  const reqBody = await req.json();
  const data: Account.User = reqBody.data;
  const oldData: Account.User = reqBody.oldData;

  const nameValidation = dashboard.nameValidation(data.name);
  if (!nameValidation.status) return NextResponse.json({ msg: nameValidation.msg }, { status: 422 });

  const usernameValidation = await dashboard.usernameValidation(data.username, oldData.username);
  if (!usernameValidation.status) return NextResponse.json({ msg: usernameValidation.msg }, { status: 422 });

  const emailValidation = await dashboard.emailValidation(data.email, oldData.email);
  if (!emailValidation.status) return NextResponse.json({ msg: emailValidation.msg }, { status: 422 });

  if (data.email !== oldData.email) {
    const verifData: Account.VerifCode = verifDataBuilder(data.email);
    await supabase.from(DB.code).insert(verifData).select();

    await sendMail.verification(data.email, verifData.code, data.name, verifData.uid);

    return NextResponse.json({ popupEmail: true }, { status: 200 });
  }

  const changeData = await dashboard.changeHandler(data);
  if (!changeData.status) return NextResponse.json({ msg: changeData.msg }, { status: 422 });

  return NextResponse.json({ msg: "Data berhasil diubah" }, { status: 200 });
}
