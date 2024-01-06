import Post from "@/models/General/Post";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const UID = searchParams.get("UID");

  if (UID) {
    const post = await Post.findOne({ content: new ObjectId(UID) }).populate("content");

    return NextResponse.json({ post }, { status: 200 });
  }
  return NextResponse.json({ msg: "null" }, { status: 200 });
}
