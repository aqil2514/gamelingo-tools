import connectMongoDB from "@/lib/mongoose";
import { supabase } from "@/lib/supabase";
import Character from "@/models/Evertale/Characters";
import LeaderSkill from "@/models/Evertale/LeaderSkill";
import { Weapon } from "@/models/Evertale/Weapons";
import { admin } from "@/utils/api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const field = searchParams.get("field");
  const subfield = searchParams.get("subfield");

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
    await connectMongoDB();

    if (subfield === "chars") data = await Character.find();
    else if (subfield === "weapons") data = await Weapon.find();
    else if (subfield === "leaderskills") data = await LeaderSkill.find();

    return NextResponse.json({ data }, { status: 200 });
  }
}
