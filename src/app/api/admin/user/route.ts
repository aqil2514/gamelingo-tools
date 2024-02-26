import { admin } from "@/utils/formUtils";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  const formData = await req.formData();

  const data = Object.fromEntries(formData.entries()) as unknown as FormUtils.Account.FormDataUser;

  const process = await admin.processUser(data);
  if (process.status === 422) return NextResponse.json({ msg: process.msg }, { status: 422 });

  return NextResponse.json({ process, msg: "Data berhasil diubah" }, { status: 200 });
}
