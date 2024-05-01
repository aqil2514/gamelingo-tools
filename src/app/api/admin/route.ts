// <<<<< Next and Supabase Import >>>>>
import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

// <<<<< Mongoose Models Import >>>>>
import LeaderSkill from "@/models/Evertale/LeaderSkill";
import PassiveSkill from "@/models/Evertale/PassiveSkill";
import { TypeSkill } from "@/models/Evertale/TypeSkills";
import { Weapon } from "@/models/Evertale/Weapons";

// <<<<< Utils Import >>>>>
import { admin, isSubfieldData } from "@/utils/Api/api";
import GenshinTalent from "@/models/GenshinImpact/Talent";
import GenshinArtifact from "@/models/GenshinImpact/Artifact";
import GenshinCharacter from "@/models/GenshinImpact/Character";
import GenshinConstellation from "@/models/GenshinImpact/Constellation";
import GenshinMaterial from "@/models/GenshinImpact/Material";
import GenshinWeapon from "@/models/GenshinImpact/Weapon";

const getGenshinData = async (
  lang: General.PostDocument["lang"],
  subfield: General.AdminQueryGameGenshin["subfield"]
) => {
  const langMapping = lang === "English" ? "en" : "id";
  if (subfield === "Artifact") {
    const res =
      (await GenshinArtifact.find()) as unknown as GenshinImpact.Artifact[];
    const data = res.map((d) => {
      const result = d[langMapping];

      if (!result) throw new Error("Data tidak ditemukan");

      const data: GenshinImpact.ArtifactTable = {
        _id: d._id,
        name: d.name,
        rarityList: result.rarityList,
      };

      return data;
    });

    return data;
  } else if (subfield === "Character") {
    const res =
      (await GenshinCharacter.find()) as unknown as GenshinImpact.Character[];
    const data = res.map((d) => {
      const result = d[langMapping];

      if (!result) throw new Error("Data tidak ditemukan");

      const data: GenshinImpact.CharacterTable = {
        _id: d?._id,
        element: result.element,
        rarity: result.rarity,
        name: d.name,
        region: result.region,
        weapon: result.weapon,
      };

      return data;
    });

    return data;
  } else if (subfield === "Constellations") {
    const res =
      (await GenshinConstellation.find()) as unknown as GenshinImpact.Constellation[];
    const data: GenshinImpact.ConstellationTable[] = res.map((d) => {
      const data: GenshinImpact.ConstellationTable = {
        name: d.charName,
        _id: d._id as string,
      };

      return data;
    });

    return data;
  } else if (subfield === "Talent") {
    const res =
      (await GenshinTalent.find()) as unknown as GenshinImpact.Constellation[];
    const data: GenshinImpact.TalentTable[] = res.map((d) => {
      const data: GenshinImpact.TalentTable = {
        charName: d.charName,
        _id: d._id as string,
      };

      return data;
    });

    return data;
  } else if (subfield === "Material") {
    const res =
      (await GenshinMaterial.find()) as unknown as GenshinImpact.Material[];
    const data: GenshinImpact.MaterialTable[] = res.map((d) => {
      const langData = d[langMapping];
      const data: GenshinImpact.MaterialTable = {
        name: d.name,
        _id: d._id as string,
        rarity: langData?.rarity,
        enType: d.en?.typeMaterial,
        idType: d.id?.typeMaterial,
      };

      return data;
    });

    return data;
  } else if (subfield === "Weapon") {
    const res =
      (await GenshinWeapon.find()) as unknown as GenshinImpact.Weapon[];
    const data: GenshinImpact.WeaponTable[] = res.map((d) => {
      const langData = d[langMapping];
      if (!langData)
        throw new Error("Terjadi kesalahan dalam penentuan bahasa Data");
      const data: GenshinImpact.WeaponTable = {
        name: d.name,
        _id: d._id as string,
        rarity: langData?.rarity,
        type: langData?.type,
      };

      return data;
    });

    return data;
  }
};

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const field = searchParams.get("field") as General.AdminQuery["field"] | null;
  const subfield = searchParams.get("subfield");
  const lang = searchParams.get("lang") as General.PostDocument["lang"];
  const authorization = req.headers
    .get("Authorization")
    ?.replace("Bearer ", "");

  if (!subfield) throw new Error("Subfield belum diisi");

  if (!authorization && authorization !== process.env.AUTHORIZATIONTOKEN)
    return NextResponse.json({ msg: "Aksi dibatasi" }, { status: 401 });
  if (!field || !subfield)
    return NextResponse.json(
      { msg: "Ooppss... Something error" },
      { status: 400 }
    );

  if (field === "account" && isSubfieldData.account(subfield)) {
    if (subfield === "userslogin") {
      const data = await admin.getUser();

      if (!data)
        return NextResponse.json(
          { msg: "OOpppss.... Something error" },
          { status: 403 }
        );

      return NextResponse.json({ data }, { status: 200 });
    }
    const res = await supabase.from(subfield).select("*");

    // if (!res || !res.data) return NextResponse.json({ msg: "field dan subfield tidak ada" }, { status: 400 });

    return NextResponse.json({ data: res.data }, { status: 200 });
  } else if (field === "evertale" && isSubfieldData.evertale(subfield)) {
    let data;

    if (subfield === "chars") data = await admin.getEvertaleCharacter();
    else if (subfield === "weapons") data = await Weapon.find();
    else if (subfield === "leaderskills") data = await LeaderSkill.find();
    else if (subfield === "typeskills") data = await TypeSkill.find();
    else if (subfield === "passives") data = await PassiveSkill.find();

    return NextResponse.json({ data }, { status: 200 });
  } else if (
    field === "genshin-impact" &&
    isSubfieldData.genshinImpact(subfield)
  ) {
    const data = await getGenshinData(lang, subfield);

    if (!data) throw new Error("Data tidak ada atau belum disetting");

    return NextResponse.json({ data }, { status: 200 });
  }
}
