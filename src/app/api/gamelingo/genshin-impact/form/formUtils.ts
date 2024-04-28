import GenshinCharacter from "@/models/GenshinImpact/Character";
import GenshinTalent from "@/models/GenshinImpact/Talent";

type CharacterForm = ServerGameLingo.GenshinAdmin.CharacterShortDetail;

export async function getCharacter(
  charName: string,
  lang: General.PostDocument["lang"]
): Promise<CharacterForm> {
  const res = (await GenshinCharacter.findOne({
    name: charName,
  })) as unknown as GenshinImpact.Character;

  if (!res.en)
    throw new Error("Terjadi kesalahan : Data bahasa Inggris tidak tersedia");
  if (!res.id)
    throw new Error("Terjadi kesalahan : Data bahasa Indonesia tidak tersedia");

  const data: CharacterForm = {
    _id: res._id as string,
    name: res.name,
    image: res.image,
    detail: lang === "English" ? res.en : res.id,
    createdAt: res.createdAt,
  };

  return data;
}

export async function getTalent(
  charName: string,
  lang: General.PostDocument["lang"]
): Promise<GenshinImpact.Talent> {
  if (lang === "English") {
    const data = await GenshinTalent.findOne({ charName });

    return data;
  }

  const data = await GenshinTalent.findOne({ charName });
  return data;
}
