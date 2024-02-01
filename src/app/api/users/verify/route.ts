import connectMongoDB from "@/lib/mongoose";
//@ts-ignore
import prisma from "@/lib/prisma/prisma";
import { supabase } from "@/lib/supabase";
import User from "@/models/Evertale/Users";
import { sendMail, verification } from "@/utils/api";
import { NextRequest, NextResponse } from "next/server";
import { createTransport } from "nodemailer";

export async function GET() {
  //@ts-ignore
  const verify = await prisma.verificationCode.findMany();

  const serializedVerify = verify.map((item: any) => ({
    ...item,
    UID: item.UID.toString(),
  }));

  return NextResponse.json({ serializedVerify });
}

const transporter = createTransport({
  host: process.env.SMTP_SERVER,
  port: Number(process.env.SMTP_PORT),
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function PUT(req: Request) {
  const { UID, oldEmail, email, putType } = await req.json();

  if (putType === "code") {
    const code = verification.generate();

    await supabase.from("verificationcode").update({ code }).eq("email", email);

    await sendMail(email, code);

    return NextResponse.json({ msg: `Kode Verifikasi telah dikirim kembali ke ${email}` });
  }
  if (putType === "email") {
    const code = verification.generate();

    await sendMail(email, code);

    await supabase.from("verificationcode").update({ code }).eq("uid", UID);

    await supabase.from("userslogin").update({ email }).eq("email", oldEmail);

    await supabase.from("verificationcode").update({ email }).eq("email", oldEmail);

    return NextResponse.json({ msg: `Email telah diganti dari ${oldEmail} menjadi ${email}. Silahkan kirim ulang kode` });
  }
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const { code, email } = data;

  const compareResult = await verification.compare(code, email);
  if (!compareResult?.status) {
    return NextResponse.json({ msg: compareResult?.msg }, { status: 422 });
  }

  return NextResponse.json({ msg: compareResult.msg }, { status: 200 });
}
