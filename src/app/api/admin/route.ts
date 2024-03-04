import { supabase } from "@/lib/supabase";
import LeaderSkill from "@/models/Evertale/LeaderSkill";
import PassiveSkill from "@/models/Evertale/PassiveSkill";
import { TypeSkill } from "@/models/Evertale/TypeSkills";
import { Weapon } from "@/models/Evertale/Weapons";
import { ENArtifact, IDArtifact } from "@/models/GenshinImpact/Artifact";
import { ENMaterial, IDMaterial } from "@/models/GenshinImpact/Material";
import { ENWeapon, IDWeapon } from "@/models/GenshinImpact/Weapon";
import { admin } from "@/utils/api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const field = searchParams.get("field") as General.AdminQuery["field"];
  const subfield = searchParams.get("subfield") as General.AdminQuery["subfield"];
  const lang = searchParams.get("lang") as General.PostDocument["lang"];
  const authorization = req.headers.get("Authorization")?.replace("Bearer ", "");

  if (!authorization && authorization !== process.env.AUTHORIZATIONTOKEN) return NextResponse.json({ msg: "Aksi dibatasi" }, { status: 401 });
  if (!field || !subfield) return NextResponse.json({ msg: "Ooppss... Something error" }, { status: 400 });

  if (field === "account") {
    if (subfield === "userslogin") {
      const data = await admin.getUser();

      if (!data) return NextResponse.json({ msg: "OOpppss.... Something error" }, { status: 403 });

      return NextResponse.json({ data }, { status: 200 });
    }
    const res = await supabase.from(subfield).select("*");

    // if (!res || !res.data) return NextResponse.json({ msg: "field dan subfield tidak ada" }, { status: 400 });

    return NextResponse.json({ data: res.data }, { status: 200 });
  } else if (field === "evertale") {
    let data;

    if (subfield === "chars") data = await admin.getEvertaleCharacter();
    else if (subfield === "weapons") data = await Weapon.find();
    else if (subfield === "leaderskills") data = await LeaderSkill.find();
    else if (subfield === "typeskills") data = await TypeSkill.find();
    else if (subfield === "passives") data = await PassiveSkill.find();

    return NextResponse.json({ data }, { status: 200 });
  } else if (field === "genshin-impact") {
    let data;
    if (subfield === "Material") {
      if (lang === "English") data = await ENMaterial.find();
      if (lang === "Indonesian") data = await IDMaterial.find();
    } 
    else if (subfield === "Artifact") {
      if (lang === "English") data = await ENArtifact.find();
      if (lang === "Indonesian") data = await IDArtifact.find();
    }
    else if (subfield === "Weapon") {
      if (lang === "English") data = await ENWeapon.find();
      if (lang === "Indonesian") data = await IDWeapon.find();
    }

    return NextResponse.json({ data }, { status: 200 });
  }
}
