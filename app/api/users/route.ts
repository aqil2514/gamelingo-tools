import { getUsers, checkUser } from "@/lib/prisma/users";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const users = await getUsers();
    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    if (!password) {
      return NextResponse.json({ status: 403, msg: `Password belum diisi` });
    }
    const user = await checkUser(username);
    if (user.length > 0 && user[0].password === password) {
      return NextResponse.json({ status: 200, msg: `Login Berhasil` });
    } else if (user.length <= 0) {
      return NextResponse.json({ status: 404, msg: `Akun tidak terdaftar` });
    } else if (user[0].password !== password) {
      return NextResponse.json({ status: 402, msg: `Password Salah` });
    }
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
