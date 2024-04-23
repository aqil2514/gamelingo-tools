import GenshinCharacter from "@/models/GenshinImpact/Character";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const category = searchParams.get("category") as
    | General.GameGenshinImpact["category"]
    | null;
  const lang = searchParams.get("lang") as "en" | "id" | null;

  if (!lang) throw new Error("Pengaturan bahasa belum ditentukan");
  if (!category) throw new Error("Category belum ditentukan");
  if (category === "Character") {
    const res =
      (await GenshinCharacter.find()) as unknown as GenshinImpact.Character[];

    const data: Record<keyof GenshinImpact.CharacterInfo, string>[] = res
      .sort()
      .map((d) => {
        const langData = d[lang];

        if(!langData) throw new Error("Data dari bahasa yang dipilih tidak ada. Periksa database")

        return {
          name: d.name,
          id: d._id as string,
          image: d.image.portrait,
          rarity: langData.rarity,
          desc: langData.description,
          element: langData.element,
          weapon: langData.weapon,
        };
      });

    return NextResponse.json({ data }, { status: 200 });
  }
}
