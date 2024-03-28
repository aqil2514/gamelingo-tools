import { apiURL } from "@/components/Content/Write/Genshin/genshinUtils";
import { CharacterEN, CharacterID } from "@/models/GenshinImpact/Character";
import axios from "axios";
import { NextResponse } from "next/server";
import * as fs from "fs";
import { TalentEN, TalentID } from "@/models/GenshinImpact/Talent";

export async function GET() {
  // const Characters = await CharacterID.find();

  // fs.writeFileSync("characters-id.json", JSON.stringify(Characters), {"encoding": "utf-8"})

  const data = JSON.parse(
    fs.readFileSync("characters-en.json", { encoding: "utf-8" })
  );

  for (const char of data) {
    const newD: GenshinImpact.Character = {
      _id: char._id,
      ascendMaterial: char.ascendMaterial,
      ascendStatus: char.ascendStatus,
      build: char.build,
      constellation: char.constellation,
      createdAt: char.createdAt,
      cv: char.cv,
      description: char.description,
      element: char.element,
      gender: char.gender,
      image: {
        cover: char.image,
        portrait: "https://placehold.jp/64x64.png",
      },
      lang: char.lang,
      name: char.name,
      rarity: char.rarity,
      region: char.region,
      talent: char.talent,
      updatedAt: char.updatedAt,
      weapon: char.weapon,
    };

    CharacterID.create(newD);
  }

  return NextResponse.json({ msg:"ok" }, { status: 200 });
}

// <<<<< Talent migrations >>>>>
// export async function GET() {
//   const TD = JSON.parse(
//     fs.readFileSync("talents-id.json", { encoding: "utf-8" })
//   ) as GenshinImpact.ApiResponseTalent[];

//   for (const t of TD) {
//     const data: GenshinImpact.Talent = {
//       charName: t.name,
//       combats: {
//         combat1: {
//           name: t.combat1.name,
//           description: t.combat1.description,
//           attributes: {
//             labels: t.combat1.attributes!.labels,
//             parameters: t.combat1.attributes!.parameters,
//           },
//         },
//         combat2: {
//           name: t.combat2.name,
//           description: t.combat2.description,
//           attributes: {
//             labels: t.combat2.attributes!.labels,
//             parameters: t.combat2.attributes!.parameters,
//           },
//         },
//         combat3: {
//           name: t.combat3.name,
//           description: t.combat3.description,
//           attributes: {
//             labels: t.combat3.attributes!.labels,
//             parameters: t.combat3.attributes!.parameters,
//           },
//         },
//         combatsp: t.combatsp
//           ? {
//               name: t.combatsp.name,
//               description: t.combatsp.description,
//               attributes: {
//                 labels: t.combatsp.attributes!.labels,
//                 parameters: t.combatsp.attributes!.parameters,
//               },
//             }
//           : undefined,
//       },
//       costs: {
//         lvl2: t.costs.lvl2,
//         lvl3: t.costs.lvl3,
//         lvl4: t.costs.lvl4,
//         lvl5: t.costs.lvl5,
//         lvl6: t.costs.lvl6,
//         lvl7: t.costs.lvl7,
//         lvl8: t.costs.lvl8,
//         lvl9: t.costs.lvl9,
//         lvl10: t.costs.lvl10,
//       },
//       passives: {
//         passive1: {
//           name: t.passive1.name,
//           description: t.passive1.description,
//         },
//         passive2: {
//           name: t.passive2.name,
//           description: t.passive2.description,
//         },
//         passive3: {
//           name: t.passive3.name,
//           description: t.passive3.description,
//         },
//       },
//     };

//     await TalentID.create(data);
//   }

//   return NextResponse.json({ msg:"Tambah data berhasil" }, { status: 200 });
// }
