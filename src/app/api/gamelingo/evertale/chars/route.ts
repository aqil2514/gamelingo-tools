import { evertale } from "@/lib/utils";
import Character from "@/models/Evertale/Characters";
import { TypeSkill } from "@/models/Evertale/TypeSkills";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const maxResult = Number(searchParams.get("maxResult")) || 0;
  const limit = Number(searchParams.get("limit")) || 0;
  const conjureName = searchParams.get("conjureName");

  if (category === "element") {
    const chars = await Character.find().sort({ createdAt: -1 });

    const elements = ["Fire", "Water", "Dark", "Light", "Storm", "Earth"];

    const data = evertale.reduce(elements, chars, "chars", false, "charStatus", "charElement", limit);

    return NextResponse.json({ data }, { status: 200 });
  } else if (category === "team") {
    const chars = await Character.find().sort({ createdAt: -1 });
    const types = await TypeSkill.find();
    const charTeamTypes = types[0].typeCharTeam;

    const data = evertale.reduce(charTeamTypes, chars, "chars", true, "charStatus", "charTeam", limit);

    return NextResponse.json({ data }, { status: 200 });
  } else if (category === "weapon") {
    const chars = await Character.find().sort({ createdAt: -1 });
    const weapons = ["Sword", "Axe", "Staff", "Mace", "GreatSword", "GreatAxe", "Spear", "Hammer", "Katana"];

    const data = evertale.reduce(weapons, chars, "chars", false, "charStatus", "charWeapon1", limit, "charWeapon2");

    return NextResponse.json({ data }, { status: 200 });
  }

  if (conjureName) {
    const data = await Character.find({ "charStatus.charName": conjureName });
    const conjure = data.map((con: any) => ({
      id: con._id,
      image: con.charImage.f1Img,
      charName: con.charStatus.charName,
    }));

    return NextResponse.json({ conjure: conjure[0] }, { status: 200 });
  }

  const chars = await Character.find().sort({ createdAt: -1 });
  const data = chars.map((d: any) => ({
    id: d._id,
    image: d.charImage.f1Img,
    charName: d.charStatus.charName,
  }));
  let characters: any = [];

  for (let i = 0; i < maxResult; i++) {
    characters.push(data[i]);
  }

  return NextResponse.json({ characters }, { status: 200 });
}
