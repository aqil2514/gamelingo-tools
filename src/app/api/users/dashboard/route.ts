import { supabase } from "@/lib/supabase";
import { dashboard, sendMail, verifDataBuilder } from "@/utils/api";
import { NextRequest, NextResponse } from "next/server";

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
    await supabase.from("verificationcode").insert(verifData).select();

    await sendMail.verification(data.email, verifData.code);

    return NextResponse.json({ popupEmail: true }, { status: 200 });
  }

  const changeData = await dashboard.changeHandler(data);
  if (!changeData.status) return NextResponse.json({ msg: changeData.msg }, { status: 422 });

  return NextResponse.json({ msg: "Data berhasil diubah" }, { status: 200 });
}
