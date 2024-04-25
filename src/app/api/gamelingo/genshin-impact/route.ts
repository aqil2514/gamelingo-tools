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
  const oppositeMapping = langMapping === "en" ? "id" : "en";

// TODO : Test ini

  // <<<<< Real Case >>>>>
  if (dataType === "Character") {
    const dataSelected = (await GenshinCharacter.findById(
      id
    )) as unknown as GenshinImpact.Character;

    // Jikalau data dari bahasa berlawanan ada, ubah data saat ini jadi undefined
    if (dataSelected[oppositeMapping]) {
      dataSelected[langMapping] = undefined;
      await GenshinCharacter.findByIdAndUpdate(id, dataSelected);
    }
    // Jikalau data bahasa lama tidak ada, hapus data dari database
    else {
      await GenshinCharacter.findByIdAndDelete(id);
    }

    return NextResponse.json(
      { dataSelected, msg: "Simulasi berhasil" },
      { status: 200 }
    );
  }

  // <<<<< Simulation Case >>>>>
  // if (dataType === "Character") {
  //   let dataSelected:GenshinImpact.Character = {
  //     image: {
  //       cover:
  //         "https://res.cloudinary.com/dwcr3rpgi/image/upload/v1712093970/Genshin%20Impact/Character/webp/Fischl%20-%20Cover.webp",
  //       portrait:
  //         "https://res.cloudinary.com/dwcr3rpgi/image/upload/v1712093970/Genshin%20Impact/Character/webp/Fischl%20-%20Portrait.webp",
  //     },
  //     _id: "65f265a4413bc557db78cf77",
  //     name: "Fischl",
  //     // en: {
  //     //   cv: {
  //     //     english: "Brittany Cox & Ben Pronsky",
  //     //     chinese: "Mace & 赵悦程",
  //     //     japanese: "内田真礼 & 増谷康紀",
  //     //     korean: "Park Go-woon & Lee Hyeon",
  //     //   },
  //     //   // @ts-ignore
  //     //   build: {
  //     //     substitude: [],
  //     //   },
  //     //   description:
  //     //     'A mysterious girl who calls herself "Prinzessin der Verurteilung" and travels with a night raven named Oz.',
  //     //   ascendStatus: "ATK",
  //     //   ascendMaterial: {
  //     //     ascend1: [
  //     //       {
  //     //         name: "Mora",
  //     //         count: 20000,
  //     //       },
  //     //       {
  //     //         name: "Vajrada Amethyst Sliver",
  //     //         count: 1,
  //     //       },
  //     //       {
  //     //         name: "Small Lamp Grass",
  //     //         count: 3,
  //     //       },
  //     //       {
  //     //         name: "Firm Arrowhead",
  //     //         count: 3,
  //     //       },
  //     //     ],
  //     //     ascend2: [
  //     //       {
  //     //         name: "Mora",
  //     //         count: 40000,
  //     //       },
  //     //       {
  //     //         name: "Vajrada Amethyst Fragment",
  //     //         count: 3,
  //     //       },
  //     //       {
  //     //         name: "Lightning Prism",
  //     //         count: 2,
  //     //       },
  //     //       {
  //     //         name: "Small Lamp Grass",
  //     //         count: 10,
  //     //       },
  //     //       {
  //     //         name: "Firm Arrowhead",
  //     //         count: 15,
  //     //       },
  //     //     ],
  //     //     ascend3: [
  //     //       {
  //     //         name: "Mora",
  //     //         count: 60000,
  //     //       },
  //     //       {
  //     //         name: "Vajrada Amethyst Fragment",
  //     //         count: 6,
  //     //       },
  //     //       {
  //     //         name: "Lightning Prism",
  //     //         count: 4,
  //     //       },
  //     //       {
  //     //         name: "Small Lamp Grass",
  //     //         count: 20,
  //     //       },
  //     //       {
  //     //         name: "Sharp Arrowhead",
  //     //         count: 12,
  //     //       },
  //     //     ],
  //     //     ascend4: [
  //     //       {
  //     //         name: "Mora",
  //     //         count: 80000,
  //     //       },
  //     //       {
  //     //         name: "Vajrada Amethyst Chunk",
  //     //         count: 3,
  //     //       },
  //     //       {
  //     //         name: "Lightning Prism",
  //     //         count: 8,
  //     //       },
  //     //       {
  //     //         name: "Small Lamp Grass",
  //     //         count: 30,
  //     //       },
  //     //       {
  //     //         name: "Sharp Arrowhead",
  //     //         count: 18,
  //     //       },
  //     //     ],
  //     //     ascend5: [
  //     //       {
  //     //         name: "Mora",
  //     //         count: 100000,
  //     //       },
  //     //       {
  //     //         name: "Vajrada Amethyst Chunk",
  //     //         count: 6,
  //     //       },
  //     //       {
  //     //         name: "Lightning Prism",
  //     //         count: 12,
  //     //       },
  //     //       {
  //     //         name: "Small Lamp Grass",
  //     //         count: 45,
  //     //       },
  //     //       {
  //     //         name: "Weathered Arrowhead",
  //     //         count: 12,
  //     //       },
  //     //     ],
  //     //     ascend6: [
  //     //       {
  //     //         name: "Mora",
  //     //         count: 120000,
  //     //       },
  //     //       {
  //     //         name: "Vajrada Amethyst Gemstone",
  //     //         count: 6,
  //     //       },
  //     //       {
  //     //         name: "Lightning Prism",
  //     //         count: 20,
  //     //       },
  //     //       {
  //     //         name: "Small Lamp Grass",
  //     //         count: 60,
  //     //       },
  //     //       {
  //     //         name: "Weathered Arrowhead",
  //     //         count: 24,
  //     //       },
  //     //     ],
  //     //   },
  //     //   rarity: "4",
  //     //   element: "Electro",
  //     //   weapon: "Bow",
  //     //   gender: "Female",
  //     //   region: "Mondstadt",
  //     //   artifactStatus: [],
  //     //   prioritySubStat: [],
  //     //   team: [],
  //     // },
  //     id: {
  //       cv: {
  //         english: "Brittany Cox & Ben Pronsky",
  //         chinese: "Mace&赵悦程",
  //         japanese: "内田真礼&増谷康紀",
  //         korean: "Park Go-woon & Lee Hyeon",
  //       },
  //       //@ts-ignore
  //       build: {
  //         substitude: [],
  //       },
  //       description:
  //         'Seorang gadis misterius yang menyebut dirinya sendiri "Prinzessin der Verurteilung", dia selalu terlihat bersama dengan seekor gagak hitam yang bernama Oz.',
  //       ascendStatus: "ATK",
  //       ascendMaterial: {
  //         ascend1: [
  //           {
  //             name: "Mora",
  //             count: 20000,
  //           },
  //           {
  //             name: "Vajrada Amethyst Sliver",
  //             count: 1,
  //           },
  //           {
  //             name: "Small Lamp Grass",
  //             count: 3,
  //           },
  //           {
  //             name: "Firm Arrowhead",
  //             count: 3,
  //           },
  //         ],
  //         ascend2: [
  //           {
  //             name: "Mora",
  //             count: 40000,
  //           },
  //           {
  //             name: "Vajrada Amethyst Fragment",
  //             count: 3,
  //           },
  //           {
  //             name: "Lightning Prism",
  //             count: 2,
  //           },
  //           {
  //             name: "Small Lamp Grass",
  //             count: 10,
  //           },
  //           {
  //             name: "Firm Arrowhead",
  //             count: 15,
  //           },
  //         ],
  //         ascend3: [
  //           {
  //             name: "Mora",
  //             count: 60000,
  //           },
  //           {
  //             name: "Vajrada Amethyst Fragment",
  //             count: 6,
  //           },
  //           {
  //             name: "Lightning Prism",
  //             count: 4,
  //           },
  //           {
  //             name: "Small Lamp Grass",
  //             count: 20,
  //           },
  //           {
  //             name: "Sharp Arrowhead",
  //             count: 12,
  //           },
  //         ],
  //         ascend4: [
  //           {
  //             name: "Mora",
  //             count: 80000,
  //           },
  //           {
  //             name: "Vajrada Amethyst Chunk",
  //             count: 3,
  //           },
  //           {
  //             name: "Lightning Prism",
  //             count: 8,
  //           },
  //           {
  //             name: "Small Lamp Grass",
  //             count: 30,
  //           },
  //           {
  //             name: "Sharp Arrowhead",
  //             count: 18,
  //           },
  //         ],
  //         ascend5: [
  //           {
  //             name: "Mora",
  //             count: 100000,
  //           },
  //           {
  //             name: "Vajrada Amethyst Chunk",
  //             count: 6,
  //           },
  //           {
  //             name: "Lightning Prism",
  //             count: 12,
  //           },
  //           {
  //             name: "Small Lamp Grass",
  //             count: 45,
  //           },
  //           {
  //             name: "Weathered Arrowhead",
  //             count: 12,
  //           },
  //         ],
  //         ascend6: [
  //           {
  //             name: "Mora",
  //             count: 120000,
  //           },
  //           {
  //             name: "Vajrada Amethyst Gemstone",
  //             count: 6,
  //           },
  //           {
  //             name: "Lightning Prism",
  //             count: 20,
  //           },
  //           {
  //             name: "Small Lamp Grass",
  //             count: 60,
  //           },
  //           {
  //             name: "Weathered Arrowhead",
  //             count: 24,
  //           },
  //         ],
  //       },
  //       rarity: "4",
  //       element: "Electro",
  //       weapon: "Bow",
  //       gender: "Perempuan",
  //       region: "Mondstadt",
  //       artifactStatus: [],
  //       prioritySubStat: [],
  //       team: [],
  //     },
  //     createdAt: "2024-03-14T02:49:08.583Z",
  //     __v: 0,
  //     updatedAt: "2024-03-14T02:49:08.583Z",
  //   };

  //   // Jikalau data dari bahasa berlawanan ada, ubah data saat ini jadi undefined
  //   if(dataSelected[oppositeMapping]){
  //     dataSelected[langMapping] = undefined;
  //   }
  //   // Jikalau data bahasa lama tidak ada, hapus data dari database
  //   else{
  //     //@ts-ignore
  //     dataSelected = undefined
  //   }

  //   // dataSelected[langMapping] = undefined;

  //   return NextResponse.json(
  //     { dataSelected, msg: "Simulasi berhasil" },
  //     { status: 200 }
  //   );
  // }

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
