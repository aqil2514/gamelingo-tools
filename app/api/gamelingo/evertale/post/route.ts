import Character from "@/models/Evertale/Characters";
import Comment from "@/models/Evertale/Comment";
import Post from "@/models/Evertale/Post";
import User from "@/models/Evertale/Users";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const UID = searchParams.get("UID");

  if (!UID) {
    return NextResponse.json({ msg: "Anda belum login!" }, { status: 400 });
  }

  const post = await Post.findOne({ charId: new ObjectId(UID) });

  if (!post) {
    return NextResponse.json({ msg: "Belum ada komentar. Jadilah yang pertama komentar!" }, { status: 200 });
  }

  return NextResponse.json({ post }, { status: 200 });
}

export async function POST(req: NextRequest) {
  const { comment, UID, session } = await req.json();

  if (!session) {
    return NextResponse.json({ msg: "Anda belum login!" }, { status: 403 });
  }

  const user = await User.findOne({ email: session.user.email });
  if (!user) {
    return NextResponse.json({ msg: "Anda belum login!" }, { status: 403 });
  }

  const post = await Post.findOne({ charId: new ObjectId(UID) });
  if (!post) {
    return NextResponse.json({ msg: "Post tidak ditemukan!" }, { status: 404 });
  }

  // Sesuaikan dengan struktur skema komentar Anda
  post.comment.push({
    author: user.name,
    avatar: user.avatar,
    commentText: comment,
  });

  await post.save();

  return NextResponse.json({ msg: "Berhasil tambahkan komentar" }, { status: 200 });
}
