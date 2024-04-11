// <<<<< Next and MongoDb >>>>>
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";

// <<<<< Mongoose Models Import >>>>>
import { Post } from "@/models/General/Post";
import { ENArtifact, IDArtifact } from "@/models/GenshinImpact/Artifact";
import { CharacterEN, CharacterID } from "@/models/GenshinImpact/Character";
import { ENMaterial, IDMaterial } from "@/models/GenshinImpact/Material";
import { ENWeapon, IDWeapon } from "@/models/GenshinImpact/Weapon";
import { ConstellationEN, ConstellationID } from "@/models/GenshinImpact/Constellation";

// <<<<< Utils Import >>>>>
import { getUser } from "@/utils/Api/api";
import { genshin } from "@/utils/formUtils";
import { TalentEN, TalentID } from "@/models/GenshinImpact/Talent";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const _id = searchParams.get("_id");
  const category = searchParams.get("category") as General.AdminQueryGameGenshin["subfield"] | null;
  const lang = searchParams.get("lang") as General.PostDocument["lang"] | null;
  let data;

  if (!_id) return NextResponse.json({ msg: "Error: Id belum ditentukan" }, { status: 400 });
  if (!category) return NextResponse.json({ msg: "Error: Category belum ditentukan" }, { status: 400 });
  if (!lang) return NextResponse.json({ msg: "Error: Language belum ditentukan" }, { status: 400 });

  if (category === "Material") {
    if (lang === "English") data = await ENMaterial.findById(_id);
    else if (lang === "Indonesian") data = await IDMaterial.findById(_id);
  } else if (category === "Artifact") {
    if (lang === "English") data = await ENArtifact.findById(_id);
    else if (lang === "Indonesian") data = await IDArtifact.findById(_id);
  } else if (category === "Weapon") {
    if (lang === "English") data = await ENWeapon.findById(_id);
    else if (lang === "Indonesian") data = await IDWeapon.findById(_id);
  } else if (category === "Character") {
    if (lang === "English") data = await CharacterEN.findById(_id);
    else if (lang === "Indonesian") data = await CharacterID.findById(_id);
  } else if (category === "Constellations") {
    if (lang === "English") data = await ConstellationEN.findById(_id);
    else if (lang === "Indonesian") data = await ConstellationID.findById(_id);
  } else if (category === "Talent") {
    if (lang === "English") data = await TalentEN.findById(_id);
    else if (lang === "Indonesian") data = await TalentID.findById(_id);
  }

  return NextResponse.json({ data }, { status: 200 });
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  const dataType = req.headers.get("DB-Content") as General.AdminQueryGameGenshin["subfield"] | null;
  const lang = req.headers.get("Content-Lang") as General.PostDocument["lang"] | null;

  if (!dataType) return NextResponse.json({ msg: "Error: Tipe Data yang ingin dihapus kosong" }, { status: 400 });
  if (!lang) return NextResponse.json({ msg: "Error: Bahasa belum dipilih" }, { status: 400 });

  if (dataType === "Material") {
    if (lang === "Indonesian") {
      await IDMaterial.findByIdAndDelete(id);
      await Post.findOneAndDelete({ content: new ObjectId(id) });
    }
    if (lang === "English") {
      await ENMaterial.findByIdAndDelete(id);
      await Post.findOneAndDelete({ content: new ObjectId(id) });
    }
  } else if (dataType === "Artifact") {
    if (lang === "Indonesian") {
      await IDArtifact.findByIdAndDelete(id);
      await Post.findOneAndDelete({ content: new ObjectId(id) });
    }
    if (lang === "English") {
      await ENArtifact.findByIdAndDelete(id);
      await Post.findOneAndDelete({ content: new ObjectId(id) });
    }
  } else if (dataType === "Weapon") {
    if (lang === "Indonesian") {
      await IDWeapon.findByIdAndDelete(id);
      await Post.findOneAndDelete({ content: new ObjectId(id) });
    }
    if (lang === "English") {
      await ENWeapon.findByIdAndDelete(id);
      await Post.findOneAndDelete({ content: new ObjectId(id) });
    }
  } else if (dataType === "Character") {
    if (lang === "Indonesian") {
      await CharacterID.findByIdAndDelete(id);
      await Post.findOneAndDelete({ content: new ObjectId(id) });
    }
    if (lang === "English") {
      await CharacterEN.findByIdAndDelete(id);
      await Post.findOneAndDelete({ content: new ObjectId(id) });
    }
  } else if (dataType === "Constellations") {
    if (lang === "Indonesian") {
      await ConstellationID.findByIdAndDelete(id);
      await Post.findOneAndDelete({ content: new ObjectId(id) });
    }
    if (lang === "English") {
      await ConstellationEN.findByIdAndDelete(id);
      await Post.findOneAndDelete({ content: new ObjectId(id) });
    }
  } else if (dataType === "Talent") {
    if (lang === "Indonesian") {
      await TalentID.findByIdAndDelete(id);
      await Post.findOneAndDelete({ content: new ObjectId(id) });
    }
    if (lang === "English") {
      await TalentEN.findByIdAndDelete(id);
      await Post.findOneAndDelete({ content: new ObjectId(id) });
    }
  }

  return NextResponse.json({ msg: "Hapus data berhasil" }, { status: 200 });
}

export async function PUT(req: NextRequest) {
  const formData = await req.formData();
  const category = req.headers.get("Data-Category") as General.AdminQueryGameGenshin["subfield"] | null;
  const dataId = req.headers.get("Old-Id");
  const lang = req.headers.get("Content-Lang") as General.PostDocument["lang"] | null;
  const user = await getUser();
  
  if (!lang) return NextResponse.json({ msg: "Bahasa belum ditentukan" }, { status: 400 });
  if (!category) return NextResponse.json({ msg: "Category belum diisi" }, { status: 400 });
  if (!user) return NextResponse.json({ msg: "Anda belum login" }, { status: 401 });

  if (category === "Material") {
    const process = await genshin.processMaterial(formData, user, { action: "edit", oldId: dataId, lang });
    if (process.status === 422) return NextResponse.json({ msg: process.msg }, { status: 422 });

    return NextResponse.json({ msg: "Data material berhasil diubah", process }, { status: 200 });
  }

  if (category === "Artifact") {
    const process = await genshin.proccessArtifact(formData, user, { action: "edit", oldId: dataId, lang });
    if (process.status === 422) return NextResponse.json({ msg: process.msg }, { status: 422 });

    return NextResponse.json({ msg: "Data artifact berhasil diubah", process }, { status: 200 });
  }

  if (category === "Weapon") {
    const process = await genshin.processWeapon(formData, user, { action: "edit", oldId: dataId, lang });
    if (process.status === 422) return NextResponse.json({ msg: process.msg }, { status: 422 });

    return NextResponse.json({ msg: "Data weapon berhasil diubah", process }, { status: 200 });
  }

  if (category === "Character") {
    const process = await genshin.proccessCharacter(formData, user, { action: "edit", oldId: dataId, lang });
    if (process.status === 422) return NextResponse.json({ msg: process.msg }, { status: 422 });

    return NextResponse.json({ msg: "Data Character berhasil diubah", process }, { status: 200 });
  }

  if (category === "Constellations") {
    const process = await genshin.processConstellation(formData, user, { action: "edit", oldId: dataId, lang });
    if (process.status === 422) return NextResponse.json({ msg: process.msg }, { status: 422 });

    return NextResponse.json({ msg: "Data Character berhasil diubah", process }, { status: 200 });
  }

  if (category === "Talent") {
    const process = await genshin.processTalent(formData, user, { action: "edit", oldId: dataId, lang });
    if (process.status === 422) return NextResponse.json({ msg: process.msg }, { status: 422 });

    return NextResponse.json({ msg: "Data Character berhasil diubah", process }, { status: 200 });
  }
}
