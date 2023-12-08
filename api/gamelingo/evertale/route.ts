import { getChars, getConjures, getGenerals, getLeaderSkills, getWeapons, getPassiveSkills, updateConjures, addConjures, addChars, deleteConjures, deleteCharacters, updateCharacters, addLeaderSkill } from "@/lib/mongodb/evertale.js";
import { ComponentState } from "react";

export async function GET() {
  const chars = await getChars();
  const conjures = await getConjures();
  const generals = await getGenerals();
  const leaderskills = await getLeaderSkills();
  const passiveskills = await getPassiveSkills();
  const weapons = await getWeapons();

  return Response.json({ chars, conjures, generals, leaderskills, weapons, passiveskills });
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
