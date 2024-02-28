import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { linkBuilder, register, resetPassword, sendMail } from "@/utils/api";
import { DB, supabase } from "@/lib/supabase";
import { baseUrl } from "@/components/general/Data";

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  const emailValidation = await resetPassword.checkEmail(email);
  if (!emailValidation.status) return NextResponse.json({ msg: emailValidation.msg }, { status: 422 });

  const uidLink = linkBuilder();
  const uniqueLink = `${baseUrl}/reset-password/${uidLink}`;

  await sendMail.purify(email, uniqueLink);

  await supabase.from(DB.purifyPassword).insert({ email, uid: uidLink });
  return NextResponse.json({ msg: `Email verifikasi telah dikirim ke ${email}` }, { status: 200 });
}

export async function PUT(req: NextRequest) {
  const { password, confirmPassword, email } = await req.json();

  console.log(password, confirmPassword, email);

  const passwordValidation = register.passwordValidation(password, confirmPassword);
  if (!passwordValidation.status) return NextResponse.json({ msg: passwordValidation.msg }, { status: 422 });

  const hashedPassword = await bcrypt.hash(password, 10);

  await supabase.from(DB.user).update({ password: hashedPassword, passwordExist: true }).eq("email", email);

  return NextResponse.json({ msg: "Password berhasil dibuat" }, { status: 200 });
}
