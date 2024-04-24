// <<<<< Next and MongoDb >>>>>
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";

// <<<<< Mongoose Models Import >>>>>
import { Post } from "@/models/General/Post";

// <<<<< Utils Import >>>>>
import { getUser } from "@/utils/Api/api";
import { genshin } from "@/utils/formUtils";
import GenshinCharacter from "@/models/GenshinImpact/Character";

const getGenshinData = async (
  category: General.AdminQueryGameGenshin["subfield"],
  lang: General.PostDocument["lang"],
  id: string
) => {
  const langMapping = lang === "English" ? "en" : "id";

  if (category === "Character") {
    type CharType = ServerGameLingo.GenshinAdmin.CharacterShortDetail;
    const res = (await GenshinCharacter.findById(
      id
    )) as unknown as GenshinImpact.Character;

    const data: CharType = {
      _id: res._id,
      image: res.image,
      name: res.name,
      detail: res[langMapping] as GenshinImpact.SubCharacter,
      createdAt: res.createdAt,
    };

    return data;
  }
};

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const _id = searchParams.get("_id");
  const category = searchParams.get("category") as
    | General.AdminQueryGameGenshin["subfield"]
    | null;
  const lang = searchParams.get("lang") as General.PostDocument["lang"] | null;

  if (!_id)
    return NextResponse.json(
      { msg: "Error: Id belum ditentukan" },
      { status: 400 }
    );
  if (!category)
    return NextResponse.json(
      { msg: "Error: Category belum ditentukan" },
      { status: 400 }
    );
  if (!lang)
    return NextResponse.json(
      { msg: "Error: Language belum ditentukan" },
      { status: 400 }
    );

  const data = await getGenshinData(category, lang, _id);

  return NextResponse.json({ data }, { status: 200 });
}

// TODO : Delete data handler 

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  const dataType = req.headers.get("DB-Content") as
    | General.AdminQueryGameGenshin["subfield"]
    | null;
  const lang = req.headers.get("Content-Lang") as
    | General.PostDocument["lang"]
    | null;

  if (!dataType)
    return NextResponse.json(
      { msg: "Error: Tipe Data yang ingin dihapus kosong" },
      { status: 400 }
    );
  if (!lang)
    return NextResponse.json(
      { msg: "Error: Bahasa belum dipilih" },
      { status: 400 }
    );
  const langMapping = lang === "English" ? "en" : "id";

  if (dataType === "Character") {
    const dataSelected = (await GenshinCharacter.findById(
      id
    )) as unknown as GenshinImpact.Character;

    dataSelected[langMapping] = {} as GenshinImpact.SubCharacter;

    console.log(dataSelected)

    return NextResponse.json(
      { dataSelected, msg: "Simulasi berhasil" },
      { status: 200 }
    );
  }

  return NextResponse.json({ msg: "Hapus data berhasil" }, { status: 200 });
}

export async function PUT(req: NextRequest) {
  const formData = await req.formData();
  const category = req.headers.get("Data-Category") as
    | General.AdminQueryGameGenshin["subfield"]
    | null;
  const dataId = req.headers.get("Old-Id");
  const lang = req.headers.get("Content-Lang") as
    | General.PostDocument["lang"]
    | null;
  const user = await getUser();

  if (!lang)
    return NextResponse.json(
      { msg: "Bahasa belum ditentukan" },
      { status: 400 }
    );
  if (!category)
    return NextResponse.json({ msg: "Category belum diisi" }, { status: 400 });
  if (!user)
    return NextResponse.json({ msg: "Anda belum login" }, { status: 401 });

  if (category === "Material") {
    const process = await genshin.processMaterial(formData, user, {
      action: "edit",
      oldId: dataId,
      lang,
    });
    if (process.status === 422)
      return NextResponse.json({ msg: process.msg }, { status: 422 });

    return NextResponse.json(
      { msg: "Data material berhasil diubah", process },
      { status: 200 }
    );
  }

  if (category === "Artifact") {
    const process = await genshin.proccessArtifact(formData, user, {
      action: "edit",
      oldId: dataId,
      lang,
    });
    if (process.status === 422)
      return NextResponse.json({ msg: process.msg }, { status: 422 });

    return NextResponse.json(
      { msg: "Data artifact berhasil diubah", process },
      { status: 200 }
    );
  }

  if (category === "Weapon") {
    const process = await genshin.processWeapon(formData, user, {
      action: "edit",
      oldId: dataId,
      lang,
    });
    if (process.status === 422)
      return NextResponse.json({ msg: process.msg }, { status: 422 });

    return NextResponse.json(
      { msg: "Data weapon berhasil diubah", process },
      { status: 200 }
    );
  }

  if (category === "Character") {
    const process = await genshin.proccessCharacter(formData, user, {
      action: "edit",
      oldId: dataId,
      lang,
    });
    if (process.status === 422)
      return NextResponse.json({ msg: process.msg }, { status: 422 });

    return NextResponse.json(
      { msg: "Data Character berhasil diubah", process },
      { status: 200 }
    );
  }

  if (category === "Constellations") {
    const process = await genshin.processConstellation(formData, user, {
      action: "edit",
      oldId: dataId,
      lang,
    });
    if (process.status === 422)
      return NextResponse.json({ msg: process.msg }, { status: 422 });

    return NextResponse.json(
      { msg: "Data Character berhasil diubah", process },
      { status: 200 }
    );
  }

  if (category === "Talent") {
    const process = await genshin.processTalent(formData, user, {
      action: "edit",
      oldId: dataId,
      lang,
    });
    if (process.status === 422)
      return NextResponse.json({ msg: process.msg }, { status: 422 });

    return NextResponse.json(
      { msg: "Data Character berhasil diubah", process },
      { status: 200 }
    );
  }
}
