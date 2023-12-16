import { getChars, getConjures, getGenerals, getLeaderSkills, getWeapons, getPassiveSkills, updateConjures, addConjures, addChars, deleteConjures, deleteCharacters, updateCharacters, addLeaderSkill } from "@/lib/mongodb/evertale.js";
import { Document } from "mongodb";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import { ComponentState } from "react";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const category = url.searchParams.get("category");
  const UID = url.searchParams.get("UID");
  const element = url.searchParams.get("element");
  const name = url.searchParams.get("name");
  const maxResult = Number(url.searchParams.get("maxResult")) || 0;
  if (category === "chars" && UID) {
    const characters = await getChars();
    const character = characters.chars.find((character: Document) => character._id === UID);

    if (!character) {
      return NextResponse.json({ status: 404, msg: "Character not found" });
    }

    return NextResponse.json({ status: 200, character });
  }
  if (category === "chars" && element) {
    const data = await getChars();

    const fire = data.chars
      .filter((char: any) => char.charStatus.statusElement === "Fire")
      .map((d: any) => ({
        id: d._id,
        image: d.charImage.f1Img,
        charName: d.charStatus.charName,
      }));
    const water = data.chars
      .filter((char: any) => char.charStatus.statusElement === "Water")
      .map((d: any) => ({
        id: d._id,
        image: d.charImage.f1Img,
        charName: d.charStatus.charName,
      }));
    const dark = data.chars
      .filter((char: any) => char.charStatus.statusElement === "Dark")
      .map((d: any) => ({
        id: d._id,
        image: d.charImage.f1Img,
        charName: d.charStatus.charName,
      }));
    const light = data.chars
      .filter((char: any) => char.charStatus.statusElement === "Light")
      .map((d: any) => ({
        id: d._id,
        image: d.charImage.f1Img,
        charName: d.charStatus.charName,
      }));
    const storm = data.chars
      .filter((char: any) => char.charStatus.statusElement === "Storm")
      .map((d: any) => ({
        id: d._id,
        image: d.charImage.f1Img,
        charName: d.charStatus.charName,
      }));
    const earth = data.chars
      .filter((char: any) => char.charStatus.statusElement === "Earth")
      .map((d: any) => ({
        id: d._id,
        image: d.charImage.f1Img,
        charName: d.charStatus.charName,
      }));

    if (element === "all") {
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
    const elementChar = data.chars.filter((e: any) => e.charStatus.statusElement === element);
    return NextResponse.json({ status: 200, elementChar });
  }
  if (category === "chars" && name) {
    const chars = await getChars();
    const data = chars.chars
      .filter((char: any) => char.charStatus.charName.toLowerCase().includes(name.toLowerCase()))
      .map((d: any) => ({
        id: d._id,
        image: d.charImage.f1Img,
        name: d.charStatus.charName,
      }));
    return NextResponse.json({ status: 200, data });
  }
  if (category === "chars") {
    const chars = await getChars();
    const data = chars.chars.map((d: any) => ({
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
  if (!category && !UID) {
    redirect("/evertale");
  }

  // const conjures = await getConjures();
  // const generals = await getGenerals();
  // const leaderskills = await getLeaderSkills();
  // const passiveskills = await getPassiveSkills();
  // const weapons = await getWeapons();

  // return Response.json({ chars, conjures, generals, leaderskills, weapons, passiveskills });
}

export async function POST(req: Request) {
  const { typeData, formBody1, formBody2, formBodyDLS, formBodyConjures } = await req.json();

  if (typeData === "Character") {
    const { charImage, charIntro, charProfile, charStatus } = formBody1;
    const nASkill = formBody2.filter((s: ComponentState) => s.activeSkills).map((as: React.ComponentState) => as.activeSkills);
    const nPSkill = formBody2.filter((s: ComponentState) => s.passiveSkills).map((ps: React.ComponentState) => ps.passiveSkills);
    const data = {
      charImage,
      charIntro,
      charStatus,
      charProfile,
      nASkill,
      nPSkill,
    };

    await addChars(data);
    return new Response(
      JSON.stringify({
        msg: `Character dengan nama ${charStatus.charName} berhasil ditambah!`,
        data,
      })
    );
  } else if (typeData === "leaderSkill") {
    const { name, descEN, descID } = formBodyDLS;
    const data = {
      name,
      descEN,
      descID,
    };
    const msg = await addLeaderSkill(data);

    return new Response(
      JSON.stringify({
        msg,
        name,
        descEN,
        descID,
      })
    );
  } else if (typeData === "conjures") {
    const { name, link } = formBodyConjures;
    const data = {
      name,
      link,
    };
    const msg = await addConjures(data);

    return new Response(
      JSON.stringify({
        msg,
      })
    );
  }
}

export async function DELETE(req: Request) {
  const { id, target } = await req.json();

  await deleteCharacters(id);

  return new Response(
    JSON.stringify({
      msg: `Character dengan nama ${target} berhasil dihapus`,
    })
  );
}

export async function PUT(req: any) {
  const { submitData, typeData } = await req.json();

  if (typeData === "character") {
    const result = await updateCharacters(submitData);

    return Response.json({ msg: "Data berhasil diubah", result });
  }
}
