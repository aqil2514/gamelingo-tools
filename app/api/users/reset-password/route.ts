import { addResetLink, checkEmail } from "@/lib/prisma/users";
import { NextRequest, NextResponse } from "next/server";
import { createTransport } from "nodemailer";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const UID = url.searchParams.get("UID");

  return NextResponse.json({ UID });
}

const transporter = createTransport({
  host: process.env.SMTP_SERVER,
  port: Number(process.env.SMTP_PORT),
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function POST(req: NextRequest) {
  const { email } = await req.json();

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

  const user = await checkEmail(email);
  if (user.length === 0) {
    return NextResponse.json({ status: 404, msg: "Username dengan email tersebut tidak ada" });
  }

  function generateRandomUID() {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let uid = "";

    for (let i = 0; i < 15; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      const randomChar = characters.charAt(randomIndex);
      uid += randomChar;
    }

    return uid;
  }

  const UID = generateRandomUID();
  const uniqueLink = `https://gamelingo-tools.vercel.app/reset-password/${UID}`;

  const mailData = {
    from: "clevergaming68@gmail.com",
    to: email,
    subject: "Reset Password",
    html: `<p>Click this link to reset your password: ${uniqueLink}</p>`,
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

  const data = {
    email,
    UID,
  };

  await addResetLink(data);

  return NextResponse.json({ status: 200, msg: "Link Pemulihan sudah dikirim ke email! Periksa juga folder spam" });
}
