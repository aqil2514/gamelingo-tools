import connectMongoDB from "@/lib/mongoose";
import Character from "@/models/Evertale/Characters";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const s = searchParams.get("s");

  await connectMongoDB();

  const chars = await Character.find({ "charStatus.charName": { $regex: new RegExp(s as string, "i") } });
  const char = chars.map((c: any) => ({ id: c._id, name: c.charStatus.charName, image: c.charImage.f1Img }));

  return NextResponse.json({ char }, { status: 200 });
}
