//@ts-ignore
import prisma from "@/lib/prisma/prisma";
import { NextResponse } from "next/server";
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

  const uniqueToken = Math.floor(Math.random() * 1000000);

  await new Promise((resolve, reject) => {
    // verify connection configuration
    transporter.verify((error, success) => {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        console.log("Server is ready to take our messages");
        resolve(success);
      }
    });
  });

  if (putType === "code") {
    //@ts-ignore
    await prisma.verificationCode.update({
      where: {
        UID: BigInt(UID),
      },
      data: {
        code: uniqueToken,
      },
    });

    const mailData = {
      from: "clevergaming68@gmail.com",
      to: email,
      subject: "Email Verification",
      html: `<p>Your Verification Code: ${uniqueToken}</p>`,
    };

    await new Promise((resolve, reject) => {
      transporter.sendMail(mailData, (err, info) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          console.log(info);
          resolve(info);
        }
      });
    });

    return NextResponse.json({ status: "ok", msg: `Kode Verifikasi telah dikirim kembali ke ${email}` });
  }
  if (putType === "email") {
    //@ts-ignore
    await prisma.verificationCode.update({
      where: {
        UID: BigInt(UID),
      },
      data: {
        email,
      },
    });

    //@ts-ignore
    await prisma.usersLogin.update({
      where: {
        email: oldEmail,
      },
      data: {
        email,
      },
    });

    return NextResponse.json({ msg: `Email telah diganti dari ${oldEmail} menjadi ${email}. Silahkan kirim ulang kode` });
  }
}
