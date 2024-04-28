// <<<<< Next and MongoDb >>>>>
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";

// <<<<< Mongoose Models Import >>>>>
import { Post } from "@/models/General/Post";

// <<<<< Utils Import >>>>>
import { getUser } from "@/utils/Api/api";
import { genshin } from "@/utils/formUtils";
import GenshinCharacter from "@/models/GenshinImpact/Character";
import GenshinConstellation from "@/models/GenshinImpact/Constellation";

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

const deleteData = async (
  dataType: General.AdminQueryGameGenshin["subfield"],
  lang: General.PostDocument["lang"],
  id: string
) => {
  const langMapping = lang === "English" ? "en" : "id";
  const oppositeMapping = langMapping === "en" ? "id" : "en";

  if (dataType === "Character") {
    const dataSelected = (await GenshinCharacter.findById(
      id
    )) as unknown as GenshinImpact.Character;

    // Jikalau data dari bahasa berlawanan ada, ubah data saat ini jadi undefined
    if (dataSelected[oppositeMapping]?.description) {
      dataSelected[langMapping] = {} as GenshinImpact.SubCharacter;

      return { msg: `Data ${lang} berhasil dihapus`, status: 200 };
    }
    // Jikalau data bahasa lama tidak ada, hapus data dari database
    else {
      await GenshinCharacter.findByIdAndDelete(id);
    }

    return { msg: `Data berhasil dihapus`, status: 200 };
  } else if (dataType === "Constellations"){
    const dataSelected = (await GenshinConstellation.findById(
      id
    )) as unknown as GenshinImpact.Constellation;

    // Jikalau data dari bahasa berlawanan ada, ubah data saat ini jadi undefined
    if (dataSelected[oppositeMapping]?.c1.description) {
      dataSelected[langMapping] = {} as GenshinImpact.ConstellationSubLang;

      return { msg: `Data ${lang} berhasil dihapus`, status: 200 };
    }
    // Jikalau data bahasa lama tidak ada, hapus data dari database
    else {
      await GenshinCharacter.findByIdAndDelete(id);
    }

    return { msg: `Data berhasil dihapus`, status: 200 };
  } else if (dataType === "Talent"){
    const dataSelected = (await GenshinConstellation.findById(
      id
    )) as unknown as GenshinImpact.Talent;

    // Jikalau data dari bahasa berlawanan ada, ubah data saat ini jadi undefined
    if (dataSelected[oppositeMapping]?.passives.passive1.description) {
      dataSelected[langMapping] = {} as GenshinImpact.TalentSubLang;

      return { msg: `Data ${lang} berhasil dihapus`, status: 200 };
    }
    // Jikalau data bahasa lama tidak ada, hapus data dari database
    else {
      await GenshinCharacter.findByIdAndDelete(id);
    }

    return { msg: `Data berhasil dihapus`, status: 200 };
  } 
};

// TODO: Fix ini juga 

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
  const resDelete = await deleteData(dataType, lang, id);

  return NextResponse.json({msg: resDelete?.msg}, {status: resDelete?.status})

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
