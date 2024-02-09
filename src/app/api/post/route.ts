import connectMongoDB, { destroyDB } from "@/lib/mongoose";
import { evertale } from "@/lib/utils";
import Character from "@/models/Evertale/Characters";
import { Weapon } from "@/models/Evertale/Weapons";
import Post from "@/models/General/Post";
import Material from "@/models/GenshinImpact/Material";
import { genshinValidator } from "@/utils/api";
import { ObjectId } from "mongodb";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const UID = searchParams.get("UID");
  const tag = searchParams.get("tag");
  const sort = searchParams.get("sort");
  const category = searchParams.get("category");
  const limit = Number(searchParams.get("limit")) || 0;

  await connectMongoDB();

  if (UID) {
    const post = await Post.findOne({ content: new ObjectId(UID) }).populate(
      "content"
    );

    if (Boolean(tag)) {
      //Genshin Impact, Evertale
      if (category === "chars") {
        const characters = await Character.find();
        if (sort === "team") {
          const tags = post.content.charStatus.charTeam;
          const random =
            tags.length > 0 ? Math.floor(Math.random() * tags.length) : 0;
          const data = evertale.mapping(
            characters,
            tags,
            limit,
            "charStatus.charTeam",
            "chars",
            true,
            true
          );

          return NextResponse.json(
            { post, title: tags[random], data },
            { status: 200 }
          );
        }
        //Genshin Impact, Evertale
        if (sort === "element") {
          const tags = post.content.charStatus.charElement;
          const data = evertale.mapping(
            characters,
            tags,
            limit,
            "charStatus.charElement",
            "chars"
          );

          return NextResponse.json(
            { post, title: tags, data },
            { status: 200 }
          );
        }

        //Genshin Impact, Evertale, MLBB
        if (sort === "newest") {
          const newChars = await Character.find().sort({ createdAt: -1 });
          const data = evertale.simpleMapping(newChars, "chars", 9);
          return NextResponse.json(
            { post, title: "New Post", data },
            { status: 200 }
          );
        }
      } else if (category === "weapons") {
        const weapons = await Weapon.find();
        if (sort === "weapon-type") {
          const type = evertale.simpleFilter(
            weapons,
            "weapType",
            post.content.weapType
          );
          const data = evertale.simpleMapping(type, "weapons");
          const title = post.content.weapType;
          return NextResponse.json({ data, type, title });
        }
        if (sort === "newest") {
          const newWeapons = await Weapon.find().sort({ createdAt: -1 });
          const data = evertale.simpleMapping(newWeapons, "weapons", 9);
          return NextResponse.json(
            { post, title: "New Post", data },
            { status: 200 }
          );
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
  const game= searchParams.get("game");
  const category= searchParams.get("category");
  
  if (mongoose.connection.name !== "genshinimpact") {
    await destroyDB();
    await connectMongoDB("genshinimpact");
  }
  
  if (game === "genshin-impact") {
    if (category === "material") {
      const name = formData.get("name");
      const lore = formData.get("lore");
      const gainedFrom = formData.get("gainedFrom")
      const rarity = formData.get("rarity");
      const typeMaterial = formData.get("typeMaterial")
      const image = formData.get("image") as File;
      
      const materialValidation = await genshinValidator.material({ name, image, lore, gainedFrom, rarity, typeMaterial });

      if (!materialValidation.status) return NextResponse.json({ msg: materialValidation.msg }, { status: 422 });

      // await Material.create(data.data);
      return NextResponse.json(
        { msg: "Data material berhasil ditambah", data:materialValidation.data },
        { status: 200 }
      );
    }
  }

  

  return NextResponse.json({ msg: "Tambah Data Berhasil" }, { status: 200 });
}
