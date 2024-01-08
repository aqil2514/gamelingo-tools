import connectMongoDB from "@/lib/mongoose";
import { evertale } from "@/lib/utils";
import Character from "@/models/Evertale/Characters";
import Post from "@/models/General/Post";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const UID = searchParams.get("UID");
  const tag = searchParams.get("tag");
  const sort = searchParams.get("sort");
  const category = searchParams.get("category");
  const limit = Number(searchParams.get("limit")) || 0;

  await connectMongoDB();

  if (UID) {
    const post = await Post.findOne({ content: new ObjectId(UID) }).populate("content");

    if (Boolean(tag)) {
      //Genshin Impact, Evertale
      if (category === "chars") {
        const characters = await Character.find();
        if (sort === "team") {
          const tags = post.content.charStatus.charTeam;
          const random = tags.length > 0 ? Math.floor(Math.random() * tags.length) : 0;
          const data = evertale.mapping(characters, tags, limit, "charStatus.charTeam", "chars", true, true);

          return NextResponse.json({ post, title: tags[random], data }, { status: 200 });
        }
        //Genshin Impact, Evertale
        if (sort === "element") {
          const tags = post.content.charStatus.charElement;
          const data = evertale.mapping(characters, tags, limit, "charStatus.charElement", "chars");

          return NextResponse.json({ post, title: tags, data }, { status: 200 });
        }

        //Genshin Impact, Evertale, MLBB
        if (sort === "newest") {
          const newChars = await Character.find().sort({ createdAt: -1 });
          const data = evertale.simpleMapping(newChars, "chars", 9);
          return NextResponse.json({ post, title: "New Post", data }, { status: 200 });
        }
      }
    }

    return NextResponse.json({ post }, { status: 200 });
  }
  return NextResponse.json({ msg: "null" }, { status: 200 });
}
