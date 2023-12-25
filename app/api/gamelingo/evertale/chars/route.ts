import Character from "@/models/Evertale/Characters";
import Post from "@/models/Evertale/Post";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const maxResult = Number(searchParams.get("maxResult")) || 0;
  const UID = searchParams.get("UID");

  if (category === "element") {
    const chars = await Character.find();

    interface elementChar {
      id: String;
      charName: String;
      image: String;
    }

    const fire: elementChar[] = chars
      .filter((char: any) => char.charStatus.charElement === "Fire")
      .map((d: any) => ({
        id: d._id,
        image: d.charImage.f1Img,
        charName: d.charStatus.charName,
      }));
    const water = chars
      .filter((char: any) => char.charStatus.charElement === "Water")
      .map((d: any) => ({
        id: d._id,
        image: d.charImage.f1Img,
        charName: d.charStatus.charName,
      }));
    const dark = chars
      .filter((char: any) => char.charStatus.charElement === "Dark")
      .map((d: any) => ({
        id: d._id,
        image: d.charImage.f1Img,
        charName: d.charStatus.charName,
      }));
    const light = chars
      .filter((char: any) => char.charStatus.charElement === "Light")
      .map((d: any) => ({
        id: d._id,
        image: d.charImage.f1Img,
        charName: d.charStatus.charName,
      }));
    const storm = chars
      .filter((char: any) => char.charStatus.charElement === "Storm")
      .map((d: any) => ({
        id: d._id,
        image: d.charImage.f1Img,
        charName: d.charStatus.charName,
      }));
    const earth = chars
      .filter((char: any) => char.charStatus.charElement === "Earth")
      .map((d: any) => ({
        id: d._id,
        image: d.charImage.f1Img,
        charName: d.charStatus.charName,
      }));

    const elementChar = {
      fire,
      water,
      dark,
      light,
      storm,
      earth,
    };
    return NextResponse.json({ status: 200, elementChar });
  }
  if (UID) {
    const character = await Character.findById(UID);

    if (!character) {
      return NextResponse.json({ msg: "Character not found" }, { status: 404 });
    }

    return NextResponse.json({ character }, { status: 200 });
  }

  const chars = await Character.find();
  const data = chars.map((d: any) => ({
    id: d._id,
    image: d.charImage.f1Img,
    charName: d.charStatus.charName,
  }));
  let characters: any = [];

  for (let i = 0; i < maxResult; i++) {
    characters.push(data[i]);
  }

  return NextResponse.json({ status: 200, characters });
}
