import { NextRequest, NextResponse } from "next/server";
import { getCharacter } from "./formUtils";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const category = searchParams.get("category") as
    | General.GameGenshinImpact["category"]
    | null;
  const lang = searchParams.get("lang") as General.PostDocument["lang"] | null;
  const charName = searchParams.get("charName");

  if (!category) throw new Error("Category belum diisi");
  if (!lang) throw new Error("Bahasa belum diisi");
  if (!charName) throw new Error("Nama Karakter belum diisi");

  let formData;
  if (category === "Character") formData = await getCharacter(charName, lang);

  return NextResponse.json({ formData }, { status: 200 });
}
