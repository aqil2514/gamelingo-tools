import connectMongoDB from "@/lib/mongoose";
import { supabase } from "@/lib/supabase";
import Character from "@/models/Evertale/Characters";
import LeaderSkill from "@/models/Evertale/LeaderSkill";
import { Weapon } from "@/models/Evertale/Weapons";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const field = searchParams.get("field");
  const subfield = searchParams.get("subfield");

  if (!field || !subfield) return NextResponse.json({ msg: "Ooppss... Something error" }, { status: 403 });

  if (field === "account") {
    if (subfield === "userslogin") {
      const res = await supabase.from("userslogin").select("*");

      if (!res || !res.data || res.data.length === 0) return NextResponse.json({ msg: "OOpppss.... Something error" }, { status: 403 });

      const resData = res.data;
      const data = resData.map((d: Account.UsersLogin) => ({
        id: d.id,
        oauthid: d.oauthid,
        image: d.image,
        name: d.name,
        username: d.username,
        email: d.email,
        role: d.role,
        account_verified: d.account_verified,
        createdat: d.createdAt,
      }));

      return NextResponse.json({ data }, { status: 200 });
    }
    const res = await supabase.from(subfield).select("*");

    if (!res || !res.data || res.data.length === 0) return NextResponse.json({ msg: "Ooppss... Something error" }, { status: 403 });

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
