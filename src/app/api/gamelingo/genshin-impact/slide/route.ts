import { CharacterEN, CharacterID } from "@/models/GenshinImpact/Character";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const category = searchParams.get("category") as
    | General.GameGenshinImpact["category"]
    | null;
  const lang = searchParams.get("lang");

  if (!lang) throw new Error("Pengaturan bahasa belum ditentukan");
  if (!category) throw new Error("Category belum ditentukan");
  if (category === "Character") {
    const res = lang === "en" ?
      (await CharacterEN.find()) as unknown as GenshinImpact.Character[]
      :
      (await CharacterID.find()) as unknown as GenshinImpact.Character[]
      ;

    const data: Record<keyof GenshinImpact.CharacterInfo, string>[] = res
      .sort()
      .map((d) => {
        return {
          name: d.name,
          id: d._id as string,
          image: d.image.portrait,
          rarity: d.rarity,
          desc: d.description,
          element: d.element,
          weapon: d.weapon,
        };
      });

    return NextResponse.json({ data }, { status: 200 });
  }
}
