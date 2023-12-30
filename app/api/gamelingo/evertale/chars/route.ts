import connectMongoDB from "@/lib/mongoose";
import Character from "@/models/Evertale/Characters";
import Post from "@/models/Evertale/Post";
import { TypeSkill } from "@/models/Evertale/TypeSkills";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const maxResult = Number(searchParams.get("maxResult")) || 0;
  const UID = searchParams.get("UID");
  await connectMongoDB();

  if (category === "element") {
    const chars = await Character.find();

    interface elementChar {
      id: String;
      charName: String;
      image: String;
    }

    const elements = ["Fire", "Water", "Dark", "Light", "Storm", "Earth"];

    const elementChar = elements.reduce(
      (result, element) => {
        result[element.toLowerCase()] = chars
          .filter((char: any) => char.charStatus.charElement === element)
          .map((d: any) => ({
            id: d._id,
            image: d.charImage.f1Img,
            charName: d.charStatus.charName,
          }));
        return result;
      },
      {} as Record<string, elementChar[]>
    );

    return NextResponse.json({ elementChar }, { status: 200 });
  } else if (category === "team") {
    interface CharTeam {
      id: string;
      charName: string;
      image: string;
    }

    const chars = await Character.find();
    const types = await TypeSkill.find();
    const charTeamTypes = types[0].typeCharTeam;

    const charTeam: Record<string, CharTeam[]> = charTeamTypes.reduce((result: any, team: any) => {
      result[team] = chars
        .filter((char: any) => char.charStatus.charTeam.includes(team))
        .map((d: any) => ({
          id: d._id,
          image: d.charImage.f1Img,
          charName: d.charStatus.charName,
        }));
      return result;
    }, {});

    return NextResponse.json({ charTeam }, { status: 200 });
  }

  if (UID) {
    const character = await Character.findById(UID);

    if (!character) {
      return NextResponse.json({ msg: "Character not found" }, { status: 404 });
    }

    return NextResponse.json({ character }, { status: 200 });
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
