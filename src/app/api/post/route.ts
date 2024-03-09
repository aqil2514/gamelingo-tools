import { evertale } from "@/lib/utils";
import Character from "@/models/Evertale/Characters";
import { Weapon } from "@/models/Evertale/Weapons";
import { Post } from "@/models/General/Post";
import { getUser, isSubfieldData } from "@/utils/api";
import { genshin } from "@/utils/formUtils";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const UID = searchParams.get("UID");
  const tag = searchParams.get("tag");
  const sort = searchParams.get("sort");
  const category = searchParams.get("category");
  const limit = Number(searchParams.get("limit")) || 0;

  if (UID) {
    const post = await Post.findOne({ content: new ObjectId(UID) }).populate("content");

    if (Boolean(tag)) {
      //Genshin Impact, Evertale
      if (category === "chars") {
        const characters = await Character.find();
        if (sort === "team") {
          const tags = post.content.charStatus.charTeam;
          const random = tags.length > 0 ? Math.floor(Math.random() * tags.length) : 0;
          const data = evertale.mapping(characters, tags, limit, "charStatus.charTeam", "chars", true, true);

          return NextResponse.json({ post, title: tags[random], data }, { status: 200 });
        }
        //Genshin Impact, Evertale
        if (sort === "element") {
          const tags = post.content.charStatus.charElement;
          const data = evertale.mapping(characters, tags, limit, "charStatus.charElement", "chars");

          return NextResponse.json({ post, title: tags, data }, { status: 200 });
        }

        //Genshin Impact, Evertale, MLBB
        if (sort === "newest") {
          const newChars = await Character.find().sort({ createdAt: -1 });
          const data = evertale.simpleMapping(newChars, "chars", 9);
          return NextResponse.json({ post, title: "New Post", data }, { status: 200 });
        }
      } else if (category === "weapons") {
        const weapons = await Weapon.find();
        if (sort === "weapon-type") {
          const type = evertale.simpleFilter(weapons, "weapType", post.content.weapType);
          const data = evertale.simpleMapping(type, "weapons");
          const title = post.content.weapType;
          return NextResponse.json({ data, type, title });
        }
        if (sort === "newest") {
          const newWeapons = await Weapon.find().sort({ createdAt: -1 });
          const data = evertale.simpleMapping(newWeapons, "weapons", 9);
          return NextResponse.json({ post, title: "New Post", data }, { status: 200 });
        }
      }
    }

    return NextResponse.json({ post }, { status: 200 });
  }
  return NextResponse.json({ msg: "null" }, { status: 200 });
}

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const searchParams = req.nextUrl.searchParams;
  const game = (searchParams.get("game") as General.Game["game"] | null) || (formData.get("game") as General.Game["game"] | null);
  const category = searchParams.get("category") || formData.get("category");
  const user = await getUser();

  if (!game) throw new Error("Game belum diisi");
  if (!category) throw new Error("Category belum diisi");
  if (!user) return NextResponse.json({ msg: "Anda belum login" }, { status: 401 });

  if (game === "Genshin Impact" && isSubfieldData.genshinImpact(category)) {
    if (category === "Material") {
      const process = await genshin.processMaterial(formData, user, { action: "add" });
      if (process.status === 422) return NextResponse.json({ msg: process.msg }, { status: 422 });

      return NextResponse.json({ msg: process.msg, process }, { status: 200 });
    } else if (category === "Artifact") {
      const process = await genshin.proccessArtifact(formData, user, { action: "add" });
      if (process.status === 422) return NextResponse.json({ msg: process.msg, process }, { status: 422 });

      return NextResponse.json({ msg: process.msg, process }, { status: 200 });
    } else if (category === "Weapon") {
      const process = await genshin.processWeapon(formData, user, { action: "add" });
      if (process.status === 422) return NextResponse.json({ msg: process.msg }, { status: 422 });

      return NextResponse.json({ msg: "Tambah data senjata berhasil", process }, { status: 200 });
    } else if (category === "Character") {
      const process = await genshin.proccessCharacter(formData, user, { action: "add" });
      if (process.status === 422) return NextResponse.json({ msg: process.msg }, { status: 422 });

      return NextResponse.json({ msg: "Tambah data karakter berhasil", process }, { status: 200 });
    } else if (category === "Talent") {
      const process = await genshin.processTalent(formData, user, { action: "add" });
      if (process.status === 422) return NextResponse.json({ msg: process.msg }, { status: 422 });

      return NextResponse.json({ msg: "Tambah talent karakter berhasil", process }, { status: 200 });
    } else if (category === "Constellations") {
      const process = await genshin.processConstellation(formData, user, { action: "add" });
      if (process.status === 422) return NextResponse.json({ msg: process.msg }, { status: 422 });

      return NextResponse.json({ msg: "Tambah konstelasi karakter berhasil", process }, { status: 200 });
    }
  }
  if (game === "Evertale" && isSubfieldData.evertale(category)) {
    if (category === "chars") {
      const data = Object.fromEntries(formData.entries());

      return NextResponse.json({data}, {status:200})
    }
  }

  return new Response();
}
