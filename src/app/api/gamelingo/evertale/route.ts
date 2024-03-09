import { typeSkillId } from "@/lib/evertale/data";
import Character from "@/models/Evertale/Characters";
import LeaderSkill from "@/models/Evertale/LeaderSkill";
import { TypeSkill } from "@/models/Evertale/TypeSkills";
import { Post } from "@/models/General/Post";
import { ObjectId } from "mongodb";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

type leaderSkillDataState = {
  _id: string;
  name: string;
  descEN: string;
  descID: string;
};

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const category = url.searchParams.get("category");
  const UID = url.searchParams.get("UID");
  const name = url.searchParams.get("name");
  const maxResult = Number(url.searchParams.get("maxResult")) || 0;

  // Character Category
  if (category === "chars" && UID) {
    const character = await Character.findOne({ char_id: UID });

    if (!character) {
      return NextResponse.json({ status: 404, msg: "Character not found" });
    }

    const post = await Post.findOne({ charId: new ObjectId(character.char_id) });
    if (!post) {
      await Post.create({
        title: character.charStatus.charName,
        charId: character.char_id,
        author: "Admin Gamelingo",
        tags: ["Evertale", "Evertale Character"],
        comment: [],
      });
      redirect(`/evertale/chars/${character.char_id}`);
    }

    return NextResponse.json({ character, post }, { status: 200 });
  }

  if (category === "chars" && name) {
    const chars = await Character.find();
    const data = chars
      .filter((char: any) => char.charStatus.charName.toLowerCase().includes(name.toLowerCase()))
      .map((d: any) => ({
        id: d.char_id,
        image: d.charImage.f1Img,
        name: d.charStatus.charName,
      }));
    return NextResponse.json({ status: 200, data });
  }

  if (!category && !UID) {
    redirect("/evertale");
  }

  // LeaderSkillData
  if (category === "leaderSkill") {
    const leaderskills = await LeaderSkill.findOne({ name });
    return NextResponse.json({ leaderskills });
  }

  if (category === "rss") {
    const ls = await LeaderSkill.find();
    const ts = await TypeSkill.find();

    return NextResponse.json({ ls, ts }, { status: 200 });
  }
}

export async function POST(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const category = searchParams.get("category") as General.AdminQueryGameEvertale["subfield"] | null;
  const type = searchParams.get("type") as keyof Evertale.Misc.TypeSkill | null;
  const reqBody = await req.json();

  if (!category) throw new Error("Category belum diisi");

  if (category === "typeskills") {
    if (!type) throw new Error("Type belum diisi");
    const dataTypeSkills = await TypeSkill.find();
    const typeData: Evertale.Misc.TypeSkill = dataTypeSkills[0];

    if (type === "typeCharTeam") {
      const { newCharTeam } = reqBody;
      const charTeam = typeData.typeCharTeam;

      if (typeof newCharTeam !== "string") throw new Error("Data tidak sah");

      if (charTeam.includes(newCharTeam)) return NextResponse.json({ msg: "Data sudah ada di Database" }, { status: 409 });

      charTeam.push(newCharTeam);

      await TypeSkill.findByIdAndUpdate(typeSkillId, { typeCharTeam: charTeam });

      if (charTeam.includes(newCharTeam)) return NextResponse.json({ msg: "Data berhasil ditambah" }, { status: 200 });
    }
  }
  if (category === "leaderskills") {
    const { name }: Evertale.Misc.LeaderSkill = reqBody.lsData;
    const lsName = await LeaderSkill.findOne({ name });

    if (lsName) return NextResponse.json({ msg: "Data sudah ada di Database" }, { status: 409 });

    await LeaderSkill.create(reqBody.lsData);
  }
  return new Response();
}

// export async function POST(req: Request) {
//   const { typeData, formBody1, formBody2, formBodyDLS, formBodyConjures } = await req.json();

//   if (typeData === "Character") {
//     const { charImage, charIntro, charProfile, charStatus } = formBody1;
//     const nASkill = formBody2.filter((s: ComponentState) => s.activeSkills).map((as: React.ComponentState) => as.activeSkills);
//     const nPSkill = formBody2.filter((s: ComponentState) => s.passiveSkills).map((ps: React.ComponentState) => ps.passiveSkills);
//     const data = {
//       charImage,
//       charIntro,
//       charStatus,
//       charProfile,
//       nASkill,
//       nPSkill,
//     };

//     await addChars(data);
//     return new Response(
//       JSON.stringify({
//         msg: `Character dengan nama ${charStatus.charName} berhasil ditambah!`,
//         data,
//       })
//     );
//   } else if (typeData === "leaderSkill") {
//     const { name, descEN, descID } = formBodyDLS;
//     const data = {
//       name,
//       descEN,
//       descID,
//     };
//     const msg = await addLeaderSkill(data);

//     return new Response(
//       JSON.stringify({
//         msg,
//         name,
//         descEN,
//         descID,
//       })
//     );
//   } else if (typeData === "conjures") {
//     const { name, link } = formBodyConjures;
//     const data = {
//       name,
//       link,
//     };
//     const msg = await addConjures(data);

//     return new Response(
//       JSON.stringify({
//         msg,
//       })
//     );
//   }
// }

export async function DELETE(req: Request) {
  const { id, target } = await req.json();

  await Character.findByIdAndDelete(id);

  return new Response(
    JSON.stringify({
      msg: `Character dengan nama ${target} berhasil dihapus`,
    })
  );
}

export async function PUT(req: any) {
  const { submitData, typeData } = await req.json();

  if (typeData === "character") {
    const result = await Character.findOneAndUpdate(submitData);

    return Response.json({ msg: "Data berhasil diubah", result });
  }
}
