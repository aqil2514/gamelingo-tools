import Character from "@/models/Evertale/Characters";
import { NextRequest, NextResponse } from "next/server";
import * as fs from "fs";
import { Weapon } from "@/models/Evertale/Weapons";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const game = formData.get("game");
  const category = formData.get("category");

  if (game === "evertale" && category === "Character") {
    const data = await Character.find();

    fs.writeFileSync("./backup/evertale/character.json", JSON.stringify(data));

    return NextResponse.json({ data, msg: "Data berhasil dibackup di lokal" }, { status: 200 });
  } else if (game === "evertale" && category === "Weapons") {
    const data = await Weapon.find();

    fs.writeFileSync("./backup/evertale/weapon.json", JSON.stringify(data));

    return NextResponse.json({ data, msg: "Data berhasil dibackup di lokal" }, { status: 200 });
  }

  return new Response();
}
