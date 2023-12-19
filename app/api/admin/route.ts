import { getChars } from "@/lib/mongodb/evertale";
import connectMongoDB from "@/lib/mongoose";
import Character, { CharacterSchema } from "@/models/Evertale/Characters";
import LeaderSkill from "@/models/Evertale/LeaderSkill";
import Post from "@/models/Evertale/Post";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const key = searchParams.get("key");
  const category = searchParams.get("category");

  if (!key || key !== process.env.ADMIN_GET_KEY) {
    return NextResponse.json({ msg: "Akses dilarang" }, { status: 403 });
  }

  if (!category) {
    return NextResponse.json({ msg: "Anda belum pilih kategori" }, { status: 403 });
  }

  await connectMongoDB();

  if (category === "chars") {
    const newChars = await Character.find();
    const chras = await getChars();

    return NextResponse.json({ newChars, chras }, { status: 200 });
  }
  if (category === "ls") {
    const lSNew = await LeaderSkill.find();

    return NextResponse.json({ lSNew }, { status: 200 });
  }
  if (category === "post") {
    const post = await Post.find();

    return NextResponse.json({ post }, { status: 200 });
  }
}

export async function OPTIONS(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const key = searchParams.get("key");
  const category = searchParams.get("category");

  if (!key || key !== process.env.ADMIN_OPTION_KEY) {
    return NextResponse.json({ msg: "Akses dilarang" }, { status: 403 });
  }
  await connectMongoDB();

  if (category === "chars") {
    const chars = await getChars();
    for (const char of chars.chars) {
      const characterData = {
        char_id: char._id,
        charImage: {
          f1Img: char.charImage.f1Img,
          f2Img: char.charImage.f2Img,
          f3Img: char.charImage.f3Img,
        },
        charIntro: {
          gachaIntroEn: char.charIntro.gachaIntroEn,
          gachaIntroId: char.charIntro.gachaIntroId,
          gachaTextEn: char.charIntro.gachaTextEn,
          gachaTextId: char.charIntro.gachaTextId,
          loginTextEn: char.charIntro.loginTextEn,
          loginTextId: char.charIntro.loginTextId,
          text1En: char.charIntro.text1En,
          text1Id: char.charIntro.text1Id,
          text2En: char.charIntro.text2En,
          text2Id: char.charIntro.text2Id,
          text3En: char.charIntro.text3En,
          text3Id: char.charIntro.text3Id,
          text4En: char.charIntro.text4En,
          text4Id: char.charIntro.text4Id,
        },
        charStatus: {
          charName: char.charStatus.charName,
          charRank: "SSR",
          statusElement: char.charStatus.statusElement,
          firstWeapon: char.charStatus.firstWeapon,
          secondWeapon: char.charStatus.secondWeapon,
          leaderSkill: char.charStatus.leaderSkill,
          conjures: char.charStatus.conjures,
        },
        charProfile: {
          part1En: char.charProfile.part1En,
          part1Id: char.charProfile.part1Id,
          part2En: char.charProfile.part2En,
          part2Id: char.charProfile.part2Id,
          part3En: char.charProfile.part3En,
          part3Id: char.charProfile.part3Id,
        },
        charActiveSkill: char.nASkill.map((skill: any) => ({
          name: skill.skillName,
          typeSkill: "unset", // New data here
          spirit: skill.spirit,
          target: skill.target,
          TU: skill.TU || "unset",
          descEn: skill.descEn,
          descId: skill.descId,
        })),
        charPassiveSkill: char.nPSkill.map((skill: any) => ({
          name: skill.name,
          typeSkill: "unset",
          descEn: skill.descEN,
          descId: skill.descID,
        })),
      };

      // return NextResponse.json({ characterData });

      await Character.create(characterData);
    }

    // const test = CharacterSchema.path("charActiveSkill");

    // return NextResponse.json({ chars: chars.chars[0] }, { status: 200 });
    // return NextResponse.json({ test }, { status: 200 });
  }
  if (category === "ls") {
    const lSNew = await LeaderSkill.find();

    return NextResponse.json({ lSNew }, { status: 200 });
  }
  if (category === "post") {
    const chars = await getChars();

    for (const char of chars.chars) {
      const data = {
        title: char.charStatus.charName,
        content: "soon",
        author: "Admin GameLingo",
        tags: ["evertale", "evertale character"],
      };

      await Post.create(data);
    }
    return NextResponse.json({ msg: "ok" }, { status: 200 });
  }

  return NextResponse.json({ key }, { status: 200 });
}
