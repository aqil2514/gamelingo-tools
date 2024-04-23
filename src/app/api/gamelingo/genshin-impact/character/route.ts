import GenshinConstellation from "@/models/GenshinImpact/Constellation";
import GenshinTalent from "@/models/GenshinImpact/Talent";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const category = searchParams.get("category") as
    | General.AdminQueryGameGenshin["subfield"]
    | null;
  const lang = searchParams.get("lang") as General.PostDocument["lang"] | null;
  const id = searchParams.get("id");

  if (!category)
    return NextResponse.json({ msg: "Category belum diisi" }, { status: 400 });
  if (!lang)
    return NextResponse.json({ msg: "Bahasa belum diisi" }, { status: 400 });
  if (!id) return NextResponse.json({ msg: "id belum diisi" }, { status: 400 });

  const character = id;
  const langData = lang === "English" ? "en" : "id";

  const talent = (await GenshinTalent.findOne({
    charName: character,
  })) as unknown as GenshinImpact.Talent;
  const constellation = (await GenshinConstellation.findOne({
    charName: character,
  })) as unknown as GenshinImpact.Constellation;

  const data: ServerGameLingo.GenshinPage.CharacterPage = {
    talent: {
      data: talent[langData] as GenshinImpact.TalentSubLang,
      icon: talent.icon,
    },
    constellation: {
      data: constellation[langData] as GenshinImpact.ConstellationSubLang,
      icon: constellation.icon,
    },
  };

  return NextResponse.json({ data }, { status: 200 });
}
