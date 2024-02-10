import { evertale } from "@/lib/utils";
import { Weapon } from "@/models/Evertale/Weapons";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const maxResult = Number(searchParams.get("maxResult")) || 0;


  if (category === "type") {
    const document = await Weapon.find().sort({ createdAt: -1 });
    const weapType = ["Sword", "Axe", "Staff", "Mace", "GreatSword", "GreatAxe", "Spear", "Hammer", "Katana"];
    const data = evertale.reduce(weapType, document, "weapons", false, "weapType", "", 9);

    return NextResponse.json({ data }, { status: 200 });
  }

  const weapons = await Weapon.find().sort({ createdAt: -1 });
  const data = weapons.slice(0, maxResult).map((weapon: any) => ({
    id: weapon._id,
    image: weapon.weapImage.webp,
    weapName: weapon.weapName,
  }));

  return NextResponse.json({ data }, { status: 200 });
}
