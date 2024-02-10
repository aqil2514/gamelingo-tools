import { evertale } from "@/lib/utils";
import Character from "@/models/Evertale/Characters";
import { Weapon } from "@/models/Evertale/Weapons";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const s = searchParams.get("s");
  const category = searchParams.get("category");


  if (category === "chars") {
    const chars = await Character.find({ "charStatus.charName": { $regex: new RegExp(s as string, "i") } });
    const data = evertale.simpleMapping(chars, "chars");
    return NextResponse.json({ data, category }, { status: 200 });
  } else if (category === "weapons") {
    const weaponDB = await Weapon.find({ weapName: { $regex: new RegExp(s as string, "i") } });
    const data = evertale.simpleMapping(weaponDB, "weapons");
    return NextResponse.json({ data, category }, { status: 200 });
  }
}
