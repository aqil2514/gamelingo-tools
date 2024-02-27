import { DB, supabase } from "@/lib/supabase";
import { sendMail, verifDataBuilder, verification } from "@/utils/api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("uniqueId");

  if (!id) throw new Error("Id tidak ada");

  const codeInfo = await supabase.from(DB.code).select("*").eq("uid", id);
  if (!codeInfo.data || !codeInfo.data[0]) return NextResponse.json({ msg: "Informasi tidak ditemukan" }, { status: 404 });

  const data = codeInfo.data[0];

  return NextResponse.json({ data }, { status: 200 });
}

export async function PUT(req: NextRequest) {
  const { UID, oldEmail, email, putType } = await req.json();

  if (putType === "code") {
    const isThere = await supabase.from(DB.code).select().eq("email", email);
    if (!isThere || !isThere.data || isThere.data.length === 0) {
      const verifData: Account.VerifCode = verifDataBuilder(email);
      await supabase.from(DB.code).insert(verifData).select();

      await sendMail.verification(email, verifData.code);

      return NextResponse.json({ msg: `Kode Verifikasi telah dikirim kembali ke ${email}` });
    }
    const code = verification.generate();

    await supabase.from(DB.code).update({ code, createdat: new Date() }).eq("email", email);

    await sendMail.verification(email, code);

    return NextResponse.json({ msg: `Kode Verifikasi telah dikirim kembali ke ${email}` });
  }
  if (putType === "email") {
    const code = verification.generate();

    await sendMail.verification(email, code);

    await supabase.from(DB.code).update({ code }).eq("uid", UID);

    await supabase.from(DB.user).update({ email }).eq("email", oldEmail);

    await supabase.from(DB.code).update({ email }).eq("email", oldEmail);

    return NextResponse.json({ msg: `Email telah diganti dari ${oldEmail} menjadi ${email}. Silahkan kirim ulang kode` });
  }
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const { code, email, newEmail, action } = data;

  if (action === "verify-account") {
    const compareResult = await verification.compare(code, email, action);
    if (!compareResult?.status) {
      return NextResponse.json({ msg: compareResult?.msg }, { status: 422 });
    }
  } else if (action === "change-email") {
    const compareResult = await verification.compare(code, newEmail, action, email);
    if (!compareResult?.status) {
      return NextResponse.json({ msg: compareResult?.msg }, { status: 422 });
    }
    return NextResponse.json({ msg: compareResult.msg }, { status: 200 });
  }
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();

  await supabase.from(DB.code).delete().eq("uid", id);

  return NextResponse.json({ msg: "Data berhasil dihapus" }, { status: 200 });
}
