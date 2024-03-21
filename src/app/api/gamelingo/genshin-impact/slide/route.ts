import { CharacterEN } from "@/models/GenshinImpact/Character";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const category = searchParams.get("category") as
    | General.GameGenshinImpact["category"]
    | null;

  if (!category) throw new Error("Category belum ditentukan");
  if (category === "Character") {
    const res =
      (await CharacterEN.find()) as unknown as GenshinImpact.Character[];
      // MSG : Nanti pakek yang dikomen ajah 
    // const data: Record<keyof GenshinImpact.CharacterInfo, string>[] = res
    //   .sort()
    //   .slice(0, 15)
    //   .map((d) => {
    //     return {
    //       name: d.name,
    //       id: d._id as string,
    //       image: d.image as string,
    //       rarity: d.rarity,
    //       desc: d.description,
    //       element: d.element
    //     };
    //   });

    const data: Record<keyof GenshinImpact.CharacterInfo, string>[] = res
      .sort()
      .map((d) => {
        return {
          name: d.name,
          id: d._id as string,
          image: d.image as string,
          rarity: d.rarity,
          desc: d.description,
          element: d.element
        };
      });

    return NextResponse.json({ data }, { status: 200 });
  }
}
