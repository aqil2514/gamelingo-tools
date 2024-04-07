import { Post } from "@/models/General/Post";
import {
  ConstellationEN,
  ConstellationID,
} from "@/models/GenshinImpact/Constellation";
import { TalentEN, TalentID } from "@/models/GenshinImpact/Talent";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const category = searchParams.get("category") as
    | General.AdminQueryGameGenshin["subfield"]
    | null;
  const lang = searchParams.get("lang") as General.PostDocument["lang"] | null;
  const id = searchParams.get("id");

  console.log(lang)

  if (!category)
    return NextResponse.json({ msg: "Category belum diisi" }, { status: 400 });
  if (!lang)
    return NextResponse.json({ msg: "Bahasa belum diisi" }, { status: 400 });
  if (!id) return NextResponse.json({ msg: "id belum diisi" }, { status: 400 });

  const post = await Post.findOne({ content: id }).populate("content");
  const character = post.content.name;

  let data: any = {};
  if (lang === "English") {
    data.talent = await TalentEN.findOne({ charName: character });
    data.constellation = await ConstellationEN.findOne({ charName: character });
  } else if (lang === "Indonesian") {
    data.talent = await TalentID.findOne({ charName: character });
    data.constellation = await ConstellationID.findOne({ charName: character });
  }

  return NextResponse.json({ data }, { status: 200 });
}
