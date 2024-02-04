import { addVerificationCode, checkEmail, checkUser, checkVerificationCode, deleteVerificationCode, updateUser, updateVerificationCode } from "@/lib/prisma/users";
import { dashboard } from "@/utils/api";
import { NextRequest, NextResponse } from "next/server";
import { createTransport } from "nodemailer";

const transporter = createTransport({
  host: process.env.SMTP_SERVER,
  port: Number(process.env.SMTP_PORT),
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const email: any = url.searchParams.get("email");

  const userEmail = await checkEmail(email);
  if (userEmail.length === 1) {
    return NextResponse.json({ status: 400, msg: "Email sudah digunakan" });
  }

  const checkCode = await checkVerificationCode({ email });
  const code = checkCode.map((item: any) => ({
    ...item,
    UID: item.UID.toString(),
  }));

  const uniqeCode = Math.floor(Math.random() * 1000000);
  const UID = Math.floor(Math.random() * 1000000000000000);

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

  const mailData = {
    from: "clevergaming68@gmail.com",
    to: email,
    subject: "Verification Code",
    html: `<p>This is your verification code <br/> <str>${uniqeCode}</str></p>`,
  };

  await new Promise((resolve, reject) => {
    transporter.sendMail(mailData, (err, info) => {
      if (err) {
        reject(err);
      } else {
        resolve(info);
      }
    });
  });

  if (code.length === 1) {
    await updateVerificationCode({ email }, { email, code: uniqeCode, UID });
  } else if (code.length === 0) {
    await addVerificationCode({ email, code: uniqeCode, UID });
  }

  return NextResponse.json({ status: 200, msg: "Kode verifikasi telah dikirim melalui email. Periksa juga folder spam" });
}

// export async function PUT(req: NextRequest) {
//   const { info, infoInit, code } = await req.json();

//   const oldName = infoInit.name;
//   const oldUsername = infoInit.username;
//   const oldEmail = infoInit.email;
//   const { username, email, name, role } = info;

//   if (username !== oldUsername) {
//     const checkUsername = await checkUser(username);
//     if (checkUsername.length === 1) {
//       return NextResponse.json({ status: 400, code, msg: "Username telah tersedia. Gunakan yang lain" });
//     }
//   }

//   if (name.length === 0) {
//     return NextResponse.json({ status: 400, msg: "Anda belum mengisi nama" });
//   }

//   if (oldEmail !== email) {
//     if (!code) {
//       return NextResponse.json({ status: 400, msg: "Anda belum mengisi kode verifikasi" });
//     }

//     const checkCode = await checkVerificationCode({ email, code: parseInt(code) });
//     if (checkCode.length === 0) {
//       return NextResponse.json({ status: 400, msg: "Kode verifikasi salah atau sudah kadaluarsa" });
//     }

//     await deleteVerificationCode({ email, code: parseInt(code) });
//   }

//   const where = {
//     email: oldEmail,
//   };

//   const data = {
//     email,
//     name,
//     role,
//     username,
//   };
//   await updateUser(where, data);

//   return NextResponse.json({ status: 200, msg: "Informasi akun berhasil diubah" });
// }

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

  if (data.email !== oldData.email) return NextResponse.json({ popupEmail: true }, { status: 200 });

  const changeData = await dashboard.changeHandler(data);
  if (!changeData.status) return NextResponse.json({ msg: changeData.msg, error: changeData.error }, { status: 422 });

  return NextResponse.json({ msg: "Data berhasil diubah" }, { status: 200 });
}
